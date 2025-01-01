import axios from 'axios';
import {Alert} from "react-native";
import {CLASSROOM} from "./config";

export const submitClassInfo = async (registerClassInfoRequest) => {
    try {
        await axios.post(CLASSROOM, registerClassInfoRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // TODO: 단어 불러오기 페이지로 이동
    } catch (error) {
        console.error(error);
        Alert.alert('클래스 코드 생성 실패', '클래스 코드 생성에 실패했습니다.');
    }
}
