import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const DashboardProgressScreen = () => {
  const data = [
    { id: '1', name: '가나다', progress: '6/15', status: 'yellow' },
  ];

  const renderItem = ({ item }) => (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.progress}</Text>
        <View
            style={[
              styles.statusIndicator,
              { backgroundColor: item.status === 'red' ? '#FF0000' : item.status === 'yellow' ? '#FFC107' : '#4CAF50' },
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
            keyExtractor={(item) => item.id}
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
