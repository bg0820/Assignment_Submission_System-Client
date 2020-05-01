import { observable, action } from 'mobx';

export default class Lecture {
    @observable
    selectTask = null;

    @action selectTaskItem = (task) => {
        this.selectTask = task;
    }

}