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
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const MainMenuScreen = ({ navigation }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  const menuItems = [
    {
      id: 'launchpad',
      title: 'The Launchpad',
      subtitle: 'เริ่มต้นการเดินทางในโลก React Native',
      icon: 'rocket',
      color: 'violet.500',
      description: 'ทำความรู้จักกับ React Native, ติดตั้งเครื่องมือ, และสร้างแอปแรกของคุณ',
    },
    {
      id: 'props-context',
      title: 'Props & Context API',
      subtitle: 'พื้นฐานการจัดการข้อมูล',
      icon: 'code',
      color: 'blue.500',
      description: 'เรียนรู้การส่งข้อมูลระหว่าง Components และการจัดการ State แบบ Global',
    },
    {
      id: 'ui-components',
      title: 'UI Components',
      subtitle: 'การสร้าง UI ที่สวยงาม',
      icon: 'palette',
      color: 'purple.500',
      description: 'สร้าง Components ที่สวยงามและใช้งานง่าย',
    },
    {
      id: 'navigation',
      title: 'Navigation',
      subtitle: 'การสร้างแอปหลายหน้าจอ',
      icon: 'navigation',
      color: 'green.500',
      description: 'เรียนรู้การสร้าง Navigation ระหว่างหน้าจอต่างๆ',
    },
    {
      id: 'state-management',
      title: 'State Management',
      subtitle: 'การจัดการข้อมูลขั้นสูง',
      icon: 'storage',
      color: 'orange.500',
      description: 'จัดการข้อมูลที่ซับซ้อนและมีประสิทธิภาพ',
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      subtitle: 'การเชื่อมต่อข้อมูลจากภายนอก',
      icon: 'cloud',
      color: 'cyan.500',
      description: 'ดึงข้อมูลจาก API และจัดการการเชื่อมต่อ',
    },
    {
      id: 'forms-validation',
      title: 'Forms & Validation',
      subtitle: 'การจัดการฟอร์มและตรวจสอบข้อมูล',
      icon: 'edit',
      color: 'pink.500',
      description: 'สร้างฟอร์มที่ใช้งานง่ายและตรวจสอบข้อมูลได้',
    },
    {
      id: 'firebase',
      title: 'Firebase',
      subtitle: 'ฐานข้อมูล Real-time',
      icon: 'local-fire-department',
      color: 'red.500',
      description: 'ใช้ Firebase สำหรับฐานข้อมูลและ Authentication',
    },
    {
      id: 'maps-location',
      title: 'Maps & Location',
      subtitle: 'แผนที่และตำแหน่ง',
      icon: 'location-on',
      color: 'teal.500',
      description: 'แสดงแผนที่และจัดการตำแหน่งผู้ใช้',
    },
    {
      id: 'camera-images',
      title: 'Camera & Images',
      subtitle: 'การจัดการรูปภาพ',
      icon: 'camera-alt',
      color: 'indigo.500',
      description: 'ถ่ายรูปและจัดการรูปภาพในแอป',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'การแจ้งเตือน',
      icon: 'notifications',
      color: 'yellow.500',
      description: 'ส่งการแจ้งเตือนไปยังผู้ใช้',
    },
    {
      id: 'deployment',
      title: 'Deployment',
      subtitle: 'การส่งแอปไป App Store',
      icon: 'rocket-launch',
      color: 'emerald.500',
      description: 'เตรียมแอปสำหรับส่งไป App Store',
    },
  ];

  const handleMenuPress = (item) => {
    navigation.navigate('TopicDetail', { topic: item });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
      <Box safeArea p={4}>
        {/* Header */}
        <VStack space={4} mb={6}>
          <Text fontSize="3xl" fontWeight="bold" color={textColor} textAlign="center">
            React Native Bootcamp
          </Text>
          <Text fontSize="md" color={subtitleColor} textAlign="center">
            เรียนรู้ React Native แบบครบวงจร ตั้งแต่พื้นฐานจนถึงขั้นสูง
          </Text>
        </VStack>

        {/* Menu Items */}
        <VStack space={4}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handleMenuPress(item)}
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
                  {/* Icon */}
                  <Box
                    bg={item.color}
                    p={3}
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={MaterialIcons}
                      name={item.icon}
                      size="md"
                      color="white"
                    />
                  </Box>

                  {/* Content */}
                  <VStack flex={1} space={1}>
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {item.title}
                    </Text>
                    <Text fontSize="sm" color={subtitleColor}>
                      {item.subtitle}
                    </Text>
                    <Text fontSize="xs" color={subtitleColor} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </VStack>

                  {/* Arrow */}
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
            เลือกหัวข้อที่ต้องการเรียนรู้เพื่อเริ่มต้นการเดินทางในโลกของ React Native! 🚀
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};



export default MainMenuScreen; 