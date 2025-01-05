import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackButton from '../components/BackButton';
import {useRoute} from '@react-navigation/native';

const StudentLoginScreen = () => {
    const route = useRoute();

    const {grade, classNumber} = route.params?.classInfo || {};
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
    };

    return (
        <View style={styles.container}>
            <BackButton/>

            <View style={styles.titleContainer}>
                <Image source={require('../assets/flower.png')} style={styles.flowerIcon}/>
                <Text style={styles.classInfo}>
                    {grade}학년 {classNumber}반
                </Text>
                <Image source={require('../assets/flower.png')} style={styles.flowerIcon}/>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="이름 예) 김한재"
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setErrorMessage('');
                    }}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="생년월일 예) 140124"
                    style={styles.input}
                    value={birthDate}
                    onChangeText={(text) => {
                        setBirthDate(text);
                        setErrorMessage('');
                    }}
                    keyboardType="numeric"
                />
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
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
        padding: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    flowerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    classInfo: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Pretendard',
        color: '#2C424C',
        fontStyle: 'normal',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 12,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 15,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 15,
    },
    errorText: {
        color: '#FF4F4F',
        fontSize: 14,
        marginBottom: 20,
        fontWeight: 400,
        textAlign: 'center',
        alignSelf: 'flex-start',
    },
    loginButton: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#C9E6F0',
        borderRadius: 20,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
});

export default StudentLoginScreen;
