// src/components/CardPictograma.tsx
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

interface CardProps {
  texto: string;
  url: string;
  corFundo: string;
  onPress: () => void;
}

export const CardPictograma = ({ texto, url, corFundo, onPress }: CardProps) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: 'white', borderColor: corFundo }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.faixaColorida, { backgroundColor: corFundo }]} />
      
      <Image 
        source={{ uri: url }} 
        style={styles.imagem} 
        resizeMode="contain" 
      />
      
      <Text style={styles.texto}>{texto.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 130,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderWidth: 3,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: 'hidden',
    margin: 5, // Adicionei margem para não colar um no outro
  },
  faixaColorida: {
    width: '100%',
    height: 15,
  },
  imagem: {
    width: 80,
    height: 80,
    marginTop: 5,
  },
  texto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  }
});