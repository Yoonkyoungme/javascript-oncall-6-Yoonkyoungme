import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../utils/constants/messages.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printResult(result) {
    result.forEach((dayResult) => Console.print(dayResult.join(' ')));
  },
};
export default OutputView;
