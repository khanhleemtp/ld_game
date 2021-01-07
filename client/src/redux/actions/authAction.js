import ApiService from '../../services/api.service';
import { TokenService } from '../../services/storage.service';
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS, 
} from '../actions/types';

import { returnErrors, clearErrors } from './errorActions';

export const register = ({ username, password, name }) => async (dispatch) => {
    try {
        const { data } = await ApiService.post('/api/auth/signup', { username: username, password: password, name: name });        
        console.log('data' , data);
        TokenService.saveToken(data.token);
        TokenService.saveToken(username,"ldname")
        dispatch({ type: REGISTER_SUCCESS, payload: data.token });
        dispatch(clearErrors());
    } catch (error) {
        error.response && error.error.data 
        &&
        dispatch(returnErrors(error.response.data, error.response.status, REGISTER_FAIL));
    }
}

export const signIn = ({ username, password }) => async (dispatch) => {
    try {
        const { data } = await ApiService.post('/api/auth/signin', { username, password });
        console.log(data.token);
        TokenService.saveToken(data.token);
        TokenService.saveToken(username,"ldname")
        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
        dispatch(clearErrors());
    } catch (error) {
        console.log(error.response)
        error && error.response.data &&
        dispatch(returnErrors(error.response.data, error.response.status, LOGIN_FAIL));
    }


}



export const logout = () => {
    TokenService.removeToken();
    TokenService.removeToken('ldname');
    ApiService.removeHeader();
    ApiService.unmount401Interceptor();
    return {
        type: LOGOUT_SUCCESS
    }
}