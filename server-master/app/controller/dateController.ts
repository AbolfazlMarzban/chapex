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
    }
}

module.exports = DateController

