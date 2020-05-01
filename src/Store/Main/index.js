import { observable, action } from 'mobx';

export default class Main {

    @observable
    view = '';

    @observable
    isLogin = false;

    @observable
    id = '';

    @observable
    name = '';

    @observable
    userType = 0;


    @action login = (id, name, userType) => {
        this.isLogin = true;
        this.id = id;
        this.name = name;
        this.userType = userType;
    }

    @action logout = () => {
        this.isLogin = false;
        this.id = '';
        this.name = '';
        this.userType = 0;
    }

    @action setView = (view) => {
        this.view = view;
    }

}
