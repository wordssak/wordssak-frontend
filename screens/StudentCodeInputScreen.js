import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackButton from "../components/BackButton";

const StudentCodeInputScreen = () => {
    const navigation = useNavigation();
    const [classCode, setClassCode] = useState('');

    const handleConfirm = () => {
    };

    return (
        <View style={styles.container}>
            <BackButton/>

            <Image source={require('../assets/main-cloud.png')} style={styles.image}/>

            <Text style={styles.instructionText}>
                선생님에게 받은{'\n'}
                클래스 코드를 입력해 주세요.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="클래스 코드 입력"
                value={classCode}
                onChangeText={setClassCode}
            />

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>확인</Text>
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
    },
    instructionText: {
        fontSize: 24,
        fontWeight: '400',
        color: '#2C424C',
        textAlign: 'center',
        fontFamily: 'Pretendard',
        lineHeight: 32, // 적절한 line-height 추가
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 15,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    confirmButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#C9E6F0',
        borderRadius: 15,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
});

export default StudentCodeInputScreen;
