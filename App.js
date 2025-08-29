import { StatusBar } from "expo-status-bar";
import { AppProvider } from './src/providers/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <AppProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AppProvider>
    </NativeBaseProvider>
  );
}
