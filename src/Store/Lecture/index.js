import { observable, action } from 'mobx';

export default class Lecture {

    @observable
    selectLecture = null;

    @observable
    view = 'assignment';

    @action selectLectureItem = (item) => {
        this.selectLecture = item;
    }

    @action setView = (view) => {
        this.view = view;
    }
}
