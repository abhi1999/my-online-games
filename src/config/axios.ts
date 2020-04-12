import axios from 'axios';

declare const process:{env:any};
const consoleColor = {
    consoleWarn: 'color: orange',
    consoleInfo: 'color:blue',
    consoleError: 'color:red',
    consoleSuccess: 'color:green'
}
const {REACT_APP_API_URL, REACT_APP_API_TIMEOUT} = process.env;
console.log('Iamhere', REACT_APP_API_URL, REACT_APP_API_TIMEOUT)
export const axiosRoot = axios.create({
    baseURL : REACT_APP_API_URL,
    timeout : REACT_APP_API_TIMEOUT * 1000,
});

axiosRoot.interceptors.request.use(async (config)=> {
    const curl : string = config.url as string;
    const burl : string = config.baseURL as string;
    if (curl.indexOf(burl) === 0) {
        console.info('%c' + config.method + ": " + config.url, consoleColor.consoleError);
    } else {
        console.info('%c' + config.method + ": " + config.baseURL + config.url, consoleColor.consoleInfo);
    }
    /*
    const oauth = sessionStorage.getItem(axAccessToken);
    if (isNullOrUndefined(oauth)){
        if (config.url !== SERVICES.endpoints.getLoginToken && config.url && config.url.indexOf('Duo') ===-1) {
            console.error('%cMissing OAuth token', consoleColor.consoleError);
            console.log("Logging Out Now");
            Logout();

        }
    } else {
        config.headers.common['Authorization'] = 'Bearer ' + oauth;
        config.withCredentials = true;
    }
    */
    return config;
    
}, 
(error) => {
    console.error('%cHTTP Status ' + error.request.Status, consoleColor.consoleError);
    
    return Promise.reject(error);
});


export default axios;