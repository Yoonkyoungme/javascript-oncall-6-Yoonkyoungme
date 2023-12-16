import { DAY_OF_WEEK, LEGAL_HOLIDAYS } from '../utils/constants/dates.js';

class DutyAssigner {
  #dutyScheduler;

  #weekdayEmployees;

  #holidayEmployees;

  #monthlyScheduler = [];

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
  }

  assignDutyToEmployee(date, isWeekday) {
    const employeesList = isWeekday
      ? this.#weekdayEmployees
      : this.#holidayEmployees;
    const index = isWeekday ? 0 : 1;

    let employee = employeesList[this.#employeesIndex[index]];
    if (employee === this.#employees.at(-1)) {
      employee = this.adjustOrder(employeesList, this.#employeesIndex[index]);
    }
    this.#employees.push(employee);
    this.#employeesIndex[index] =
      (this.#employeesIndex[index] + 1) % employeesList.length;
  }

  getFormattedDate(date) {
    const dayOfWeek =
      DAY_OF_WEEK[this.getDay(date)] +
      (this.isLegalHoliday(date) ? '(휴무)' : '');
    return `${
      this.#dutyScheduler[0]
    }월 ${date}일 ${dayOfWeek} ${this.#employees.at(-1)}`;
  }

  getMonthlyScheduler() {
    const startDay = this.getStartDay();
    const endDay = this.getEndDay();
    for (let date = startDay; date <= endDay; date += 1) {
      const isWeekday = this.isWeekday(date);
      this.assignDutyToEmployee(date, isWeekday);
      this.#monthlyScheduler.push([this.getFormattedDate(date)]);
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

  isLegalHoliday(date) {
    const isLegalHoliday = LEGAL_HOLIDAYS.includes(
      `${this.#dutyScheduler[0]}월 ${date}일`,
    );
    return isLegalHoliday;
  }

  isWeekday(date) {
    const day = new Date(2023, +this.#dutyScheduler[0] - 1, date).getDay();
    const isWeekend = day === 0 || day === 6;
    return !isWeekend && !this.isLegalHoliday(date);
  }

  adjustOrder(employeesList, index) {
    this.swapEmployees(
      employeesList,
      index,
      (index + 1) % employeesList.length,
    );
    return employeesList[index];
  }

  applyDuty(employeesList, index, isWeekday) {
    let employee = employeesList[index];
    if (employee === this.#employees.at(-1)) {
      employee = this.adjustOrder(employeesList, index);
    }
    this.#employees.push(employee);
    this.#employeesIndex[isWeekday ? 0 : 1] =
      (index + 1) % employeesList.length;
  }

  swapEmployees(employeesList, index1, index2) {
    [employeesList[index1], employeesList[index2]] = [
      employeesList[index2],
      employeesList[index1],
    ];
  }

  getResult() {
    return this.#monthlyScheduler;
  }
}

export default DutyAssigner;
