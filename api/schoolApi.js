import axios from 'axios';
import {Alert} from "react-native";
import {SCHOOL} from "./config";

export const searchSchools = async (keyword) => {
    if (!keyword.trim()) {
        Alert.alert('검색어 입력', '학교 이름을 입력해주세요.');
        return;
    }

    try {
        const response = await axios.get(SCHOOL, {
            params: {keyword}
        });

        return response.data;
    } catch (error) {
        console.error(error);
        Alert.alert('검색 실패', '학교 목록을 불러오지 못했습니다.');
    }
}
