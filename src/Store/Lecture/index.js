import { observable, action } from 'mobx';

export default class Lecture {

    @observable
    selectLecture = null;

    @action selectLectureItem = (item) => {
        this.selectLecture = item;
    }
}
