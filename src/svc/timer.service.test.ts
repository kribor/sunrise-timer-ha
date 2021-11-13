import {dayjs, IDayjs} from "@naturalcycles/time-lib";
import {determineDimLevel} from "./timer.service";
import {config} from "./config.service";

beforeEach(() => {
    jest.restoreAllMocks()
})



test('timer.runner snapshot', async () => {

    //Lazy time mock
    const today = dayjs().year(2021).month(11).day(11)

    //Array with every 5 minutes of day
    const totalMinutes = [...Array(60*24/5)].map((_, i) => i * 5);

    const dayJsArr: IDayjs[] = totalMinutes.map(totMin => today.hour(Math.floor(totMin / 60)).minute(totMin % 60))

    const dimLevelArr = dayJsArr.map(now => [now.format("HH:mm"), determineDimLevel(now, config)])

    expect(dimLevelArr).toMatchSnapshot()

})
