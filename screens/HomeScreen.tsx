import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { ApplicationState } from "../redux/store";
import { getMovies, addToWishList, removeFromWishlist } from '../redux/actions';
import { width } from "../constants/Layout";
import { Movie, MovieState } from "../types";
import Poster from "../components/Poster";
import MovieCard from "../components/MovieCard";
import { FontAwesome } from "@expo/vector-icons";


interface HomeScreenProps {
    movieReducer: MovieState;
    getMovies: Function;
    addToWishList: Function;
    removeFromWishlist: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({ getMovies, addToWishList, removeFromWishlist, movieReducer }) => {

    const { movies, wishlist } = movieReducer;

    const [currentMovie, setCurrentMovie] = useState<Movie>();

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            setCurrentMovie(movies[0]);
        }
    }, [movies]);

    const didTapCurrentMovie = (movie: Movie) => { setCurrentMovie(movie) }

    const isExist = (movie: Movie) => {

        if (wishlist.filter(item => item._id === movie._id).length > 0) return true;

        return false;
    }

    return (
        <View style={styles.container}>
            {/* Poster and info */}
            <View style={styles.posterView}>
                {/* Movie poster and button */}
                <View style={{ display: 'flex', flex: 10 }}>
                    {currentMovie && <Poster movie={currentMovie} />}
                </View>
                {/* Movie plot and button*/}
                {
                    currentMovie && (
                        <View style={{ display: 'flex', flex: 3, alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: -30,
                                backgroundColor: '#D92F24',
                                width: 200,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 10,
                                borderBottomLeftRadius: 25,
                                borderTopLeftRadius: 25,
                            }}>
                                <Text style={{ fontSize: 22, fontWeight: '400', color: '#FFF' }}>
                                    Watch Now <FontAwesome size={20} name='play'/>
                                </Text>
                            </TouchableOpacity>

                            {/* Movie plot info */}
                            <View style={{ display: 'flex', flexDirection: 'column', padding: 15 }}>
                                <Text style={{ textAlign: 'left', color: '#1d1d1d', fontSize: 20, fontWeight: '600', marginTop: 10, marginBottom: 10 }}>{currentMovie.title}</Text>
                                <Text style={{ color: '#1d1d1d', fontSize: 13 }}>{currentMovie.plot}</Text>
                            </View>
                        </View>
                    )
                }
            </View>

            {/* Slider with movie card */}
            <View style={styles.listView}>
                <Text style={{ textAlign: 'left', color: '#1d1d1d', fontSize: 20, fontWeight: '600', margin: 10 }}>
                    Top Movies
                </Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={movies}
                    renderItem={({ item }) => (
                        <MovieCard
                            item={item}
                            didTapCurrentMovie={didTapCurrentMovie}
                            addToWishList={addToWishList}
                            removeFromWishlist={removeFromWishlist}
                            isExist={isExist}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#E5E5E5',
        paddingTop: 50,
    },
    posterView: {
        display: 'flex',
        width: width,
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    listView: {
        width: width,
        flex: 5,
        padding: 10,
        marginTop: 20,
    },
    poster: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    }
});

const mapStateToProps = (state: ApplicationState) => ({
    movieReducer: state.movieReducer
});

const HomeScreen = connect(mapStateToProps, { getMovies, addToWishList, removeFromWishlist })(_HomeScreen);

export default HomeScreen;