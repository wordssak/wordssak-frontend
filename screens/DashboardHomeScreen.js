import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

const DashboardHomeScreen = () => {
  const [selectedClass, setSelectedClass] = useState('반을 선택하세요');
  const [classCode, setClassCode] = useState('');
  const [classes, setClasses] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [grade, setGrade] = useState('3');
  const [semester, setSemester] = useState('1');
  const [unit, setUnit] = useState('3');
  const [parsedData, setParsedData] = useState([]);
  const [reward, setReward] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('http://172.30.1.1:8080/classrooms/list/1');
      setClasses(response.data);
    } catch (error) {
      Alert.alert('오류', '반 목록을 불러오는 중 문제가 발생했습니다.');
    }
  };

  const fetchActiveStatus = async (classCode) => {
    try {
      const response = await axios.get(`http://172.30.1.1:8080/class-wordbooks/status/${classCode}`);
      setIsActive(response.data.activeStatus);
    } catch (error) {
      Alert.alert('오류', '등록 단어장 상태를 가져오는 중 문제가 발생했습니다.');
    }
  };

  const handleSelectClass = (item) => {
    setSelectedClass(`${item.grade}학년 ${item.classNumber}반`);
    setClassCode(item.classCode);
    setDropdownVisible(false);
    fetchActiveStatus(item.classCode);
  };

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });

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
      Alert.alert('오류 발생', '파일을 불러오는 중 문제가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!classCode) {
      Alert.alert('알림', '반을 먼저 선택해주세요!');
      return;
    }

    const payload = {
      grade,
      semester,
      unit,
      classCode,
      reward,
      words: parsedData.map((item) => ({
        word: item.word,
        meaning: item.meaning,
        example: item.example,
      })),
    };

    try {
      await axios.post('http://172.30.1.1:8080/api/wordbook/enroll', payload);
      Alert.alert('성공', '단어장이 성공적으로 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            fetchClassrooms();
            fetchActiveStatus(classCode);
            setParsedData([]);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('오류 발생', '서버와 통신하는 중 문제가 발생했습니다.');
    }
  };

  const handleButtonPress = async () => {
    if (isActive) {
      try {
        const response = await axios.post(`http://172.30.1.1:8080/class-wordbooks/toggle/${classCode}`);
        setIsActive(response.data.activeStatus);
        Alert.alert('학습 종료', '학습이 종료되었습니다.');
      } catch (error) {
        Alert.alert('오류 발생', '학습 종료 중 문제가 발생했습니다.');
      }
    } else {
      handleSubmit();
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.dropdownText}>{selectedClass}</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>

          {dropdownVisible && (
              <View style={styles.dropdownMenuWrapper}>
                <ScrollView style={styles.dropdownMenu}>
                  {classes.map((item) => (
                      <TouchableOpacity
                          key={item.id}
                          style={styles.dropdownItem}
                          onPress={() => handleSelectClass(item)}
                      >
                        <Text>{item.grade}학년 {item.classNumber}반</Text>
                      </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
          )}

          {classCode && (
              <View>
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>학년</Text>
                  <Picker
                      selectedValue={grade}
                      onValueChange={(itemValue) => setGrade(itemValue)}
                      style={[styles.picker, isActive && { backgroundColor: '#E0E0E0' }]}
                      enabled={!isActive}
                  >
                    {[...Array(6).keys()].map((_, i) => (
                        <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.label}>학기</Text>
                <View style={styles.radioGroup}>
                  {['1', '2'].map((sem) => (
                      <TouchableOpacity
                          key={sem}
                          style={[
                            styles.radioButton,
                            semester === sem && styles.radioButtonSelected,
                            isActive && { backgroundColor: '#E0E0E0' },
                          ]}
                          onPress={() => !isActive && setSemester(sem)}
                          disabled={isActive}
                      >
                        <Text style={styles.radioText}>{sem} 학기</Text>
                      </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>단원</Text>
                  <Picker
                      selectedValue={unit}
                      onValueChange={(itemValue) => setUnit(itemValue)}
                      style={[styles.picker, isActive && { backgroundColor: '#E0E0E0' }]}
                      enabled={!isActive}
                  >
                    {[...Array(10).keys()].map((_, i) => (
                        <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                    ))}
                  </Picker>
                </View>

                <TouchableOpacity
                    style={[styles.csvButton, isActive && { backgroundColor: '#E0E0E0' }]}
                    onPress={handleFileUpload}
                    disabled={isActive}
                >
                  <Text style={[styles.csvButtonText, isActive && { color: '#9E9E9E' }]}>CSV 불러오기</Text>
                </TouchableOpacity>

                <Text style={styles.label}>리워드 설정 (선택)</Text>
                <TextInput
                    style={[styles.input, isActive && { backgroundColor: '#E0E0E0' }]}
                    placeholder="예: 학급 나무에 칭찬 도장 5개!"
                    value={reward}
                    onChangeText={setReward}
                    editable={!isActive}
                />

                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                  <Text style={styles.buttonText}>{isActive ? '학습 종료' : '학습 시작'}</Text>
                </TouchableOpacity>
              </View>
          )}
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownMenuWrapper: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  dropdownMenu: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    marginBottom: 16,
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
});

export default DashboardHomeScreen;