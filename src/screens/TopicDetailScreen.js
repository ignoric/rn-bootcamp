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
  Divider,
  Badge,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const TopicDetailScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  // ข้อมูลตัวอย่างสำหรับแต่ละหัวข้อ
  const topicContent = {
    'launchpad': {
      sections: [
        {
          title: 'React Native คืออะไร?',
          content: 'React Native เป็น framework ที่พัฒนาโดย Facebook สำหรับสร้างแอปมือถือที่ใช้ JavaScript และ React',
          type: 'theory'
        },
        {
          title: 'ข้อดีของ React Native',
          content: 'เขียนครั้งเดียวใช้ได้ทั้ง iOS และ Android, มี Performance ดี, และมี Community ใหญ่',
          type: 'theory'
        },
        {
          title: 'เครื่องมือที่จำเป็น',
          content: 'Node.js, VS Code, Expo CLI, และเครื่องมืออื่นๆ ที่จำเป็นสำหรับการพัฒนา',
          type: 'theory'
        },
        {
          title: 'Workshop: สร้างแอปแรก',
          content: 'สร้างแอป Hello World และรันบนมือถือจริงผ่าน Expo Go',
          type: 'workshop'
        }
      ]
    },
    'props-context': {
      sections: [
        {
          title: 'Props คืออะไร?',
          content: 'Props เป็นการส่งข้อมูลจาก Parent Component ไปยัง Child Component',
          type: 'theory'
        },
        {
          title: 'การใช้งาน Props',
          content: 'เรียนรู้วิธีการส่งและรับ Props ใน React Native Components',
          type: 'theory'
        },
        {
          title: 'Context API',
          content: 'Context API ช่วยจัดการ Global State และลดปัญหา Prop Drilling',
          type: 'theory'
        },
        {
          title: 'Workshop: สร้างแอปตัวอย่าง',
          content: 'สร้างแอปที่ใช้ Props และ Context API จริง',
          type: 'workshop'
        }
      ]
    },
    'ui-components': {
      sections: [
        {
          title: 'NativeBase Components',
          content: 'เรียนรู้การใช้ Components จาก NativeBase Library',
          type: 'theory'
        },
        {
          title: 'Custom Components',
          content: 'สร้าง Components เองที่สวยงามและใช้งานง่าย',
          type: 'theory'
        },
        {
          title: 'Styling และ Theme',
          content: 'จัดการ styling และ theme ของแอป',
          type: 'theory'
        },
        {
          title: 'Workshop: สร้าง UI Components',
          content: 'สร้างการ์ดสวยงามและ UI components ด้วย NativeBase',
          type: 'workshop'
        }
      ]
    },
    'navigation': {
      sections: [
        {
          title: 'React Navigation',
          content: 'เรียนรู้การสร้าง Navigation ระหว่างหน้าจอ',
          type: 'theory'
        },
        {
          title: 'Stack Navigator',
          content: 'สร้าง Navigation แบบ Stack สำหรับหน้าจอหลายหน้า',
          type: 'theory'
        },
        {
          title: 'Tab Navigator',
          content: 'สร้าง Navigation แบบ Tab สำหรับแอปที่มีหลายส่วน',
          type: 'theory'
        },
        {
          title: 'Workshop: Multi-Screen App',
          content: 'สร้างแอปที่มีหลายหน้าจอและ Navigation',
          type: 'workshop'
        }
      ]
    },
    'state-management': {
      sections: [
        {
          title: 'Local State vs Global State',
          content: 'เข้าใจความแตกต่างระหว่าง Local และ Global State',
          type: 'theory'
        },
        {
          title: 'useReducer Hook',
          content: 'จัดการ State ที่ซับซ้อนด้วย useReducer',
          type: 'theory'
        },
        {
          title: 'Context API Advanced',
          content: 'ใช้ Context API สำหรับ State Management ขั้นสูง',
          type: 'theory'
        },
        {
          title: 'Workshop: Todo App',
          content: 'สร้างแอป Todo ที่ใช้ State Management',
          type: 'workshop'
        }
      ]
    },
    'api-integration': {
      sections: [
        {
          title: 'API คืออะไร?',
          content: 'ทำความเข้าใจแนวคิด API และการสื่อสารกับเซิร์ฟเวอร์',
          type: 'theory',
          id: 'api-basics'
        },
        {
          title: 'Async/Await',
          content: 'จัดการงานแบบ Asynchronous ให้อ่านง่ายขึ้น',
          type: 'theory',
          id: 'async-await'
        },
        {
          title: 'Error Handling',
          content: 'แนวทางจัดการข้อผิดพลาดเมื่อเรียก API',
          type: 'theory',
          id: 'error-handling'
        },
        {
          title: 'ปฏิบัติ',
          content: 'ลองใช้งานจริงกับตัวอย่างการดึงข้อมูล',
          type: 'workshop'
        },
        {
          title: 'Example: Prompts Library',
          content: 'ตัวอย่างการเรียก API จริงด้วย axios + token และแสดงผลลิสต์',
          type: 'example'
        }
      ]
    },
    'forms-validation': {
      sections: [
        {
          title: 'การจัดการฟอร์ม',
          content: 'เรียนรู้การใช้ useState และการจัดการข้อมูลในฟอร์ม',
          type: 'theory'
        },
        {
          title: 'การตรวจสอบข้อมูล',
          content: 'ตรวจสอบข้อมูลที่ผู้ใช้กรอกก่อนส่งฟอร์ม',
          type: 'theory'
        },
        {
          title: 'NativeBase Form Components',
          content: 'ใช้ NativeBase components สำหรับสร้างฟอร์ม',
          type: 'theory'
        },
        {
          title: 'Workshop: สร้างฟอร์มลงทะเบียน',
          content: 'สร้างฟอร์มลงทะเบียนที่มีการตรวจสอบข้อมูล',
          type: 'workshop'
        }
      ]
    },
    'firebase': {
      sections: [
        {
          title: 'Firebase Setup',
          content: 'ติดตั้งและตั้งค่า Firebase ในโปรเจค',
          type: 'theory'
        },
        {
          title: 'Firestore Database',
          content: 'ใช้ Firestore สำหรับฐานข้อมูล Real-time',
          type: 'theory'
        },
        {
          title: 'Authentication',
          content: 'สร้างระบบ Authentication ด้วย Firebase',
          type: 'theory'
        },
        {
          title: 'Workshop: Chat App',
          content: 'สร้างแอปแชทที่ใช้ Firebase',
          type: 'workshop'
        }
      ]
    },
    'maps-location': {
      sections: [
        {
          title: 'React Native Maps',
          content: 'แสดงแผนที่ในแอปด้วย React Native Maps',
          type: 'theory'
        },
        {
          title: 'Location Services',
          content: 'ขอและจัดการตำแหน่งผู้ใช้',
          type: 'theory'
        },
        {
          title: 'Geolocation API',
          content: 'ใช้ Geolocation API สำหรับการติดตามตำแหน่ง',
          type: 'theory'
        },
        {
          title: 'Workshop: Location Tracker',
          content: 'สร้างแอปติดตามตำแหน่ง',
          type: 'workshop'
        }
      ]
    },
    'camera-images': {
      sections: [
        {
          title: 'Expo Camera',
          content: 'ใช้ Expo Camera สำหรับถ่ายรูป',
          type: 'theory'
        },
        {
          title: 'Image Picker',
          content: 'เลือกรูปภาพจากคลังภาพ',
          type: 'theory'
        },
        {
          title: 'Image Processing',
          content: 'ประมวลผลและแก้ไขรูปภาพ',
          type: 'theory'
        },
        {
          title: 'Workshop: Photo App',
          content: 'สร้างแอปถ่ายรูปและจัดการรูปภาพ',
          type: 'workshop'
        }
      ]
    },
    'notifications': {
      sections: [
        {
          title: 'Push Notifications',
          content: 'ส่งการแจ้งเตือนไปยังผู้ใช้',
          type: 'theory'
        },
        {
          title: 'Local Notifications',
          content: 'สร้างการแจ้งเตือนในเครื่อง',
          type: 'theory'
        },
        {
          title: 'Notification Scheduling',
          content: 'ตั้งเวลาการแจ้งเตือน',
          type: 'theory'
        },
        {
          title: 'Workshop: Reminder App',
          content: 'สร้างแอปเตือนความจำ',
          type: 'workshop'
        }
      ]
    },
    'deployment': {
      sections: [
        {
          title: 'EAS Build',
          content: 'สร้างไฟล์ APK/IPA ด้วย EAS',
          type: 'theory'
        },
        {
          title: 'App Store Submission',
          content: 'ส่งแอปไป App Store และ Google Play',
          type: 'theory'
        },
        {
          title: 'Code Signing',
          content: 'เซ็นโค้ดสำหรับการเผยแพร่',
          type: 'theory'
        },
        {
          title: 'Workshop: Deploy App',
          content: 'เตรียมและส่งแอปไป Store',
          type: 'workshop'
        }
      ]
    }
  };

  const handleSectionPress = (section) => {
    if (section.type === 'workshop') {
      // นำไปยัง Workshop Screen ตามหัวข้อ
      if (topic.id === 'launchpad') {
        navigation.navigate('LaunchpadWorkshop');
      } else if (topic.id === 'forms-validation') {
        navigation.navigate('FormsWorkshop');
      } else if (topic.id === 'props-context') {
        navigation.navigate('PropsContextWorkshop');
      } else if (topic.id === 'ui-components') {
        navigation.navigate('UIComponentsWorkshop');
      } else if (topic.id === 'navigation') {
        navigation.navigate('NavigationWorkshop');
      } else if (topic.id === 'state-management') {
        navigation.navigate('StateManagementWorkshop');
      } else if (topic.id === 'api-integration') {
        navigation.navigate('APIIntegrationWorkshop');
      } else {
        Alert.alert('Workshop', `Workshop สำหรับหัวข้อ "${topic.title}" ยังไม่พร้อมใช้งาน`);
      }
    } else if (section.type === 'example') {
      // ตัวอย่างจริง: ไปหน้าตัวอย่างโดยตรง
      navigation.navigate('PromptsLibrary');
    } else {
      // ทฤษฎี: เปิด Workshop เดียวกันแต่กระโดดไปยังหัวข้อที่เลือก
      if (topic.id === 'api-integration' && section.id) {
        navigation.navigate('APIIntegrationWorkshop', { openStepId: section.id });
      } else {
        navigation.navigate('TheoryDetail', { 
          section: {
            ...section,
            id: section.title.toLowerCase().replace(/\s+/g, '-')
          }, 
          topic 
        });
      }
    }
  };

  const content = topicContent[topic.id] || {
    sections: [
      {
        title: 'เนื้อหากำลังพัฒนา',
        content: 'เนื้อหาสำหรับหัวข้อนี้กำลังอยู่ในระหว่างการพัฒนา',
        type: 'theory'
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
                {topic.title}
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                {topic.subtitle}
              </Text>
            </VStack>
          </HStack>

          <Text fontSize="md" color={subtitleColor}>
            {topic.description}
          </Text>
        </VStack>

        {/* Content Sections */}
        <VStack space={4}>
          {content.sections.map((section, index) => (
            <Pressable
              key={index}
              onPress={() => handleSectionPress(section)}
              _pressed={{ opacity: 0.7 }}
            >
              <Box
                bg={cardBgColor}
                p={4}
                rounded="lg"
                shadow={2}
                borderWidth={1}
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              >
                <HStack space={4} alignItems="center">
                  <Box
                    bg={section.type === 'workshop' ? 'green.500' : 'blue.500'}
                    p={2}
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={MaterialIcons}
                      name={section.type === 'workshop' ? 'school' : 'book'}
                      size="sm"
                      color="white"
                    />
                  </Box>
                  
                  <VStack flex={1} space={1}>
                    <HStack space={2} alignItems="center">
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        {section.title}
                      </Text>
                      <Badge
                        colorScheme={section.type === 'workshop' ? 'green' : section.type === 'example' ? 'purple' : 'blue'}
                        variant="subtle"
                        rounded="full"
                      >
                        {section.type === 'workshop' ? 'Workshop' : section.type === 'example' ? 'Example' : 'Theory'}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color={subtitleColor}>
                      {section.content}
                    </Text>
                  </VStack>

                  <Icon
                    as={MaterialIcons}
                    name="chevron-right"
                    size="sm"
                    color={subtitleColor}
                  />
                </HStack>
              </Box>
            </Pressable>
          ))}
        </VStack>

        {/* Footer */}
        <Box mt={8} p={4} bg={cardBgColor} rounded="lg">
          <Text fontSize="sm" color={subtitleColor} textAlign="center">
            เลือกหัวข้อเพื่อเริ่มเรียนรู้! 📚
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default TopicDetailScreen; 