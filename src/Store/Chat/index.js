import { observable, action } from 'mobx';

export default class Chat {

    @observable
    chats = [];

    @action addChat = (data) => {
        this.chats = this.chats.concat(data);
    }
}
