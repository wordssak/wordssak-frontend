import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import TeacherLoginScreen from './screens/TeacherLoginScreen';
import WordListScreen from "./screens/WordListScreen";
import WordSetConfigScreen from "./screens/WordSetConfigScreen";
import DashboardProgressScreen from "./screens/DashboardProgressScreen";
import DashboardHomeScreen from "./screens/DashboardHomeScreen";
import SatisfactionInputScreen from "./screens/SatisfactionInputScreen";
import TeacherSignUpScreen from './screens/TeacherSignUpScreen';
import DashboardScreen from "./screens/DashboardScreen";
import OurClassInfoScreen from "./screens/OurClassInfoScreen";
import StudentCodeInputScreen from "./screens/StudentCodeInputScreen";
import StudentLoginScreen from "./screens/StudentLoginScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Main" component={MainScreen}/>
                <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen}/>
              <Stack.Screen name="WordSetConfig" component={WordSetConfigScreen} />
              <Stack.Screen name="DashboardHome" component={DashboardHomeScreen} />
              <Stack.Screen name="DashboardProgress" component={DashboardProgressScreen} />
              <Stack.Screen name="SatisfactionInput" component={SatisfactionInputScreen} />
                <Stack.Screen name="TeacherSignUp" component={TeacherSignUpScreen}/>
                <Stack.Screen name="Dashboard" component={DashboardScreen}/>
                <Stack.Screen name="OurClassInfo" component={OurClassInfoScreen}/>
                <Stack.Screen name="StudentCodeInput" component={StudentCodeInputScreen}/>
                <Stack.Screen name="StudentLogin" component={StudentLoginScreen}/>
                <Stack.Screen name="WordList" component={WordListScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
