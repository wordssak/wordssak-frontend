import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require('../assets/main-cloud.png')} style={styles.image}/>

            <Text style={styles.title}>단어쓱싹!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('StudentCodeInput')}
            >
                <Text style={styles.buttonText}>학생입니다</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TeacherLogin')}
            >
                <Text style={styles.buttonText}>교사입니다</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    image: {
        width: 300,
        height: 225,
        resizeMode: 'contain',
        marginBottom: 25,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3A4A5E',
        marginBottom: 35,
    },
    button: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#C9E6F0',
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
});

export default MainScreen;
