import * as yaml from 'js-yaml'
import * as fs from 'fs'

export interface SunriseTimerConfig {
    latitude: number
    longitude: number
    hours_of_full_light: number
    minutes_of_sunrise: number
    max_sun_angle: number
    fake_noon_hour: number
    dimmer_controller: string
    dimmer_step: number
    timezone: string
    telldus?: TelldusConfig
}

export interface TelldusConfig {
  dimmer_id: string
}
export const config: SunriseTimerConfig = yaml.load(fs.readFileSync('config.yaml', 'utf8')) as SunriseTimerConfig
