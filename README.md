# React Native Bootcamp App

แอปการเรียนรู้ React Native แบบครบวงจร ตั้งแต่พื้นฐานจนถึงขั้นสูง พร้อม Workshop และตัวอย่างการใช้งานจริง

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

### ✅ **Interactive Learning App**
- หน้าหลักแสดงหัวข้อการเรียนรู้ทั้งหมด
- แต่ละหัวข้อมีหน้าจอแยกพร้อมเนื้อหาและตัวอย่าง
- Workshop และการทดลองในแต่ละหัวข้อ
- Navigation ระหว่างหน้าจอ

### ✅ **Comprehensive Topics**
- **Props & Context API** - พื้นฐานการจัดการข้อมูล
- **UI Components** - การสร้าง UI ที่สวยงาม
- **Navigation** - การสร้างแอปหลายหน้าจอ
- **State Management** - การจัดการข้อมูลขั้นสูง
- **API Integration** - การเชื่อมต่อข้อมูลจากภายนอก
- **Forms & Validation** - การจัดการฟอร์มและตรวจสอบข้อมูล
- **Firebase** - การใช้ฐานข้อมูล Real-time
- **Maps & Location** - การใช้แผนที่และตำแหน่ง
- **Camera & Images** - การจัดการรูปภาพ
- **Notifications** - การแจ้งเตือน
- **Deployment** - การส่งแอปไป App Store

### ✅ **Modern UI with NativeBase**
- ใช้ NativeBase UI Library
- Theme และ Dark Mode Support
- Responsive Design
- Beautiful Components

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

### 1. **React Native Fundamentals**
- Components และ JSX
- Props และ State Management
- Navigation และ Routing
- UI/UX Design Principles

### 2. **Advanced Features**
- API Integration และ Data Fetching
- Form Management และ Validation
- Real-time Database (Firebase)
- Device APIs (Camera, Location, Maps)

### 3. **Development Best Practices**
- Project Structure และ Architecture
- Code Organization และ Modularity
- Performance Optimization
- Testing และ Debugging

### 4. **Deployment และ Maintenance**
- App Store Submission
- Over-the-Air Updates
- Monitoring และ Analytics
- User Feedback และ Iteration

## 🔧 การพัฒนา

### **Phase 1: Foundation (เสร็จแล้ว)**
- ✅ Props และ Context API
- ✅ โครงสร้างโปรเจค
- ✅ State Management
- 🔄 Navigation System

### **Phase 2: Advanced Features (กำลังพัฒนา)**
- 🔄 NativeBase UI Integration
- 🔄 Multiple Screens
- 🔄 API Integration
- 🔄 Form Management

### **Phase 3: Real-world Features (แผน)**
- 📋 Firebase Integration
- 📋 Maps และ Location
- 📋 Camera และ Images
- 📋 Push Notifications

### **Phase 4: Deployment (แผน)**
- 📋 App Store Submission
- 📋 OTA Updates
- 📋 Performance Optimization
- 📋 User Analytics

## 📚 การสอน

แอปนี้เหมาะสำหรับการสอน:
- **React Native Fundamentals** - พื้นฐานการสร้างแอป
- **UI/UX Design** - การออกแบบหน้าจอที่สวยงาม
- **Navigation** - การสร้างแอปหลายหน้าจอ
- **State Management** - การจัดการข้อมูลในแอป
- **API Integration** - การเชื่อมต่อข้อมูลจากภายนอก
- **Real-world Features** - ฟีเจอร์ที่ใช้จริงในแอป
- **Deployment** - การส่งแอปไป App Store

## 🎨 UI/UX Features

- **NativeBase UI Library** - Components สวยงามและใช้งานง่าย
- **Responsive Design** - ปรับตัวตามขนาดหน้าจอ
- **Theme Support** - Light Mode และ Dark Mode
- **Interactive Elements** - ปุ่ม, การ์ด, และ Animation
- **Modern Design** - Shadows, Border Radius, และ Color System
- **Accessibility** - รองรับผู้ใช้ที่มีความต้องการพิเศษ

---

**สร้างโดย:** React Native Bootcamp  
**เวอร์ชัน:** 1.0.0  
**เทคโนโลยี:** React Native, Expo, Context API 

## การตั้งค่า Environment แบบปลอดภัย (.env)

1) สร้างไฟล์ `.env` ที่รากโปรเจกต์ (ไฟล์นี้ถูก ignore แล้ว ไม่ถูก commit)
```
API_BASE_URL=http://webhub.utcc.ac.th:8000/
BACK_END_TOKEN=ใส่โทเคนของคุณที่นี่
```

2) รันแอปตามปกติ ค่าจะถูกอ่านผ่าน `app.config.js` และ Inject เข้า `expo.extra`

3) บน EAS ให้ตั้ง Secrets แทนการใส่ค่าในไฟล์:
```
eas secret:create --name API_BASE_URL --value https://your-api
eas secret:create --name BACK_END_TOKEN --value your_token
```

> แอปจะอ่านค่าผ่าน `Constants.expoConfig?.extra` โดยอัตโนมัติ ไม่ต้องแก้อะไรในโค้ดเพิ่มเติม 