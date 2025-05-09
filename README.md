📝 Descrição
Jogo da memória desenvolvido com Vue 3, TypeScript, Pinia e Tailwind CSS. O projeto inclui diferentes níveis de dificuldade, contagem de tempo e tentativas, e armazenamento de pontuações.

🚀 Como Executar o Projeto
Pré-requisitos
Node.js (versão 16 ou superior)

npm ou yarn

Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/memory-game.git
cd memory-game
Instale as dependências:

bash
npm install

# ou

yarn install
Crie um arquivo .env na raiz do projeto com suas chaves de API:

env
VITE_API_KEY=sua_chave_aqui
VITE_API_URL=https://api.exemplo.com

bash
npm run dev

# ou

yarn dev

O projeto estará disponível em: http://localhost:5173

🛠 Scripts Disponíveis
Desenvolvimento
bash
npm run dev

# ou

yarn dev
Build para Produção
bash
npm run build

# ou

yarn build
Preview da Build
bash
npm run preview

# ou

yarn preview
🧪 Testes
bash

# Executar todos os testes

npm run test

# ou

yarn run test

🔧 Principais Decisões Técnicas
Arquitetura
Vue 3 com Composition API e <script setup>

TypeScript para tipagem estática

Pinia para gerenciamento de estado

Tailwind CSS para estilização utilitária

Funcionalidades Implementadas
Diferentes Níveis de Dificuldade

Normal: 8 pares de cartas

Difícil: 18 pares de cartas

Configurado via store Pinia

Temporizador e Contador de Tentativas

Implementado com setInterval reativo

Formatação do tempo (MM:SS)

Persistência de Pontuações

Armazenamento no localStorage

Exibição das melhores pontuações

Integração com API Externa

Carregamento assíncrono de imagens

Tratamento de erros e estados de carregamento

Testes
Vitest para testes unitários

@vue/test-utils para testes de componentes

Mocks para:

API externa

localStorage

Timers (setInterval/setTimeout)

Otimizações
Lazy loading de componentes

Virtualização de lista para o modo difícil

Prefetching de imagens

Armazenamento em cache das imagens carregadas

🌐 Variáveis de Ambiente
O projeto utiliza as seguintes variáveis de ambiente (arquivo .env):

📌 Melhorias Futuras
Adicionar modo multiplayer online

Implementar ranking global
