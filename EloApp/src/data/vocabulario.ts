// src/data/vocabulario.ts

export const CATEGORIAS = {
  PESSOAS: { id: 'pessoas', titulo: 'Pessoas', cor: '#FFF59D', icone: '😊' },
  ACOES:   { id: 'acoes',   titulo: 'Ações',   cor: '#A5D6A7', icone: '🏃' },
  COISAS:  { id: 'coisas',  titulo: 'Coisas',  cor: '#90CAF9', icone: '🧸' },
  SOCIAL:  { id: 'social',  titulo: 'Social',  cor: '#F48FB1', icone: '💬' },
};

export interface BotaoWord {
  id: string;
  texto: string;
  falar: string;
  categoria: string;
  url: string;
}

export const VOCABULARIO: BotaoWord[] = [
  // --- PESSOAS ---
{ id: '1', texto: 'Eu', falar: 'Eu', categoria: 'pessoas', url: 'https://static.arasaac.org/pictograms/31807/31807_300.png' },
  { id: '2', texto: 'Você', falar: 'Você', categoria: 'pessoas', url: 'https://static.arasaac.org/pictograms/31801/31801_300.png' },
  { id: '3', texto: 'Mãe', falar: 'Mamãe', categoria: 'pessoas', url: 'https://static.arasaac.org/pictograms/31148/31148_300.png' },
  { id: '4', texto: 'Pai', falar: 'Papai', categoria: 'pessoas', url: 'https://static.arasaac.org/pictograms/2497/2497_300.png' },
  { id: '5', texto: 'Amigo', falar: 'Amigo', categoria: 'pessoas', url: 'https://static.arasaac.org/pictograms/8487/8487_300.png' },
  { id: '6', texto: 'Professor', falar: 'Professor', categoria: 'pessoas', url: 'https://static.arasaac.org/pictograms/2456/2456_300.png' },
  // --- AÇÕES ---
  { id: '10', texto: 'Quero', falar: 'Quero', categoria: 'acoes', url: 'https://static.arasaac.org/pictograms/6452/6452_300.png' },
  { id: '11', texto: 'Comer', falar: 'Comer', categoria: 'acoes', url: 'https://static.arasaac.org/pictograms/28414/28414_300.png' },
  { id: '12', texto: 'Beber', falar: 'Beber', categoria: 'acoes', url: 'https://static.arasaac.org/pictograms/2276/2276_300.png' },
  { id: '13', texto: 'Ir', falar: 'Ir', categoria: 'acoes', url: 'https://static.arasaac.org/pictograms/31758/31758_300.png' },
  { id: '14', texto: 'Brincar', falar: 'Brincar', categoria: 'acoes', url: 'https://static.arasaac.org/pictograms/36884/36884_300.png' },
  { id: '15', texto: 'Ajuda', falar: 'Ajuda', categoria: 'acoes', url: 'https://static.arasaac.org/pictograms/12252/12252_300.png' },
  
  // --- COISAS ---
  { id: '20', texto: 'Água', falar: 'Água', categoria: 'coisas', url: 'https://static.arasaac.org/pictograms/2248/2248_300.png' },
  { id: '21', texto: 'Banheiro', falar: 'Banheiro', categoria: 'coisas', url: 'https://static.arasaac.org/pictograms/5921/5921_300.png' },
  { id: '22', texto: 'Escola', falar: 'Escola', categoria: 'coisas', url: 'https://static.arasaac.org/pictograms/6454/6454_300.png' },
  { id: '23', texto: 'Brinquedo', falar: 'Brinquedo', categoria: 'coisas', url: 'https://static.arasaac.org/pictograms/4945/4945_300.png' },
  { id: '24', texto: 'Cama', falar: 'Cama', categoria: 'coisas', url: 'https://static.arasaac.org/pictograms/2304/2304_300.png'},
  { id: '25', texto: 'Mochila', falar: 'Mochila', categoria: 'coisas', url: 'https://static.arasaac.org/pictograms/2475/2475_300.png' },

  // --- SOCIAL ---
  { id: '30', texto: 'Sim', falar: 'Sim', categoria: 'social', url: 'https://static.arasaac.org/pictograms/5584/5584_300.png' },
  { id: '31', texto: 'Não', falar: 'Não', categoria: 'social', url: 'https://static.arasaac.org/pictograms/5526/5526_300.png' },
  { id: '32', texto: 'Parar', falar: 'Para ', categoria: 'social', url: 'https://static.arasaac.org/pictograms/7195/7195_300.png' },
  { id: '33', texto: 'Barulho', falar: 'Barulho', categoria: 'social', url: 'https://static.arasaac.org/pictograms/7157/7157_300.png' },
  { id: '34', texto: 'Calma', falar: 'Calma', categoria: 'social', url: 'https://static.arasaac.org/pictograms/39086/39086_300.png' },
  { id: '35', texto: 'Sinto', falar: 'Eu sinto', categoria: 'social', url: 'https://static.arasaac.org/pictograms/31408/31408_300.png' },
  { id: '36', texto: 'Gosto', falar: 'Gosto disso', categoria: 'social', url: 'https://static.arasaac.org/pictograms/3250/3250_300.png' },
  { id: '37', texto: 'Não gosto', falar: 'Não gosto disso', categoria: 'social', url: 'https://static.arasaac.org/pictograms/2374/2374_300.png' },
];