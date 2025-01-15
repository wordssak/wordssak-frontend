import axios from "axios";
import {Alert} from "react-native";
import {CLASS_WORD_BOOK} from "./config";

export const postRegisterWordBook = async (registerClassWordBookRequest, navigation) => {
    try {
        await axios.post(CLASS_WORD_BOOK, registerClassWordBookRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        Alert.alert('단어장 등록', '단어장이 등록되었습니다.', [
            {
                text: '확인',
                onPress: () =>
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'DashboardProgress'}],
                    }),
            }
        ]);
    } catch (error) {
        Alert.alert('단어장 등록 실패', '단어장 등록에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
}
