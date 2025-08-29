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
  Divider,
  Badge,
  Heading,
  Input,
  FormControl,
  Button,
  TextArea,
  Checkbox,
  Select,
  Radio,
  Switch,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const FormsWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    thaiId: '',
    password: '',
    confirmPassword: '',
    bio: '',
    gender: '',
    notifications: false,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  const workshopSteps = [
    {
      id: 'theory',
      title: 'ทฤษฎี: การจัดการฟอร์ม',
      content: [
        {
          subtitle: 'การจัดการ State ในฟอร์ม',
          description: 'เรียนรู้การใช้ useState สำหรับจัดการข้อมูลในฟอร์ม',
          code: `const [formValues, setFormValues] = useState({
  firstName: '',
  lastName: '',
  email: ''
});

const handleChange = (field) => (value) => {
  setFormValues(prev => ({ ...prev, [field]: value }));
};`
        },
        {
          subtitle: 'การตรวจสอบข้อมูล (Validation)',
          description: 'ตรวจสอบข้อมูลที่ผู้ใช้กรอกก่อนส่งฟอร์ม',
          code: `const validateForm = () => {
  const newErrors = {};
  if (!formValues.firstName) {
    newErrors.firstName = 'กรุณากรอกชื่อ';
  }
  if (!formValues.email) {
    newErrors.email = 'กรุณากรอกอีเมล';
  }
  return newErrors;
};`
        }
      ]
    },
    {
      id: 'practice',
      title: 'ปฏิบัติ: สร้างฟอร์มลงทะเบียน',
      content: [
        {
          subtitle: 'ฟอร์มลงทะเบียนผู้ใช้',
          description: 'สร้างฟอร์มลงทะเบียนที่มีการตรวจสอบข้อมูล',
          form: true
        }
      ]
    },
    {
      id: 'advanced',
      title: 'ขั้นสูง: การจัดการฟอร์มที่ซับซ้อน',
      content: [
        {
          subtitle: 'การจัดการฟอร์มหลายขั้นตอน',
          description: 'เรียนรู้การสร้างฟอร์มที่มีหลายขั้นตอน',
          code: `// Multi-step form
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState({});

const nextStep = () => {
  setCurrentStep(prev => prev + 1);
};

const prevStep = () => {
  setCurrentStep(prev => prev - 1);
};`
        },
        {
          subtitle: 'การจัดการไฟล์และรูปภาพ',
          description: 'การอัปโหลดไฟล์และรูปภาพในฟอร์ม',
          code: `import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  
  if (!result.canceled) {
    setFormValues(prev => ({
      ...prev,
      image: result.assets[0].uri
    }));
  }
};`
        }
      ]
    }
  ];

  const handleChange = (field) => (value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    // Simple validation
    const newErrors = {};
    if (!formValues.firstName) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formValues.lastName) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formValues.email) newErrors.email = 'กรุณากรอกอีเมล';
    if (!formValues.phone) newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    if (!formValues.thaiId) newErrors.thaiId = 'กรุณากรอกเลขบัตรประชาชน';
    if (!formValues.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    if (!formValues.confirmPassword) newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      Alert.alert('สำเร็จ', 'ฟอร์มถูกส่งเรียบร้อยแล้ว!');
      // Reset form
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        thaiId: '',
        password: '',
        confirmPassword: '',
        bio: '',
        gender: '',
        notifications: false,
        agreeToTerms: false
      });
      setTouched({});
    }
  };

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
                  {/* First Name */}
                  <FormControl isInvalid={errors.firstName && touched.firstName}>
                    <FormControl.Label>ชื่อ *</FormControl.Label>
                    <Input
                      placeholder="กรอกชื่อ"
                      value={formValues.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                    />
                    <FormControl.ErrorMessage>
                      {errors.firstName}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Last Name */}
                  <FormControl isInvalid={errors.lastName && touched.lastName}>
                    <FormControl.Label>นามสกุล *</FormControl.Label>
                    <Input
                      placeholder="กรอกนามสกุล"
                      value={formValues.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                    />
                    <FormControl.ErrorMessage>
                      {errors.lastName}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Email */}
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormControl.Label>อีเมล *</FormControl.Label>
                    <Input
                      placeholder="กรอกอีเมล"
                      value={formValues.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                    />
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Phone */}
                  <FormControl isInvalid={errors.phone && touched.phone}>
                    <FormControl.Label>เบอร์โทรศัพท์ *</FormControl.Label>
                    <Input
                      placeholder="กรอกเบอร์โทรศัพท์"
                      value={formValues.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      keyboardType="phone-pad"
                    />
                    <FormControl.ErrorMessage>
                      {errors.phone}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Thai ID */}
                  <FormControl isInvalid={errors.thaiId && touched.thaiId}>
                    <FormControl.Label>เลขบัตรประชาชน *</FormControl.Label>
                    <Input
                      placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                      value={formValues.thaiId}
                      onChangeText={handleChange('thaiId')}
                      onBlur={handleBlur('thaiId')}
                      keyboardType="numeric"
                      maxLength={13}
                    />
                    <FormControl.ErrorMessage>
                      {errors.thaiId}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Bio */}
                  <FormControl>
                    <FormControl.Label>ข้อมูลส่วนตัว</FormControl.Label>
                    <TextArea
                      placeholder="บอกเราเกี่ยวกับตัวคุณ"
                      value={formValues.bio}
                      onChangeText={handleChange('bio')}
                      autoCompleteType={undefined}
                    />
                  </FormControl>

                  {/* Gender */}
                  <FormControl>
                    <FormControl.Label>เพศ</FormControl.Label>
                    <Radio.Group
                      name="gender"
                      value={formValues.gender}
                      onChange={handleChange('gender')}
                    >
                      <HStack space={4}>
                        <Radio value="male">ชาย</Radio>
                        <Radio value="female">หญิง</Radio>
                        <Radio value="other">อื่นๆ</Radio>
                      </HStack>
                    </Radio.Group>
                  </FormControl>

                  {/* Notifications */}
                  <FormControl>
                    <FormControl.Label>การแจ้งเตือน</FormControl.Label>
                    <Switch
                      value={formValues.notifications}
                      onToggle={handleChange('notifications')}
                    />
                  </FormControl>

                  {/* Password */}
                  <FormControl isInvalid={errors.password && touched.password}>
                    <FormControl.Label>รหัสผ่าน *</FormControl.Label>
                    <Input
                      placeholder="กรอกรหัสผ่าน"
                      value={formValues.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      type="password"
                    />
                    <FormControl.ErrorMessage>
                      {errors.password}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Confirm Password */}
                  <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
                    <FormControl.Label>ยืนยันรหัสผ่าน *</FormControl.Label>
                    <Input
                      placeholder="ยืนยันรหัสผ่าน"
                      value={formValues.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      type="password"
                    />
                    <FormControl.ErrorMessage>
                      {errors.confirmPassword}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  {/* Terms */}
                  <FormControl>
                    <Checkbox
                      value={formValues.agreeToTerms}
                      onChange={handleChange('agreeToTerms')}
                    >
                      ฉันยอมรับเงื่อนไขการใช้งาน
                    </Checkbox>
                  </FormControl>

                  {/* Submit Button */}
                  <Button
                    onPress={handleSubmit}
                    colorScheme="blue"
                    size="lg"
                  >
                    ลงทะเบียน
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
                Forms Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การสร้างฟอร์มและการตรวจสอบข้อมูล
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
      </Box>
    </ScrollView>
  );
};

export default FormsWorkshopScreen; 