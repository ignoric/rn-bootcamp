import React from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  useColorModeValue,
  Heading,
  // Card,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const TheoryDetailScreen = ({ route, navigation }) => {
  const { section, topic } = route.params;
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  // เนื้อหาทฤษฎีสำหรับแต่ละหัวข้อ
  const theoryContent = {
    'props-basics': {
      title: 'Props Basics: พื้นฐาน Props',
      content: [
        {
          subtitle: 'Props คืออะไร?',
          description: 'Props (Properties) เป็นการส่งข้อมูลจาก Parent Component ไปยัง Child Component',
          details: [
            '📦 Props = Properties (คุณสมบัติ)',
            '🔄 เป็นการส่งข้อมูลจากบนลงล่าง (Top-down)',
            '📝 Props เป็น Read-only (อ่านได้อย่างเดียว)',
            '🧩 ใช้สำหรับการสื่อสารระหว่าง Components',
            '🎯 ทำให้ Components สามารถรับข้อมูลจากภายนอกได้'
          ],
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
          subtitle: 'การใช้งาน Props',
          description: 'เรียนรู้วิธีการส่งและรับ Props ใน React Native Components',
          details: [
            '📤 ส่ง Props จาก Parent Component',
            '📥 รับ Props ใน Child Component',
            '🎯 ใช้ Destructuring เพื่อเข้าถึง Props ได้ง่าย',
            '⚡ สามารถส่งข้อมูลได้หลายประเภท (string, number, boolean, object, function)',
            '🔄 เมื่อ Props เปลี่ยน Child Component จะ re-render'
          ]
        }
      ]
    },
    'context-api': {
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
          ],
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
        }
      ]
    },
    'navigation-basics': {
      title: 'React Navigation: พื้นฐาน Navigation',
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
          ],
          code: `// การติดตั้ง React Navigation
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

// สำหรับ Expo
npx expo install @react-navigation/native
npx expo install @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context`
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
        }
      ]
    },
    'state-management': {
      title: 'State Management: การจัดการ State',
      content: [
        {
          subtitle: 'State คืออะไร?',
          description: 'State เป็นข้อมูลที่เปลี่ยนแปลงได้ใน Component',
          details: [
            '📊 State = ข้อมูลที่เปลี่ยนแปลงได้',
            '🔄 เมื่อ State เปลี่ยน Component จะ re-render',
            '🎯 ใช้สำหรับเก็บข้อมูลที่เปลี่ยนแปลงใน Component',
            '⚡ useState เป็น Hook พื้นฐานสำหรับจัดการ State',
            '🧩 State เป็น Local ต่อ Component นั้นๆ'
          ],
          code: `// การใช้ useState
import React, { useState } from 'react';

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onPress={increment}>เพิ่ม</Button>
      <Button onPress={decrement}>ลด</Button>
    </View>
  );
};`
        },
        {
          subtitle: 'Local vs Global State',
          description: 'ความแตกต่างระหว่าง Local และ Global State',
          details: [
            '📦 Local State: ใช้เฉพาะใน Component เดียว',
            '🌍 Global State: ใช้ร่วมกันในหลาย Components',
            '🔄 Local State เปลี่ยนเมื่อ Component re-render',
            '⚡ Global State เปลี่ยนเมื่อมีการอัปเดตจาก Provider',
            '🎯 ใช้ Local State สำหรับข้อมูลภายใน Component',
            '🧩 ใช้ Global State สำหรับข้อมูลที่ใช้ร่วมกัน'
          ]
        }
      ]
    },
    'api-integration': {
      title: 'API Integration: การดึงข้อมูลจาก API',
      content: [
        {
          subtitle: 'API คืออะไร?',
          description: 'API (Application Programming Interface) เป็นช่องทางสำหรับแอปพลิเคชันในการสื่อสารกับเซิร์ฟเวอร์',
          details: [
            '🌐 API = ช่องทางสื่อสารระหว่างแอปและเซิร์ฟเวอร์',
            '📡 ใช้ HTTP methods (GET, POST, PUT, DELETE)',
            '📊 ส่งและรับข้อมูลในรูปแบบ JSON',
            '🔒 มีระบบ Authentication และ Authorization',
            '⚡ ใช้สำหรับดึงข้อมูลจากฐานข้อมูลหรือบริการภายนอก'
          ],
          code: `// การดึงข้อมูลจาก API
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
  }
};

// การส่งข้อมูล
const createPost = async (postData) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log('สร้างโพสต์สำเร็จ:', data);
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
  }
};`
        },
        {
          subtitle: 'Async/Await',
          description: 'Async/Await เป็นวิธีจัดการการทำงานแบบ Asynchronous ที่ง่ายกว่า Promises',
          details: [
            '🔄 Async = ฟังก์ชันที่ทำงานแบบ Asynchronous',
            '⏳ Await = รอให้ Promise เสร็จสิ้น',
            '📝 เขียนโค้ดได้ง่ายกว่า Promises',
            '🎯 จัดการ Error ได้ด้วย try/catch',
            '⚡ ทำให้โค้ดอ่านง่ายและเข้าใจง่าย'
          ]
        }
      ]
    },
    'firebase-basics': {
      title: 'Firebase: Backend-as-a-Service',
      content: [
        {
          subtitle: 'Firebase คืออะไร?',
          description: 'Firebase เป็น Backend-as-a-Service (BaaS) ที่พัฒนาโดย Google',
          details: [
            '🔥 Firebase = Backend-as-a-Service จาก Google',
            '📱 รองรับ iOS, Android, Web และ Flutter',
            '⚡ Real-time Database และ Cloud Firestore',
            '🔐 Authentication และ Security',
            '☁️ Cloud Functions และ Hosting',
            '📊 Analytics และ Crashlytics'
          ],
          code: `// การตั้งค่า Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`
        },
        {
          subtitle: 'บริการหลักของ Firebase',
          description: 'เรียนรู้บริการต่างๆ ที่ Firebase มีให้',
          details: [
            '🗄️ Firestore - NoSQL Database แบบ Real-time',
            '👤 Authentication - ระบบยืนยันตัวตน',
            '📁 Storage - เก็บไฟล์และรูปภาพ',
            '⚙️ Functions - Serverless Functions',
            '📈 Analytics - วิเคราะห์พฤติกรรมผู้ใช้',
            '🚨 Crashlytics - ติดตามข้อผิดพลาด'
          ]
        }
      ]
    }
  };

  const currentContent = theoryContent[section.id] || {
    title: section.title,
    content: [
      {
        subtitle: 'เนื้อหากำลังพัฒนา',
        description: 'เนื้อหาสำหรับหัวข้อนี้กำลังอยู่ในระหว่างการพัฒนา',
        details: [
          '📚 เนื้อหาจะถูกเพิ่มในเร็วๆ นี้',
          '🎯 ติดตามการอัปเดตได้ที่แอปนี้',
          '💡 ขออภัยในความไม่สะดวก'
        ]
      }
    ]
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
            <Box
              bg={topic.color}
              p={3}
              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={MaterialIcons}
                name={topic.icon}
                size="md"
                color="white"
              />
            </Box>
            <VStack flex={1}>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {currentContent.title}
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                {topic.title} - {topic.subtitle}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Content */}
        <VStack space={4}>
          {currentContent.content.map((item, index) => (
            // Replace Card with Box styled as a card
            <Box
              key={index}
              bg={cardBgColor}
              rounded="md"
              shadow={1}
              borderWidth={1}
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            >
              <Box px={4} py={3} borderBottomWidth={1} borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Heading size="md" color={textColor}>
                  {item.subtitle}
                </Heading>
              </Box>
              <Box px={4} py={4}>
                <VStack space={4}>
                  <Text fontSize="md" color={subtitleColor}>
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
                </VStack>
              </Box>
            </Box>
          ))}
        </VStack>

        {/* Footer */}
        <Box mt={8} p={4} bg={cardBgColor} rounded="lg">
          <VStack space={3}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              💡 เคล็ดลับ:
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={subtitleColor}>
                • อ่านเนื้อหาทฤษฎีให้เข้าใจก่อนทำ Workshop
              </Text>
              <Text fontSize="sm" color={subtitleColor}>
                • ทดลองเขียนโค้ดตามตัวอย่าง
              </Text>
              <Text fontSize="sm" color={subtitleColor}>
                • ฝึกฝนและทดลองปรับแต่งโค้ด
              </Text>
              <Text fontSize="sm" color={subtitleColor}>
                • ใช้ Workshop เพื่อทดลองใช้งานจริง
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default TheoryDetailScreen; 