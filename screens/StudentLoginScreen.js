import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackButton from '../components/BackButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {postStudentSignIn} from "../api/studentApi";

const StudentLoginScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const {grade, classNumber} = route.params?.classInfo || {};
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const currentYear = new Date().getFullYear();
    const MIN_YEAR = currentYear - 14;
    const MAX_YEAR = currentYear - 7;

    const isValidDate = (year, month, day) => {
        if (month < 1 || month > 12) return false;
        const daysInMonth = new Date(year, month, 0).getDate();
        return day > 0 && day <= daysInMonth;
    };

    const validate = () => {
        if (!/^[가-힣a-zA-Z]{2,20}$/.test(name)) {
            setErrorMessage('*올바른 정보를 입력해 주세요.');
            return false;
        }

        if (!/^\d{6}$/.test(birthDate)) {
            setErrorMessage('*올바른 정보를 입력해 주세요.');
            return false;
        } else {
            const year = parseInt(birthDate.slice(0, 2), 10) + 2000;
            const month = parseInt(birthDate.slice(2, 4), 10);
            const day = parseInt(birthDate.slice(4, 6), 10);

            if (year < MIN_YEAR || year > MAX_YEAR || !isValidDate(year, month, day)) {
                setErrorMessage('*올바른 정보를 입력해 주세요.');
                return false;
            }
        }

        setErrorMessage('');
        return true;
    };

    const handleLogin = async () => {
        if (!validate()) {
            return;
        }

        const payload = {
            name,
            birth: birthDate,
        };

        await postStudentSignIn(payload, navigation);
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
                    placeholder="이름 예) 김천재"
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
