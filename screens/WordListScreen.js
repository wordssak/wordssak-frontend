import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';

const WordListScreen = ({ navigation }) => {
  const [words, setWords] = useState([]);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);
  const [satisfactionCompleted, setSatisfactionCompleted] = useState(false);

  useEffect(() => {
    fetchWordData();
  }, []);

  const fetchWordData = async () => {
    try {
      const response = await axios.get(`http://172.30.1.1:8080/api/progress/words/1`);
      const { activeStatus = true, satisfactionCompleted = false, wordList = [] } = response.data;

      setActiveStatus(activeStatus);
      setSatisfactionCompleted(satisfactionCompleted);

      if (!activeStatus && !satisfactionCompleted) {
        navigation.replace('SatisfactionInput', { studentId: 1 });
      } else if (activeStatus) {
        setWords(wordList);
        checkIfAllWordsCompleted(wordList);
      }
    } catch (error) {
      Alert.alert('오류', '데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const checkIfAllWordsCompleted = (wordList) => {
    const allCompleted = wordList.length > 0 && wordList.every((word) => word.studyCount >= 5);
    setIsAllCompleted(allCompleted);
  };

  const handleWordPress = async (wordId) => {
    try {
      await axios.post(`http://172.30.1.1:8080/api/progress/study/${wordId}/1`);
      const updatedWords = words.map((word) =>
          word.wordId === wordId
              ? { ...word, studyCount: Math.min(word.studyCount + 1, 5) }
              : word
      );
      setWords(updatedWords);
      checkIfAllWordsCompleted(updatedWords);
    } catch (error) {
      Alert.alert('오류', '학습 진척도 업데이트 중 문제가 발생했습니다.');
    }
  };

  const renderItem = ({ item, index }) => (
      <TouchableOpacity
          onPress={() => handleWordPress(item.wordId)}
          style={[
            styles.wordContainer,
            { opacity: 1 - item.studyCount * 0.2 },
          ]}
      >
        <Text style={styles.wordId}>{String(index + 1).padStart(2, '0')}</Text>
        <View>
          <Text style={styles.wordText}>{item.word}</Text>
          <Text style={styles.meaningText}>{item.meaning}</Text>
          <Text style={styles.exampleText}>{item.example}</Text>
        </View>
      </TouchableOpacity>
  );

  if (isAllCompleted) {
    return (
        <View style={styles.completedContainer}>
          <Image
              source={require('../assets/completed.png')}
              style={styles.completedImage}
          />
          <Text style={styles.completedText}>학습이 끝났어요!</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={words}
            renderItem={renderItem}
            keyExtractor={(item) => item.wordId.toString()}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
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
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  completedImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  completedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
});

export default WordListScreen;
