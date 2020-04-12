export const NumberGeneratorActions ={
    GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
    GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.'
}

export const JobsiteGeneratorActions ={
    GET_LOOKUP_SITES_START:'[0] Request all jobsites async service',
    GET_LOOKUP_SITES_COMPLETED:'[1] sites async service returned data',
    CREATE_JOB_SITES_START:'[0] Request to create jobsiteasync service',
    CREATE_JOB_SITES_COMPLETED:'[1] create jobsiteasync service returned data',
    UPDATE_JOB_SITE_COMPLETED:"[1] UPDATE_JOB_SITE_COMPLETED",
    UPDATE_JOB_SITE_START:"[0] UPDATE_JOB_SITE_START"
}

export const LookupGeneratorActions ={
    GET_ALL_LOOKUP_START:'[-1] All Lookup data requested',
}


export interface BaseAction {
    type : string;
    payload?:any;
}

export interface INotifyOptions{
    title?:string,
    message:string,
    uuid?:number,
    autoDismiss?:number,
    position?:"tr"|"tl"|"tc"|"br"|"bl"|"bc",
    dismissible?:boolean,
    action?:any,
    level?:"success"|"error"|"warning"|"info"
}