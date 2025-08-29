import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import TopicDetailScreen from '../screens/TopicDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import FormsWorkshopScreen from '../screens/workshops/FormsWorkshopScreen';
import LaunchpadWorkshopScreen from '../screens/workshops/LaunchpadWorkshopScreen';
import PropsContextWorkshopScreen from '../screens/workshops/PropsContextWorkshopScreen';
import UIComponentsWorkshopScreen from '../screens/workshops/UIComponentsWorkshopScreen';
import NavigationWorkshopScreen from '../screens/workshops/NavigationWorkshopScreen';
import StateManagementWorkshopScreen from '../screens/workshops/StateManagementWorkshopScreen';
import APIIntegrationWorkshopScreen from '../screens/workshops/APIIntegrationWorkshopScreen';
import FirebaseWorkshopScreen from '../screens/workshops/FirebaseWorkshopScreen';
import TheoryDetailScreen from '../screens/TheoryDetailScreen';
import PromptsLibraryScreen from '../screens/PromptsLibraryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenuScreen}
          options={{
            title: 'React Native Bootcamp',
          }}
        />
        {/* Demo screen: Prompts Library */}
        <Stack.Screen 
          name="PromptsLibrary" 
          component={PromptsLibraryScreen}
          options={{
            title: 'Prompts Library',
          }}
        />
        <Stack.Screen 
          name="TopicDetail" 
          component={TopicDetailScreen}
          options={{
            title: 'Topic Detail',
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen 
          name="FormsWorkshop" 
          component={FormsWorkshopScreen}
          options={{
            title: 'Forms Workshop',
          }}
        />
        <Stack.Screen 
          name="LaunchpadWorkshop" 
          component={LaunchpadWorkshopScreen}
          options={{
            title: 'The Launchpad',
          }}
        />
        <Stack.Screen 
          name="PropsContextWorkshop" 
          component={PropsContextWorkshopScreen}
          options={{
            title: 'Props & Context API',
          }}
        />
        <Stack.Screen 
          name="UIComponentsWorkshop" 
          component={UIComponentsWorkshopScreen}
          options={{
            title: 'UI Components',
          }}
        />
        <Stack.Screen 
          name="NavigationWorkshop" 
          component={NavigationWorkshopScreen}
          options={{
            title: 'Navigation',
          }}
        />
        <Stack.Screen 
          name="StateManagementWorkshop" 
          component={StateManagementWorkshopScreen}
          options={{
            title: 'State Management',
          }}
        />
        <Stack.Screen 
          name="APIIntegrationWorkshop" 
          component={APIIntegrationWorkshopScreen}
          options={{
            title: 'API Integration',
          }}
        />
        <Stack.Screen 
          name="FirebaseWorkshop" 
          component={FirebaseWorkshopScreen}
          options={{
            title: 'Firebase',
          }}
        />
        <Stack.Screen 
          name="TheoryDetail" 
          component={TheoryDetailScreen}
          options={{
            title: 'ทฤษฎี',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 