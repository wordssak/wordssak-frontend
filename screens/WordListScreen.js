import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const WordListScreen = ({ route }) => {
  const navigation = useNavigation();
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get(`http://172.30.1.1:8080/api/progress/words/1`);
      setWords(response.data);
    } catch (error) {
      Alert.alert('오류', '단어를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const handleWordPress = async (wordId) => {
    try {
      await axios.post(`http://172.30.1.1:8080/api/progress/study/${wordId}/1`);
      setWords(words.map(word =>
          word.wordId === wordId ? { ...word, studyCount: word.studyCount + 1 } : word
      ));
    } catch (error) {
      Alert.alert('오류', '학습 진척도 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleFinishStudy = () => {
    navigation.navigate('SatisfactionInput');
  };

  const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => handleWordPress(item.wordId)}
          style={[styles.wordContainer, { opacity: 1 - item.studyCount * 0.2 }]}
      >
        <Text style={styles.wordId}>{item.wordId}</Text>
        <View>
          <Text style={styles.wordText}>{item.word}</Text>
          <Text style={styles.meaningText}>{item.meaning}</Text>
          <Text style={styles.exampleText}>{item.example}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <FlatList
            data={words}
            renderItem={renderItem}
            keyExtractor={(item) => item.wordId.toString()}
        />
        <TouchableOpacity style={styles.finishButton} onPress={handleFinishStudy}>
          <Text style={styles.finishButtonText}>학습 종료</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  wordId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A4A5E',
    marginRight: 16,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
  meaningText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  exampleText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  finishButton: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default WordListScreen;
