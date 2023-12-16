import DutyScheduler from './domain/DutyScheduler.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class EmergencyWork {
  #dutyScheduler;

  async start() {
    this.#dutyScheduler = await this.readDutyScheduler();
  }

  async readDutyScheduler() {
    const input = InputView.readDutySchedule();
    return input;
  }
}

export default EmergencyWork;
