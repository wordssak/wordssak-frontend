import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackButton from '../components/BackButton';
import {postTeacherSignUp} from "../api/teacherApi";
import {useNavigation} from "@react-navigation/native";

const TeacherSignUpScreen = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [passwordError, setPasswordError] = useState('');

        const navigation = useNavigation();

        const handleSignUp = async () => {
            if (!validate()) {
                return;
            }

            const signUpForm = {
                name,
                email: `${email}@korea.kr`,
                password,
            };

            await postTeacherSignUp(signUpForm, navigation);
        };

        const validate = () => {
            if (!name) {
                Alert.alert('입력 오류', '이름을 입력해 주세요.');
                return false;
            }
            if (!email) {
                Alert.alert('입력 오류', '이메일 주소를 입력해 주세요.');
                return false;
            }
            if (!password) {
                Alert.alert('입력 오류', '비밀번호를 입력해 주세요.');
                return false;
            }
            if (passwordError && passwordError !== '적합한 비밀번호') {
                Alert.alert('입력 오류', '비밀번호가 적합하지 않습니다.');
                return false;
            }

            return true;
        }

        const handlePasswordChange = (text) => {
            setPassword(text);

            if (text === '') {
                setPasswordError('');
                return;
            }

            const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(text);
            const hasAlphabet = /[a-zA-Z]/.test(text);
            const hasNumber = /\d/.test(text);
            const isValidLength = text.length >= 8 && text.length <= 20;

            if (!hasSpecialCharacter) {
                setPasswordError('특수문자를 포함해야 합니다.');
                return;
            }
            if (!hasAlphabet) {
                setPasswordError('영문자를 포함해야 합니다.');
                return;
            }
            if (!hasNumber) {
                setPasswordError('숫자를 포함해야 합니다.');
                return;
            }
            if (!isValidLength) {
                setPasswordError('비밀번호는 8자 이상 20자 이하여야 합니다.');
                return;
            }

            setPasswordError('적합한 비밀번호');
        };

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>회원 가입</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>이름</Text>
                        <TextInput
                            placeholder="이름을 입력해 주세요."
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>이메일 주소</Text>
                        <View style={styles.emailRow}>
                            <TextInput
                                placeholder="이메일"
                                style={[styles.input, styles.emailInput]}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Text style={styles.emailDomain}>@ korea.kr</Text>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>비밀번호</Text>
                        <TextInput
                            placeholder="비밀번호를 입력해 주세요."
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={handlePasswordChange}
                        />
                        {passwordError
                            ? (
                                passwordError === '적합한 비밀번호'
                                    ?
                                    <Text style={styles.rightText}>
                                        적합한 비밀번호입니다.
                                    </Text>
                                    : (
                                        <Text style={styles.errorText}>{passwordError}</Text>
                                    )
                            )
                            : (
                                <Text style={styles.hint}>
                                    *영문, 숫자, 특수문자 포함 8자 이상, 20자 이하로 입력
                                </Text>)}
                    </View>
                </View>

                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>가입하기</Text>
                </TouchableOpacity>
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginTop: -20,
        marginBottom: 20,
        marginLeft: -20,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3A4A5E',
        marginVertical: 20,
        textAlign: 'center',
        marginTop: 70,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#3A4A5E',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailInput: {
        flex: 1,
    },
    emailDomain: {
        marginLeft: 10,
        fontSize: 16,
        color: '#3A4A5E',
    },
    hint: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    rightText: {
        color: 'green',
        fontSize: 12,
        marginTop: 5,
    },
    signUpButton: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#C9E6F0',
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
});

export default TeacherSignUpScreen;
