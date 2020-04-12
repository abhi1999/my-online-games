import { BaseAction, NumberGeneratorActions } from './../common';

export type NumberCollectionState = number[];


export const numberCollectionReducer = (state: NumberCollectionState = [0],action: BaseAction) => {
    switch (action.type) {
        case NumberGeneratorActions.GET_NUMBER_REQUEST_COMPLETED:
            return [...state, action.payload];
    }
    return state;
};