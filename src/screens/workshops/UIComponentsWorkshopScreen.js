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
  Card,
  Heading,
  Divider,
  Avatar,
  Progress,
  Switch,
  Slider,
  Select,
  CheckIcon,
  TextArea,
  ScrollView as NBScrollView,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const UIComponentsWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedValue, setSelectedValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  const workshopSteps = [
    {
      id: 'nativebase-components',
      title: 'NativeBase Components: พื้นฐาน',
      content: [
        {
          subtitle: 'NativeBase คืออะไร?',
          description: 'NativeBase เป็น UI component library สำหรับ React Native ที่มี components สวยงามและใช้งานง่าย',
          details: [
            '🎨 มี Components สวยงามและใช้งานง่าย',
            '🌙 รองรับ Dark/Light Mode',
            '📱 Responsive และ Cross-platform',
            '⚡ Performance ดีและ Bundle size เล็ก',
            '🔧 Customizable และ Extensible'
          ]
        },
        {
          subtitle: 'Layout Components',
          description: 'เรียนรู้การใช้ Layout Components พื้นฐาน',
          code: `// Box - Container component
<Box bg="white" p={4} rounded="lg" shadow={2}>
  <Text>เนื้อหาข้างใน</Text>
</Box>

// VStack - Vertical Stack
<VStack space={4}>
  <Text>รายการที่ 1</Text>
  <Text>รายการที่ 2</Text>
  <Text>รายการที่ 3</Text>
</VStack>

// HStack - Horizontal Stack
<HStack space={4} alignItems="center">
  <Icon name="star" />
  <Text>ข้อความ</Text>
  <Button>ปุ่ม</Button>
</HStack>`
        },
        {
          subtitle: 'Text และ Typography',
          description: 'จัดการข้อความและ Typography',
          code: `// Text components
<Text fontSize="xs">ข้อความเล็ก</Text>
<Text fontSize="sm">ข้อความเล็ก</Text>
<Text fontSize="md">ข้อความกลาง</Text>
<Text fontSize="lg">ข้อความใหญ่</Text>
<Text fontSize="xl">ข้อความใหญ่มาก</Text>
<Text fontSize="2xl">ข้อความใหญ่มาก</Text>

// Heading components
<Heading size="xs">หัวข้อเล็ก</Heading>
<Heading size="sm">หัวข้อเล็ก</Heading>
<Heading size="md">หัวข้อกลาง</Heading>
<Heading size="lg">หัวข้อใหญ่</Heading>
<Heading size="xl">หัวข้อใหญ่มาก</Heading>`
        }
      ]
    },
    {
      id: 'form-components',
      title: 'Form Components: องค์ประกอบฟอร์ม',
      content: [
        {
          subtitle: 'Input Components',
          description: 'เรียนรู้การใช้ Input components ต่างๆ',
          form: true
        },
        {
          subtitle: 'Button Components',
          description: 'ปุ่มต่างๆ ใน NativeBase',
          code: `// Button variants
<Button colorScheme="blue">ปุ่มปกติ</Button>
<Button variant="outline" colorScheme="blue">ปุ่มขอบ</Button>
<Button variant="ghost" colorScheme="blue">ปุ่มโปร่งใส</Button>
<Button variant="link" colorScheme="blue">ปุ่มลิงก์</Button>

// Button sizes
<Button size="xs">เล็กมาก</Button>
<Button size="sm">เล็ก</Button>
<Button size="md">กลาง</Button>
<Button size="lg">ใหญ่</Button>`
        },
        {
          subtitle: 'Interactive Components',
          description: 'Components ที่โต้ตอบได้',
          code: `// Switch
<Switch value={isEnabled} onToggle={setIsEnabled} />

// Slider
<Slider value={value} onChange={setValue} />

// Select
<Select
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  placeholder="เลือกตัวเลือก"
>
  <Select.Item label="ตัวเลือก 1" value="1" />
  <Select.Item label="ตัวเลือก 2" value="2" />
  <Select.Item label="ตัวเลือก 3" value="3" />
</Select>`
        }
      ]
    },
    {
      id: 'custom-components',
      title: 'Custom Components: สร้าง Components เอง',
      content: [
        {
          subtitle: 'สร้าง Custom Card Component',
          description: 'สร้าง Card component ที่สวยงามและใช้งานง่าย',
          code: `// CustomCard.js
import React from 'react';
import { Box, Text, VStack, HStack, Avatar, Badge } from 'native-base';

const CustomCard = ({ 
  title, 
  subtitle, 
  description, 
  imageUrl, 
  tags = [], 
  onPress 
}) => {
  return (
    <Box
      bg="white"
      p={4}
      rounded="lg"
      shadow={2}
      borderWidth={1}
      borderColor="gray.200"
      mb={4}
    >
      <HStack space={4} alignItems="center">
        <Avatar
          size="md"
          source={{ uri: imageUrl }}
          fallbackText={title.charAt(0)}
        />
        
        <VStack flex={1} space={1}>
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {subtitle}
          </Text>
          <Text fontSize="xs" color="gray.500" numberOfLines={2}>
            {description}
          </Text>
          
          {tags.length > 0 && (
            <HStack space={2} mt={2}>
              {tags.map((tag, index) => (
                <Badge key={index} colorScheme="blue" variant="subtle">
                  {tag}
                </Badge>
              ))}
            </HStack>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default CustomCard;`
        },
        {
          subtitle: 'สร้าง Custom Button Component',
          description: 'สร้าง Button component ที่มี style เฉพาะ',
          code: `// CustomButton.js
import React from 'react';
import { Button, HStack, Icon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const CustomButton = ({ 
  title, 
  icon, 
  variant = 'solid', 
  colorScheme = 'blue',
  onPress,
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      colorScheme={colorScheme}
      onPress={onPress}
      {...props}
    >
      <HStack space={2} alignItems="center">
        {icon && <Icon as={MaterialIcons} name={icon} size="sm" />}
        <Text fontWeight="bold">{title}</Text>
      </HStack>
    </Button>
  );
};

export default CustomButton;`
        }
      ]
    },
    {
      id: 'styling-theme',
      title: 'Styling และ Theme: จัดการ Theme',
      content: [
        {
          subtitle: 'Color Mode',
          description: 'จัดการ Dark/Light Mode',
          code: `// ใช้ useColorModeValue
const bgColor = useColorModeValue('white', 'gray.800');
const textColor = useColorModeValue('gray.800', 'white');

// ใช้ใน Component
<Box bg={bgColor}>
  <Text color={textColor}>ข้อความ</Text>
</Box>

// Toggle Color Mode
import { useColorMode } from 'native-base';

const MyComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Button onPress={toggleColorMode}>
      {colorMode === 'light' ? '🌙' : '☀️'} 
      {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
    </Button>
  );
};`
        },
        {
          subtitle: 'Custom Theme',
          description: 'สร้าง Theme เฉพาะสำหรับแอป',
          code: `// theme.js
import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      900: '#0D47A1',
    },
    secondary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#7B1FA2',
      900: '#4A148C',
    }
  },
  fonts: {
    heading: 'Roboto-Bold',
    body: 'Roboto-Regular',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Text: {
      defaultProps: {
        fontFamily: 'body',
      },
    },
  },
});

export default customTheme;`
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
                    ทดลองใช้ Form Components
                  </Text>
                  
                  {/* Input Examples */}
                  <VStack space={3}>
                    <Input placeholder="กรอกข้อความ" />
                    <Input placeholder="กรอกรหัสผ่าน" type="password" />
                    <TextArea placeholder="กรอกข้อความยาว" />
                  </VStack>
                  
                  {/* Interactive Components */}
                  <VStack space={4}>
                    <HStack space={4} alignItems="center">
                      <Text fontSize="sm">Switch:</Text>
                      <Switch value={switchValue} onToggle={setSwitchValue} />
                    </HStack>
                    
                    <VStack space={2}>
                      <Text fontSize="sm">Slider: {sliderValue}%</Text>
                      <Slider value={sliderValue} onChange={setSliderValue} />
                    </VStack>
                    
                    <Select
                      selectedValue={selectedValue}
                      onValueChange={setSelectedValue}
                      placeholder="เลือกตัวเลือก"
                    >
                      <Select.Item label="ตัวเลือก 1" value="1" />
                      <Select.Item label="ตัวเลือก 2" value="2" />
                      <Select.Item label="ตัวเลือก 3" value="3" />
                    </Select>
                  </VStack>
                  
                  {/* Button Examples */}
                  <VStack space={3}>
                    <Button colorScheme="blue">ปุ่มปกติ</Button>
                    <Button variant="outline" colorScheme="blue">ปุ่มขอบ</Button>
                    <Button variant="ghost" colorScheme="blue">ปุ่มโปร่งใส</Button>
                  </VStack>
                  
                  {/* Card Example */}
                  <Card>
                    <Card.Header>
                      <Heading size="md">ตัวอย่างการ์ด</Heading>
                    </Card.Header>
                    <Card.Body>
                      <Text>นี่คือตัวอย่างการ์ดที่สร้างด้วย NativeBase</Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button colorScheme="blue">ดำเนินการ</Button>
                    </Card.Footer>
                  </Card>
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
                UI Components Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การใช้ NativeBase Components และการสร้าง Custom Components
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
                colorScheme={currentStep === index ? 'purple' : 'gray'}
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
              🎨 จุดสำคัญที่ต้องจำ
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={textColor}>
                • NativeBase มี Components สวยงามและใช้งานง่าย
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ใช้ Layout Components (Box, VStack, HStack) สำหรับจัดวาง
              </Text>
              <Text fontSize="sm" color={textColor}>
                • สร้าง Custom Components เพื่อความยืดหยุ่น
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ใช้ useColorModeValue สำหรับ Dark/Light Mode
              </Text>
              <Text fontSize="sm" color={textColor}>
                • สร้าง Custom Theme เพื่อความสวยงามของแอป
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default UIComponentsWorkshopScreen; 