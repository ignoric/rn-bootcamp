// Validation Utils - ฟังก์ชันช่วยเหลือสำหรับการตรวจสอบข้อมูล

// ตรวจสอบเลขบัตรประชาชนไทย
export const validateThaiId = (id) => {
  if (!id || id.length !== 13) return false;
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id[i]) * (13 - i);
  }
  
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === parseInt(id[12]);
};

// ตรวจสอบเบอร์โทรศัพท์ไทย
export const validateThaiPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

// ตรวจสอบรหัสผ่านที่แข็งแกร่ง
export const validateStrongPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

// ตรวจสอบชื่อผู้ใช้ (ไม่ซ้ำ)
export const checkUsernameAvailability = async (username) => {
  // จำลองการตรวจสอบกับ API
  return new Promise((resolve) => {
    setTimeout(() => {
      // จำลองว่าชื่อผู้ใช้ 'admin' และ 'user' ถูกใช้แล้ว
      const takenUsernames = ['admin', 'user', 'test'];
      resolve(!takenUsernames.includes(username.toLowerCase()));
    }, 500);
  });
};

// ตรวจสอบอีเมล (ไม่ซ้ำ)
export const checkEmailAvailability = async (email) => {
  // จำลองการตรวจสอบกับ API
  return new Promise((resolve) => {
    setTimeout(() => {
      // จำลองว่าอีเมลบางตัวถูกใช้แล้ว
      const takenEmails = ['admin@example.com', 'user@example.com'];
      resolve(!takenEmails.includes(email.toLowerCase()));
    }, 500);
  });
};

// ตรวจสอบรหัสไปรษณีย์ไทย
export const validateThaiPostalCode = (postalCode) => {
  const postalCodeRegex = /^[1-9][0-9]{4}$/;
  return postalCodeRegex.test(postalCode);
};

// ตรวจสอบวันที่ (อายุ 18 ปีขึ้นไป)
export const validateAge18Plus = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18;
  }
  
  return age >= 18;
};

// ตรวจสอบ URL
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ตรวจสอบไฟล์ขนาด (MB)
export const validateFileSize = (fileSize, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

// ตรวจสอบนามสกุลไฟล์
export const validateFileType = (fileName, allowedTypes = ['jpg', 'jpeg', 'png', 'pdf']) => {
  const extension = fileName.split('.').pop().toLowerCase();
  return allowedTypes.includes(extension);
}; 