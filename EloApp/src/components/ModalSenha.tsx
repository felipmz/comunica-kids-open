import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';

interface ModalSenhaProps {
  visivel: boolean;
  aoFechar: () => void;
  aoSucesso: () => void;
  senhaCorreta: string;
}

export const ModalSenha = ({ visivel, aoFechar, aoSucesso, senhaCorreta }: ModalSenhaProps) => {
  const [input, setInput] = useState('');

  const verificar = () => {
    if (input === senhaCorreta) {
      setInput(''); // Limpa o campo
      aoSucesso();  // Senha certa! Libera o acesso
    } else {
      Alert.alert("Senha Incorreta", "Tente novamente.");
      setInput('');
    }
  };

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={aoFechar}>
      {/* Mantendo a correção do teclado */}
      <KeyboardAvoidingView 
        style={styles.overlay} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.caixa}>
          <Text style={styles.titulo}>Acesso dos responsáveis 🔒</Text>
          <Text style={styles.texto}>Digite a senha (Padrão: 1234)</Text>
          
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry // Esconde os números
            placeholder="****"
            placeholderTextColor="#999999" // <--- MUDANÇA: Cinza para diferenciar
            value={input}
            onChangeText={setInput}
            autoFocus={visivel}
          />

          <View style={styles.botoes}>
            <TouchableOpacity onPress={aoFechar} style={styles.btnCancelar}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={verificar} style={styles.btnEntrar}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  caixa: { width: 300, backgroundColor: '#fff', borderRadius: 15, padding: 20, alignItems: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  texto: { color: '#666', marginBottom: 15 },
  // Mantendo a cor preta para o texto digitado
  input: { fontSize: 24, borderBottomWidth: 2, borderColor: '#2196F3', width: 150, textAlign: 'center', marginBottom: 20, padding: 5, letterSpacing: 5, color: '#000000' },
  botoes: { flexDirection: 'row', gap: 10, width: '100%' },
  btnCancelar: { flex: 1, padding: 12, backgroundColor: '#eee', borderRadius: 8, alignItems: 'center' },
  btnEntrar: { flex: 1, padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center' },
});