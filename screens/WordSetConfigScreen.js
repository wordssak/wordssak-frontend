import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import axios from 'axios';

const WordSetConfigScreen = () => {
  const [grade, setGrade] = useState('3');
  const [semester, setSemester] = useState('1');
  const [unit, setUnit] = useState('3');
  const [parsedData, setParsedData] = useState([]);

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (res.canceled) {
        Alert.alert('취소됨', '파일 선택이 취소되었습니다.');
        return;
      }

      const { uri } = res.assets[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setParsedData(jsonData);

        Alert.alert('성공', `${jsonData.length}개의 단어를 불러왔습니다.`);
      };

      reader.readAsArrayBuffer(await fetch(uri).then((res) => res.blob()));
    } catch (error) {
      console.error('파일 불러오기 실패:', error);
      Alert.alert('오류 발생', '파일을 불러오는 중 문제가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    const payload = {
      grade,
      semester,
      unit,
      words: parsedData.map((item) => ({
        word: item.word,
        meaning: item.meaning,
        example: item.example,
      })),
    };

    try {
      const response = await axios.post(
          'http://172.30.1.1:8080/api/wordbook/enroll',
          payload
      );
      Alert.alert('성공', '단어장이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('서버 요청 실패:', error);
      Alert.alert('오류 발생', '서버와 통신하는 중 문제가 발생했습니다.');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>학습 설정</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>학년</Text>
          <Picker
              selectedValue={grade}
              onValueChange={(itemValue) => setGrade(itemValue)}
              style={styles.picker}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>

        <Text style={styles.label}>학기</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
              style={[
                styles.radioButton,
                semester === '1' && styles.radioButtonSelected,
              ]}
              onPress={() => setSemester('1')}
          >
            <Text style={styles.radioText}>1 학기</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[
                styles.radioButton,
                semester === '2' && styles.radioButtonSelected,
              ]}
              onPress={() => setSemester('2')}
          >
            <Text style={styles.radioText}>2 학기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>단원</Text>
          <Picker
              selectedValue={unit}
              onValueChange={(itemValue) => setUnit(itemValue)}
              style={styles.picker}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.csvButton} onPress={handleFileUpload}>
          <Text style={styles.csvButtonText}>CSV 불러오기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>학습 시작</Text>
        </TouchableOpacity>

        <ScrollView style={styles.responseContainer}>
          {parsedData.map((item, index) => (
              <Text key={index} style={styles.responseText}>
                {index + 1}. {item.word} - {item.meaning} ({item.example})
              </Text>
          ))}
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#C9E6F0',
  },
  csvButton: {
    marginTop: 16,
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#7fb6f5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
  },
  responseText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
});

export default WordSetConfigScreen;
