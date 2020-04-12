import { BaseAction, JobsiteGeneratorActions } from './../common';

export type LookupCollectionState={
    jobsites:any[],
    employees:any[]
}
const defaultValues={
    jobsites:[],
    employees:[]
}
export const lookupCollectionReducer = (state: LookupCollectionState = defaultValues,action: BaseAction) => {
    switch (action.type) {
        case JobsiteGeneratorActions.GET_LOOKUP_SITES_COMPLETED:
            return {...state, jobsites:action.payload.data};
    }
    return state;
};