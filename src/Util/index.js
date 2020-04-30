const axios = require('axios').default;



export const requestServer = async function(_url, _method, _params) {
	let token = '';
	let params = {};
	let data = {};

	if(_method === 'GET')
		params = _params;
	else if(_method === 'POST' || _method === 'PUT' || _method === 'DELETE')
		data = _params;
	
	// sessionStorage['token'] = 사용자로부터 받은 토큰 -> 로그인시에 서버요청 -> 응답으로 토큰이 들어와있음 -> 응답받은 토큰을 -> sessionStorage['token'] 여기에 저장

	if(sessionStorage['token'])
		token = "Bearer " + sessionStorage['token'];
	
	let respData = null;
	let code = 200;
	
    // IE 지원
	document.execCommand('ClearAuthenticationCache', 'false');
	
	try {
		let resp = await axios({
			method: _method,
			url: 'http://211.186.10.181:3000/' + _url, // 'http://222.238.100.247:3000' + _url,
			params: params, // params null 
			data: data, // null  params
			headers: {
				Authorization: token
			}
		});

		respData = resp.data;
		code = resp.status;
	} catch(e) {
		respData = e.response.data;
		code = e.response.status;
	}

	return {
		code: code, // http 상태코드 200, 404, 403, 401
		body: respData // json 값이 들어감
	};
}
