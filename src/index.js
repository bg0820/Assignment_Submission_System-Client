// import '@babel/polyfill'; 잠시 오류나서 제외

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'mobx-react'; // MobX 에서 사용하는 Provider
import RootStore from '@store/index.js';

import socketIOClient from "socket.io-client";

import './index.scss';

const ENDPOINT = "http://211.186.10.181:3000";
const socket = socketIOClient(ENDPOINT);
const root = new RootStore();

root.storeMain.setSocket(socket);

ReactDOM.render( 
	<Provider {...root}>
		<App />
	</Provider>, document.getElementById('root')
);
