import type { IDayjs, PluginFunc } from '../types'

// todo: fix the interface extension

export const DAYJS_ISO_DATE = 'YYYY-MM-DD'
export const DAYJS_COMPACT_DATE = 'YYYYMMDD'
export const DAYJS_TIME_HMS = 'HH:mm:ss'
export const DAYJS_TIME_HM = 'HH:mm'
export const DAYJS_PRETTY_TIME = 'YYYY-MM-DD HH:mm:ss'
export const DAYJS_PRETTY_TIME_NO_SECONDS = 'YYYY-MM-DD HH:mm'
export const DAYJS_COMPACT_TIME = 'YYYYMMDD_HHmm'
export const DAYJS_COMPACT_TIME_SECONDS = 'YYYYMMDD_HHmmss'

export const defaultPlugins: PluginFunc = (_opt, dayjsClass, _dayjsFactory) => {
  dayjsClass.prototype.toISODate = function (this: IDayjs): string {
    // return this.format(DAYJS_ISO_DATE)
    // `format` is fine, but benchmarks show that it's ~3 times slower than "manual" implementation:
    return `${this.year()}-${String(this.month() + 1).padStart(2, '0')}-${String(
      this.date(),
    ).padStart(2, '0')}`

    // The other formats are not "perf-optimized", but you can use your own custom formatter implementations
    // in your project instead
  }

  dayjsClass.prototype.toPretty = function (this: IDayjs, seconds = true): string {
    return this.format(seconds ? DAYJS_PRETTY_TIME : DAYJS_PRETTY_TIME_NO_SECONDS)
  }

  dayjsClass.prototype.toCompactTime = function (this: IDayjs, seconds = false): string {
    return this.format(seconds ? DAYJS_COMPACT_TIME_SECONDS : DAYJS_COMPACT_TIME)
  }

  dayjsClass.prototype.toCompactDate = function (this: IDayjs): string {
    return this.format(DAYJS_COMPACT_DATE)
  }

  dayjsClass.prototype.unixMillis = function (this: any): number {
    return this.valueOf()
  }

  dayjsClass.prototype.today = function (this: IDayjs): IDayjs {
    return this.startOf('day')
  }
}
