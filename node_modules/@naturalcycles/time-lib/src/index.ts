import { dayjs } from './dayjs.full'
import {
  DAYJS_TIME_HM,
  DAYJS_TIME_HMS,
  DAYJS_ISO_DATE,
  DAYJS_COMPACT_DATE,
  DAYJS_COMPACT_TIME,
  DAYJS_COMPACT_TIME_SECONDS,
} from './plugin/default'
import {
  IDayjs,
  IDayjsFactory,
  IDayjsLocale,
  ConfigType,
  OpUnitType,
  GlobalLocaleDataReturn,
} from './types'
import { dayjsRange, dayjsRangeIncl, dayjsRangeInclISODate, dayjsRangeISODate } from './dayjsRange'

export type { IDayjsFactory, IDayjs, IDayjsLocale, ConfigType, OpUnitType, GlobalLocaleDataReturn }

export {
  dayjs, // should be imported from dayjs.full, cause it's an extended version
  DAYJS_TIME_HM,
  DAYJS_TIME_HMS,
  DAYJS_ISO_DATE,
  DAYJS_COMPACT_DATE,
  DAYJS_COMPACT_TIME,
  DAYJS_COMPACT_TIME_SECONDS,
  dayjsRange,
  dayjsRangeIncl,
  dayjsRangeInclISODate,
  dayjsRangeISODate,
  // loadDayjsLocales,
  // loadDayjsPlugins,
}
