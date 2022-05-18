import axios from 'axios';
import  { createMessage , returnErrors } from './messages';
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types';
import { configToken } from './auth';

//GET LEADS from API

export const getLeads = () => (dispatch, getState) => {
    axios.get('/api/leads/' , configToken(getState))
    .then(res => {
        dispatch ({
            type : GET_LEADS,
            payload : res.data
        });
    })
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELTE LEAD
export const deleteLead = id => (dispatch , getState)  =>{
    axios.delete(`/api/leads/${id}/`, configToken(getState))
    .then(res => {
        dispatch(createMessage({ leadDeleted : 'Lead Deleted'}))
        dispatch({
            type : DELETE_LEAD,
            payload : id
        });
    }).catch(err => console.log(err));
}

// ADD LEAD
export const addLead = lead => (dispatch, getState ) => {
    axios
    .post(`/api/leads/`, lead, configToken(getState))
    .then(res => {
        dispatch(createMessage({ leadDeleted : 'Lead Added'}))
        dispatch({
            type : ADD_LEAD,
            payload : res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}