import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

const SatisfactionInputScreen = ({ route }) => {
  const { words = [] } = route.params || {};

  const memorizedCount = Array.isArray(words) ? words.filter((word) => word.studyCount >= 5).length : 0;
  const notMemorizedCount = Array.isArray(words) ? words.length - memorizedCount : 0;

  const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);

  const handleSatisfactionSelect = (level) => {
    setSelectedSatisfaction(level);
  };

  const handleConfirm = async () => {
    if (selectedSatisfaction === null) {
      Alert.alert('알림', '만족도를 선택해주세요!');
      return;
    }

    const payload = {
      satisfaction: selectedSatisfaction,
      memorizedCount,
      notMemorizedCount,
    };

    try {
      await axios.post(
          'http://172.30.1.1:8080/api/study/submit',
          payload
      );
      Alert.alert('성공', '학습 결과가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('서버 요청 실패:', error);
      Alert.alert('오류 발생', '서버와 통신하는 중 문제가 발생했습니다.');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>오늘 공부 어땠나요?</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>외웠어요</Text>
            <Text style={styles.statValue}>{memorizedCount}개</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>못 외웠어요</Text>
            <Text style={styles.statValue}>{notMemorizedCount}개</Text>
          </View>
        </View>

        <View style={styles.satisfactionContainer}>
          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === 'BEST' && styles.satisfactionSelected,
              ]}
              onPress={() => handleSatisfactionSelect('BEST')}
          >
            <Image
                source={require('../assets/best.png')}
                style={styles.satisfactionImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === 'GOOD' && styles.satisfactionSelected,
              ]}
              onPress={() => handleSatisfactionSelect('GOOD')}
          >
            <Image
                source={require('../assets/good.png')}
                style={styles.satisfactionImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === 'BAD' && styles.satisfactionSelected,
              ]}
              onPress={() => handleSatisfactionSelect('BAD')}
          >
            <Image
                source={require('../assets/bad.png')}
                style={styles.satisfactionImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#3A4A5E',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#3A4A5E',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
  satisfactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 32,
  },
  satisfactionButton: {
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  satisfactionSelected: {
    borderWidth: 3,
    borderColor: '#3A4A5E',
  },
  satisfactionImage: {
    width: 50,
    height: 85,
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: '#C9E6F0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '70%',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
});


export default SatisfactionInputScreen;
