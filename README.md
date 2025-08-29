# React Native Props & Context Example App

แอปตัวอย่างสำหรับสอนเรื่อง Props และ Context API ใน React Native

## 🏗️ โครงสร้างโปรเจค

```
src/
├── components/          # Reusable Components
│   ├── UserProfile.js   # Component แสดงข้อมูลผู้ใช้
│   └── ProductCard.js   # Component แสดงข้อมูลสินค้า
├── screens/             # Screen Components
│   └── HomeScreen.js    # หน้าหลักของแอป
├── providers/           # Context Providers
│   └── AppContext.js    # Global State Management
├── models/              # Data Models
│   ├── User.js          # User Model
│   └── Product.js       # Product Model
├── constants/           # Constants
│   └── colors.js        # Color Constants
└── utils/               # Utility Functions
    └── helpers.js       # Helper Functions
```

## 🚀 Features

### ✅ **Props Example**
- การส่งข้อมูลจาก Component แม่ไปยัง Component ลูก
- การรับ props ใน UserProfile และ ProductCard
- การจัดการ event ผ่าน props

### ✅ **Context API (ลด Prop Drilling)**
- Global State Management ด้วย Context API
- การแชร์ข้อมูลระหว่าง Components
- การอัพเดทข้อมูลแบบ Real-time

### ✅ **Modular Architecture**
- แยก Components, Screens, Models
- ใช้ Constants สำหรับสีและค่าคงที่
- Helper Functions สำหรับฟังก์ชันช่วยเหลือ

## 📱 การใช้งาน

### การติดตั้ง
```bash
npm install
```

### การรันแอป
```bash
npx expo start
```

## 🎯 สิ่งที่เรียนรู้

### 1. **Props**
- การส่งข้อมูลระหว่าง Components
- การรับ props ใน Component ลูก
- การจัดการ event handlers

### 2. **Context API**
- การสร้าง Context Provider
- การใช้ useReducer สำหรับ State Management
- การเข้าถึง Global State ด้วย useAppContext

### 3. **Project Structure**
- การจัดโครงสร้างโปรเจคแบบ Modular
- การแยกไฟล์ตามหน้าที่
- การใช้ Constants และ Utils

### 4. **Data Models**
- การสร้าง Class Models
- การจัดการข้อมูลแบบ Object-Oriented
- การสร้าง Methods สำหรับ Data Manipulation

## 🔧 การปรับปรุง

### **ก่อนปรับปรุง (Prop Drilling)**
```javascript
// ต้องส่ง props ผ่านหลายชั้น
<App>
  <HomeScreen users={users} products={products} />
    <UserProfile user={user} onPress={handlePress} />
```

### **หลังปรับปรุง (Context API)**
```javascript
// เข้าถึงข้อมูลได้โดยตรง
const { users, products, selectUser } = useAppContext();
```

## 📚 การสอน

แอปนี้เหมาะสำหรับการสอน:
- React Native Basics
- Props และ Component Communication
- Context API และ State Management
- Project Structure และ Best Practices
- Data Modeling ใน JavaScript

## 🎨 UI/UX Features

- Responsive Design
- Modern UI with Shadows และ Border Radius
- Color System ที่สอดคล้องกัน
- Interactive Elements
- Real-time State Updates

---

**สร้างโดย:** React Native Bootcamp  
**เวอร์ชัน:** 1.0.0  
**เทคโนโลยี:** React Native, Expo, Context API 