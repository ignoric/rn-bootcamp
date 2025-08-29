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
  Input,
  TextArea,
  Switch,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const FirebaseWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  const workshopSteps = [
    {
      id: 'firebase-basics',
      title: 'Firebase Basics: พื้นฐาน Firebase',
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
          ]
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
        },
        {
          subtitle: 'การติดตั้ง Firebase',
          description: 'ขั้นตอนการติดตั้งและตั้งค่า Firebase ในโปรเจกต์',
          code: `# ติดตั้ง Firebase CLI
npm install -g firebase-tools

# Login เข้า Firebase
firebase login

# สร้างโปรเจกต์ใหม่
firebase init

# เลือกบริการที่ต้องการ
# - Firestore
# - Authentication
# - Storage
# - Functions

# ติดตั้ง Firebase SDK
npm install firebase

# สำหรับ Expo
npx expo install @react-native-firebase/app
npx expo install @react-native-firebase/firestore
npx expo install @react-native-firebase/auth`
        }
      ]
    },
    {
      id: 'firestore',
      title: 'Firestore Database: ฐานข้อมูล Real-time',
      content: [
        {
          subtitle: 'Firestore คืออะไร?',
          description: 'Firestore เป็น NoSQL database ที่รองรับ Real-time updates',
          details: [
            '🗄️ NoSQL Document Database',
            '⚡ Real-time Synchronization',
            '🌐 Offline Support',
            '🔒 Security Rules',
            '📊 Automatic Scaling',
            '🔄 ACID Transactions'
          ]
        },
        {
          subtitle: 'การเชื่อมต่อ Firestore',
          description: 'เรียนรู้การเชื่อมต่อและใช้งาน Firestore',
          code: `// firebase.js - ตั้งค่า Firebase
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
export const db = getFirestore(app);

// การใช้งาน Firestore
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';

// เพิ่มข้อมูล
const addNote = async (noteData) => {
  try {
    const docRef = await addDoc(collection(db, 'notes'), {
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date(),
      isPublic: noteData.isPublic
    });
    console.log('เพิ่มโน้ตสำเร็จ:', docRef.id);
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
  }
};

// ดึงข้อมูลทั้งหมด
const getNotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'notes'));
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
  }
};

// Real-time listener
const subscribeToNotes = (callback) => {
  const q = query(
    collection(db, 'notes'),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    callback(notes);
  });
};`
        }
      ]
    },
    {
      id: 'authentication',
      title: 'Authentication: ระบบยืนยันตัวตน',
      content: [
        {
          subtitle: 'Firebase Authentication',
          description: 'เรียนรู้การสร้างระบบ Authentication ด้วย Firebase',
          details: [
            '👤 รองรับหลายวิธี: Email/Password, Google, Facebook',
            '🔐 ปลอดภัยและเชื่อถือได้',
            '📱 รองรับทั้ง iOS และ Android',
            '🔄 Auto-login และ Session Management',
            '📊 User Management และ Analytics'
          ]
        },
        {
          subtitle: 'การใช้งาน Authentication',
          description: 'เรียนรู้การสร้างระบบ Login/Register',
          code: `// Authentication Functions
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const auth = getAuth();

// สมัครสมาชิก
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    const user = userCredential.user;
    console.log('สมัครสมาชิกสำเร็จ:', user.uid);
    return user;
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
    throw error;
  }
};

// เข้าสู่ระบบ
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    const user = userCredential.user;
    console.log('เข้าสู่ระบบสำเร็จ:', user.uid);
    return user;
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
    throw error;
  }
};

// ออกจากระบบ
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('ออกจากระบบสำเร็จ');
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
  }
};

// ตรวจสอบสถานะการเข้าสู่ระบบ
const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('ผู้ใช้เข้าสู่ระบบ:', user.uid);
    } else {
      console.log('ผู้ใช้ไม่ได้เข้าสู่ระบบ');
    }
    callback(user);
  });
};

// Google Sign-in
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('เข้าสู่ระบบด้วย Google สำเร็จ:', user.uid);
    return user;
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
    throw error;
  }
};`
        }
      ]
    },
    {
      id: 'firebase-practice',
      title: 'ปฏิบัติ: สร้างแอป Notes ด้วย Firebase',
      content: [
        {
          subtitle: 'สร้างแอป Notes แบบ Real-time',
          description: 'สร้างแอปที่ใช้ Firebase Firestore และ Authentication',
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
                    ทดลองสร้าง Notes App
                  </Text>
                  
                  {/* Note Form */}
                  <Card>
                    <Card.Header>
                      <Heading size="md">สร้างโน้ตใหม่</Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack space={3}>
                        <Input
                          placeholder="หัวข้อโน้ต"
                          value={noteTitle}
                          onChangeText={setNoteTitle}
                        />
                        
                        <TextArea
                          placeholder="เนื้อหาโน้ต..."
                          value={noteContent}
                          onChangeText={setNoteContent}
                          h={20}
                        />
                        
                        <HStack space={3} alignItems="center">
                          <Text fontSize="sm" color={textColor}>
                            สาธารณะ
                          </Text>
                          <Switch
                            value={isPublic}
                            onToggle={setIsPublic}
                          />
                        </HStack>
                        
                        <Button
                          onPress={() => {
                            if (noteTitle.trim() && noteContent.trim()) {
                              Alert.alert(
                                'สำเร็จ',
                                'สร้างโน้ตสำเร็จ! (จำลองการทำงาน)',
                                [
                                  {
                                    text: 'ตกลง',
                                    onPress: () => {
                                      setNoteTitle('');
                                      setNoteContent('');
                                      setIsPublic(false);
                                    }
                                  }
                                ]
                              );
                            } else {
                              Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ');
                            }
                          }}
                          colorScheme="blue"
                        >
                          สร้างโน้ต
                        </Button>
                      </VStack>
                    </Card.Body>
                  </Card>
                  
                  {/* Firebase Features Demo */}
                  <Card>
                    <Card.Header>
                      <Heading size="md">Firebase Features</Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack space={3}>
                        <Button
                          onPress={() => Alert.alert(
                            'Authentication',
                            'จำลองการเข้าสู่ระบบด้วย Email/Password'
                          )}
                          colorScheme="green"
                        >
                          เข้าสู่ระบบ
                        </Button>
                        
                        <Button
                          onPress={() => Alert.alert(
                            'Google Sign-in',
                            'จำลองการเข้าสู่ระบบด้วย Google'
                          )}
                          colorScheme="orange"
                        >
                          เข้าสู่ระบบด้วย Google
                        </Button>
                        
                        <Button
                          onPress={() => Alert.alert(
                            'Real-time Database',
                            'จำลองการดึงข้อมูลแบบ Real-time'
                          )}
                          colorScheme="purple"
                        >
                          ดึงข้อมูล Real-time
                        </Button>
                        
                        <Button
                          onPress={() => Alert.alert(
                            'Cloud Storage',
                            'จำลองการอัปโหลดไฟล์'
                          )}
                          colorScheme="cyan"
                        >
                          อัปโหลดไฟล์
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
                      💡 สิ่งที่เรียนรู้:
                    </Text>
                    <VStack space={1}>
                      <Text fontSize="sm" color={subtitleColor}>
                        • Firebase เป็น Backend-as-a-Service ที่ใช้งานง่าย
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • Firestore รองรับ Real-time updates
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • Authentication มีระบบความปลอดภัยสูง
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • รองรับ Offline mode และ Auto-sync
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
                Firebase Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การใช้ Firebase สำหรับ Backend และ Real-time Database
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
                colorScheme={currentStep === index ? 'orange' : 'gray'}
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
              🔥 จุดสำคัญที่ต้องจำ
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={textColor}>
                • Firebase เป็น Backend-as-a-Service ที่ใช้งานง่าย
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Firestore รองรับ Real-time updates
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Authentication มีระบบความปลอดภัยสูง
              </Text>
              <Text fontSize="sm" color={textColor}>
                • รองรับ Offline mode และ Auto-sync
              </Text>
              <Text fontSize="sm" color={textColor}>
                • มี Security Rules สำหรับควบคุมการเข้าถึง
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default FirebaseWorkshopScreen; 