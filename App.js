import {SafeAreaView, StyleSheet} from "react-native";
import MainScreen from "./screens/MainScreen";

const App = () => {
    return (
        <SafeAreaView style={styles.rootScreen}><MainScreen/></SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    }
});
