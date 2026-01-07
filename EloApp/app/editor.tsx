import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useStore } from '../src/store/useStore';

export default function EditorScreen() {
  const router = useRouter();
  const { 
    listaCategorias, listaPalavras,
    adicionarItem, editarItem, removerItem,
    adicionarCategoria, editarCategoria, removerCategoria
  } = useStore();
  
  // Estados de Controle da Tela
  const [modoTela, setModoTela] = useState<'formulario' | 'lista'>('formulario');
  const [aba, setAba] = useState<'palavra' | 'categoria'>('palavra');
  const [idEdicao, setIdEdicao] = useState<string | null>(null); // Se tiver ID, estamos editando

  // --- FORMULÁRIO PALAVRA ---
  const [texto, setTexto] = useState('');
  const [falar, setFalar] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [catSelecionada, setCatSelecionada] = useState('pessoas');

  // --- FORMULÁRIO CATEGORIA ---
  const [novaCatTitulo, setNovaCatTitulo] = useState('');
  const [novaCatIcone, setNovaCatIcone] = useState('⭐');
  const [novaCatCor, setNovaCatCor] = useState('#E0E0E0');

  // Função Limpar Campos
  const limparCampos = () => {
    setIdEdicao(null);
    setTexto(''); setFalar(''); setUrlFoto('');
    setNovaCatTitulo(''); setNovaCatIcone('⭐'); setNovaCatCor('#E0E0E0');
  };

  // Pegar imagem
  const pegarImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setUrlFoto(result.assets[0].uri);
    }
  };

  // --- LOGICA SALVAR (CRIAR ou ATUALIZAR) ---
  const handleSalvarPalavra = () => {
    if (!texto || !urlFoto) return Alert.alert("Erro", "Preencha texto e foto.");
    
    if (idEdicao) {
      // MODO EDIÇÃO
      editarItem(idEdicao, { texto, falar: falar || texto, categoria: catSelecionada, url: urlFoto });
      Alert.alert("Atualizado", "Botão editado com sucesso!");
    } else {
      // MODO CRIAÇÃO
      adicionarItem({
        id: Date.now().toString(),
        texto,
        falar: falar || texto,
        categoria: catSelecionada,
        url: urlFoto
      });
      Alert.alert("Criado", "Novo botão adicionado!");
    }
    limparCampos();
  };

  const handleSalvarCategoria = () => {
    if (!novaCatTitulo) return Alert.alert("Erro", "Dê um nome para a categoria");
    
    if (idEdicao) {
      // MODO EDIÇÃO
      editarCategoria(idEdicao, { titulo: novaCatTitulo, icone: novaCatIcone, cor: novaCatCor });
      Alert.alert("Atualizado", "Categoria editada com sucesso!");
    } else {
      // MODO CRIAÇÃO
      const idNovo = novaCatTitulo.toLowerCase().replace(/\s/g, '');
      adicionarCategoria({
        id: idNovo,
        titulo: novaCatTitulo,
        icone: novaCatIcone,
        cor: novaCatCor
      });
      Alert.alert("Criado", "Categoria criada!");
    }
    limparCampos();
  };

  // --- LOGICA DE PREPARAR PARA EDITAR ---
  const prepararEdicaoBotao = (item: any) => {
    setIdEdicao(item.id);
    setTexto(item.texto);
    setFalar(item.falar);
    setUrlFoto(item.url);
    setCatSelecionada(item.categoria);
    
    setAba('palavra');
    setModoTela('formulario'); // Vai para a tela de form
  };

  const prepararEdicaoCategoria = (cat: any) => {
    setIdEdicao(cat.id);
    setNovaCatTitulo(cat.titulo);
    setNovaCatIcone(cat.icone);
    setNovaCatCor(cat.cor);

    setAba('categoria');
    setModoTela('formulario');
  };

  // --- DELETAR ---
  const deletarBotao = (id: string, nome: string) => {
    Alert.alert("Apagar", `Apagar "${nome}"?`, [
      { text: "Cancelar" },
      { text: "Sim", style: 'destructive', onPress: () => removerItem(id) }
    ]);
  };
  
  const deletarCategoria = (id: string, nome: string) => {
    Alert.alert("Apagar", `Apagar seção "${nome}"?`, [
      { text: "Cancelar" },
      { text: "Sim", style: 'destructive', onPress: () => removerCategoria(id) }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.voltar}></Text></TouchableOpacity>
        <Text style={styles.title}>Editor</Text>
        <View style={{width: 50}}/>
      </View>

      {/* Menu Superior: Criar vs Listar */}
      <View style={styles.modoContainer}>
        <TouchableOpacity onPress={() => {setModoTela('formulario'); limparCampos();}} style={[styles.btnModo, modoTela === 'formulario' && styles.btnModoAtivo]}>
          <Text style={[styles.txtModo, modoTela === 'formulario' && styles.txtModoAtivo]}>
            {idEdicao ? '📝 EDITANDO' : '✨ CRIAR / EDITAR'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setModoTela('lista'); limparCampos();}} style={[styles.btnModo, modoTela === 'lista' && styles.btnModoAtivo]}>
          <Text style={[styles.txtModo, modoTela === 'lista' && styles.txtModoAtivo]}>📋 LISTA GERAL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.abas}>
        <TouchableOpacity onPress={() => setAba('palavra')} style={[styles.aba, aba === 'palavra' && styles.abaAtiva]}>
          <Text style={styles.txtAba}>Botões</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAba('categoria')} style={[styles.aba, aba === 'categoria' && styles.abaAtiva]}>
          <Text style={styles.txtAba}>Categorias</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        
        {/* ================= FORMULÁRIO ================= */}
        {modoTela === 'formulario' && (
          <View>
            {idEdicao && (
              <TouchableOpacity onPress={limparCampos} style={styles.btnCancelarEdicao}>
                <Text style={{color: '#D32F2F', textAlign: 'center'}}>Cancelar Edição ✕</Text>
              </TouchableOpacity>
            )}

            {aba === 'palavra' ? (
              <View>
                <Text style={styles.label}>1. Escolha a Categoria:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollCats}>
                  {Object.values(listaCategorias).map(c => (
                    <TouchableOpacity 
                      key={c.id} 
                      style={[styles.chip, catSelecionada === c.id && {backgroundColor: c.cor, borderColor: '#333'}]}
                      onPress={() => setCatSelecionada(c.id)}
                    >
                      <Text>{c.icone} {c.titulo}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.label}>2. Escolha a Imagem:</Text>
                <TouchableOpacity onPress={pegarImagem} style={styles.boxImagem}>
                  {urlFoto ? (
                    <Image source={{ uri: urlFoto }} style={{ width: 100, height: 100 }} resizeMode="contain" />
                  ) : (
                    <Text style={{fontSize: 40}}>📷</Text>
                  )}
                </TouchableOpacity>

                <Text style={styles.label}>3. Nome do Botão:</Text>
                <TextInput style={styles.input} value={texto} onChangeText={setTexto} placeholder="Ex: Bola" />

                <Text style={styles.label}>4. Fala (opcional):</Text>
                <TextInput style={styles.input} value={falar} onChangeText={setFalar} placeholder="Ex: Quero brincar" />

                <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvarPalavra}>
                  <Text style={styles.txtSalvar}>{idEdicao ? 'SALVAR ALTERAÇÕES' : 'CRIAR BOTÃO'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.label}>Nome da Categoria:</Text>
                <TextInput style={styles.input} value={novaCatTitulo} onChangeText={setNovaCatTitulo} placeholder="Ex: Lugares" />
                
                <Text style={styles.label}>Ícone:</Text>
                <TextInput style={styles.input} value={novaCatIcone} onChangeText={setNovaCatIcone} placeholder="🏠" maxLength={2} />

                <Text style={styles.label}>Cor da aba:</Text>
                <View style={{flexDirection: 'row', gap: 10, marginBottom: 15, flexWrap: 'wrap'}}>
                  {['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#E1BEE7', '#F0F4C3'].map(cor => (
                    <TouchableOpacity key={cor} onPress={() => setNovaCatCor(cor)} style={{width: 40, height: 40, borderRadius: 20, backgroundColor: cor, borderWidth: novaCatCor === cor ? 3:0, borderColor: '#333'}} />
                  ))}
                </View>

                <TouchableOpacity style={[styles.btnSalvar, {backgroundColor: '#9C27B0'}]} onPress={handleSalvarCategoria}>
                  <Text style={styles.txtSalvar}>{idEdicao ? 'SALVAR CATEGORIA' : 'CRIAR CATEGORIA'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* ================= LISTA (GERENCIAR) ================= */}
        {modoTela === 'lista' && (
          <View>
             {aba === 'palavra' ? (
               <View>
                 <Text style={styles.info}>Toque no lápis para editar ou na lixeira para apagar.</Text>
                 {listaPalavras.map((item) => (
                   <View key={item.id} style={styles.itemRow}>
                     <View style={{flexDirection:'row', alignItems:'center', gap: 10, flex: 1}}>
                       <Image source={{uri: item.url}} style={{width: 35, height: 35}} />
                       <Text style={styles.itemText}>{item.texto}</Text>
                     </View>
                     
                     <View style={{flexDirection: 'row', gap: 10}}>
                        <TouchableOpacity onPress={() => prepararEdicaoBotao(item)} style={styles.btnEdit}>
                            <Text>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletarBotao(item.id, item.texto)} style={styles.btnDelete}>
                            <Text>🗑️</Text>
                        </TouchableOpacity>
                     </View>
                   </View>
                 ))}
                 {listaPalavras.length === 0 && <Text style={{textAlign:'center'}}>Nada aqui.</Text>}
               </View>
             ) : (
               <View>
                 <Text style={styles.info}>Categorias</Text>
                 {Object.values(listaCategorias).map((cat: any) => (
                   <View key={cat.id} style={styles.itemRow}>
                     <View style={{flexDirection:'row', alignItems:'center', gap: 10, flex: 1}}>
                       <View style={{width:30, height:30, backgroundColor: cat.cor, borderRadius: 15, justifyContent:'center', alignItems:'center'}}><Text>{cat.icone}</Text></View>
                       <Text style={styles.itemText}>{cat.titulo}</Text>
                     </View>
                     
                     <View style={{flexDirection: 'row', gap: 10}}>
                        <TouchableOpacity onPress={() => prepararEdicaoCategoria(cat)} style={styles.btnEdit}>
                            <Text>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletarCategoria(cat.id, cat.titulo)} style={styles.btnDelete}>
                            <Text>🗑️</Text>
                        </TouchableOpacity>
                     </View>
                   </View>
                 ))}
               </View>
             )}
          </View>
        )}
        
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 18, fontWeight: 'bold' },
  voltar: { color: '#2196F3', fontSize: 16, fontWeight: 'bold' },
  
  modoContainer: { flexDirection: 'row', padding: 10, gap: 10 },
  btnModo: { flex: 1, padding: 12, backgroundColor: '#eee', borderRadius: 8, alignItems: 'center' },
  btnModoAtivo: { backgroundColor: '#333' },
  txtModo: { fontWeight: 'bold', color: '#999', fontSize: 12 },
  txtModoAtivo: { color: '#fff' },

  abas: { flexDirection: 'row', backgroundColor: '#fff', marginTop: 5 },
  aba: { flex: 1, padding: 15, alignItems: 'center', borderBottomWidth: 3, borderColor: 'transparent' },
  abaAtiva: { borderColor: '#2196F3' },
  txtAba: { fontWeight: 'bold', color: '#555' },

  content: { padding: 20 },
  info: { textAlign: 'center', color: '#666', marginBottom: 20, fontStyle: 'italic', fontSize: 12 },
  label: { fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  
  scrollCats: { flexDirection: 'row', marginBottom: 10 },
  chip: { padding: 10, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#eee', marginRight: 10, borderWidth: 2, borderColor: 'transparent' },
  
  boxImagem: { width: 120, height: 120, backgroundColor: '#e1e1e1', borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10, borderWidth: 1, borderColor: '#ccc' },
  
  btnSalvar: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  txtSalvar: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnCancelarEdicao: { backgroundColor: '#FFEBEE', padding: 8, borderRadius: 5, marginBottom: 10 },

  // Lista
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginBottom: 8, borderRadius: 8, elevation: 1 },
  itemText: { fontSize: 16, fontWeight: '500' },
  btnDelete: { backgroundColor: '#FFEBEE', padding: 10, borderRadius: 8 },
  btnEdit: { backgroundColor: '#E3F2FD', padding: 10, borderRadius: 8 },
});