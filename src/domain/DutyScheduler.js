import { ERROR_MESSAGES } from '../utils/constants/messages.js';
import { DAY_OF_WEEK } from '../utils/constants/dates.js';

class DutyScheduler {
  #dutySchedule;

  constructor(inputSchedule) {
    this.#dutySchedule = this.splitInput(inputSchedule);
    this.validate();
  }

  splitInput(inputSchedule) {
    return inputSchedule.split(',');
  }

  validate() {
    this.validateMonth();
    this.validateDay();
  }

  validateMonth() {
    const [month, day] = this.#dutySchedule;
    if (month < 1 || month > 12) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  }

  validateDay() {
    const [month, day] = this.#dutySchedule;
    if (!DAY_OF_WEEK.includes(day)) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  }

  getDutySchedule() {
    return this.#dutySchedule;
  }
}

export default DutyScheduler;
