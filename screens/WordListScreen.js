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
import { useNavigation } from '@react-navigation/native';

const WordListScreen = ({ route }) => {
  const navigation = useNavigation();
  const [words, setWords] = useState([]);
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  // 단어 목록 가져오기
  const fetchWords = async () => {
    try {
      const response = await axios.get(
          `http://172.30.1.1:8080/api/progress/words/1`
      );
      setWords(response.data);
      checkIfAllWordsCompleted(response.data);
    } catch (error) {
      Alert.alert('오류', '단어를 불러오는 중 문제가 발생했습니다.');
    }
  };

  // 단어 클릭 핸들러 (진척도 증가)
  const handleWordPress = async (wordId) => {
    try {
      await axios.post(
          `http://172.30.1.1:8080/api/progress/study/${wordId}/1`
      );
      const updatedWords = words.map((word) =>
          word.wordId === wordId
              ? { ...word, studyCount: Math.min(word.studyCount + 1, 5) }
              : word
      );
      setWords(updatedWords);
      checkIfAllWordsCompleted(updatedWords);
    } catch (error) {
      Alert.alert('오류', '학습 진척도 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 모든 단어의 진척도가 5인지 확인
  const checkIfAllWordsCompleted = (words) => {
    const allCompleted = words.every((word) => word.studyCount >= 5);
    setIsAllCompleted(allCompleted);
  };

  const handleFinishStudy = () => {
    navigation.navigate('SatisfactionInput', { words });
  };

  // 단어 목록 렌더링
  const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => handleWordPress(item.wordId)}
          style={[
            styles.wordContainer,
            { opacity: 1 - item.studyCount * 0.2 },
          ]}
      >
        <Text style={styles.wordId}>{item.wordId}</Text>
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
              source={require('../assets/completed.png')}  // 학습 완료 이미지
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
        <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishStudy}
        >
          <Text style={styles.finishButtonText}>학습 종료</Text>
        </TouchableOpacity>
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
