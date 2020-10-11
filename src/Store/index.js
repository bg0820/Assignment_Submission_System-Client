import MainStore from './Main';
import LectureStore from './Lecture';
import ModalStore from './Modal';
import ChatStore from './Chat';
import CodeStore from './Code';


class RootStore {
  constructor() {
    this.storeMain = new MainStore(this);
    this.storeLecture = new LectureStore(this);
    this.storeModal = new ModalStore(this);
    this.storeChat = new ChatStore(this);
    this.storeCode = new CodeStore(this);
  }
}

export default RootStore;