import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('classManagement');

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        navigation.navigate(tab === 'classManagement' ? 'ClassManagement' : 'LearningStatus');
    };

    const handleAddClass = () => {
        navigation.navigate('OurClassInfo');
    };

    const handleCreateClassCode = () => {
        navigation.navigate('OurClassInfo');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>대시보드</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddClass}>
                    <Image
                        source={require('../assets/plus-button.png')}
                        style={styles.addButtonImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Image
                    source={require('../assets/cloud-placeholder.png')}
                    style={styles.image}
                />
                <Text style={styles.description}>등록된 클래스 코드가 없어요!</Text>
                <TouchableOpacity style={styles.createButton} onPress={handleCreateClassCode}>
                    <Text style={styles.createButtonText}>클래스 코드 만들러 가기</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                {/* 클래스 관리 버튼 */}
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

                {/* 학습 현황 버튼 */}
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
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3A4A5E',
        flex: 1,
        textAlign: 'center',
        marginLeft: 20,
    },
    addButton: {
        width: 50.546,
        height: 29.033,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: -20,
    },
    addButtonImage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#3A4A5E',
        marginBottom: 20,
    },
    createButton: {
        width: 310,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        backgroundColor: '#C9E6F0',
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A4A5E',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
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

export default DashboardScreen;
