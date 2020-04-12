import {  success, error, warning, info, removeAll } from 'react-notification-system-redux';
import {  
    ErrorNotificationOptions,SuccessNotificationOptions,WarningNotificationOptions,InfoNotificationOptions
} from './../constants/notifications';
import {INotifyOptions} from "./../common";

export const NotifyError = (notificationOptions:INotifyOptions) => (dispatch:any)=>{
    dispatch(error({...ErrorNotificationOptions, ...notificationOptions}));
}

export const NotifyWarning = (notificationOptions:INotifyOptions) => (dispatch:any)=>{
    dispatch(warning({...WarningNotificationOptions, ...notificationOptions}));
}

export const NotifyInfo = (notificationOptions:INotifyOptions) => (dispatch:any)=>{
    dispatch(info({...InfoNotificationOptions, ...notificationOptions}));
}

export const NotifySuccess = (notificationOptions:INotifyOptions) => (dispatch:any)=>{
    console.log({...SuccessNotificationOptions, ...notificationOptions})
    dispatch(success({...SuccessNotificationOptions, ...notificationOptions}));
}

export const NotifyClearAll = () => (dispatch:any)=>{
    dispatch(removeAll());
}
