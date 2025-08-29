// Product Model - กำหนดโครงสร้างข้อมูลสินค้า
export class Product {
  constructor(id, name, price, description, image, inStock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.inStock = inStock;
  }

  // Static method สำหรับสร้าง Product จาก object
  static fromObject(obj) {
    return new Product(
      obj.id,
      obj.name,
      obj.price,
      obj.description,
      obj.image,
      obj.inStock
    );
  }

  // Method สำหรับแปลงเป็น object
  toObject() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image,
      inStock: this.inStock,
    };
  }

  // Method สำหรับตรวจสอบว่าสินค้ามีในสต็อกหรือไม่
  isAvailable() {
    return this.inStock;
  }

  // Method สำหรับแสดงราคาในรูปแบบสกุลเงิน
  getFormattedPrice() {
    return `฿${this.price.toLocaleString()}`;
  }
}

// ข้อมูลตัวอย่าง
export const sampleProducts = [
  new Product(
    1,
    "iPhone 15 Pro",
    45000,
    "สมาร์ทโฟนรุ่นใหม่จาก Apple พร้อมเทคโนโลยีล่าสุด",
    "https://picsum.photos/300/200?random=4",
    true
  ),
  new Product(
    2,
    "MacBook Air M2",
    35000,
    "แล็ปท็อปเบาและเร็ว พร้อมชิป M2",
    "https://picsum.photos/300/200?random=5",
    false
  ),
  new Product(
    3,
    "AirPods Pro",
    8500,
    "หูฟังไร้สายคุณภาพสูง พร้อม Active Noise Cancellation",
    "https://picsum.photos/300/200?random=6",
    true
  ),
]; 