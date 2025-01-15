import axios from 'axios';
import {Alert} from "react-native";
import {CLASSROOM} from "./config";

export const postSubmitClassInfo = async (registerClassInfoRequest, navigation) => {
    try {
        await axios.post(CLASSROOM, registerClassInfoRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        Alert.alert('클래스 등록', '클래스가 등록되었습니다.', [
            {
                text: '확인',
                onPress: () => navigation.navigate('Dashboard')
            }
        ]);
    } catch (error) {
        console.error(error);

        if (error.status === 409) {
            Alert.alert('등록된 클래스', '이미 등록된 클래스입니다.\n클래스 목록에서 단어장을 수정해 주세요.', [
                {
                    text: '확인',
                    onPress: () =>
                        navigation.goBack()
                }
            ]);

            return;
        }

        Alert.alert('클래스 코드 생성 실패', '클래스 코드 생성에 실패했습니다.');
    }
}

export const getClassInfo = async (classCode, navigation) => {
    if (!classCode.trim()) {
        Alert.alert('클래스 코드 입력', '클래스 코드를 입력해 주세요.');
        return;
    }

    try {
        const response = await axios.get(`${CLASSROOM}/info`, {
            params: {classCode: classCode}
        });

        navigation.navigate('StudentLogin', {classInfo: response.data});
    } catch (error) {
        console.error(error);
        Alert.alert('클래스 정보 가져오기 실패', '클래스 정보를 불러오지 못했습니다.');
    }
}

export const getClassrooms = async () => {
    try {
        const response = await axios.get(CLASSROOM);
        return response.data;
    } catch (error) {
        console.error(error);
        Alert.alert('클래스 정보 가져오기 실패', '클래스 정보를 불러오지 못했습니다.');
    }
}

export const deleteClassroom = async (classroomId, navigation) => {
    Alert.alert('클래스를 삭제하시겠어요?', '지금까지의 모든 정보가 사라져요.\n삭제된 정보는 다시 복구할 수 없어요.', [
        {
            text: '삭제하기',
            onPress: async () => {
                try {
                    await axios.delete(`${CLASSROOM}/${classroomId}`);
                    Alert.alert('클래스 삭제', '클래스가 삭제되었습니다.', [
                        {
                            text: '확인',
                            onPress: () =>
                                navigation.replace('Dashboard'),
                        }
                    ]);
                } catch (error) {
                    console.error(error);
                    Alert.alert('클래스 삭제 실패', '클래스 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.', [
                        {
                            text: '확인',
                        }
                    ]);
                }
            }
        },
        {
            text: '취소',
        }
    ]);
}
