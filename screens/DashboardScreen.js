import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import NoClassCodeComponent from "../components/NoClassCodeComponent";

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('classManagement');

    return (
        <NoClassCodeComponent setActiveTab={setActiveTab} navigation={navigation}/>
    );
};

export default DashboardScreen;
