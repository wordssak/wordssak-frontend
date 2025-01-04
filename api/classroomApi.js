import axios from 'axios';
import {Alert} from "react-native";
import {CLASSROOM} from "./config";

export const postSubmitClassInfo = async (registerClassInfoRequest) => {
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

export const getClassInfo = async (classCode, navigation) => {
    if (!classCode.trim()) {
        Alert.alert('클래스 코드 입력', '클래스 코드를 입력해 주세요.');
        return;
    }

    try {
        const response = await axios.get(CLASSROOM, {
            params: {classCode: classCode}
        });

        navigation.navigate('StudentLogin', {classInfo: response.data});
    } catch (error) {
        console.error(error);
        Alert.alert('클래스 정보 가져오기 실패', '클래스 정보를 불러오지 못했습니다.');
    }
}
