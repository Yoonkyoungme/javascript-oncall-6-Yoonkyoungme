import { DAY_OF_WEEK, LEGAL_HOLIDAYS } from '../utils/constants/dates.js';

class DutyAssigner {
  #dutyScheduler;

  #weekdayEmployees;

  #holidayEmployees;

  #monthlyScheduler;

  #employees = [];

  #employeesIndex = [0, 0];

  constructor(dutyScheduler, weekdayEmployees, holidayEmployees) {
    this.#dutyScheduler = dutyScheduler;
    this.#weekdayEmployees = weekdayEmployees
      .split(',')
      .map((employee) => employee.trim());
    this.#holidayEmployees = holidayEmployees
      .split(',')
      .map((employee) => employee.trim());
    this.assignDuty();
  }

  assignDuty() {
    this.getMonthlyScheduler();
    console.log(this.#employees);
  }

  getMonthlyScheduler() {
    const startDay = this.getStartDay();
    const endDay = this.getEndDay();
    for (let start = startDay; start <= endDay; start += 1) {
      const isWeekday = this.isWeekday(start);
    }
  }

  getDay(date) {
    const [month, startDay] = this.#dutyScheduler;
    return new Date(2023, +month - 1, date).getDay();
  }

  getStartDay() {
    const firstDay = this.getDay(1);
    const startDayIndex = DAY_OF_WEEK.indexOf(this.#dutyScheduler[1]) + 1;
    const startDayDiff = startDayIndex - firstDay;
    return startDayDiff < 0 ? startDayDiff + 7 : startDayDiff;
  }

  getEndDay() {
    const [month, startDay] = this.#dutyScheduler;
    return new Date(2023, month, 0).getDate();
  }

  // 시작 요일부터 평일인지 판단하는 기능 (휴일: 토요일, 일요일, 법적공휴일 LEGAL_HOLIDAYS)
  isWeekday(date) {
    const day = new Date(2023, +this.#dutyScheduler[0] - 1, date).getDay();
    const isWeekend = day === 0 || day === 6;
    const isLegalHoliday = LEGAL_HOLIDAYS.includes(`5월 ${date}일`);
    return !isWeekend && !isLegalHoliday;
  }
}

export default DutyAssigner;
