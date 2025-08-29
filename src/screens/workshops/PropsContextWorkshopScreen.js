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
  Input,
  Button,
  Divider,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const PropsContextWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  const workshopSteps = [
    {
      id: 'props-basics',
      title: 'Props Basics: พื้นฐาน Props',
      content: [
        {
          subtitle: 'Props คืออะไร?',
          description: 'Props เป็นการส่งข้อมูลจาก Parent Component ไปยัง Child Component',
          details: [
            '📦 Props = Properties (คุณสมบัติ)',
            '🔄 เป็นการส่งข้อมูลจากบนลงล่าง (Top-down)',
            '📝 Props เป็น Read-only (อ่านได้อย่างเดียว)',
            '🧩 ใช้สำหรับการสื่อสารระหว่าง Components',
            '🎯 ทำให้ Components สามารถรับข้อมูลจากภายนอกได้'
          ]
        },
        {
          subtitle: 'การใช้งาน Props',
          description: 'เรียนรู้วิธีการส่งและรับ Props ใน React Native Components',
          code: `// Parent Component
const ParentComponent = () => {
  return (
    <ChildComponent 
      name="สมชาย" 
      age={25} 
      isActive={true} 
    />
  );
};

// Child Component
const ChildComponent = (props) => {
  return (
    <View>
      <Text>ชื่อ: {props.name}</Text>
      <Text>อายุ: {props.age}</Text>
      <Text>สถานะ: {props.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}</Text>
    </View>
  );
};`
        },
        {
          subtitle: 'Destructuring Props',
          description: 'ใช้ Destructuring เพื่อเข้าถึง Props ได้ง่ายขึ้น',
          code: `// ใช้ Destructuring
const ChildComponent = ({ name, age, isActive }) => {
  return (
    <View>
      <Text>ชื่อ: {name}</Text>
      <Text>อายุ: {age}</Text>
      <Text>สถานะ: {isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}</Text>
    </View>
  );
};

// ใช้ Default Values
const ChildComponent = ({ 
  name = 'ไม่ระบุ', 
  age = 0, 
  isActive = false 
}) => {
  return (
    <View>
      <Text>ชื่อ: {name}</Text>
      <Text>อายุ: {age}</Text>
      <Text>สถานะ: {isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}</Text>
    </View>
  );
};`
        }
      ]
    },
    {
      id: 'props-practice',
      title: 'ปฏิบัติ: สร้าง Components ที่ใช้ Props',
      content: [
        {
          subtitle: 'สร้าง User Profile Component',
          description: 'สร้าง Component ที่รับ Props และแสดงข้อมูลผู้ใช้',
          form: true
        }
      ]
    },
    {
      id: 'context-basics',
      title: 'Context API: การจัดการ Global State',
      content: [
        {
          subtitle: 'Context API คืออะไร?',
          description: 'Context API ช่วยจัดการ Global State และลดปัญหา Prop Drilling',
          details: [
            '🌍 Context = บริบท (สภาพแวดล้อม)',
            '📊 ใช้สำหรับจัดการ Global State',
            '🔄 ลดปัญหา Prop Drilling',
            '🎯 ทำให้ข้อมูลเข้าถึงได้จากทุกที่ในแอป',
            '⚡ มีประสิทธิภาพดีกว่า Redux สำหรับแอปเล็ก-กลาง'
          ]
        },
        {
          subtitle: 'การสร้าง Context',
          description: 'เรียนรู้การสร้างและใช้งาน Context API',
          code: `// 1. สร้าง Context
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// 2. สร้าง Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. สร้าง Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};`
        },
        {
          subtitle: 'การใช้งาน Context',
          description: 'ใช้ Context ใน Components ต่างๆ',
          code: `// ใน App.js หรือ Root Component
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        {/* แอปของคุณ */}
      </NavigationContainer>
    </UserProvider>
  );
};

// ใน Component ใดๆ
import { useUser } from './contexts/UserContext';

const ProfileScreen = () => {
  const { user, isLoggedIn, logout } = useUser();

  if (!isLoggedIn) {
    return <Text>กรุณาเข้าสู่ระบบ</Text>;
  }

  return (
    <View>
      <Text>ยินดีต้อนรับ {user.name}</Text>
      <Button onPress={logout}>ออกจากระบบ</Button>
    </View>
  );
};`
        }
      ]
    },
    {
      id: 'context-practice',
      title: 'ปฏิบัติ: สร้างแอปที่ใช้ Context API',
      content: [
        {
          subtitle: 'สร้าง Theme Context',
          description: 'สร้าง Context สำหรับจัดการ Theme (Dark/Light Mode)',
          code: `// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    isDarkMode,
    colors: isDarkMode ? {
      background: '#1a1a1a',
      text: '#ffffff',
      primary: '#4a90e2'
    } : {
      background: '#ffffff',
      text: '#000000',
      primary: '#007bff'
    },
    toggleTheme: () => setIsDarkMode(!isDarkMode)
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};`
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
                    ทดลองสร้าง User Profile
                  </Text>
                  
                  <Input
                    placeholder="กรอกชื่อ"
                    value={userName}
                    onChangeText={setUserName}
                    mb={2}
                  />
                  
                  <Input
                    placeholder="กรอกอีเมล"
                    value={userEmail}
                    onChangeText={setUserEmail}
                    mb={4}
                  />
                  
                  {userName && userEmail && (
                    <Box
                      bg={useColorModeValue('blue.50', 'blue.900')}
                      p={4}
                      rounded="md"
                      borderWidth={1}
                      borderColor={useColorModeValue('blue.200', 'blue.700')}
                    >
                      <Text fontSize="md" fontWeight="bold" color={textColor} mb={2}>
                        User Profile (แสดงผลจาก Props):
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        ชื่อ: {userName}
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        อีเมล: {userEmail}
                      </Text>
                    </Box>
                  )}
                  
                  <Button
                    onPress={() => {
                      if (userName && userEmail) {
                        Alert.alert('สำเร็จ', 'สร้าง User Profile เรียบร้อยแล้ว!');
                      } else {
                        Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ');
                      }
                    }}
                    colorScheme="blue"
                    size="lg"
                  >
                    สร้าง Profile
                  </Button>
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
                Props & Context API Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การส่งข้อมูลระหว่าง Components และการจัดการ Global State
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
                colorScheme={currentStep === index ? 'blue' : 'gray'}
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
              🎯 จุดสำคัญที่ต้องจำ
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={textColor}>
                • Props ใช้สำหรับส่งข้อมูลจาก Parent ไป Child
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Context API ใช้สำหรับจัดการ Global State
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ใช้ Destructuring เพื่อเข้าถึง Props ได้ง่าย
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Context Provider ต้องครอบ Components ที่ต้องการใช้ข้อมูล
              </Text>
              <Text fontSize="sm" color={textColor}>
                • สร้าง Custom Hook เพื่อใช้งาน Context ได้สะดวก
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PropsContextWorkshopScreen; 