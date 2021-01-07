import ApiService from '../../services/api.service';
import { TokenService } from '../../services/storage.service';
import {
    GET_ROOMS
} from '../actions/types';

import { returnErrors, clearErrors } from './errorActions';

export const getRooms = () => async (dispatch) => {
    try {
        ApiService.setHeader();
        const { data } = await ApiService.get('/api/room/get');       
        dispatch({ type: GET_ROOMS, payload: data });
        dispatch(clearErrors());
    } catch (error) {
        error && error.response.data &&
        dispatch(returnErrors(error.response.data, error.response.status, 'GET_ROOM_FAIL'));
    }
}