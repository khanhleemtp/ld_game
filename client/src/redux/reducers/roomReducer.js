import { GET_ROOMS} from '../actions/types';

const initalState = {
   rooms: [],
}

export default function(state = initalState, action) {
    switch(action.type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        default: 
            return state;
    }
}