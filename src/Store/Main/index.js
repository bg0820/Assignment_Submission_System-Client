import { observable, action } from 'mobx';

export default class Main {
	@observable 
	socket = null; 

    @observable
    menu = 'lectureList';

    @observable
    isLogin = false;

    @observable
    id = '';

    @observable
	name = '';
	
	@observable
	userIdx = -1;

    @observable
    userType = 0;

	@action setSocket = (socket) => { 
		this.socket = socket; 
	} 
	
    @action login = (id, name, userType, userIdx) => {
        this.isLogin = true;
        this.id = id;
        this.name = name;
		this.userType = userType;
		this.userIdx = userIdx;
    }

    @action logout = () => {
        this.isLogin = false;
        this.id = '';
        this.name = '';
        this.userType = 0;
    }

    @action setMenu = (menu) => {
        this.menu = menu;
    }

}
