import React, { useState, useReducer } from 'react';
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
  Checkbox,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const StateManagementWorkshopScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [localCounter, setLocalCounter] = useState(0);
  const [todoText, setTodoText] = useState('');
  
  // useReducer สำหรับ Todo App
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }];
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(todoReducer, []);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  
  const workshopSteps = [
    {
      id: 'state-basics',
      title: 'State Basics: พื้นฐาน State Management',
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
          ]
        },
        {
          subtitle: 'useState Hook',
          description: 'เรียนรู้การใช้ useState สำหรับจัดการ State',
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
      
      <Input
        value={name}
        onChangeText={setName}
        placeholder="กรอกชื่อ"
      />
      
      <Switch
        value={isActive}
        onToggle={setIsActive}
      />
    </View>
  );
};`
        },
        {
          subtitle: 'State vs Props',
          description: 'ความแตกต่างระหว่าง State และ Props',
          details: [
            '📦 Props: ข้อมูลที่ส่งจาก Parent ไป Child (Read-only)',
            '📊 State: ข้อมูลภายใน Component (เปลี่ยนแปลงได้)',
            '🔄 Props เปลี่ยนเมื่อ Parent ส่งข้อมูลใหม่',
            '⚡ State เปลี่ยนเมื่อเรียก setState function',
            '🎯 ใช้ Props สำหรับการสื่อสารระหว่าง Components',
            ' ใช้ State สำหรับข้อมูลภายใน Component'
          ]
        }
      ]
    },
    {
      id: 'local-vs-global',
      title: 'Local vs Global State',
      content: [
        {
          subtitle: 'Local State',
          description: 'State ที่ใช้เฉพาะใน Component เดียว',
          code: `// Local State - ใช้เฉพาะใน Component นี้
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setTempName(user.name);
  };

  const handleSave = () => {
    // บันทึกข้อมูล
    setIsEditing(false);
  };

  return (
    <View>
      {isEditing ? (
        <Input
          value={tempName}
          onChangeText={setTempName}
        />
      ) : (
        <Text>{user.name}</Text>
      )}
      <Button onPress={isEditing ? handleSave : handleEdit}>
        {isEditing ? 'บันทึก' : 'แก้ไข'}
      </Button>
    </View>
  );
};`
        },
        {
          subtitle: 'Global State',
          description: 'State ที่ใช้ร่วมกันในหลาย Components',
          code: `// Global State ด้วย Context API
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// ใช้ใน Component ใดๆ
const ProfileScreen = () => {
  const { user, logout } = useUser();
  
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
      id: 'use-reducer',
      title: 'useReducer Hook',
      content: [
        {
          subtitle: 'useReducer คืออะไร?',
          description: 'useReducer เป็น Hook สำหรับจัดการ State ที่ซับซ้อน',
          details: [
            '🔄 useReducer = useState + reducer function',
            '📊 เหมาะสำหรับ State ที่มี logic ซับซ้อน',
            '🎯 ใช้ pattern แบบ Redux (Action -> Reducer -> State)',
            '⚡ มีประสิทธิภาพดีกว่าการใช้ useState หลายตัว',
            '🧩 เหมาะสำหรับ State ที่มีหลาย properties'
          ]
        },
        {
          subtitle: 'การสร้าง Reducer',
          description: 'เรียนรู้การสร้างและใช้งาน useReducer',
          code: `// Reducer Function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.payload,
        completed: false
      }];
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    
    default:
      return state;
  }
};

// ใช้ useReducer
const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <View>
      {/* Todo List */}
    </View>
  );
};`
        }
      ]
    },
    {
      id: 'todo-practice',
      title: 'ปฏิบัติ: สร้าง Todo App',
      content: [
        {
          subtitle: 'สร้าง Todo App ด้วย useReducer',
          description: 'สร้างแอป Todo ที่ใช้ useReducer สำหรับ State Management',
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
                    ทดลองสร้าง Todo App
                  </Text>
                  
                  {/* Local State Counter */}
                  <Card>
                    <Card.Header>
                      <Heading size="md">Local State Counter</Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack space={3} alignItems="center">
                        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                          {localCounter}
                        </Text>
                        <HStack space={3}>
                          <Button
                            onPress={() => setLocalCounter(localCounter - 1)}
                            colorScheme="red"
                          >
                            ลด
                          </Button>
                          <Button
                            onPress={() => setLocalCounter(localCounter + 1)}
                            colorScheme="green"
                          >
                            เพิ่ม
                          </Button>
                        </HStack>
                      </VStack>
                    </Card.Body>
                  </Card>
                  
                  {/* Todo App */}
                  <Card>
                    <Card.Header>
                      <Heading size="md">Todo App (useReducer)</Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack space={3}>
                        <HStack space={2}>
                          <Input
                            flex={1}
                            placeholder="เพิ่มงานใหม่"
                            value={todoText}
                            onChangeText={setTodoText}
                          />
                          <Button
                            onPress={() => {
                              if (todoText.trim()) {
                                dispatch({ type: 'ADD_TODO', payload: todoText.trim() });
                                setTodoText('');
                              }
                            }}
                            colorScheme="blue"
                          >
                            เพิ่ม
                          </Button>
                        </HStack>
                        
                        <VStack space={2}>
                          {todos.map(todo => (
                            <HStack
                              key={todo.id}
                              space={3}
                              alignItems="center"
                              p={2}
                              bg={useColorModeValue('gray.50', 'gray.600')}
                              rounded="md"
                            >
                              <Checkbox
                                value={todo.completed}
                                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                              />
                              <Text
                                flex={1}
                                textDecorationLine={todo.completed ? 'line-through' : 'none'}
                                color={todo.completed ? subtitleColor : textColor}
                              >
                                {todo.text}
                              </Text>
                              <Button
                                size="sm"
                                colorScheme="red"
                                onPress={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                              >
                                ลบ
                              </Button>
                            </HStack>
                          ))}
                        </VStack>
                        
                        {todos.length > 0 && (
                          <Button
                            onPress={() => dispatch({ type: 'CLEAR_COMPLETED' })}
                            colorScheme="orange"
                            variant="outline"
                          >
                            ลบงานที่เสร็จแล้ว
                          </Button>
                        )}
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
                        • Local State ใช้สำหรับข้อมูลใน Component เดียว
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • useReducer เหมาะสำหรับ State ที่ซับซ้อน
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • Action -> Reducer -> State pattern
                      </Text>
                      <Text fontSize="sm" color={subtitleColor}>
                        • Context API ใช้สำหรับ Global State
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
                State Management Workshop
              </Text>
              <Text fontSize="md" color={subtitleColor}>
                เรียนรู้การจัดการ State ที่ซับซ้อนและมีประสิทธิภาพ
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
              📊 จุดสำคัญที่ต้องจำ
            </Text>
            <VStack space={2}>
              <Text fontSize="sm" color={textColor}>
                • useState ใช้สำหรับ State ง่ายๆ
              </Text>
              <Text fontSize="sm" color={textColor}>
                • useReducer ใช้สำหรับ State ที่ซับซ้อน
              </Text>
              <Text fontSize="sm" color={textColor}>
                • Context API ใช้สำหรับ Global State
              </Text>
              <Text fontSize="sm" color={textColor}>
                • State เปลี่ยนเมื่อเรียก setState function
              </Text>
              <Text fontSize="sm" color={textColor}>
                • ใช้ Reducer pattern สำหรับ logic ที่ซับซ้อน
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default StateManagementWorkshopScreen; 