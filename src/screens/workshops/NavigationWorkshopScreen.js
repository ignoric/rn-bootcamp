import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  useColorModeValue,
  Badge,
  Button,
  Card,
  Heading,
  Divider,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const NavigationWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  const workshopSteps = [
    {
      id: 'navigation-basics',
      title: 'Navigation Basics: พื้นฐาน Navigation',
      content: [
        {
          subtitle: 'React Navigation คืออะไร?',
          description: 'React Navigation เป็น library สำหรับจัดการ navigation ใน React Native',
          details: [
            '🧭 จัดการการนำทางระหว่างหน้าจอ',
            '📱 รองรับทั้ง iOS และ Android',
            '⚡ Performance ดีและใช้งานง่าย',
            '🎨 Customizable และ Flexible',
            '🔄 รองรับ Deep Linking และ URL-based navigation'
          ]
        },
        {
          subtitle: 'ประเภทของ Navigator',
          description: 'React Navigation มี Navigator หลายประเภท',
          details: [
            '📚 Stack Navigator - นำทางแบบ Stack (หน้าเดียว)',
            '📋 Tab Navigator - นำทางแบบ Tab (หลายแท็บ)',
            '🗂️ Drawer Navigator - นำทางแบบ Drawer (เมนูด้านข้าง)',
            '🔄 Switch Navigator - สลับระหว่าง Navigator',
            '🌐 Web Navigator - สำหรับ Web Platform'
          ]
        },
        {
          subtitle: 'การติดตั้ง React Navigation',
          description: 'ขั้นตอนการติดตั้งและตั้งค่า React Navigation',
          code: `# ติดตั้ง dependencies
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# สำหรับ Expo
npx expo install @react-navigation/native
npx expo install @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# สำหรับ Gesture Handler (จำเป็นสำหรับ Stack Navigator)
npx expo install react-native-gesture-handler`
        }
      ]
    },
    {
      id: 'stack-navigator',
      title: 'Stack Navigator: นำทางแบบ Stack',
      content: [
        {
          subtitle: 'การสร้าง Stack Navigator',
          description: 'เรียนรู้การสร้างและใช้งาน Stack Navigator',
          code: `// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'หน้าหลัก' }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{ title: 'รายละเอียด' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'โปรไฟล์' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;`
        },
        {
          subtitle: 'การนำทางระหว่างหน้าจอ',
          description: 'เรียนรู้วิธีการนำทางไปยังหน้าจอต่างๆ',
          code: `// ใน Screen Component
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate('Detail', { id: 1, title: 'รายละเอียด' });
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Button onPress={goToDetail}>ไปหน้าละเอียด</Button>
      <Button onPress={goToProfile}>ไปหน้าโปรไฟล์</Button>
      <Button onPress={goBack}>กลับ</Button>
    </View>
  );
};

// รับ Parameters ใน Screen ปลายทาง
const DetailScreen = ({ route }) => {
  const { id, title } = route.params;
  
  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
    </View>
  );
};`
        },
        {
          subtitle: 'Navigation Options',
          description: 'ตั้งค่า options สำหรับแต่ละ Screen',
          code: `// ตั้งค่า Options แบบ Static
<Stack.Screen 
  name="Home" 
  component={HomeScreen}
  options={{
    title: 'หน้าหลัก',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <Button onPress={() => alert('Settings')} title="Settings" />
    ),
  }}
/>

// ตั้งค่า Options แบบ Dynamic
const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert('Settings')} title="Settings" />
      ),
    });
  }, [navigation]);

  return <View>...</View>;
};`
        }
      ]
    },
    {
      id: 'tab-navigator',
      title: 'Tab Navigator: นำทางแบบ Tab',
      content: [
        {
          subtitle: 'การสร้าง Tab Navigator',
          description: 'เรียนรู้การสร้างและใช้งาน Tab Navigator',
          code: `// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;`
        },
        {
          subtitle: 'Nested Navigation',
          description: 'การซ้อน Navigator เข้าด้วยกัน',
          code: `// AppNavigator.js - รวม Stack และ Tab
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};`
        }
      ]
    },
    {
      id: 'navigation-practice',
      title: 'ปฏิบัติ: สร้างแอปหลายหน้าจอ',
      content: [
        {
          subtitle: 'สร้างแอปตัวอย่าง',
          description: 'สร้างแอปที่มีหลายหน้าจอและ Navigation',
          form: true
        }
      ]
    }
  ];

  const renderStep = (step) => {
    return (
      <VStack space={4}>
        {step.content.map((item, index) => (
          <Box
            key={index}
            bg={cardBgColor}
            p={4}
            rounded="lg"
            shadow={2}
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          >
            <VStack space={3}>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                {item.subtitle}
              </Text>
              <Text fontSize="sm" color={subtitleColor}>
                {item.description}
              </Text>
              
              {item.details && (
                <VStack space={2}>
                  {item.details.map((detail, detailIndex) => (
                    <Text key={detailIndex} fontSize="sm" color={textColor}>
                      {detail}
                    </Text>
                  ))}
                </VStack>
              )}
              
              {item.code && (
                <Box
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  p={3}
                  rounded="md"
                >
                  <Text fontSize="xs" fontFamily="monospace" color={textColor}>
                    {item.code}
                  </Text>
                </Box>
              )}
              
              {item.form && (
                <VStack space={4}>
                  <Text fontSize="md" fontWeight="bold" color={textColor}>
                    ทดลอง Navigation
                  </Text>
                  
                  <Card>
                    <Card.Header>
                      <Heading size="md">ตัวอย่าง Navigation</Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack space={3}>
                        <Text fontSize="sm" color={subtitleColor}>
                          ทดลองการนำทางระหว่างหน้าจอต่างๆ
                        </Text>
                        
                        <Button
                          onPress={() => navigation.navigate('MainMenu')}
                          colorScheme="blue"
                        >
                          กลับไปหน้าหลัก
                        </Button>
                        
                        <Button
                          onPress={() => navigation.navigate('TopicDetail', {
                            topic: {
                              id: 'navigation',
                              title: 'Navigation',
                              subtitle: 'การสร้างแอปหลายหน้าจอ',
                              icon: 'navigation',
                              color: 'green.500',
                              description: 'เรียนรู้การสร้าง Navigation ระหว่างหน้าจอต่างๆ'
                            }
                          })}
                          colorScheme="green"
                        >
                          ไปหน้า Topic Detail
                        </Button>
                        
                        <Button
                          onPress={() => Alert.alert(
                            'Navigation Info',
                            'คุณสามารถนำทางไปยังหน้าจอต่างๆ ได้แล้ว!'
                          )}
                          colorScheme="purple"
                        >
                          ดูข้อมูล Navigation
                        </Button>
                      </VStack>
                    </Card.Body>
                  </Card>
                  
                  <Box
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    p={4}
                    rounded="md"
                    borderWidth={1}
                    borderColor={useColorModeValue('blue.200', 'blue.700')}
                  >
                    <Text fontSize="md" fontWeight="bold" color={textColor} mb={2}>
                      💡 เคล็ดลับ:
                    </Text>
                    <VStack space={1}>
                      <Text fontSize="sm" color={subtitleColor}>
                        • ใช้ navigation.navigate() เพื่อไปยังหน้าจอใหม่
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • ใช้ navigation.goBack() เพื่อกลับไปหน้าจอก่อนหน้า
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • ส่งข้อมูลผ่าน route.params
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • ตั้งค่า options สำหรับแต่ละ Screen
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              )}
            </VStack>
          </Box>
        ))}
      </VStack>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
      <Box safeArea p={4}>
        {/* Header */}
        <VStack space={4} mb={6}>
          <HStack space={4} alignItems="center">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                as={MaterialIcons}
                name="arrow-back"
                size="md"
                color={textColor}
              />
            </Pressable>
            <VStack flex={1}>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                Navigation Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การสร้าง Navigation ระหว่างหน้าจอต่างๆ
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Step Navigation */}
        <HStack space={2} mb={6} flexWrap="wrap">
          {workshopSteps.map((step, index) => (
            <Pressable
              key={step.id}
              onPress={() => setCurrentStep(index)}
              _pressed={{ opacity: 0.7 }}
            >
              <Badge
                colorScheme={currentStep === index ? 'green' : 'gray'}
                variant={currentStep === index ? 'solid' : 'outline'}
                rounded="full"
                px={3}
                py={2}
                mb={2}
              >
                <Text fontSize="sm" color={currentStep === index ? 'white' : textColor}>
                  {index + 1}. {step.title.split(':')[0]}
                </Text>
              </Badge>
            </Pressable>
          ))}
        </HStack>

        {/* Current Step Content */}
        {renderStep(workshopSteps[currentStep])}

        {/* Navigation Buttons */}
        <HStack space={4} mt={6} justifyContent="space-between">
          <Pressable
            onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            bg={currentStep === 0 ? 'gray.400' : 'blue.500'}
            px={6}
            py={3}
            rounded="md"
            _pressed={{ opacity: 0.7 }}
          >
            <Text color="white" fontWeight="bold">
              ก่อนหน้า
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setCurrentStep(Math.min(workshopSteps.length - 1, currentStep + 1))}
            disabled={currentStep === workshopSteps.length - 1}
            bg={currentStep === workshopSteps.length - 1 ? 'gray.400' : 'green.500'}
            px={6}
            py={3}
            rounded="md"
            _pressed={{ opacity: 0.7 }}
          >
            <Text color="white" fontWeight="bold">
              ถัดไป
            </Text>
          </Pressable>
        </HStack>

        {/* Key Points */}
        <Box mt={8} p={4} bg={cardBgColor} rounded="lg">
          <VStack space={3}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              🧭 จุดสำคัญที่ต้องจำ
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={textColor}>
                • NavigationContainer ต้องครอบ Navigator ทั้งหมด
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Stack Navigator ใช้สำหรับการนำทางแบบหน้าเดียว
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Tab Navigator ใช้สำหรับการนำทางแบบหลายแท็บ
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ใช้ navigation.navigate() เพื่อนำทางไปยังหน้าจอใหม่
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ส่งข้อมูลผ่าน route.params
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default NavigationWorkshopScreen; 