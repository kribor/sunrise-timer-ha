import { IsoDate } from '@naturalcycles/js-lib'
import { dayjs, ConfigType, IDayjs, OpUnitType } from './index'

/**
 * Like _range, but for IDayjs.
 * Left side is inclusive.
 * Right side of the range is exclusive. (same as _range)
 */
export function dayjsRange(
  minIncl: ConfigType,
  maxExcl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IDayjs[] {
  const days: IDayjs[] = []
  let current = dayjs(minIncl).startOf(stepUnit)
  const max = dayjs(maxExcl).startOf(stepUnit)

  do {
    days.push(current)
    current = current.add(step, stepUnit)
  } while (current.isBefore(max))

  return days
}

export function dayjsRangeISODate(
  minIncl: ConfigType,
  maxExcl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IsoDate[] {
  return dayjsRange(minIncl, maxExcl, step, stepUnit).map(d => d.toISODate())
}

/**
 * Like _range, but for IDayjs.
 * Both sides inclusive.
 */
export function dayjsRangeIncl(
  minIncl: ConfigType,
  maxIncl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IDayjs[] {
  return dayjsRange(minIncl, dayjs(maxIncl).add(1, stepUnit), step, stepUnit)
}

export function dayjsRangeInclISODate(
  minIncl: ConfigType,
  maxIncl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IsoDate[] {
  return dayjsRangeIncl(minIncl, maxIncl, step, stepUnit).map(d => d.toISODate())
}
