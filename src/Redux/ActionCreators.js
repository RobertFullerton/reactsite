import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchPartners = () => dispatch => {
    dispatch(partnerLoading());
    return fetch(baseUrl + 'partners')
    .then(response => {
        if (response.ok){
            return response;
        }else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }    
    },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
    .then(response => response.json())
    .then(partners => dispatch(addPartners(partners)))
    .catch(error => dispatch(partnersfailed(error.message)))

};
export const partnerLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnerFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const postFeedback = feedback => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok){
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {throw error; })
    .then(response => response.json())
    .then(response => {
        console.log('Feedback:', response);
        alert('Thank you for your feedback! \n' + JSON.stringify(response))
    })
    .catch(errors => {
        console.log('Feedback:', error.message);
        alert('Your feedback could not be posted \n Error:' + error.message)
    })
}
