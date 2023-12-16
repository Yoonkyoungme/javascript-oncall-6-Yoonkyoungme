import EmergencyWork from './EmergencyWork.js';

class App {
  #emergencyWork;

  constructor() {
    this.#emergencyWork = new EmergencyWork();
  }

  async run() {
    await this.#emergencyWork.start();
  }
}

export default App;
