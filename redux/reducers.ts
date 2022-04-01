import { MovieState } from "../types";
import { MovieAction } from "./actions";

const initialState: MovieState = {
    movies: [],
    wishlist: []
}

export default function (state = initialState, action: MovieAction) {
    switch (action.type) {
        case 'GET_MOVIES':
            return {
                ...state,
                movies: action.payload
            }
        case 'ADD_TO_WISHLIST': 
            return {
                ...state,
                wishlist:[...state.wishlist, action.payload]
            }
        case 'REMOVE_FROM_WISHLIST': 
            return {
                ...state,
                wishlist: state.wishlist.filter((movie) => movie._id !== action.payload._id)
            }

        default:
            return state;
    }
}
