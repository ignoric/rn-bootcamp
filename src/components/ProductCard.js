import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useAppContext } from '../providers/AppContext';

const ProductCard = ({ product, onPress }) => {
  const { selectProduct } = useAppContext();

  const handlePress = () => {
    selectProduct(product);
    if (onPress) {
      onPress(product);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.getFormattedPrice()}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.stockInfo}>
          <Text style={[
            styles.stockText, 
            { color: product.isAvailable() ? COLORS.success : COLORS.error }
          ]}>
            {product.isAvailable() ? 'มีสินค้า' : 'สินค้าหมด'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  stockInfo: {
    alignItems: 'flex-start',
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductCard; 