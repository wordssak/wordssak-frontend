import axios from 'axios';
import {TEACHER} from "./config";
import {Alert} from "react-native";

export const postTeacherSignUp = async (signUpForm, navigation) => {
        try {
            const response = await axios.post(TEACHER, signUpForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');
            // TODO: 클래스 관리 페이지로 이동

            return response;
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
;