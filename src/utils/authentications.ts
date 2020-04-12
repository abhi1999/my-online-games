
import {AFDSESSION, AFDSESSIONVALUES} from "./../constants/authentication"
import Cookies from 'universal-cookie';
import LogRocket from 'logrocket';

export const checkForValidSession =(cookies:Cookies|undefined):boolean=>{
    if(cookies){
        const session = cookies.get(AFDSESSION);
        if(AFDSESSIONVALUES.find(a=> a === session) !== undefined){
          console.log('User has a valid session. Proceed with page- ' + atob(session));
          LogRocket.identify(atob(session));
          return true
        }else{
          console.log('User does not have a valid session.  Redirecting to Login Page ')
          return false;
        }
    }
    return false;
}
export const checkPassword = (password:string):boolean=>{
    return password!== undefined && password!== null && AFDSESSIONVALUES.find(a=> a=== btoa(password.toLowerCase())) !== undefined;
}

export const setSessionCookie = (password:string, cookies:Cookies|undefined)=>{
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000*60*60;
    now.setTime(expireTime);
    if(cookies){
        console.log('setting cookie'+ AFDSESSION, now)
        cookies.set(AFDSESSION, btoa(password.toLowerCase()), { path: '/', expires:now });    
    }
}

export const removeSessionCookie = (cookies:Cookies)=>{
    const now = new Date();
    const time = now.getTime();
    const expireTime = time - 1000*60*60;
    now.setTime(expireTime);
    console.log('removing cookie'+ AFDSESSION, now)
    cookies.set(AFDSESSION,"", { path: '/', expires:now });
}