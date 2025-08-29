import React, { useState, useEffect } from 'react';
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
  Heading,
  Divider,
  Input,
  Spinner,
  FlatList,
  Avatar,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const APIIntegrationWorkshopScreen = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  // Hoisted color tokens
  const borderGray200_600 = useColorModeValue('gray.200', 'gray.600');
  const codeBgGray100_600 = useColorModeValue('gray.100', 'gray.600');
  const listItemBgGray50_600 = useColorModeValue('gray.50', 'gray.600');
  const listItemBorderGray200_500 = useColorModeValue('gray.200', 'gray.500');
  const infoBgBlue50_900 = useColorModeValue('blue.50', 'blue.900');
  const infoBorderBlue200_700 = useColorModeValue('blue.200', 'blue.700');

  // ตั้งค่า step เริ่มต้นจาก route param
  useEffect(() => {
    const openStepId = route?.params?.openStepId;
    if (openStepId) {
      const idx = workshopSteps.findIndex((s) => s.id === openStepId);
      if (idx >= 0) {
        setCurrentStep(idx);
      }
    }
  }, [route?.params?.openStepId]);

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      Alert.alert('ข้อผิดพลาด', err.message);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันค้นหาผู้ใช้
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const workshopSteps = [
    {
      id: 'api-basics',
      title: 'API Basics: พื้นฐานการใช้งาน API',
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
          ]
        },
        {
          subtitle: 'HTTP Methods',
          description: 'เรียนรู้ HTTP methods ที่ใช้ในการทำงานกับ API',
          details: [
            '📖 GET - ดึงข้อมูลจากเซิร์ฟเวอร์',
            '📝 POST - ส่งข้อมูลใหม่ไปยังเซิร์ฟเวอร์',
            '✏️ PUT - อัปเดตข้อมูลทั้งหมด',
            '🔄 PATCH - อัปเดตข้อมูลบางส่วน',
            '🗑️ DELETE - ลบข้อมูลจากเซิร์ฟเวอร์'
          ]
        },
        {
          subtitle: 'การจัดการ Response',
          description: 'เรียนรู้การจัดการ response จาก API',
          code: `// ตรวจสอบ Response Status
const response = await fetch('https://api.example.com/users');

if (response.ok) {
  // Status 200-299 (สำเร็จ)
  const data = await response.json();
  console.log('ข้อมูล:', data);
} else {
  // Status 400+ (ข้อผิดพลาด)
  console.error('ข้อผิดพลาด:', response.status);
}

// ตรวจสอบ Content-Type
const contentType = response.headers.get('content-type');
if (contentType && contentType.includes('application/json')) {
  const data = await response.json();
} else {
  const text = await response.text();
}`
        }
      ]
    },
    {
      id: 'fetch-api',
      title: 'Fetch API: การดึงข้อมูล',
      content: [
        {
          subtitle: 'การใช้ Fetch API',
          description: 'เรียนรู้การใช้ Fetch API สำหรับดึงข้อมูลจากเซิร์ฟเวอร์',
          code: `// การดึงข้อมูลพื้นฐาน
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
};

// การอัปเดตข้อมูล
const updatePost = async (id, updateData) => {
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log('อัปเดตสำเร็จ:', data);
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
  }
};`
        },
        {
          subtitle: 'Error Handling',
          description: 'การจัดการข้อผิดพลาดในการเรียก API',
          code: `// Error Handling ที่ดี
const fetchDataWithErrorHandling = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    setData(data);
    
  } catch (error) {
    setError(error.message);
    console.error('ข้อผิดพลาด:', error);
    
    // แสดงข้อผิดพลาดให้ผู้ใช้
    Alert.alert(
      'ข้อผิดพลาด',
      'ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
    );
  } finally {
    setLoading(false);
  }
};

// Timeout handling
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('การเชื่อมต่อหมดเวลา');
    }
    throw error;
  }
};`
        }
      ]
    },
    {
      id: 'example-prompts',
      title: 'Example: Prompts Library',
      content: [
        {
          subtitle: 'ตัวอย่างดึงข้อมูลจริงด้วย axios + token',
          description: 'เดโมการเรียก API จาก Prompts Library แล้วแสดงผลลิสต์ด้วย NativeBase',
          details: [
            '🔐 ใส่ Bearer Token ใน header',
            '🌐 ใช้ baseURL จาก config',
            '🧭 นำทางไปหน้าตัวอย่างเพื่อลองใช้งานจริง'
          ]
        },
        {
          subtitle: 'ไปยังหน้าตัวอย่าง',
          description: 'กดปุ่มเพื่อไปยัง Prompts Library',
          actionNavigate: true
        }
      ]
    },
    {
      id: 'async-await',
      title: 'Async/Await: การจัดการการทำงานแบบ Asynchronous',
      content: [
        {
          subtitle: 'Async/Await คืออะไร?',
          description: 'Async/Await เป็นวิธีจัดการการทำงานแบบ Asynchronous ที่ง่ายกว่า Promises',
          details: [
            '🔄 Async = ฟังก์ชันที่ทำงานแบบ Asynchronous',
            '⏳ Await = รอให้ Promise เสร็จสิ้น',
            '📝 เขียนโค้ดได้ง่ายกว่า Promises',
            '🎯 จัดการ Error ได้ด้วย try/catch',
            '⚡ ทำให้โค้ดอ่านง่ายและเข้าใจง่าย'
          ]
        },
        {
          subtitle: 'การใช้งาน Async/Await',
          description: 'เรียนรู้การใช้งาน Async/Await ในการเรียก API',
          code: `// ฟังก์ชัน Async พื้นฐาน
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
    throw error;
  }
};

// การเรียกใช้ฟังก์ชัน Async
const loadUserProfile = async () => {
  try {
    setLoading(true);
    const user = await fetchUserData(1);
    setUserData(user);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// การเรียกหลาย API พร้อมกัน
const loadUserAndPosts = async (userId) => {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch(\`https://api.example.com/users/\${userId}\`),
      fetch(\`https://api.example.com/users/\${userId}/posts\`)
    ]);
    
    const user = await userResponse.json();
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('ข้อผิดพลาด:', error);
    throw error;
  }
};

// การใช้ Async ใน useEffect
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchData();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  loadData();
}, []);`
        }
      ]
    },
    {
      id: 'api-practice',
      title: 'ปฏิบัติ: สร้างแอปดึงข้อมูลจาก API',
      content: [
        {
          subtitle: 'สร้างแอปแสดงรายชื่อผู้ใช้',
          description: 'สร้างแอปที่ดึงข้อมูลผู้ใช้จาก API และแสดงผล',
          form: true
        }
      ]
    }
  ];

  const renderStep = (step) => {
    return (
      <VStack space={4}>
        {step.id === 'fetch-api' && (
          <Pressable onPress={() => navigation.navigate('PromptsLibrary')} _pressed={{ opacity: 0.7 }}>
            <HStack space={3} alignItems="center" bg={cardBgColor} px={4} py={3} rounded="md" borderWidth={1} borderColor={borderGray200_600}>
              <Icon as={MaterialIcons} name="list" size="sm" color={textColor} />
              <VStack>
                <Text fontSize="md" fontWeight="bold" color={textColor}>เมนูย่อย 1: Prompts Library</Text>
                <Text fontSize="xs" color={subtitleColor}>ตัวอย่าง axios + token และการแสดงผลลิสต์</Text>
              </VStack>
            </HStack>
          </Pressable>
        )}
        {step.content.map((item, index) => (
          <Box
            key={index}
            bg={cardBgColor}
            p={4}
            rounded="lg"
            shadow={2}
            borderWidth={1}
            borderColor={borderGray200_600}
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
                  bg={codeBgGray100_600}
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
                    ทดลองดึงข้อมูลจาก API
                  </Text>
                  
                  {/* API Controls */}
                  <Box bg={useColorModeValue('white','gray.700')} rounded="md" borderWidth={1} borderColor={borderGray200_600}>
                    <Box px={4} py={3} borderBottomWidth={1} borderColor={borderGray200_600}>
                      <Heading size="md">User API Demo</Heading>
                    </Box>
                    <Box px={4} py={3}>
                      <VStack space={3}>
                        <HStack space={2}>
                          <Button
                            onPress={fetchUsers}
                            colorScheme="blue"
                            isLoading={loading}
                            flex={1}
                          >
                            ดึงข้อมูลผู้ใช้
                          </Button>
                          <Button
                            onPress={() => {
                              setUsers([]);
                              setError(null);
                            }}
                            colorScheme="gray"
                            variant="outline"
                          >
                            ล้างข้อมูล
                          </Button>
                        </HStack>
                        
                        {error && (
                          <Box
                            bg="red.100"
                            p={3}
                            rounded="md"
                            borderWidth={1}
                            borderColor="red.300"
                          >
                            <Text color="red.800" fontSize="sm">
                              ข้อผิดพลาด: {error}
                            </Text>
                          </Box>
                        )}
                        
                        <Input
                          placeholder="ค้นหาผู้ใช้..."
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                          InputLeftElement={
                            <Icon
                              as={MaterialIcons}
                              name="search"
                              size="sm"
                              color="gray.400"
                              ml={2}
                            />
                          }
                        />
                      </VStack>
                    </Box>
                  </Box>
                  
                  {/* User List */}
                  {users.length > 0 && (
                    <Box bg={useColorModeValue('white','gray.700')} rounded="md" borderWidth={1} borderColor={borderGray200_600}>
                      <Box px={4} py={3} borderBottomWidth={1} borderColor={borderGray200_600}>
                        <Heading size="md">
                          รายชื่อผู้ใช้ ({filteredUsers.length} คน)
                        </Heading>
                      </Box>
                      <Box px={4} py={3}>
                        {loading ? (
                          <VStack space={3} alignItems="center" py={4}>
                            <Spinner size="lg" color="blue.500" />
                            <Text color={subtitleColor}>กำลังดึงข้อมูล...</Text>
                          </VStack>
                        ) : (
                          <FlatList
                            data={filteredUsers}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                              <Box
                                p={3}
                                mb={2}
                                bg={listItemBgGray50_600}
                                rounded="md"
                                borderWidth={1}
                                borderColor={listItemBorderGray200_500}
                              >
                                <HStack space={3} alignItems="center">
                                  <Avatar
                                    size="sm"
                                    bg="blue.500"
                                  >
                                    {item.name.charAt(0)}
                                  </Avatar>
                                  <VStack flex={1}>
                                    <Text fontSize="md" fontWeight="bold" color={textColor}>
                                      {item.name}
                                    </Text>
                                    <Text fontSize="sm" color={subtitleColor}>
                                      {item.email}
                                    </Text>
                                    <Text fontSize="xs" color={subtitleColor}>
                                      {item.company?.name}
                                    </Text>
                                  </VStack>
                                  <Badge colorScheme="blue" variant="subtle">
                                    ID: {item.id}
                                  </Badge>
                                </HStack>
                              </Box>
                            )}
                            showsVerticalScrollIndicator={false}
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                  
                  <Box
                    bg={infoBgBlue50_900}
                    p={4}
                    rounded="md"
                    borderWidth={1}
                    borderColor={infoBorderBlue200_700}
                  >
                    <Text fontSize="md" fontWeight="bold" color={textColor} mb={2}>
                      💡 สิ่งที่เรียนรู้:
                    </Text>
                    <VStack space={1}>
                      <Text fontSize="sm" color={subtitleColor}>
                        • ใช้ fetch() สำหรับดึงข้อมูลจาก API
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • ใช้ async/await สำหรับจัดการ Asynchronous
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • จัดการ Error ด้วย try/catch
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • แสดง Loading state ขณะดึงข้อมูล
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              )}

              {item.actionNavigate && (
                <Pressable onPress={() => navigation.navigate('PromptsLibrary')} _pressed={{ opacity: 0.7 }}>
                  <HStack space={3} alignItems="center" bg={cardBgColor} px={4} py={3} rounded="md" borderWidth={1} borderColor={borderGray200_600}>
                    <Icon as={MaterialIcons} name="open-in-new" size="sm" color={textColor} />
                    <VStack>
                      <Text fontSize="md" fontWeight="bold" color={textColor}>ไปยังหน้า Prompts Library</Text>
                      <Text fontSize="xs" color={subtitleColor}>แตะเพื่อเปิดเดโมดึงข้อมูลจริง</Text>
                    </VStack>
                  </HStack>
                </Pressable>
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
                API Integration Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การดึงข้อมูลจาก API และจัดการการทำงานแบบ Asynchronous
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
                colorScheme={currentStep === index ? 'cyan' : 'gray'}
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
              🌐 จุดสำคัญที่ต้องจำ
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={textColor}>
                • ใช้ fetch() สำหรับเรียก API
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ใช้ async/await สำหรับจัดการ Asynchronous
              </Text>
              <Text fontSize="sm" color={textColor}>
                • จัดการ Error ด้วย try/catch
              </Text>
              <Text fontSize="sm" color={textColor}>
                • แสดง Loading state ขณะดึงข้อมูล
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ตรวจสอบ response.ok ก่อนใช้งานข้อมูล
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default APIIntegrationWorkshopScreen; 