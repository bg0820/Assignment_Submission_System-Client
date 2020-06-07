import { observable, action } from 'mobx';

export default class Code {
    @observable
	code = '';
	
	@observable
	output = [];

    @action setCode = (code) => {
        this.code = code;
    }


	@action addOutput = (output) => {
		console.log('addOutput', output);
		this.output = this.output.concat(output); // = output;
	}

	@action clearOutput = () => {
		this.output = [];
	}
}