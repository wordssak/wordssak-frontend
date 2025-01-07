import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';

const SatisfactionInputScreen = ({ route }) => {
  const { words } = route.params;

  const memorizedCount = words.filter((word) => word.studyCount >= 5).length;
  const notMemorizedCount = words.length - memorizedCount;

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
      const response = await axios.post(
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
                { backgroundColor: '#4CAF50' },
              ]}
              onPress={() => handleSatisfactionSelect('BEST')}
          >
            <Text style={styles.satisfactionText}>BEST</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === 'GOOD' && styles.satisfactionSelected,
                { backgroundColor: '#FFC107' },
              ]}
              onPress={() => handleSatisfactionSelect('GOOD')}
          >
            <Text style={styles.satisfactionText}>GOOD</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === 'BAD' && styles.satisfactionSelected,
                { backgroundColor: '#FF5252' },
              ]}
              onPress={() => handleSatisfactionSelect('BAD')}
          >
            <Text style={styles.satisfactionText}>BAD</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#3A4A5E',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#3A4A5E',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
  satisfactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  satisfactionButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  satisfactionSelected: {
    borderWidth: 3,
    borderColor: '#000000',
  },
  satisfactionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#C9E6F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A4A5E',
  },
});

export default SatisfactionInputScreen;
