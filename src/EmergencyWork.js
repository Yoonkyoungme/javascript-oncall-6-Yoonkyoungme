import DutyScheduler from './domain/DutyScheduler.js';
import WeekdayEmployees from './domain/WeekdayEmployees.js';
import HolidayEmployees from './domain/HolidayEmployees.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import DutyAssigner from './domain/DutyAssigner.js';

class EmergencyWork {
  #dutyScheduler;

  #weekdayEmployees;

  #holidayEmployees;

  #dutyAssigner;

  async start() {
    this.#dutyScheduler = await this.readDutyScheduler();
    this.#weekdayEmployees = await InputView.readWeekdayEmployees();
    this.#holidayEmployees = await InputView.readHolidayEmployees();
    this.assignDuty();
  }

  async readDutyScheduler() {
    try {
      return new DutyScheduler(
        await InputView.readDutySchedule(),
      ).getDutySchedule();
    } catch (error) {
      OutputView.print(error.message);
      return this.readDutyScheduler();
    }
  }

  async readWeekdayEmployees() {
    try {
      return new WeekdayEmployees(
        await InputView.readWeekdayEmployees(),
      ).getWeekdayEmployees();
    } catch (error) {
      OutputView.print(error.message);
      return this.readWeekdayEmployees();
    }
  }

  async readHolidayEmployees() {
    try {
      return new HolidayEmployees(
        await InputView.readHolidayEmployees(),
      ).getHolidayEmployees();
    } catch (error) {
      OutputView.print(error.message);
      return this.readHolidayEmployees();
    }
  }

  assignDuty() {
    this.#dutyAssigner = new DutyAssigner(
      this.#dutyScheduler,
      this.#weekdayEmployees,
      this.#holidayEmployees,
    ).getResult();

    OutputView.printResult(this.#dutyAssigner);
  }
}

export default EmergencyWork;
