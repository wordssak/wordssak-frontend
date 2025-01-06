import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SatisfactionInputScreen = () => {
  const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);

  const handleSatisfactionSelect = (level) => {
    setSelectedSatisfaction(level);
  };

  const handleConfirm = () => {
    if (selectedSatisfaction !== null) {
      alert(`선택한 만족도: ${selectedSatisfaction}`);
    } else {
      alert('만족도를 선택해주세요!');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>오늘 공부 어땠나요?</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>외웠어요</Text>
            <Text style={styles.statValue}>8개</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>못 외웠어요</Text>
            <Text style={styles.statValue}>2개</Text>
          </View>
        </View>

        <View style={styles.satisfactionContainer}>
          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === '좋음' && styles.satisfactionSelected,
                { backgroundColor: '#4CAF50' },
              ]}
              onPress={() => handleSatisfactionSelect('좋음')}
          >
            <Text style={styles.satisfactionText}>좋음</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === '보통' && styles.satisfactionSelected,
                { backgroundColor: '#FFC107' },
              ]}
              onPress={() => handleSatisfactionSelect('보통')}
          >
            <Text style={styles.satisfactionText}>보통</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[
                styles.satisfactionButton,
                selectedSatisfaction === '나쁨' && styles.satisfactionSelected,
                { backgroundColor: '#FF5252' },
              ]}
              onPress={() => handleSatisfactionSelect('나쁨')}
          >
            <Text style={styles.satisfactionText}>나쁨</Text>
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
