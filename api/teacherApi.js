import axios from 'axios';
import {TEACHER} from "./config";
import {Alert} from "react-native";

export const postTeacherSignUp = async (signUpForm, navigation) => {
    try {
        await axios.post(`${TEACHER}/signup`, signUpForm, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.', [
            {
                text: '확인',
                onPress: () =>
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'TeacherLogin'}],
                    }),
            }
        ]);
    } catch (error) {
        if (error.status === 409) {
            Alert.alert('가입된 회원', '이미 가입된 이메일 주소입니다.\n로그인 페이지로 이동합니다.', [
                {
                    text: '확인',
                    onPress: () =>
                        navigation.reset({
                            index: 1,
                            routes: [
                                {name: 'Main'},
                                {name: 'TeacherLogin', params: {email: signUpForm.email}},
                            ],
                        })
                }
            ]);

            return;
        }

        Alert.alert('회원가입 실패', '회원 가입에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
}

export const postTeacherSignIn = async (signInForm, navigation) => {
    try {
        const response = await axios.post(`${TEACHER}/login`, signInForm, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const teacherId = response.data.teacherId;
        console.log(teacherId);

        Alert.alert('로그인 성공', `로그인에 성공했습니다.`, [
            {
                text: '확인',
                onPress: () =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DashboardHome', params: { teacherId } }],
                    }),
            }
        ]);
    } catch (error) {
        if (error.response?.status === 404) {
            Alert.alert('존재하지 않는 회원', '존재하지 않는 이메일 주소입니다.', [
                {
                    text: '확인',
                }
            ]);
            return;
        }

        if (error.response?.status === 400) {
            Alert.alert('잘못된 비밀번호', '비밀번호가 일치하지 않습니다. 다시 시도해 주세요.', [
                {
                    text: '확인',
                }
            ]);
            return;
        }

        Alert.alert('로그인 실패', '로그인에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
}
