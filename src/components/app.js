import { issues } from './issues'

class App {
  constructor() {
    this.issues = issues
  }
}

export const app = new App();