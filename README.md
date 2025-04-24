# 🎮 Campo Minado - Evolução de Projeto

Um jogo de Campo Minado desenvolvido em React com histórico de versões progressivas! Veja a evolução das funcionalidades através das diferentes releases.

![Minesweeper Preview](./doc/preview.png)

## 🚀 Como Baixar

```bash
# Clone o repositório
git clone https://github.com/FelipeMandelli/CampoMinado.git

# Navegue para a versão desejada
git checkout TAG_DA_VERSAO
```

**Tags Disponíveis:**  
🔖 `v1.0` - Versão Básica  
🔖 `v2.0` - Versão Intermediária  
🔖 `v3.0` - Versão Completa

## 📋 Versões Disponíveis

### 🌱 **Versão 1.0 - Básica**

```bash
git checkout v1.0
```

🛠️ Funcionalidades:

- ⚙️ Geração básica do grid
- 🕵️ Revelação simples de células
- 💥 Detecção de minas
- ⚠️ Sem proteção na primeira jogada
- 🚫 Sem sistema de bandeiras

### 🌿 **Versão 2.0 - Intermediária**

```bash
git checkout v2.0
```

🛠️ Funcionalidades:

- 🛡️ Proteção na primeira jogada
- 🔄 Botão de reset do jogo
- 🧠 Lógica de revelação aprimorada
- 🎯 Geração segura de minas
- 🚫 Ainda sem bandeiras

### 🌟 **Versão 3.0 - Completa**

```bash
git checkout v3.0
```

🛠️ Funcionalidades:

- 🚩 Sistema de bandeiras (clique direito)
- ✨ Revelação inteligente com duplo clique
- 🎨 Interface aprimorada
- 🔄 Reset mantendo configuração
- 🏆 Experiência completa de jogo

## 🖥️ Como Executar

1. **Instale as dependências:**

```bash
npm install
```

2. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

3. **Acesse no navegador:**

``` bash
http://localhost:3000
```

## 🛠️ Tecnologias Utilizadas

- ⚛️ React
- 🎨 Tailwind CSS
- 🧩 TypeScript
- 🚀 Vite

## 📌 Dicas

- Use ❗**clique esquerdo** para revelar células
- Use ❗**clique direito** (versão 3.0+) para colocar bandeiras
- ⚡**Duplo clique** (versão 3.0+) para revelar áreas seguras
