import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech'; 

export default function Index() {
  
  const falar = () => {
    Speech.speak("Olá! O Elo App está pronto.", {
      language: 'pt-BR',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>EloApp Iniciado</Text>
      
      <TouchableOpacity style={styles.botao} onPress={falar}>
        <Text style={styles.textoBotao}>🗣️ Testar Voz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  botao: { backgroundColor: '#2196F3', padding: 20, borderRadius: 10 },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});