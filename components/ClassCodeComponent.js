import React, {useState} from 'react';
import {Alert, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from "expo-document-picker";

const ClassCodeComponent = ({classrooms, activeTab, setActiveTab, navigation}) => {
    const [selectedSemester, setSelectedSemester] = useState('1');
    const [reward, setReward] = useState('');
    const [openGradePicker, setOpenGradePicker] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState(classrooms[0]?.id || '');
    const gradeItems = classrooms.map((classroom) => ({
        label: `${classroom.grade}학년 ${classroom.classNumber}반`,
        value: classroom.id,
    }));
    const [openUnitPicker, setOpenUnitPicker] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState('1');
    const unitItems = Array.from({length: 10}, (_, index) => ({
        label: index + 1,
        value: index + 1,
    }));

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        navigation.navigate(tab === 'classManagement' ? 'ClassManagement' : 'DashboardProgress');
    };

    const currentClassroom = classrooms.find(
        (classroom) => classroom.id === selectedClassroom
    );

    if (!currentClassroom) {
        return <Text>클래스 정보가 없습니다.</Text>;
    }

    const handleAddClass = () => {
    };

    const handleDeleteClass = async () => {
    };

    const handleCsvUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/csv',
            });

            if (result.type === 'success') {
                console.log('Selected File:', result);
                Alert.alert('CSV 파일 선택 완료', `선택한 파일: ${result.name}`);
            } else {
                Alert.alert('취소됨', '파일 선택이 취소되었습니다.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('오류 발생', '파일 선택 중 오류가 발생했습니다.');
        }
    };

    const handleRegisterWordBook = async () => {
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.classDropdownContainer}>
                    <DropDownPicker
                        open={openGradePicker}
                        value={selectedClassroom}
                        items={gradeItems}
                        setOpen={setOpenGradePicker}
                        setValue={setSelectedClassroom}
                        placeholder={`${currentClassroom.grade}학년 ${currentClassroom.classNumber}반`}
                        style={styles.classDropdown}
                        dropDownContainerStyle={styles.classDropdownListContainer}
                        textStyle={{
                            fontSize: 20,
                            fontWeight: 500,
                            color: '#3A4A5E',
                        }}
                    />
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddClass}>
                        <Image
                            source={require('../assets/plus-button.png')}
                            style={styles.addButtonImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteClass}>
                        <Image
                            source={require('../assets/delete-button.png')}
                            style={styles.deleteButtonImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.label}>클래스 코드</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={currentClassroom.classCode}
                    editable={false}
                />

                <Text style={styles.label}>단어 관리</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioWrapper}
                        onPress={() => setSelectedSemester('1')}
                    >
                        <View style={[styles.radioButton, selectedSemester === '1' && styles.radioButtonSelected]}/>
                        <Text style={styles.radioText}>1 학기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioWrapper}
                        onPress={() => setSelectedSemester('2')}
                    >
                        <View style={[styles.radioButton, selectedSemester === '2' && styles.radioButtonSelected]}/>
                        <Text style={styles.radioText}>2 학기</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>단원</Text>
                <View style={styles.unitDropdownContainer}>
                    <DropDownPicker
                        open={openUnitPicker}
                        value={selectedUnit}
                        items={unitItems}
                        setOpen={setOpenUnitPicker}
                        setValue={setSelectedUnit}
                        placeholder={`${selectedUnit} `}
                        style={styles.unitDropdown}
                        dropDownContainerStyle={styles.unitDropdownListContainer}
                    />
                    <Text style={styles.unit}>단원</Text>
                </View>

                <TouchableOpacity style={styles.csvButton}>
                    <Text style={styles.csvButtonText} onPress={handleCsvUpload}>CSV 불러오기</Text>
                </TouchableOpacity>

                <Text style={styles.label}>리워드 설정 (선택)</Text>
                <TextInput
                    style={styles.rewardInput}
                    placeholder="예) 학급 나무에 칭찬도장 5개!"
                    value={reward}
                    onChangeText={setReward}
                    multiline={true}
                />

                <TouchableOpacity style={styles.startButton} onPress={handleRegisterWordBook}>
                    <Text style={styles.startButtonText}>학습 시작</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => handleTabPress('classManagement')}
                >
                    <Image
                        source={
                            activeTab === 'classManagement'
                                ? require('../assets/mingcute_board-fill-activated.png')
                                : require('../assets/mingcute_board-fill-deactivated.png')
                        }
                        style={styles.footerButtonIcon}
                    />
                    <Text style={styles.footerButtonText}>클래스 관리</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => handleTabPress('learningStatus')}
                >
                    <Image
                        source={
                            activeTab === 'learningStatus'
                                ? require('../assets/majesticons_list-box-activated.png')
                                : require('../assets/majesticons_list-box-deactivated.png')
                        }
                        style={styles.footerButtonIcon}
                    />
                    <Text style={styles.footerButtonText}>학습 현황</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginBottom: 20,
        marginTop: 50,
        paddingBottom: 10,
    },
    classDropdownContainer: {
        flex: 0.8,
        marginLeft: Platform.OS === 'android' ? 130 : 110,
    },
    classDropdown: {
        borderColor: '#F7F7F7',
        backgroundColor: '#F7F7F7',
        width: Platform.OS === 'android' ? 136 : 136,
    },
    classDropdownListContainer: {
        borderColor: '#CCCCCC',
        maxHeight: 3000,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        width: 50.546,
        height: 29.033,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: -10,
    },
    deleteButton: {
        width: 50.546,
        height: 29.033,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: -20,
    },
    addButtonImage: {
        width: 17,
        height: 17,
        marginRight: 10,
    },
    deleteButtonImage: {
        width: 23,
        height: 23,
        marginRight: 10,
    },
    body: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#3A4A5E',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 15,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    disabledInput: {
        color: '#AAAAAA',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 15,
        marginBottom: 25,
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 12,
        marginRight: 10,
        backgroundColor: 'white',
    },
    radioButtonSelected: {
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
    },
    radioText: {
        fontSize: 16,
        color: '#3A4A5E',
    },
    unitDropdownContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: Platform.OS === 'android' ? -100 : -30,
    },
    unitDropdown: {
        borderColor: '#CCCCCC',
        backgroundColor: '#F9F9F9',
        width: 70,
        borderRadius: 15,
    },
    unit: {
        fontSize: 16,
        marginLeft: Platform.OS === 'android' ? -290 : -255,
        marginTop: 15,
    },
    unitDropdownListContainer: {
        borderColor: '#CCCCCC',
    },
    csvButton: {
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Platform.OS === 'android' ? 30 : 20,
        display: 'flex',
        width: 139,
        padding: 12,
        gap: 10,
        borderColor: '#B6B6B6',
        borderWidth: 1,
        height: Platform.OS === 'android' ? 50 : 42,
    },
    csvButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#78B3CE',
    },
    rewardInput: {
        width: '100%',
        height: Platform.OS === 'android' ? 100 : 80,
        borderWidth: 1,
        borderColor: '#B6B6B6',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        fontSize: 14,
        fontFamily: 'Pretendard',
        fontWeight: 400,
    },
    startButton: {
        paddingVertical: 15,
        borderRadius: 20,
        backgroundColor: '#78B3CE',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 20 : 10,
        marginBottom: Platform.OS === 'android' ? -20 : -10,
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        marginLeft: -15,
        marginBottom: -20,
    },
    footerButton: {
        width: 180,
        paddingVertical: 16,
        paddingHorizontal: 56,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },
    footerButtonIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    footerButtonText: {
        fontSize: 14,
        color: '#3A4A5E',
    },
});

export default ClassCodeComponent;
