import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { useAppContext } from '../providers/AppContext';
import UserProfile from '../components/UserProfile';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const { users, products, selectedUser, selectedProduct } = useAppContext();

  const handleUserPress = (user) => {
    Alert.alert('ผู้ใช้', `คุณเลือก: ${user.name}\nตำแหน่ง: ${user.role}`);
  };

  const handleProductPress = (product) => {
    Alert.alert('สินค้า', `คุณเลือก: ${product.name}\nราคา: ${product.getFormattedPrice()}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Props Example App</Text>
        <Text style={styles.subtitle}>ตัวอย่างการใช้งาน Props & Context</Text>
      </View>

      {/* User Profiles Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 ข้อมูลผู้ใช้ (UserProfile Component)</Text>
        {users.map((user) => (
          <UserProfile 
            key={user.id}
            user={user}
            onPress={handleUserPress}
          />
        ))}
      </View>

      {/* Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛍️ สินค้า (ProductCard Component)</Text>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onPress={handleProductPress}
          />
        ))}
      </View>

      {/* Selected Items Display */}
      {(selectedUser || selectedProduct) && (
        <View style={styles.selectedSection}>
          <Text style={styles.sectionTitle}>📋 รายการที่เลือก</Text>
          
          {selectedUser && (
            <View style={styles.selectedItem}>
              <Text style={styles.selectedLabel}>ผู้ใช้ที่เลือก:</Text>
              <Text style={styles.selectedText}>{selectedUser.name} - {selectedUser.role}</Text>
            </View>
          )}
          
          {selectedProduct && (
            <View style={styles.selectedItem}>
              <Text style={styles.selectedLabel}>สินค้าที่เลือก:</Text>
              <Text style={styles.selectedText}>{selectedProduct.name} - {selectedProduct.getFormattedPrice()}</Text>
            </View>
          )}
        </View>
      )}

      {/* Context Explanation */}
      <View style={styles.explanationSection}>
        <Text style={styles.explanationTitle}>📚 การใช้งาน Context API</Text>
        <Text style={styles.explanationText}>
          • Context API ช่วยลดปัญหา Prop Drilling{'\n'}
          • ข้อมูลถูกจัดการแบบ Global State{'\n'}
          • Components สามารถเข้าถึงข้อมูลได้โดยตรง{'\n'}
          • การอัพเดทข้อมูลจะ reflect ไปยังทุก components{'\n'}
          • โครงสร้างโปรเจคเป็นแบบ Modular
        </Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: COLORS.textWhite,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.textWhite,
    fontSize: 14,
    opacity: 0.9,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  selectedSection: {
    padding: 16,
    marginBottom: 16,
  },
  selectedItem: {
    backgroundColor: COLORS.backgroundLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  selectedText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  explanationSection: {
    backgroundColor: COLORS.backgroundLight,
    padding: 20,
    borderRadius: 12,
    margin: 16,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default HomeScreen; 