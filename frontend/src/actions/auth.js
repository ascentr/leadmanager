import axios from 'axios';
import  { returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, 
        LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, 
        REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//LOAD User
export const loadUser = () => (dispatch , getState) => {
    //User Loading
    dispatch({ type : USER_LOADING });

    axios.get('/api/auth/user', configToken(getState))
        .then(res =>{
            dispatch ({
                type:USER_LOADED,
                payload: res.data
            });
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//Login USer
export const login = (username, password) => dispatch => {
    //headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    //Request Body, i.e stringyfy username and password
    const body= JSON.stringify({username, password}); 

    axios.post('/api/auth/login', body, config )
        .then(res =>{
            dispatch ({
                type:LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })
};

//Register User
export const register = ({username, password, email }) => dispatch => {
    //headers
    const config = {

        headers : {
            'Content-Type': 'application/json'
        }
    }

    //Request Body, i.e stringyfy username and password
    const body= JSON.stringify({username, password , email }); 

    axios.post('/api/auth/register', body, config )
        .then(res =>{
            dispatch ({
                type:REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        })
};

//LOGOUT User
export const logout = () => (dispatch , getState) => {
    axios.post('/api/auth/logout', null, configToken(getState))
        .then( res =>{
            dispatch ({
                type:LOGOUT_SUCCESS,
                payload: res.data
            });
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}


//setup config with token helper function

export const configToken = getState => {
    //get token from state i.e in localStorage
    const token = getState().auth.token;
    //headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    // if token, add to headers to config
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}