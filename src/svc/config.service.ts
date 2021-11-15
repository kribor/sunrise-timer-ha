import * as fs from 'fs'
import * as yaml from 'js-yaml'

export interface SunriseTimerConfig {
  latitude: number
  longitude: number
  hours_of_full_light: number
  minutes_of_sunrise: number
  max_sun_angle: number
  fake_noon_hour: number
  dimmer_controller: string
  dimmer_step: number
  dimmer_max: number
  dimmer_min: number
  timezone: string
  telldus?: TelldusConfig
}

export interface TelldusConfig {
  dimmer_id: string
}

let readConfig = {}
try {
  readConfig = yaml.load(fs.readFileSync('config.yaml', 'utf8')) as any
} catch {
  console.log('WARN: no config file found, using defaults')
}

export const config: SunriseTimerConfig = {
  timezone: 'Europe/Stockholm',
  max_sun_angle: 7, // degrees over the horizon at which time light can be turned off as it's light-enough anyway
  latitude: 60.025369,
  longitude: 17.669363,

  fake_noon_hour: 11, // Treat as mid-day
  hours_of_full_light: 10,
  minutes_of_sunrise: 120, // interval for dimming between 0 and 100% (both sunrise and sundown)

  dimmer_step: 3,
  dimmer_min: 0, // Start dimming upwards from here. Although 0 is 0
  dimmer_max: 100, // Start dimming downwards from here. Although 100 is 100.
  dimmer_controller: 'telldus',

  telldus: {
    dimmer_id: '111',
  },
  ...readConfig,
} as SunriseTimerConfig

console.log('INFO: Using config:')
console.log(config)
