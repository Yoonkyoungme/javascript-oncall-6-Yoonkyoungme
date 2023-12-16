import { ERROR_MESSAGES } from '../utils/constants/messages.js';

class HolidayEmployees {
  #holidayEmployees;

  constructor(inputEmployees) {
    this.#holidayEmployees = this.splitInput(inputEmployees);
    this.validate();
  }

  splitInput(inputEmployees) {
    return inputEmployees.split(',');
  }

  validate() {}

  getHolidayEmployees() {
    return this.#holidayEmployees;
  }
}

export default HolidayEmployees;
