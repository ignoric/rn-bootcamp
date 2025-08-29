import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { AppProvider } from './src/providers/AppContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <HomeScreen />
      </SafeAreaView>
    </AppProvider>
  );
}
