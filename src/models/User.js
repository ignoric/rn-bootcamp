// User Model - กำหนดโครงสร้างข้อมูลผู้ใช้
export class User {
  constructor(id, name, email, age, role, avatar) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.role = role;
    this.avatar = avatar;
  }

  // Static method สำหรับสร้าง User จาก object
  static fromObject(obj) {
    return new User(
      obj.id,
      obj.name,
      obj.email,
      obj.age,
      obj.role,
      obj.avatar
    );
  }

  // Method สำหรับแปลงเป็น object
  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      role: this.role,
      avatar: this.avatar,
    };
  }
}

// ข้อมูลตัวอย่าง
export const sampleUsers = [
  new User(1, "สมชาย ใจดี", "somchai@example.com", 25, "นักพัฒนา", "https://picsum.photos/100/100?random=1"),
  new User(2, "มาลี มีสุข", "malee@example.com", 30, "นักออกแบบ", "https://picsum.photos/100/100?random=2"),
  new User(3, "วิชัย รักดี", "wichai@example.com", 28, "ผู้จัดการ", "https://picsum.photos/100/100?random=3"),
]; 