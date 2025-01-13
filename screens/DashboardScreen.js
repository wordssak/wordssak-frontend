import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getClassrooms} from "../api/classroomApi";
import NoClassCodeComponent from "../components/NoClassCodeComponent";
import ClassCodeComponent from "../components/ClassCodeComponent";
import {View} from "react-native";

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('classManagement');
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const data = await getClassrooms();
                setClassrooms(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassrooms();
    }, []);

    if (classrooms.length === 0) {
        return (
            <NoClassCodeComponent activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation}/>
        );
    }

    return (
        <View style={{flex: 1}}>
            <ClassCodeComponent classrooms={classrooms} activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation}/>
        </View>
    );
};

export default DashboardScreen;
