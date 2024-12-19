import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import TeacherLoginScreen from './screens/TeacherLoginScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Main" component={MainScreen}/>
                <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
