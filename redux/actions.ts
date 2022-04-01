import axios from "axios";
import { Dispatch } from "react";
import { Movie } from "../types";
import { BASE_URL } from "../utils";

export interface GetMoviesAction {
    readonly type: 'GET_MOVIES',
    payload: Movie[]
}

export interface AddToWishList {
    readonly type: 'ADD_TO_WISHLIST',
    payload: Movie
}

export interface RemoveFromWishlist {
    readonly type: 'REMOVE_FROM_WISHLIST',
    payload: Movie
}

export interface ErrorAction {
    readonly type: 'ON_ERROR',
    payload: any
}

export type MovieAction = GetMoviesAction | AddToWishList | RemoveFromWishlist;

export const getMovies = () => {

    return async (dispatch: Dispatch<GetMoviesAction | ErrorAction>) => {

        try {

            const response = await axios.get<Movie[]>(`${BASE_URL}/watch/movie`);

            dispatch({
                type: 'GET_MOVIES',
                payload: response.data
            });

        } catch (err) {
            dispatch({ type: 'ON_ERROR', payload: 'Unable to fetch movies.' });
        }

    }

}

export const addToWishList = (movie: Movie) => (dispatch: Dispatch<AddToWishList>) => {

    dispatch({
        type: 'ADD_TO_WISHLIST',
        payload: movie
    });

}


export const removeFromWishlist = (movie: Movie) => (dispatch: Dispatch<RemoveFromWishlist>) => {

    dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: movie
    });

}