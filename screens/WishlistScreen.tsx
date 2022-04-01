import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { ApplicationState } from "../redux/store";
import { getMovies, addToWishList, removeFromWishlist } from '../redux/actions';
import { width } from "../constants/Layout";
import { MovieState } from "../types";
import { FontAwesome } from "@expo/vector-icons";


interface HomeScreenProps {
    movieReducer: MovieState;
    getMovies: Function;
    addToWishList: Function;
    removeFromWishlist: Function;
}

const _WishlistScreen: React.FC<HomeScreenProps> = ({ getMovies, addToWishList, removeFromWishlist, movieReducer }) => {

    const { wishlist } = movieReducer;

    if (wishlist.length === 0) return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: '600', color: '#1d1d1d', marginBottom: 20 }}>
                Watch Later
            </Text>
                <View style={styles.movieCard}>
                    <Text style={{ flex: 5, padding: 10, fontSize: 16, textAlign: 'center' }}>The wishlist is empty!</Text>
                </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: '600', color: '#1d1d1d', marginBottom: 20 }}>
                Watch Later
            </Text>
            <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={wishlist}
                renderItem={({ item }) => (
                    <View style={styles.movieCard}>
                        <Image resizeMode="stretch"
                            style={{ display: 'flex', flex: 5, height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                            source={{
                                uri: `${item.thumbnail}`
                            }}
                        />
                        <Text style={{ flex: 5, padding: 10, fontSize: 14 }}> {item.title} </Text>
                        <TouchableOpacity style={{ flex: 2, height: '100%', backgroundColor: '#D92F24', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                            <Text style={{ fontSize: 40, color: '#FFF' }}> <FontAwesome size={40} name='play' /></Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    },
    movieCard: {
        width: width - 20,
        height: 100,
        backgroundColor: '#FFF',
        margin: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

const mapStateToProps = (state: ApplicationState) => ({
    movieReducer: state.movieReducer
});

const WishlistScreen = connect(mapStateToProps, { getMovies, addToWishList, removeFromWishlist })(_WishlistScreen);

export default WishlistScreen;