import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useAppContext } from '../providers/AppContext';

const UserProfile = ({ user, onPress }) => {
  const { selectUser } = useAppContext();

  const handlePress = () => {
    selectUser(user);
    if (onPress) {
      onPress(user);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image 
        source={{ uri: user.avatar || 'https://picsum.photos/100/100' }} 
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>ชื่อ: {user.name}</Text>
        <Text style={styles.email}>อีเมล: {user.email}</Text>
        <Text style={styles.age}>อายุ: {user.age} ปี</Text>
        <Text style={styles.role}>ตำแหน่ง: {user.role}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    padding: 20,
    borderRadius: 15,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.textPrimary,
  },
  email: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 3,
  },
  age: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 3,
  },
  role: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default UserProfile; 