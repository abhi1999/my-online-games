import {INotifyOptions} from "./../common";

export const ErrorNotificationOptions:INotifyOptions = {
    autoDismiss: 10,
    message: '',
    position: 'br',
    title: 'Notifications.Error'
};

export const InfoNotificationOptions:INotifyOptions = {
    autoDismiss: 5,
    message: '',
    position: 'tc',
    title: 'Notifications.Info'
};

export const WarningNotificationOptions:INotifyOptions = {
    autoDismiss: 10,
    message: '',
    position: 'br',
    title: 'Notifications.Warning'
};
export const SuccessNotificationOptions:INotifyOptions = {
    autoDismiss: 10,
    message: '',
    position: 'tr',
    title: 'Notifications.Success',
    level:"success"
};