import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackButton from "../components/BackButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import {postTeacherSignIn} from "../api/teacherApi";

const TeacherLoginScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [email, setEmail] = useState(route.params?.email || '');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        const signInForm = {
            email,
            password,
        };

        await postTeacherSignIn(signInForm, navigation);
    };

    return (
        <View style={styles.container}>
            <BackButton/>

            <Image source={require('../assets/main-cloud.png')} style={styles.image}/>

            <TextInput
                placeholder="이메일 주소를 입력해 주세요."
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="비밀번호를 입력해 주세요."
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSignIn}
            >
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('TeacherSignUp')}>
                <Text style={styles.registerText}>회원 가입</Text>
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
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 15,
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 20,
    },
    loginButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#C9E6F0',
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 12,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
    registerText: {
        fontSize: 14,
        color: '#3A4A5E',
        marginTop: 10,
        textDecorationLine: 'underline'
    }
});

export default TeacherLoginScreen;
