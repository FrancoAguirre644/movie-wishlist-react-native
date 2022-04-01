import React from "react";
import { ImageBackground, StyleSheet } from "react-native"
import { Movie } from "../types";

interface PosterProps {
    movie: Movie;
}

const Poster: React.FC<PosterProps> = ({ movie }) => {
    return (
        <ImageBackground
            resizeMode="stretch"
            style={styles.poster}
            imageStyle={{
                marginBottom: 30,
            }}
            source={{
                uri: `${movie.thumbnail}`
            }}
        >
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    poster: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
});

export default Poster;