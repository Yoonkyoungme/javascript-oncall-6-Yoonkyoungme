import DutyScheduler from './domain/DutyScheduler.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class EmergencyWork {
  #dutyScheduler;

  async start() {
    this.#dutyScheduler = await this.readDutyScheduler();
  }

  async readDutyScheduler() {
    try {
      return new DutyScheduler(await InputView.readDutySchedule());
    } catch (error) {
      OutputView.print(error.message);
      return this.readDutyScheduler();
    }
  }
}

export default EmergencyWork;
