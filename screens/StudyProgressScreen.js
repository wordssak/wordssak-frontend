import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StudyProgressScreen = ({ route, navigation }) => {
  const { classroomCode } = route.params;
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    fetchStudyProgress();
  }, []);

  const fetchStudyProgress = async () => {
    try {
      const response = await axios.get(`http://172.30.1.1:8080/api/study/classroom/${classroomCode}/progress`);
      setProgressData(response.data);
    } catch (error) {
      Alert.alert('오류 발생', '학습 현황 데이터가 없습니다.');
    }
  };

  const renderHeader = () => (
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.numberColumn]}>번호</Text>
        <Text style={[styles.headerText, styles.nameColumn]}>이름</Text>
        <Text style={[styles.headerText, styles.wordColumn]}>외운 단어 수</Text>
        <Text style={[styles.headerText, styles.satisfactionColumn]}>만족도</Text>
      </View>
  );

  const renderItem = ({ item, index }) => {
    const satisfactionColor =
        item.satisfaction === 'BEST' ? '#4caf50' :
            item.satisfaction === 'GOOD' ? '#ffc107' :
                item.satisfaction === 'BAD' ? '#f44336' : 'transparent';

    return (
        <View style={styles.row}>
          <Text style={[styles.cell, styles.numberColumn]}>{String(index + 1).padStart(2, '0')}</Text>
          <Text style={[styles.cell, styles.nameColumn]}>{item.name}</Text>
          <Text style={[styles.cell, styles.wordColumn]}>{`${item.memorizedCount}/${item.totalWords}`}</Text>
          <View style={[styles.satisfactionDot, { backgroundColor: satisfactionColor }]} />
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/*<Text style={styles.classTitle}>{`3학년 3반`}</Text>*/}
          {/*<Text style={styles.lessonTitle}>LESSON 1</Text>*/}
          {/*<Text style={styles.subtitle}>What Will You Do This Summer?</Text>*/}
        </View>

        {renderHeader()}

        <FlatList
            data={progressData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
        />

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {/* 클래스 관리 버튼 */}
          <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate('DashboardHome')}
          >
            <Text style={styles.navButtonText}>클래스 관리</Text>
          </TouchableOpacity>

          {/* 학습 현황 버튼 (현재 화면) */}
          <TouchableOpacity style={[styles.navButton, styles.activeNav]}>
            <Text style={styles.navButtonText}>학습 현황</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, paddingTop: 40 },
  headerContainer: { alignItems: 'center', marginBottom: 16 },
  classTitle: { fontSize: 18, fontWeight: 'bold' },
  lessonTitle: { fontSize: 16, fontWeight: 'bold', backgroundColor: '#BCE0FD', padding: 5, borderRadius: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#EDEFF1', paddingVertical: 10, borderRadius: 8, marginBottom: 8 },
  headerText: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  cell: { fontSize: 14, textAlign: 'center' },
  numberColumn: { width: 40 },
  nameColumn: { flex: 2 },
  wordColumn: { flex: 1 },
  satisfactionColumn: { width: 50, textAlign: 'center' },
  satisfactionDot: { width: 16, height: 16, borderRadius: 8, alignSelf: 'center' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#EDEFF1', backgroundColor: '#F9FAFB', marginTop: 20 },
  navButton: { paddingVertical: 8, paddingHorizontal: 16 },
  navButtonText: { fontSize: 14, fontWeight: 'bold', color: '#6B7280' },
  activeNav: { borderBottomWidth: 2, borderBottomColor: '#3498db' },
});

export default StudyProgressScreen;
