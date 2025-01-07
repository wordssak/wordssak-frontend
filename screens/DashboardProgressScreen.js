import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';

const DashboardProgressScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const classroomId = route.params?.classroomId || 1;

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await axios.get(
          `http://172.30.1.1:8080/api/study/classroom/${classroomId}`
      );

      setData(response.data);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
      Alert.alert('오류', '학습 진척도를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const renderItem = ({ item, index }) => (
      <View style={styles.row}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{item.studentName}</Text>
        <Text style={styles.cell}>
          {item.memorizedCount}/{item.totalCount}
        </Text>
        <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                    item.satisfaction === 'BEST'
                        ? '#4CAF50'
                        : item.satisfaction === 'GOOD'
                            ? '#FFC107'
                            : '#FF5252',
              },
            ]}
        />
      </View>
  );

  return (
      <View style={styles.container}>
        <Text style={styles.title}>3학년 4반</Text>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            ListHeaderComponent={() => (
                <View style={styles.header}>
                  <Text style={styles.cell}>번호</Text>
                  <Text style={styles.cell}>이름</Text>
                  <Text style={styles.cell}>외운 단어 수</Text>
                  <Text style={styles.cell}>만족도</Text>
                </View>
            )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default DashboardProgressScreen;
