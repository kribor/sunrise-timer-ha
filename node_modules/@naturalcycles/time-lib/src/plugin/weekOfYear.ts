import type { IDayjs, PluginFunc } from '../types'

const MILLIS_IN_DAY = 86400000

export const weekOfYearPlugin: PluginFunc = (_opt, dayjsClass, dayjs) => {
  dayjsClass.prototype.week = function (this: IDayjs) {
    const weekStart = this.$locale().weekStart || 0 // default to Sunday

    if (weekStart === 1) {
      // ISO implementation
      // // Based on: https://stackoverflow.com/a/6117889/4919972
      const d = new Date(Date.UTC(this.year(), this.month(), this.date()))
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
      // Get first day of year
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      // Calculate full weeks to nearest Thursday
      return Math.ceil(((d.getTime() - yearStart.getTime()) / MILLIS_IN_DAY + 1) / 7)
    } else if (weekStart === 0) {
      // US implementation
      // Based on: https://github.com/iamkun/dayjs/blob/dev/src/plugin/weekOfYear/index.js
      // d(this) clone is for badMutable plugin
      const endOfYear = dayjs(this).endOf('y')
      if (endOfYear.day() !== 6 && this.month() === 11 && 31 - this.date() <= endOfYear.day()) {
        return 1
      }
      const startOfYear = dayjs(this).startOf('y')
      const compareDay = startOfYear.subtract(startOfYear.day(), 'd').subtract(1, 'ms')
      const diffInWeek = this.diff(compareDay, 'w', true)
      return Math.ceil(diffInWeek)
    } else if (weekStart === 6) {
      // Loosely based on: https://gist.github.com/IamSilviu/5899269
      const d = new Date(Date.UTC(this.year(), this.month(), this.date()))

      const firstDayOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      const firstDay = firstDayOfYear.getUTCDay() || 7
      let firstSatOffset = -firstDay - 1
      if (firstDay >= 6) firstSatOffset += 7
      const firstSatOfYear = new Date(Date.UTC(this.year(), 0, 1 + firstSatOffset))

      const firstDayOfNextYear = new Date(Date.UTC(d.getUTCFullYear() + 1, 0, 1))
      const firstDayNext = firstDayOfNextYear.getUTCDay() || 7
      let nextYearOffset = -firstDayNext - 1
      if (firstDayNext >= 6) nextYearOffset += 7
      const firstSatOfNextYear = new Date(Date.UTC(this.year() + 1, 0, 1 + nextYearOffset))

      const daysSinceFirstSat = (d.valueOf() - firstSatOfYear.valueOf()) / MILLIS_IN_DAY

      const weekNum = Math.floor(daysSinceFirstSat / 7) + 1 || 1
      // if (daysSinceFirstSat === 0 && d.getUTCDate() !== 1) weekNum = 2

      // console.log({
      //   d,
      //   firstDayOfYear,
      //   firstSatOfYear,
      //   firstSatOffset,
      //   daysSinceFirstSat,
      //   nextYearOffset,
      //   firstSatOfNextYear,
      //   weekNum,
      // })

      // It's next year's week already
      if (d.valueOf() >= firstSatOfNextYear.valueOf()) return 1

      return weekNum
    }

    throw new Error(`.week() plugin for weekStart=${weekStart} is not supported yet:(`)
  }
}
