import { BaseAction, NumberGeneratorActions } from '../common';


// Action Creators 
export const numberRequestStartAction = (): BaseAction => ({
    type: NumberGeneratorActions.GET_NUMBER_REQUEST_START,
    payload: null,
});
  
export const numberRequestCompletedAction = (numberGenerated: number): BaseAction => ({
    type: NumberGeneratorActions.GET_NUMBER_REQUEST_COMPLETED,
    payload: numberGenerated,
});