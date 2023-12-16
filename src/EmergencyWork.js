import DutyScheduler from './domain/DutyScheduler.js';
import WeekdayEmployees from './domain/WeekdayEmployees.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class EmergencyWork {
  #dutyScheduler;

  #weekdayEmployees;

  async start() {
    this.#dutyScheduler = await this.readDutyScheduler();
    this.#weekdayEmployees = await InputView.readWeekdayEmployees();
  }

  async readDutyScheduler() {
    try {
      return new DutyScheduler(await InputView.readDutySchedule());
    } catch (error) {
      OutputView.print(error.message);
      return this.readDutyScheduler();
    }
  }

  async readWeekdayEmployees() {
    try {
      return new WeekdayEmployees(await InputView.readWeekdayEmployees());
    } catch (error) {
      OutputView.print(error.message);
      return this.readWeekdayEmployees();
    }
  }
}

export default EmergencyWork;
