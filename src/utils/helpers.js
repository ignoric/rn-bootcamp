// Helper Functions - ฟังก์ชันช่วยเหลือต่างๆ

// ฟังก์ชันสำหรับจัดรูปแบบราคา
export const formatPrice = (price) => {
  return `฿${price.toLocaleString()}`;
};

// ฟังก์ชันสำหรับตรวจสอบว่าข้อมูลว่างหรือไม่
export const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

// ฟังก์ชันสำหรับสร้าง ID แบบสุ่ม
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// ฟังก์ชันสำหรับตรวจสอบอีเมล
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ฟังก์ชันสำหรับแสดงข้อความแจ้งเตือน
export const showAlert = (title, message) => {
  // ใน React Native ควรใช้ Alert.alert
  console.log(`${title}: ${message}`);
};

// ฟังก์ชันสำหรับจัดรูปแบบวันที่
export const formatDate = (date) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('th-TH', options);
};

// ฟังก์ชันสำหรับจำกัดความยาวข้อความ
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}; 