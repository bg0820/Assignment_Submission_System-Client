import MainStore from './Main';
import TaskStore from './Task';
import LectureStore from './Lecture';

class RootStore {
  constructor() {
    this.storeMain = new MainStore(this);
    this.storeLecture = new LectureStore(this);
    this.storeTask = new TaskStore(this);
  }
}

export default RootStore;