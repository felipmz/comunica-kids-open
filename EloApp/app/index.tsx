import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { useRouter, Stack } from 'expo-router';
import { useStore } from '../src/store/useStore';
import { BotaoWord } from '../src/data/vocabulario';
import { CardPictograma } from '../src/components/CardPictograma';
import { ModalSenha } from '../src/components/ModalSenha';

export default function Index() {
  const router = useRouter();
  const [modalAberto, setModalAberto] = useState(false);

  const { 
    frase, categoriaAtiva, perfil, listaPalavras, listaCategorias,
    adicionarPalavra, limparFrase, removerUltima, setCategoria 
  } = useStore();
  
  const ultimoClique = useRef<number>(0);

  const falarTexto = (texto: string) => { Speech.stop(); Speech.speak(texto, { language: 'pt-BR', rate: 0.9 }); };
  const handlePressBotao = (item: BotaoWord) => { falarTexto(item.falar); adicionarPalavra(item); };
  const falarFraseCompleta = () => { const textoCompleto = frase.map(item => item.falar).join(' '); falarTexto(textoCompleto); };
  
  const handleLixeira = () => {
    const agora = Date.now();
    if (agora - ultimoClique.current < 300) { limparFrase(); } else { removerUltima(); }
    ultimoClique.current = agora;
  };

  const botoesVisiveis = listaPalavras.filter(item => item.categoria === categoriaAtiva);
  const categoriaAtual = Object.values(listaCategorias).find(c => c.id === categoriaAtiva);
  const corAtual = categoriaAtual?.cor || '#fff';

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ height: StatusBar.currentHeight }} />

      {/* Header */}
      <View style={styles.headerTop}>
        <View style={styles.infoCrianca}>
           {perfil.foto ? ( <Image source={{ uri: perfil.foto }} style={styles.fotoPequena} /> ) : ( <View style={[styles.fotoPequena, {backgroundColor: '#ccc'}]}><Text>🌻</Text></View> )}
           <View>
             <Text style={styles.nomeCrianca}>{perfil.nomeCrianca}</Text>
             <Text style={styles.statusCrianca}>Online</Text>
           </View>
        </View>
        <TouchableOpacity onPress={() => setModalAberto(true)} style={styles.btnConfig}>
          <Text style={{fontSize: 20}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de Frase com efeito de contorno suave e sombra */}
      <View style={styles.barraFraseContainer}>
        <View style={styles.caixaDestaque}>
          <ScrollView horizontal style={styles.barraFraseScroll} contentContainerStyle={{alignItems: 'center', paddingRight: 10}}>
            {frase.length === 0 ? (
              <Text style={styles.placeholder}>Monte a frase aqui...</Text>
            ) : (
              frase.map((item, index) => (
                <View key={index} style={styles.miniCartao}>
                   <Image source={{ uri: item.url }} style={styles.miniImagem} />
                </View>
              ))
            )}
          </ScrollView>
          <View style={styles.acoesFrase}>
            <TouchableOpacity onPress={handleLixeira} style={[styles.btnAcao, { backgroundColor: '#FFF5F5', borderColor: '#FFEBEE' }]}>
              <Text style={{fontSize: 22}}>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={falarFraseCompleta} style={[styles.btnAcao, { backgroundColor: '#F0F7FF', borderColor: '#E1F0FF' }]}>
              <Text style={{fontSize: 22}}>🗣️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.corpoApp}>
        <View style={styles.menuLateral}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.values(listaCategorias).map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                style={[styles.btnCategoria, categoriaAtiva === cat.id && styles.categoriaAtiva, { backgroundColor: cat.cor }]}
                onPress={() => setCategoria(cat.id)}
              >
                <Text style={{fontSize: 25}}>{cat.icone}</Text>
                <Text style={styles.txtCategoria}>{cat.titulo}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.gridContainer, { backgroundColor: '#F8F9FA' }]}>
          <ScrollView contentContainerStyle={styles.gridContent}>
            {botoesVisiveis.map((item) => (
              <CardPictograma 
                key={item.id}
                texto={item.texto}
                url={item.url}
                corFundo={corAtual}
                onPress={() => handlePressBotao(item)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <ModalSenha 
        visivel={modalAberto}
        senhaCorreta={perfil.senhaAdmin}
        aoFechar={() => setModalAberto(false)}
        aoSucesso={() => {
          setModalAberto(false);
          router.push('/perfil');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff' },
  infoCrianca: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  fotoPequena: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  nomeCrianca: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  statusCrianca: { fontSize: 12, color: '#4CAF50' },
  btnConfig: { padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 },
  
  // CONTAINER EXTERNO
  barraFraseContainer: { 
    paddingHorizontal: 10, 
    paddingVertical: 12, 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },

  // EFEITO DE CONTORNO TOTAL E SOMBRA (O QUE VOCÊ PEDIU)
  caixaDestaque: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 6,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
    // Borda suave
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  barraFraseScroll: { 
    flex: 1, 
    height: 60, 
    backgroundColor: '#FBFCFD',
    borderRadius: 10,
    marginRight: 8,
  },

  placeholder: { color: '#B0B0B0', fontSize: 16, fontStyle: 'italic', marginLeft: 10, alignSelf: 'center' },
  miniCartao: { width: 52, height: 52, backgroundColor: '#fff', borderRadius: 8, margin: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  miniImagem: { width: 42, height: 42, resizeMode: 'contain' },
  
  acoesFrase: { flexDirection: 'row', gap: 6 },
  
  btnAcao: { 
    width: 60, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12, 
    borderWidth: 1,
  },

  corpoApp: { flex: 1, flexDirection: 'row' },
  menuLateral: { width: 85, backgroundColor: '#fff', borderRightWidth: 1, borderColor: '#f0f0f0', alignItems: 'center', paddingVertical: 10 },
  btnCategoria: { width: 68, height: 68, marginBottom: 12, borderRadius: 16, justifyContent: 'center', alignItems: 'center', opacity: 0.7 },
  categoriaAtiva: { opacity: 1, borderWidth: 2, borderColor: '#555' },
  txtCategoria: { fontSize: 10, fontWeight: 'bold', marginTop: 2, color: '#333' },
  gridContainer: { flex: 1 },
  gridContent: { padding: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
});