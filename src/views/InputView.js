import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../utils/constants/messages.js';

const InputView = {
  async readDutySchedule() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.MONTH_AND_DAY);
    return input;
  },
  async readWeekdayEmployees() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.WEEKDAY_EMPLOYEES);
    return input;
  },

  async readHolidayEmployees() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.HOLIDAY_EMPLOYEES);
    return input;
  },
};

export default InputView;
