import { observable, action } from 'mobx';

export default class Task {
    @observable
    selectTask = null;

    @action setSelectTaskItem = (task) => {
        this.selectTask = task;
    }

}