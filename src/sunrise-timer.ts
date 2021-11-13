import {config} from "./svc/config.service";
import {run} from "./svc/timer.service";

export function runScript(fn: (...args: any[]) => any): void {
  process.on('uncaughtException', err => {
    console.error('uncaughtException', err)
  })
  process.on('unhandledRejection', err => {
    console.error('unhandledRejection', err)
  })

  void (async () => {
    try {
      await fn()
    } catch (err) {
      console.error('runScript failed:', err)
      process.exitCode = 1
    }
  })()
}


runScript(async () => {

  console.log("Start sunrise timer")
  console.log(`Using controller: ${config.dimmer_controller}`)

  await run()

})
