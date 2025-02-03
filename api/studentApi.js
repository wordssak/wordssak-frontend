import axios from "axios";
import { STUDENT } from "./config";
import { Alert } from "react-native";

export const postStudentSignIn = async (signInForm, navigation) => {
    try {
        const response = await axios.post(STUDENT, signInForm, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { studentId } = response.data;
        const { name } = signInForm;

        Alert.alert('로그인 성공', `${name}님 로그인되었습니다.`, [
            {
                text: '확인',
                onPress: () =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'WordList', params: { studentId } }],
                    }),
            }
        ]);
    } catch (error) {
        Alert.alert('로그인 실패', '로그인에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
};