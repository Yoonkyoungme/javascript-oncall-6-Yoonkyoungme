import { DAY_OF_WEEK, LEGAL_HOLIDAYS } from '../utils/constants/dates.js';

class DutyAssigner {
  #dutyScheduler;

  #weekdayEmployees;

  #holidayEmployees;

  constructor(dutyScheduler, weekdayEmployees, holidayEmployees) {
    this.#dutyScheduler = dutyScheduler;
    this.weekdayEmployees = weekdayEmployees;
    this.holidayEmployees = holidayEmployees;
    this.assignDuty();
  }

  assignDuty() {
    const startDay = this.getStartDay();
    const endDay = this.getEndDay();
  }

  getStartDay() {
    const [month, startDay] = this.#dutyScheduler;
    const firstDay = new Date(2023, +month - 1, 1).getDay();
    const startDayIndex = DAY_OF_WEEK.indexOf(startDay) + 1;
    const startDayDiff = startDayIndex - firstDay;
    return startDayDiff < 0 ? startDayDiff + 7 : startDayDiff;
  }

  getEndDay() {
    const [month, startDay] = this.#dutyScheduler;
    return new Date(2023, month, 0).getDate();
  }
}

export default DutyAssigner;
