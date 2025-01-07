import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DashboardHomeScreen = () => {
  const [selectedClass, setSelectedClass] = useState('반을 선택하세요');
  const [classCode, setClassCode] = useState('');
  const [classes, setClasses] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('http://172.30.1.1:8080/classrooms/list/1'); // teacherId 예시
      setClasses(response.data);
    } catch (error) {
      Alert.alert('오류', '반 목록을 불러오는 중 문제가 발생했습니다.');
    }
  };

  const handleSelectClass = (item) => {
    setSelectedClass(`${item.grade}학년 ${item.classNumber}반`);
    setClassCode(item.classCode);
    setDropdownVisible(false);
  };

  const handleNavigateToWordSet = () => {
    if (!classCode) {
      Alert.alert('반을 선택해주세요.');
      return;
    }
    navigation.navigate('WordSetConfigScreen', { classCode });
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedClass}</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>

        {dropdownVisible && (
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
        )}

        {classCode !== '' && (
            <View style={styles.classCodeContainer}>
              <Text style={styles.classCodeLabel}>클래스 코드</Text>
              <Text style={styles.classCodeText}>{classCode}</Text>
            </View>
        )}

        {/* 단어셋 설정 버튼 추가 */}
        <TouchableOpacity style={styles.wordSetButton} onPress={() => navigation.navigate('WordSetConfig')}
        >
          <Text style={styles.wordSetButtonText}>단어장 설정</Text>
        </TouchableOpacity>


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
  dropdownMenu: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    width: '100%',
    zIndex: 10,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  classCodeContainer: {
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  classCodeLabel: {
    fontSize: 16,
    color: '#3A4A5E',
    marginBottom: 8,
  },
  classCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
  wordSetButton: {
    marginTop: 24,
    backgroundColor: '#6a96f8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  wordSetButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default DashboardHomeScreen;
