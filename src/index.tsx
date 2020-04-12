import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import configureStore  from './store';
import LogRocket from 'logrocket';

const store = configureStore();
declare const process:{env:any};
if(process.env.REACT_APP_LOG_ROCKET_ENABLED==="true"){
    console.log('Enabling Logging');
    // LogRocket.init('9mzoy6/afd-poc');
    LogRocket.init(process.env.REACT_APP_LOG_ROCKET_APP_ID);
}
console.log('Printing all the environment variables', process.env)


ReactDOM.render(<Provider store={store}>
                    <CookiesProvider>
                        <App />
                    </CookiesProvider>
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
