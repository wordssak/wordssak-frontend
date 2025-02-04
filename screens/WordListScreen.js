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
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const WordListScreen = ({ navigation }) => {
  const route = useRoute();
  const { studentId } = route.params || {};

  const [words, setWords] = useState([]);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);
  const [satisfactionCompleted, setSatisfactionCompleted] = useState(false);
  const [grade, setGrade] = useState('');
  const [unit, setUnit] = useState('');
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState('');

  useEffect(() => {
    if (route.params?.satisfactionCompleted) {
      setSatisfactionCompleted(true);
    }
    fetchWordData();
  }, [route.params?.satisfactionCompleted]);

  const fetchWordData = async () => {
    try {
      const response = await axios.get(
          `http://172.30.1.1:8080/api/progress/words`
      );
      const { activeStatus = true, satisfactionCompleted = false, wordList = [] } = response.data;

      setActiveStatus(activeStatus);
      setSatisfactionCompleted(satisfactionCompleted);

      if (!activeStatus && !satisfactionCompleted) {
        // 🔹 SatisfactionInputScreen으로 이동할 때 words 데이터를 함께 전달
        navigation.replace('SatisfactionInput', { studentId, words: wordList });
      } else if (satisfactionCompleted) {
        setIsAllCompleted(true);
      } else if (activeStatus) {
        setWords(wordList);
        checkIfAllWordsCompleted(wordList);
      }

      const latestWordBookResponse = await axios.get(
          `http://172.30.1.1:8080/api/wordbook/latest`
      );
      if (latestWordBookResponse.data) {
        setGrade(latestWordBookResponse.data.grade);
        setUnit(latestWordBookResponse.data.unit);
        setTitle(latestWordBookResponse.data.title);
        setReward(latestWordBookResponse.data.reward);
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
      await axios.post(
          `http://172.30.1.1:8080/api/progress/study/${wordId}`
      );
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

  if (isAllCompleted || satisfactionCompleted) {
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
        <View style={styles.wordBookInfoContainer}>
          {/* 리워드 표시 */}
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardText}>📢 {reward}</Text>
          </View>

          {/* 학년, 차시, LESSON, 제목 */}
          <View style={styles.wordBookDetails}>
            <View style={styles.gradeLessonContainer}>
              <View style={styles.gradeUnitBox}>
                <Text style={styles.gradeText}>{grade}학년 {unit}차시</Text>
              </View>
              <View style={styles.lessonTitleContainer}>
                <Text style={styles.lessonTitle}>LESSON {unit}</Text>
                <Text style={styles.wordBookTitle}>{title}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 단어 리스트 */}
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
  wordBookInfoContainer: {
    backgroundColor: '#F5F9FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  rewardContainer: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  wordBookDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeLessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradeUnitBox: {
    backgroundColor: '#64B5F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lessonTitleContainer: {
    marginLeft: 12,
    alignItems: 'flex-start',
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  wordBookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A4A5E',
    marginTop: 2,
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
