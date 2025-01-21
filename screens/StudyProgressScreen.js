import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import axios from 'axios';

const StudyProgressScreen = ({ route }) => {
  const { classroomId } = route.params;
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    fetchStudyProgress();
  }, []);

  const fetchStudyProgress = async () => {
    try {
      const response = await axios.get(`http://172.30.1.1:8080/api/study/classroom/${classroomId}/progress`);
      setProgressData(response.data);
    } catch (error) {
      Alert.alert('오류 발생', '학습 현황 데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const renderItem = ({ item }) => {
    const satisfactionColor =
        item.satisfaction === 'BEST'
            ? '#4caf50'
            : item.satisfaction === 'GOOD'
                ? '#ffc107'
                : item.satisfaction === 'BAD'
                    ? '#f44336'
                    : 'transparent';

    return (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{`${item.memorizedCount}/${item.totalWords}`}</Text>
          <View style={[styles.satisfactionDot, { backgroundColor: satisfactionColor }]} />
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>학습 현황</Text>
        <FlatList
            data={progressData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  satisfactionDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

export default StudyProgressScreen;
