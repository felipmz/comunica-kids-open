import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useStore } from '../src/store/useStore';

export default function PerfilScreen() {
  const router = useRouter();
  const { perfil, atualizarPerfil, resetarTudo } = useStore();
  const [form, setForm] = useState(perfil);

  useEffect(() => {
    setForm(perfil);
  }, [perfil]);

  const formatarTelefone = (t: string) => {
    const r = t.replace(/\D/g, "");
    if (r.length > 11) return form.contatoMae;
    if (r.length > 10) {
      return r.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      return r.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      return r.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return r.replace(/^(\d*)/, "$1");
    }
  };

  const escolherFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, foto: result.assets[0].uri });
    }
  };

  const handleSalvar = () => {
    if (form.senhaAdmin && form.senhaAdmin.length < 4) {
      Alert.alert("Erro", "A senha precisa ter 4 números.");
      return;
    }
    atualizarPerfil(form);
    Alert.alert("Sucesso", "Perfil e Senha atualizados!");
    router.back();
  };

  const handleResetarGeral = () => {
    Alert.alert(
      "⚠️ ZONA DE PERIGO - DESENVOLVEDOR",
      "Você está prestes a APAGAR TODOS os botões personalizados, fotos e configurações.\n\nO aplicativo voltará para o estado original de fábrica.\n\nTem certeza absoluta?",
      [
        { text: "CANCELAR", style: "cancel" },
        { 
          text: "SIM, APAGAR TUDO", 
          style: "destructive", 
          onPress: () => {
            resetarTudo();
            Alert.alert("Reset Concluído", "O aplicativo foi restaurado para o padrão.");
            router.replace('/'); 
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>Área dos responsáveis</Text>
          <View style={{width: 50}} /> 
        </View>

        <View style={styles.scroll}>
          
          <View style={styles.areaFoto}>
            <TouchableOpacity onPress={escolherFoto} style={styles.botaoFoto}>
              {form.foto ? (
                <Image source={{ uri: form.foto }} style={styles.fotoPerfil} />
              ) : (
                <Text style={{fontSize: 60}}>🌻</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.dicaFoto}>Toque no girassol para alterar a foto</Text>
          </View>

          <Text style={styles.secaoTitulo}>DADOS DA CRIANÇA</Text>
          
          <Text style={styles.label}>Nome da Criança</Text>
          <TextInput 
            style={styles.input} 
            value={form.nomeCrianca} 
            onChangeText={(t) => setForm({...form, nomeCrianca: t})}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput 
            style={styles.input} 
            value={form.idade} 
            onChangeText={(t) => setForm({...form, idade: t})}
          />

          <Text style={styles.label}>Endereço Completo</Text>
          <TextInput 
            style={styles.input} 
            value={form.endereco} 
            onChangeText={(t) => setForm({...form, endereco: t})}
          />

          <Text style={styles.secaoTitulo}>RESPONSÁVEL 1</Text>

          <Text style={styles.label}>Nome responsável 1</Text>
          <TextInput 
            style={styles.input} 
            value={form.nomeMae} 
            onChangeText={(t) => setForm({...form, nomeMae: t})}
          />

          <Text style={styles.label}>Telefone </Text>
          <TextInput 
            style={styles.input} 
            keyboardType="phone-pad"
            value={form.contatoMae}
            onChangeText={(t) => setForm({...form, contatoMae: formatarTelefone(t)})}
          />

          <Text style={styles.secaoTitulo}>RESPONSÁVEL 2</Text>

          <Text style={styles.label}>Nome responsável 2</Text>
          <TextInput 
            style={styles.input} 
            value={form.nomePai} 
            onChangeText={(t) => setForm({...form, nomePai: t})}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="phone-pad"
            value={form.contatoPai}
            onChangeText={(t) => setForm({...form, contatoPai: formatarTelefone(t)})}
          />

          <Text style={[styles.secaoTitulo, {color: '#D32F2F'}]}>SEGURANÇA (SENHA DE ACESSO)</Text>
          <View style={styles.boxSenha}>
            <Text style={styles.dicaSenha}>Altere aqui a senha para entrar nesta tela.</Text>
            
            <Text style={[styles.label, {textAlign: 'center', marginTop: 10}]}>Nova Senha (4 dígitos)</Text>
            <TextInput 
              style={[styles.input, {borderColor: '#EF9A9A', borderWidth: 2, textAlign: 'center', fontSize: 20, letterSpacing: 5}]} 
              keyboardType="numeric"
              maxLength={4}
              value={form.senhaAdmin}
              onChangeText={(t) => setForm({...form, senhaAdmin: t})}
            />
          </View>

          <View style={{height: 20}} />
          <TouchableOpacity style={[styles.btnSalvar, { backgroundColor: '#FF9800' }]} onPress={() => router.push('/editor')}>
            <Text style={styles.txtSalvar}>BOTÕES E CATEGORIAS</Text>
          </TouchableOpacity>

          <View style={{height: 20}} />
          <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
            <Text style={styles.txtSalvar}>SALVAR TUDO</Text>
          </TouchableOpacity>

          <View style={{marginTop: 50, borderTopWidth: 1, borderColor: '#ddd', paddingTop: 20}}>
            <Text style={{textAlign: 'center', color: '#888', marginBottom: 10, fontSize: 12}}>ÁREA AVANÇADA</Text>
            <TouchableOpacity style={[styles.btnSalvar, { backgroundColor: '#d50101e2' }]} onPress={handleResetarGeral}>
              <Text style={styles.txtSalvar}>Resetar configurações</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 50}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  voltar: { fontSize: 24, color: '#2196F3', fontWeight: 'bold' },
  tituloHeader: { fontSize: 20, fontWeight: 'bold' },
  scroll: { padding: 20 }, 
  areaFoto: { alignItems: 'center', marginBottom: 20 },
  botaoFoto: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF9C4', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 3, borderColor: '#fff' },
  fotoPerfil: { width: '100%', height: '100%' },
  dicaFoto: { marginTop: 10, color: '#888', fontSize: 12 },
  secaoTitulo: { marginTop: 20, marginBottom: 10, color: '#2196F3', fontWeight: 'bold', fontSize: 14 },
  
  // Estilo novo para o texto acima da caixa
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 5, marginLeft: 2 },

  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  boxSenha: { backgroundColor: '#FFEBEE', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#FFCDD2' },
  dicaSenha: { color: '#D32F2F', marginBottom: 5, fontSize: 12, textAlign: 'center' },
  btnSalvar: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  txtSalvar: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});