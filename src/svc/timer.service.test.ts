import { dayjs, IDayjs } from '@naturalcycles/time-lib'
import { mockTime } from '@naturalcycles/dev-lib/dist/testing'
import { pMap } from '@naturalcycles/js-lib'
import { controller } from '../controller/telldus'
import { _singleExec } from './timer.service'
import { config, SunriseTimerConfig } from './config.service'

beforeEach(() => {
  jest.restoreAllMocks()
  mockTime(dayjs('2021-11-28').unix())
})

const defaultConfig = config

describe('timer.service with configs', () => {
  const testCases: [string, SunriseTimerConfig][] = [
    // Req: Track to fb with db data if user is logged in and paid less than 7 days ago
    ['Default config', defaultConfig],
    [
      'Custom dimmer interval config',
      {
        ...defaultConfig,
        dimmer_min: 10,
        dimmer_max: 90,
      },
    ],
  ]
  test.each(testCases)('%s', async (_, cfg) => {
    jest.spyOn(controller, 'toggleLight').mockImplementation()
    jest.spyOn(controller, 'dimLight').mockImplementation()

    // Array with every 5 minutes of day
    const totalMinutes = [...Array.from({ length: (60 * 24) / 10 })].map((_, i) => i * 10)

    const dayJsArr: IDayjs[] = totalMinutes.map(totMin =>
      dayjs()
        .hour(Math.floor(totMin / 60))
        .minute(totMin % 60),
    )

    const dimLevelArr = await pMap(dayJsArr, async now => {
      mockTime(now.unix())
      return [now.format('HH:mm'), await _singleExec(controller, cfg)]
    })

    expect(dimLevelArr).toMatchSnapshot()
  })
})
