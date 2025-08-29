import React, { useState } from 'react';
import { ScrollView, Alert, Linking } from 'react-native';
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  useColorModeValue,
  Badge,
  Link,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const LaunchpadWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  const workshopSteps = [
    {
      id: 'introduction',
      title: 'Introduction: ทำความรู้จัก React Native',
      content: [
        {
          subtitle: 'React Native คืออะไร?',
          description: 'React Native เป็น framework ที่พัฒนาโดย Facebook สำหรับสร้างแอปมือถือที่ใช้ JavaScript และ React',
          details: [
            'ใช้ JavaScript/TypeScript ในการพัฒนา',
            'เขียนครั้งเดียวใช้ได้ทั้ง iOS และ Android',
            'มี Performance ใกล้เคียงกับ Native App',
            'มี Community และ Ecosystem ที่ใหญ่',
            'ใช้ React Component Pattern'
          ]
        },
        {
          subtitle: 'ข้อดีของ React Native',
          description: 'React Native มีข้อดีมากมายที่ทำให้เป็นตัวเลือกที่ดีสำหรับการพัฒนาแอปมือถือ',
          details: [
            '🔄 Code Reusability - ใช้โค้ดร่วมกันได้',
            '⚡ Fast Development - พัฒนาได้เร็ว',
            '📱 Cross-Platform - ใช้ได้ทั้ง iOS และ Android',
            '🛠️ Hot Reload - เห็นการเปลี่ยนแปลงทันที',
            '📚 Large Community - มี Library และ Tools มากมาย'
          ]
        },
        {
          subtitle: 'ตัวอย่างแอปที่ใช้ React Native',
          description: 'แอปดังๆ หลายตัวใช้ React Native ในการพัฒนา',
          details: [
            '📘 Facebook - แอปหลักของ Facebook',
            '📷 Instagram - แอปแชร์รูปภาพ',
            '💬 WhatsApp - แอปแชท',
            '🎵 Discord - แอปแชทสำหรับเกมเมอร์',
            '📱 Skype - แอปวิดีโอคอล'
          ]
        }
      ]
    },
    {
      id: 'setup',
      title: 'Setup: ติดตั้งเครื่องมือที่จำเป็น',
      content: [
        {
          subtitle: 'เครื่องมือที่จำเป็น',
          description: 'เครื่องมือพื้นฐานที่ต้องติดตั้งสำหรับการพัฒนา React Native',
          details: [
            '💻 Node.js - JavaScript Runtime',
            '📝 VS Code - Code Editor',
            '📱 Expo CLI - Development Tools',
            '🔧 Git - Version Control',
            '📱 Expo Go - Testing App'
          ]
        },
        {
          subtitle: 'ขั้นตอนการติดตั้ง',
          description: 'ติดตั้งเครื่องมือทีละขั้นตอน',
          steps: [
            {
              title: '1. ติดตั้ง Node.js',
              description: 'ดาวน์โหลดและติดตั้ง Node.js จาก nodejs.org',
              action: () => Linking.openURL('https://nodejs.org')
            },
            {
              title: '2. ติดตั้ง Expo CLI',
              description: 'รันคำสั่ง: npm install -g @expo/cli',
              action: () => Alert.alert('คำสั่ง', 'npm install -g @expo/cli')
            },
            {
              title: '3. ติดตั้ง Expo Go',
              description: 'ดาวน์โหลด Expo Go จาก App Store หรือ Google Play',
              action: () => Linking.openURL('https://expo.dev/client')
            },
            {
              title: '4. สร้างโปรเจคแรก',
              description: 'รันคำสั่ง: npx create-expo-app MyFirstApp',
              action: () => Alert.alert('คำสั่ง', 'npx create-expo-app MyFirstApp')
            }
          ]
        }
      ]
    },
    {
      id: 'first-app',
      title: 'First App: สร้างแอปแรกของคุณ',
      content: [
        {
          subtitle: 'สร้างโปรเจคใหม่',
          description: 'สร้างโปรเจค React Native แรกของคุณ',
          code: `# สร้างโปรเจคใหม่
npx create-expo-app MyFirstApp

# เข้าไปในโฟลเดอร์โปรเจค
cd MyFirstApp

# เริ่มต้น development server
npx expo start`
        },
        {
          subtitle: 'โครงสร้างโปรเจค',
          description: 'ไฟล์และโฟลเดอร์สำคัญในโปรเจค React Native',
          details: [
            '📁 App.js - ไฟล์หลักของแอป',
            '📁 package.json - ข้อมูลโปรเจคและ dependencies',
            '📁 assets/ - รูปภาพและไฟล์ static',
            '📁 node_modules/ - ไฟล์ dependencies',
            '📁 .expo/ - ไฟล์ config ของ Expo'
          ]
        },
        {
          subtitle: 'รันแอปบนมือถือ',
          description: 'วิธีรันแอปบนมือถือจริง',
          steps: [
            {
              title: '1. เปิด Expo Go',
              description: 'เปิดแอป Expo Go บนมือถือ'
            },
            {
              title: '2. สแกน QR Code',
              description: 'สแกน QR Code ที่แสดงในเทอร์มินัล'
            },
            {
              title: '3. รอการโหลด',
              description: 'รอให้แอปโหลดเสร็จ'
            },
            {
              title: '4. ทดสอบแอป',
              description: 'ทดสอบการทำงานของแอป'
            }
          ]
        }
      ]
    },
    {
      id: 'basics',
      title: 'Basics: พื้นฐาน JavaScript และ React',
      content: [
        {
          subtitle: 'JavaScript Basics',
          description: 'พื้นฐาน JavaScript ที่จำเป็นสำหรับ React Native',
          details: [
            '📝 Variables (let, const, var)',
            '🔄 Functions (Arrow Functions)',
            '📦 Objects และ Arrays',
            '🔄 Destructuring',
            '⏰ Async/Await'
          ]
        },
        {
          subtitle: 'React Basics',
          description: 'พื้นฐาน React ที่จำเป็นสำหรับ React Native',
          details: [
            '🧩 Components - ส่วนประกอบของ UI',
            '📊 Props - การส่งข้อมูลระหว่าง Components',
            '🔄 State - การจัดการข้อมูลใน Component',
            '🎣 Hooks - useState, useEffect',
            '📝 JSX - การเขียน UI ใน JavaScript'
          ]
        },
        {
          subtitle: 'React Native Components',
          description: 'Components พื้นฐานของ React Native',
          details: [
            '📱 View - Container component',
            '📝 Text - แสดงข้อความ',
            '🔘 TouchableOpacity - ปุ่มที่กดได้',
            '📋 ScrollView - แสดงเนื้อหาที่เลื่อนได้',
            '🖼️ Image - แสดงรูปภาพ'
          ]
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
              
              {item.steps && (
                <VStack space={2}>
                  {item.steps.map((stepItem, stepIndex) => (
                    <Pressable
                      key={stepIndex}
                      onPress={stepItem.action}
                      _pressed={{ opacity: 0.7 }}
                    >
                      <Box
                        bg={useColorModeValue('gray.50', 'gray.600')}
                        p={3}
                        rounded="md"
                        borderWidth={1}
                        borderColor={useColorModeValue('gray.200', 'gray.500')}
                      >
                        <VStack space={1}>
                          <Text fontSize="sm" fontWeight="bold" color={textColor}>
                            {stepItem.title}
                          </Text>
                          <Text fontSize="xs" color={subtitleColor}>
                            {stepItem.description}
                          </Text>
                        </VStack>
                      </Box>
                    </Pressable>
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
                The Launchpad
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เริ่มต้นการเดินทางในโลก React Native
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
                colorScheme={currentStep === index ? 'violet' : 'gray'}
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

        {/* Quick Links */}
        <Box mt={8} p={4} bg={cardBgColor} rounded="lg">
          <VStack space={3}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              🔗 ลิงก์ที่เป็นประโยชน์
            </Text>
            <VStack space={2}>
              <Link href="https://reactnative.dev" isExternal>
                <Text fontSize="sm" color="blue.500" underline>
                  📚 React Native Documentation
                </Text>
              </Link>
              <Link href="https://expo.dev" isExternal>
                <Text fontSize="sm" color="blue.500" underline>
                  🚀 Expo Documentation
                </Text>
              </Link>
              <Link href="https://nodejs.org" isExternal>
                <Text fontSize="sm" color="blue.500" underline>
                  💻 Node.js Download
                </Text>
              </Link>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default LaunchpadWorkshopScreen; 