import autoBind from 'auto-bind'
import moment from 'jalali-moment'

class DateController {

  currentDate: string
  currentTime: string
  currentYear: string
  currentMonth: string
  currentDay: string
  currentHour: string
  currentMinute: string
  weekday: number
  weekdayName: string
  timeWithSecond: string
  currentSecond: string

  Date: object


  constructor() {
    autoBind(this)
    this.currentDate = ''
    this.currentTime = ''
    this.currentYear = ''
    this.currentMonth = ''
    this.currentDay = ''
    this.currentHour = ''
    this.currentMinute = ''
    this.weekdayName = ''
    this.timeWithSecond = ''
    this.currentSecond = ''

    this.initProperties()
    this.Date = {
      date: this.currentDate,
      time: this.currentTime
    }
  }

  initProperties() {
    const m = moment().locale('fa')
    this.currentDate = m.format('YYYY/MM/DD')
    this.currentTime = m.format('HH:mm')
    this.currentYear = m.format('YYYY')
    this.currentMonth = m.format('MM')
    this.currentDay = m.format('DD')
    this.currentHour = m.format('HH')
    this.currentMinute = m.format('mm')
    this.weekday = m.weekday()
    this.weekdayName = DateController.setWeekDataName(this.weekday)
    this.timeWithSecond = m.format('HH:mm:ss')
    this.currentSecond = m.format('ss')

  }

  static setWeekDataName(currentWeekDay: number): string {
    let weekdayName = ''
    switch (currentWeekDay + 1) {
      case 1:
        weekdayName = "شنبه"
        break;
      case 2:
        weekdayName = "یکشنبه"
        break;
      case 3:
        weekdayName = "دوشنبه"
        break;
      case 4:
        weekdayName = "سه شنبه"
        break;
      case 5:
        weekdayName = "چهارشنبه"
        break;
      case 6:
        weekdayName = "پنجشنبه"
        break;
      case 7:
        weekdayName = "جمعه"
        break;
      default:
        weekdayName = "invalid"
    }
    return weekdayName
  }

  now() {
    return {
      currentDate: this.currentDate,
      currentTime: this.currentTime,
      currentYear: this.currentYear,
      currentMonth: this.currentMonth,
      currentDay: this.currentDay,
      currentHour: this.currentHour,
      currentMinute: this.currentMinute,
      weekdayName: this.weekdayName,
      timeWithSecond: this.timeWithSecond,
      currentSecond: this.currentSecond
    }
  }
}

export default DateController
