
import {dayjs, IDayjs} from "@naturalcycles/time-lib";
import {config, SunriseTimerConfig} from "./config.service";
import {Controller} from "../controller/controller";

const suncalc = require('suncalc');
let dimState: number = -1

export async function run(cfg: SunriseTimerConfig): Promise<void> {
    console.log("Timer starting")

    // controller shall export "controller"
    const { controller  } = await import(`../controller/${config.dimmer_controller}`)

    while (true) {
        await _singleExec(controller, cfg)
        //Evaluate again in 1 minute
        await delay(1000 * 60)
    }
}

export async function _singleExec(controller: Controller, cfg: SunriseTimerConfig): Promise<number> {
  let dimLevel = determineDimLevel(dayjs(), config)

  // Handle increments
  if (dimLevel > 0 && dimLevel < 100) {
    const dimInterval: number = cfg.dimmer_max - cfg.dimmer_min
    const dimLevelPrecise = cfg.dimmer_min + Math.floor(dimLevel * dimInterval / 100)
    dimLevel = dimLevelPrecise - dimLevelPrecise % config.dimmer_step
  }

  //Avoid unnecessary api calls
  if (dimLevel !== dimState) {
    if (dimLevel === 0) {
      await controller.toggleLight(false, config)
    } else if (dimLevel === 100) {
      await controller.toggleLight(true, config)
    } else {
      await controller.dimLight(dimLevel, config)
    }
    dimState = dimLevel
  }
  return dimState
}

export function determineDimLevel(now: IDayjs, cfg: SunriseTimerConfig): number {
    //representation time of day
    const format = 'HH:mm'
    const nowStr = now.format(format)

    //TODO: determine sun angle and turn off light when there's enough natural light
    suncalc.addTime(config.max_sun_angle, 'lightOff', 'lightOn')
    const times = suncalc.getTimes(new Date(), config.latitude, config.longitude)
    if (now > dayjs(times.lightOff) && now < dayjs(times.lightOn)) {
        return 0
    }

    // Determine interval of full light (optionally, gradually go from natural to configured level)
    const fullLightOn = dayjs().hour(cfg.fake_noon_hour).minute(0).subtract(cfg.hours_of_full_light/2, 'h').format(format)
    const fullLightOff = dayjs().hour(cfg.fake_noon_hour).minute(0).add(cfg.hours_of_full_light/2, 'h').format(format)
    if (fullLightOn <= nowStr && fullLightOff > nowStr) {
        return 100
    }

    // Sunset
    const lightCompletelyOff = dayjs().hour(cfg.fake_noon_hour).minute(0).add(cfg.hours_of_full_light * 60/2 + cfg.minutes_of_sunrise, 'm')
    if (lightCompletelyOff.format(format) > nowStr && fullLightOff < nowStr) {
        const minutesFromFullDark = Math.abs(lightCompletelyOff.diff(now, 'm'))
        const dimLevel = Math.floor((minutesFromFullDark / cfg.minutes_of_sunrise) * 100)
        return dimLevel
    }

    // Sunrise
    const sunriseStart = dayjs().hour(cfg.fake_noon_hour).minute(0).subtract(cfg.hours_of_full_light * 60/2 + cfg.minutes_of_sunrise, 'm')
    if (sunriseStart.format(format) < nowStr && fullLightOn > nowStr) {
        const minutesIntoSunrise = Math.abs(sunriseStart.diff(now, 'm'))
        return Math.floor((minutesIntoSunrise / cfg.minutes_of_sunrise )* 100)
    }

    return 0
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
