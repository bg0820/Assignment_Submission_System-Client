import MainStore from './Main';
import TaskStore from './Task';
import LectureStore from './Lecture';
import ModalStore from './Modal';
import ChatStore from './Chat';


class RootStore {
  constructor() {
    this.storeMain = new MainStore(this);
    this.storeLecture = new LectureStore(this);
    this.storeTask = new TaskStore(this);
    this.storeModal = new ModalStore(this);
    this.storeChat = new ChatStore(this);
  }
}

export default RootStore;