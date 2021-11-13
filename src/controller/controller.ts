import {SunriseTimerConfig} from "../svc/config.service";

export interface Controller {
    dimLight(dimLevel: number, cfg: SunriseTimerConfig): void
    toggleLight(on: boolean, cfg: SunriseTimerConfig): void
}
