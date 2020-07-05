import { observable, action } from 'mobx';

export default class Main {
	@observable 
	socket = null; 

    @observable
    menu = 'lectureList';

    @observable
    isLogin = false;

	@observable
	visible = true;

    @observable
    id = '';

    @observable
	name = '';
	
	@observable
	userIdx = -1;

    @observable
    userType = 0;

    @observable
    selectStudentIdx = -1;

    @observable
    nonAssignmentCount = 0;

    @action setNonAssignment = (nonAssignmentCount) => {
        this.nonAssignmentCount = nonAssignmentCount;
    }

	@action setVisible = (visible) => {
		this.visible = visible;
	}
	
    @action setSelectStudentIdx = (studentIdx) => {
        this.selectStudentIdx = studentIdx;
    }

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
