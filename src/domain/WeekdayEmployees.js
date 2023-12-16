import { ERROR_MESSAGES } from '../utils/constants/messages.js';

class WeekdayEmployees {
  #weekdayEmployees;

  constructor(inputEmployees) {
    this.#weekdayEmployees = this.splitInput(inputEmployees);
    this.validate();
  }

  splitInput(inputEmployees) {
    return inputEmployees.split(',');
  }

  validate() {}

  getWeekdayEmployees() {
    return this.#weekdayEmployees;
  }
}

export default WeekdayEmployees;
