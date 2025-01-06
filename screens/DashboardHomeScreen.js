import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DashboardHomeScreen = () => {
  const [semester, setSemester] = useState('1');
  const [unit, setUnit] = useState('1');
  const [classCode, setClassCode] = useState('');
  const [wordCount, setWordCount] = useState(7);
  const [reward, setReward] = useState('');

  return (
      <View style={styles.container}>
        <Text style={styles.title}>3학년 4반</Text>

        <Text style={styles.label}>클래스 코드</Text>
        <TextInput
            style={styles.input}
            placeholder="classcode2024"
            value={classCode}
            onChangeText={setClassCode}
        />

        <Text style={styles.label}>단어 관리</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
              style={[
                styles.radioButton,
                semester === '1' && styles.radioButtonSelected,
              ]}
              onPress={() => setSemester('1')}
          >
            <Text style={styles.radioText}>1학기</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[
                styles.radioButton,
                semester === '2' && styles.radioButtonSelected,
              ]}
              onPress={() => setSemester('2')}
          >
            <Text style={styles.radioText}>2학기</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>단원</Text>
        <View style={styles.pickerRow}>
          <Picker
              selectedValue={unit}
              onValueChange={(itemValue) => setUnit(itemValue)}
              style={styles.picker}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>분리된 단어 개수</Text>
        <Text style={styles.wordCount}>{wordCount} 개</Text>

        <Text style={styles.label}>리워드 설정 (선택)</Text>
        <TextInput
            style={styles.input}
            placeholder="예: 학급 나무에 칭찬 도장 5개!"
            value={reward}
            onChangeText={setReward}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>학습 시작</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
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
    padding: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#C9E6F0',
  },
  radioText: {
    fontSize: 16,
    color: '#3A4A5E',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  addButton: {
    backgroundColor: '#C9E6F0',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#3A4A5E',
  },
  wordCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#C9E6F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
});

export default DashboardHomeScreen;
