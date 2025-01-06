import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ClassInfoScreen = ({ navigation }) => {
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('3');
  const [classNumber, setClassNumber] = useState('1');

  return (
      <View style={styles.container}>
        <Text style={styles.title}>우리 반 정보</Text>

        <Text style={styles.label}>학교</Text>
        <TextInput
            style={styles.input}
            placeholder="학교 이름"
            value={schoolName}
            onChangeText={setSchoolName}
        />

        <View style={styles.row}>
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
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>반</Text>
            <Picker
                selectedValue={classNumber}
                onValueChange={(itemValue) => setClassNumber(itemValue)}
                style={styles.picker}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('WordSetConfig')}
        >
          <Text style={styles.buttonText}>다음 단계</Text>
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
    marginBottom: 24,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    flex: 1,
    marginRight: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#C9E6F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
});

export default ClassInfoScreen;
