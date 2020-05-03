import { observable, action } from 'mobx';

export default class Modal {
    @observable
	modalView= null;
	@observable
	modalSize= 'default';
	@observable
	modalTitle= '';
	@observable
	modalData= null;

    @action modalCall = (parmas) => {
		let modalSize = 'default';
		let data = null;

		if(parmas.modalSize)
			modalSize = parmas.modalSize;

		if(parmas.modalData) 
			data = parmas.modalData;

		this.modalView = parmas.modalView;
		this.modalTitle = parmas.modalTitle;
		this.modalSize = modalSize;
		this.modalData = data;
	};  
	
	@action modalClose = () => {
		this.modalView = null;
		this.modalTitle = '';
		this.modalSize = 'default';
		this.modalData = null;
	};  
}