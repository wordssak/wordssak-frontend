import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.goBack()}
        >
            <Image
                source={require('../assets/Vector.png')}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});

export default BackButton;
