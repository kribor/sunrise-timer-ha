import {getGot} from "@naturalcycles/nodejs-lib";
import {Controller} from "./controller";
import {SunriseTimerConfig} from "../svc/config.service";
import OAuth = require("oauth-1.0a");
import * as crypto from "crypto";
import {Token} from "oauth-1.0a";

const oauth = new OAuth({
  consumer: {
    key: process.env['TELLDUS_CONSUMER_KEY'] as string,
    secret: process.env['TELLDUS_CONSUMER_SECRET'] as string
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const token = {
  key: process.env['TELLDUS_ACCESS_TOKEN'],
  secret: process.env['TELLDUS_ACCESS_TOKEN_SECRET']
} as Token;

const baseUrl = 'https://pa-api.telldus.com/json'

const telldusGot = getGot({
    logStart: true,
    timeout: 30_000,
})

interface TelldusStatus {
    status: string
}

export class TelldusController implements Controller {
    constructor() {}

    async dimLight(dimLevel: number, cfg: SunriseTimerConfig) : Promise<void> {
        const url = `${baseUrl}/device/dim?id=${cfg.telldus?.dimmer_id}&level=${Math.floor(dimLevel * 255 / 100)}`

        const r = await telldusGot.get(
          url,
          { headers: oauth.toHeader(oauth.authorize({url, method: 'GET'}, token)) as any,}
        ).json<TelldusStatus>()
        if (r.status !== 'success') {
            throw Error(`dimLight received unexpected response: ${r}`)
        }
    }

    async toggleLight(on: boolean, cfg: SunriseTimerConfig) : Promise<void> {
        const url: string = on ? `${baseUrl}/device/turnOn?id=${cfg.telldus?.dimmer_id}` : `${baseUrl}/device/turnOff?id=${cfg.telldus?.dimmer_id}`

        const r = await telldusGot.get(
          url,
          { headers: oauth.toHeader(oauth.authorize({url, method: 'GET'}, token)) as any }
        ).json<TelldusStatus>()
        if (r.status !== 'success') {
            throw Error(`dimLight received unexpected response: ${r}`)
        }
    }
}

export const controller = new TelldusController()
