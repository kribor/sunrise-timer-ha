export type ConfigType = string | number | Date | IDayjs

export type OptionType = { locale?: string; format?: string; utc?: boolean } | string

export type UnitTypeShort = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'
export type UnitType =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'month'
  | 'year'
  | 'date'
  | UnitTypeShort

export type OpUnitType = UnitType | 'week' | 'w'
export type QUnitType = UnitType | 'quarter' | 'Q'

export type PluginFunc<T = unknown> = (option: T, c: IDayjsFactory, d: IDayjsFactory) => void

export type WeekdayNames = [string, string, string, string, string, string, string]
export type MonthNames = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]

export interface IDayjsFactory {
  (cfg?: ConfigType, option?: OptionType, locale?: string): IDayjs
  (cfg?: ConfigType, option?: OptionType, strict?: boolean): IDayjs

  unix(t: number): IDayjs

  extend<T = unknown>(plugin: PluginFunc<T>, option?: T): IDayjsFactory

  locale(
    preset?: string | IDayjsLocale,
    object?: Partial<IDayjsLocale> | null,
    isLocal?: boolean,
  ): string

  isDayjs(d: any): d is IDayjs

  // Plugins are copy-pasted there now:
  utc(config?: ConfigType, format?: string): IDayjs

  max(dayjs: IDayjs[]): IDayjs
  max(...dayjs: IDayjs[]): IDayjs
  min(dayjs: IDayjs[]): IDayjs
  min(...dayjs: IDayjs[]): IDayjs

  updateLocale(localeName: string, customConfig: Record<string, any>): any
  Ls: { [localeName: string]: IDayjsLocale }
}

export interface IDayjs {
  clone(): IDayjs

  isValid(): boolean

  year(): number

  year(value: number): IDayjs

  month(): number

  month(value: number): IDayjs

  date(): number

  date(value: number): IDayjs

  day(): number

  day(value: number): IDayjs

  hour(): number

  hour(value: number): IDayjs

  minute(): number

  minute(value: number): IDayjs

  second(): number

  second(value: number): IDayjs

  millisecond(): number

  millisecond(value: number): IDayjs

  set(unit: UnitType, value: number): IDayjs

  get(unit: UnitType): number

  add(value: number, unit: OpUnitType): IDayjs

  subtract(value: number, unit: OpUnitType): IDayjs

  startOf(unit: OpUnitType): IDayjs

  endOf(unit: OpUnitType): IDayjs

  format(template?: string): string

  diff(date: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number

  // Forbid the method in favor of .unixMillis()
  // valueOf(): number

  unix(): number

  daysInMonth(): number

  toDate(): Date

  toJSON(): string

  // Forbid the method in favor of .toISODate()
  // toISOString(): string

  toString(): string

  utcOffset(): number
  utcOffset(offset: number): IDayjs

  isBefore(date: ConfigType, unit?: OpUnitType): boolean

  isSame(date: ConfigType, unit?: OpUnitType): boolean

  isAfter(date: ConfigType, unit?: OpUnitType): boolean

  locale(): string

  locale(preset: string | IDayjsLocale, object?: Partial<IDayjsLocale>): IDayjs

  locale(preset?: string | IDayjsLocale, object?: Partial<IDayjsLocale>, isLocal?: boolean): string

  // default plugin here
  /**
   * Returns ISO date, e.g `2018-06-21`
   */
  toISODate(): string

  /**
   * Returns e.g `2018-06-21 17:54:21`
   * or `2018-06-21 17:54` (with seconds=false)
   *
   * @param seconds defauls to true
   */
  toPretty(seconds?: boolean): string

  /**
   * Returns e.g `20180621_1754` or `20180621_175404` (with seconds).
   * seconds @default to false
   */
  toCompactTime(seconds?: boolean): string

  /**
   * Returns e.g `20180621`
   */
  toCompactDate(): string

  /**
   * Returns unixtime in milliseconds.
   */
  unixMillis(): number

  /**
   * Shortcut for .startOf('day')
   *
   * @deprecated, cause it's not a well-defined method. Should be a Factory-method instead.
   */
  today(): IDayjs

  // isoWeekDay plugin here
  /**
   * 1: Monday
   * ...
   * 6: Saturday
   * 7: Sunday
   */
  isoWeekday(): number

  /**
   * Set date to NEXT date that satisfies the weekday.
   * Keeps date the same if it matches the desired weekday.
   * e.g dayjs('2020-07-13').isoWeekday(1) // where 2020-07-13 is already Monday keeps it as Monday
   */
  isoWeekday(setWeekday: number): this

  // weekOfYear plugin here
  /**
   * Returns iso week number (where week starts on Monday)
   */
  week(): number

  /**
   * Set date to NEXT date that satisfies the week number.
   */
  // week (value: number): Dayjs // not supported

  // copy-pasting plugin types here for now
  // isBetween
  isBetween(a: ConfigType, b: ConfigType, c?: OpUnitType | null, d?: string): boolean

  utc(): IDayjs
  local(): IDayjs
  isUTC(): boolean

  isSameOrAfter(date: ConfigType, unit?: OpUnitType): boolean
  isSameOrBefore(date: ConfigType, unit?: OpUnitType): boolean

  fromNow(withoutSuffix?: boolean): string
  from(compared: ConfigType, withoutSuffix?: boolean): string
  toNow(withoutSuffix?: boolean): string
  to(compared: ConfigType, withoutSuffix?: boolean): string
  /**
   * Returns internal locale data
   */
  $locale(): IDayjsLocale
  localeData(): GlobalLocaleDataReturn
}

export interface IDayjsLocale {
  name: string
  weekdays: string[]
  months: string[] | any // todo
  weekStart?: number
  yearStart?: number
  weekdaysShort?: string[]
  monthsShort?: string[]
  weekdaysMin?: string[]
  meridiem?: any
  ordinal?: (n: number) => number | string
  formats: Partial<{
    LT: string
    LTS: string
    L: string
    LL: string
    LLL: string
    LLLL: string
  }>
  relativeTime: Partial<{
    future: string
    past: string
    s: string
    m: string
    mm: string
    h: string
    hh: string
    d: string
    dd: string
    M: string
    MM: string
    y: string
    yy: string
  }>
}

export interface RelativeTimeThreshold {
  l: string
  r?: number
  d?: string
}

export interface RelativeTimeOptions {
  rounding?: (num: number) => number
  thresholds?: RelativeTimeThreshold[]
}

export interface GlobalLocaleDataReturn {
  firstDayOfWeek(): number
  weekdays(): WeekdayNames
  weekdaysShort(): WeekdayNames
  weekdaysMin(): WeekdayNames
  months(): MonthNames
  monthsShort(): MonthNames
  longDateFormat(format: string): string
  meridiem(hour?: number, minute?: number, isLower?: boolean): string
}
