import * as ActionTypes from './ActionTypes';

export const Partners = (state = {
        isLoading: true,
        errMess: null,
        partners: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return{...state, isLoading: false, errMess: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return{...state,isloading: true, errMess: null, partners: []};

        case ActionTypes.PARTNERS_FAILD:
                return{...state,isloading: false, errMess: actopm.payload};

        default:
            return state;
    }
};

