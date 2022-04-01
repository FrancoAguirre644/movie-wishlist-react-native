import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { width } from "../constants/Layout"
import { Movie } from "../types"

interface MovieCardProps {
    item: Movie;
    didTapCurrentMovie: Function;
    removeFromWishlist: Function;
    addToWishList: Function;
    isExist: Function;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, didTapCurrentMovie, addToWishList, removeFromWishlist, isExist }) => {
    return (
        <View style={styles.movieCard}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between' }}
                onPress={() => didTapCurrentMovie(item)}>
                <Image resizeMode="stretch" source={{ uri: `${item.thumbnail}` }}
                    style={{
                        display: 'flex',
                        width: width / 2.5 - 10,
                        height: '100%',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', padding: 20 }}>{item.title}</Text>
            <TouchableOpacity style={{
                backgroundColor: isExist(item) ? '#D92F24' : '#208103',
                width: '100%',
                height: 44,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() => isExist(item) ? removeFromWishlist(item) : addToWishList(item)}
            >
                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}> {isExist(item) ? 'Remove from Wishlist' : 'Add to Wishlist'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    movieCard: {
        display: 'flex',
        flexDirection: 'column',
        width: width / 2.5 - 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10
    }
});

export default MovieCard;