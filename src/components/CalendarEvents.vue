<template>
  <div class="calendar">
    <header class="calendar-header">
      <button type="button" @click="setPrevMonth">
        <svg v-svg symbol="prev" />
      </button>

      <div class="title">{{ currentDate }}</div>

      <button type="button" @click="setNextMonth">
        <svg v-svg symbol="next" />
      </button>
    </header>

    <div class="calendar-events">
      <div class="week-days">
        <div v-for="(day, i) in weekDays" :key="i" class="item">
          {{ day }}
        </div>
      </div>

      <div class="daySquare">
        <div
          v-for="(day, i) in prevMonthDaySquare"
          :key="`prevMonthDaySquare-${i}`"
          class="item"
          :class="{ disabled: isDisabled(day.number, prevMonthName) }"
        >
          <div class="day-number">
            {{ day.number }}
          </div>
        </div>

        <div
          v-for="(day, i) in currentMonthDaySquare"
          :key="`currentMonthDaySquare-${i}`"
          class="item"
          :class="{ today: isToday(day.number), disabled: isDisabled(day.number) }"
        >
          <div class="day-number">
            {{ day.number }}
          </div>
          <template v-if="day.events">
            <div v-for="(event, i) in day.events" :key="i" class="event">
              <span :class="event.type">
                {{ eventTime(event) }} {{ event.title }}
              </span>
            </div>
          </template>
        </div>

        <div
          v-for="(day, i) in nextMonthDaySquare"
          :key="`nextMonthDaySquare-${i}`"
          class="item"
          :class="{ disabled: isDisabled(day.number, nextMonthName) }"
        >
          <div class="day-number">
            {{ day.number }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fiveRowCell, sixRowCell } from '@/constants/all-cell.constants'
import { prevMonth, nextMonth } from '@/constants/month-name.constants'

moment.locale('ru')

export default {
  name: 'CalendarEvents',
  props: {
    events: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      prevMonthName: prevMonth,
      nextMonthName: nextMonth,
      selectedDate: moment().format(),
      monthCount: 0,
      prevMonthDaySquare: [],
      currentMonthDaySquare: [],
      nextMonthDaySquare: [],
      weekDays: [
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
        'воскресенье',
      ],
    }
  },
  computed: {
    firstDayOfMonth() {
      return moment(this.selectedDate).startOf('month').format('dddd')
    },

    daysInMonth() {
      return moment(this.selectedDate).daysInMonth()
    },

    paddingDays() {
      return this.firstDayOfMonth && this.weekDays.indexOf(this.firstDayOfMonth)
    },

    currentDate() {
      return moment(this.selectedDate).format('YYYY') === moment().format('YYYY')
        ? moment(this.selectedDate).format('MMMM')
        : moment(this.selectedDate).format('MMMM YYYY')
    },

    daysInPrevMonth() {
      return moment(this.selectedDate).subtract(1, 'M').daysInMonth()
    }
  },
  mounted() {
    this.initDaySquare()
  },
  methods: {
    initDaySquare() {
      if (this.prevMonthDaySquare) {
        this.prevMonthDaySquare = []
      }

      if (this.currentMonthDaySquare) {
        this.currentMonthDaySquare = []
      }

      if (this.nextMonthDaySquare) {
        this.nextMonthDaySquare = []
      }

      for (let i = this.daysInPrevMonth - this.paddingDays; i < this.daysInPrevMonth; i++) {
        this.prevMonthDaySquare.push({
          number: i + 1,
        })
      }

      for (let i = 0; i < this.daysInMonth; i++) {
        this.currentMonthDaySquare.push({
          number: i + 1,
          events: this.events
            .filter(el => moment(el.date)
              .format('D-MM-YYYY') === `${i + 1}-${moment(this.selectedDate)
              .format('MM-YYYY')}`)
            .sort((a, b) => moment(a.date) - moment(b.date))
        })
      }

      const allCell = this.paddingDays > 4 ? sixRowCell : fiveRowCell

      for (let i = 0; i < allCell - (this.daysInMonth + this.paddingDays); i++) {
        this.nextMonthDaySquare.push({
          number: i + 1,
        })
      }
    },

    isToday(number) {
      return `${number}-${moment(this.selectedDate).format('MM-YYYY')}` === moment().format('D-MM-YYYY')
    },

    isDisabled(number, monthDaySquareName) {
      if (monthDaySquareName === prevMonth) {
        return moment(moment().format('YYYY-MM-D'))
          .isAfter(`${moment(this.selectedDate).subtract(1, 'M').format('YYYY-MM')}-${number}`)
      } else if (monthDaySquareName === nextMonth) {
        return moment(moment().format('YYYY-MM-D'))
          .isAfter(`${moment(this.selectedDate).add(1, 'M').format('YYYY-MM')}-${number}`)
      } else {
        return moment(moment().format('YYYY-MM-D'))
          .isAfter(`${moment(this.selectedDate).format('YYYY-MM')}-${number}`)
      }
    },

    setSelectDate(count) {
      this.selectedDate = moment().add(count, 'M').startOf("month").format()
      this.initDaySquare()
    },

    eventTime(event) {
      return moment(event.date).format('HH:mm')
    },

    setPrevMonth() {
      this.monthCount--
      this.setSelectDate(this.monthCount)

    },

    setNextMonth() {
      this.monthCount++
      this.setSelectDate(this.monthCount)
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/calendar.scss";
</style>
