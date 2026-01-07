import { create } from 'zustand';
import { VOCABULARIO as DadosIniciais, CATEGORIAS as CatsIniciais, BotaoWord } from '../data/vocabulario';

interface PerfilData {
  nomeCrianca: string; 
  idade: string; 
  endereco: string; 
  foto: string | null;
  nomeMae: string; 
  contatoMae: string; 
  nomePai: string; 
  contatoPai: string;
  senhaAdmin: string;
}

interface Categoria {
  id: string; titulo: string; cor: string; icone: string;
}

interface StoreState {
  frase: BotaoWord[];
  categoriaAtiva: string;
  perfil: PerfilData;
  listaPalavras: BotaoWord[];
  listaCategorias: Record<string, Categoria>;

  // Ações Básicas
  adicionarPalavra: (palavra: BotaoWord) => void;
  limparFrase: () => void;
  removerUltima: () => void;
  setCategoria: (id: string) => void;
  atualizarPerfil: (dados: Partial<PerfilData>) => void;

  // CRUD
  adicionarItem: (item: BotaoWord) => void;
  editarItem: (id: string, novosDados: Partial<BotaoWord>) => void;
  removerItem: (id: string) => void;
  
  adicionarCategoria: (cat: Categoria) => void;
  editarCategoria: (id: string, novosDados: Partial<Categoria>) => void;
  removerCategoria: (id: string) => void;

  // --- NOVO: RESET GERAL ---
  resetarTudo: () => void;
}

export const useStore = create<StoreState>((set) => ({
  frase: [],
  categoriaAtiva: 'pessoas',
  
  listaPalavras: DadosIniciais,
  listaCategorias: CatsIniciais,

  perfil: {
    nomeCrianca: 'Nome', 
    idade: '6 anos', 
    endereco: '', 
    foto: null,
    nomeMae: '', 
    contatoMae: '', 
    nomePai: '', 
    contatoPai: '',
    senhaAdmin: '1234',
  },

  adicionarPalavra: (palavra) => set((state) => ({ frase: [...state.frase, palavra] })),
  limparFrase: () => set({ frase: [] }),
  removerUltima: () => set((state) => ({ frase: state.frase.slice(0, -1) })),
  setCategoria: (id) => set({ categoriaAtiva: id }),

  atualizarPerfil: (novosDados) => set((state) => ({ perfil: { ...state.perfil, ...novosDados } })),
  
  adicionarItem: (item) => set((state) => ({ 
    listaPalavras: [...state.listaPalavras, item] 
  })),

  editarItem: (id, novosDados) => set((state) => ({
    listaPalavras: state.listaPalavras.map((item) => 
      item.id === id ? { ...item, ...novosDados } : item
    )
  })),

  removerItem: (id) => set((state) => ({
    listaPalavras: state.listaPalavras.filter((item) => item.id !== id)
  })),

  adicionarCategoria: (cat) => set((state) => ({
    listaCategorias: { ...state.listaCategorias, [cat.id]: cat }
  })),

  editarCategoria: (id, novosDados) => set((state) => ({
    listaCategorias: {
      ...state.listaCategorias,
      [id]: { ...state.listaCategorias[id], ...novosDados }
    }
  })),

  removerCategoria: (id) => set((state) => {
    const novasCats = { ...state.listaCategorias };
    delete novasCats[id];
    const novaAtiva = state.categoriaAtiva === id ? 'pessoas' : state.categoriaAtiva;
    return { 
      listaCategorias: novasCats,
      categoriaAtiva: novaAtiva
    };
  }),

  // Implementação do Reset
  resetarTudo: () => set({
    frase: [],
    categoriaAtiva: 'pessoas',
    listaPalavras: DadosIniciais, // Volta para o arquivo original
    listaCategorias: CatsIniciais, // Volta para o arquivo original
    perfil: {
      nomeCrianca: 'Nome', 
      idade: '6 anos', 
      endereco: '', 
      foto: null,
      nomeMae: '', 
      contatoMae: '', 
      nomePai: '', 
      contatoPai: '',
      senhaAdmin: '1234',
    }
  }),
}));