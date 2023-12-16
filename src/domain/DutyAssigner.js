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
      if (isWeekday) {
        this.applyDuty(this.#weekdayEmployees, this.#employeesIndex[0], true);
      } else {
        this.applyDuty(this.#holidayEmployees, this.#employeesIndex[1], false);
      }
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

  applyDuty(employeesList, index, isWeekday) {
    let employee = employeesList[index];

    if (employee === this.#employees.at(-1)) {
      this.swapEmployees(
        employeesList,
        index,
        (index + 1) % employeesList.length,
      );
      employee = employeesList[index];
    }

    this.#employees.push(employee);
    if (isWeekday) {
      this.#employeesIndex[0] = (index + 1) % employeesList.length;
    } else {
      this.#employeesIndex[1] = (index + 1) % employeesList.length;
    }
  }

  swapEmployees(employeesList, index1, index2) {
    [employeesList[index1], employeesList[index2]] = [
      employeesList[index2],
      employeesList[index1],
    ];
  }
}

export default DutyAssigner;
