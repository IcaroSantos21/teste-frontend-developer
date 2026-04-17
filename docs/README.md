# Ellos Design — Site Institucional

Landing page institucional para a **Ellos Design**, agência de marketing digital e criação de sites localizada em Guarulhos/SP.

---

## Visão Geral

O projeto é um site de página única (SPA-like) construído com **HTML, CSS e JavaScript puros**, sem dependências de bibliotecas ou frameworks. O design segue uma estética dark com paleta azul-marinho e acentos vibrantes (azul elétrico e ciano).

### Seções da Página

| Seção          | ID              | Descrição                                           |
|----------------|-----------------|-----------------------------------------------------|
| Hero           | `#hero`         | Apresentação principal com mockup de dashboard      |
| Marquee        | —               | Faixa de rolagem automática com palavras-chave      |
| Serviços       | `#servicos`     | Cards dos 4 serviços principais                     |
| Sobre          | `#sobre`        | História da agência e estatísticas animadas         |
| Portfólio      | `#portfolio`    | Grade com 6 projetos fictícios                      |
| Depoimentos    | `#depoimentos`  | 3 cards de avaliação de clientes                    |
| Contato        | `#contato`      | Formulário + informações de contato                 |
| Footer         | —               | Links de navegação, redes sociais e copyright       |

---

## Tecnologias

- **HTML5** — semântico e acessível
- **CSS3** — Custom Properties, Grid, Flexbox, Animations, IntersectionObserver-ready
- **JavaScript (ES2020)** — vanilla, módulos lógicos comentados, IntersectionObserver API, requestAnimationFrame
- **Google Fonts** — Syne · Outfit · DM Mono (carregadas via CDN)

---

## Estrutura de Arquivos

```
ellos-design/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Todos os estilos organizados em 15 blocos
├── js/
│   └── main.js         # Todos os comportamentos interativos (5 módulos)
└── docs/
    ├── README.md       # Este arquivo — visão geral e instruções
    └── CODE.md         # Documentação técnica detalhada do código
```

---

## Como Executar

O projeto **não possui dependências** e **não requer instalação de pacotes**. Basta abrir o `index.html` em um navegador. Há duas formas recomendadas:

### Opção 1 — Abrir diretamente no navegador

1. Faça o download ou clone a pasta do projeto.
2. Navegue até a pasta `ellos-design/`.
3. Dê duplo clique em `index.html`.

> **Atenção:** alguns navegadores bloqueiam recursos locais ao abrir via `file://`. Se notar que as fontes do Google não carregam, use a Opção 2.

---

### Opção 2 — Servidor local (recomendado)

Esta opção garante que todos os recursos (fontes, CSS externo) carregam corretamente.

#### Com VS Code — Live Server (mais simples)

1. Instale a extensão **Live Server** no VS Code.
2. Abra a pasta `ellos-design/` no VS Code.
3. Clique com o botão direito em `index.html` → **"Open with Live Server"**.
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500`.

#### Com Node.js — `http-server`

```bash
# Instalar o http-server globalmente (apenas na primeira vez)
npm install -g http-server

# Navegar até a pasta do projeto
cd ellos-design

# Iniciar o servidor
http-server -p 8080

# Acessar no navegador
# http://localhost:8080
```

#### Com Python 3

```bash
# Navegar até a pasta do projeto
cd ellos-design

# Iniciar o servidor
python3 -m http.server 8080

# Acessar no navegador
# http://localhost:8080
```

#### Com PHP

```bash
cd ellos-design
php -S localhost:8080
```

---

## Funcionalidades Interativas

| Funcionalidade              | Como testar                                                  |
|-----------------------------|--------------------------------------------------------------|
| Navbar com frosted glass    | Role a página para baixo; a navbar muda de aparência         |
| Menu hambúrguer             | Redimensione a janela para ≤ 768px e clique no ícone ≡       |
| Animações de scroll reveal  | Role a página; elementos entram com fade + slide             |
| Contadores animados         | Role até a seção "Sobre"; os números sobem do zero           |
| Link ativo na navbar        | Role entre seções; o link correspondente fica destacado      |
| Hover nos cards de serviço  | Passe o mouse sobre os cards na seção "Serviços"             |
| Hover nos cards de portfólio | Passe o mouse sobre os projetos para ver o overlay          |
| Pausa do marquee            | Passe o mouse sobre a faixa de rolagem para pausá-la         |

---

## Personalização

### Trocar cores do tema
Edite os tokens em `css/styles.css`, bloco **"1. DESIGN TOKENS"**:
```css
:root {
  --accent:   #2979FF;  /* cor de destaque principal */
  --accent-2: #00d4ff;  /* cor de destaque secundária */
  --bg:       #070c16;  /* fundo mais escuro */
}
```

### Adicionar um projeto ao portfólio
Em `index.html`, dentro de `#portfolio > .portfolio-grid`, copie um bloco `.portfolio-card` e ajuste:
```html
<div class="portfolio-card">
  <div class="pcard-bg bg1"></div>        <!-- bg1 a bg6 disponíveis -->
  <div class="pcard-label">Meu Projeto</div>
  <div class="pcard-overlay">
    <span class="pcard-tag">Categoria</span>
    <div class="pcard-title">Nome do Projeto</div>
    <div class="pcard-sub">Serviços realizados</div>
  </div>
</div>
```

### Adicionar um depoimento
Em `#depoimentos > .testimonials-grid`, copie um `.tcard` e ajuste as iniciais do avatar, nome e cargo:
```html
<div class="tcard">
  <span class="quote">"</span>
  <div class="stars">★★★★★</div>
  <p class="ttext">Texto do depoimento...</p>
  <div class="tauthor">
    <div class="tavatar">XX</div>  <!-- iniciais -->
    <div>
      <div class="tname">Nome Sobrenome</div>
      <div class="trole">Cargo, Empresa</div>
    </div>
  </div>
</div>
```

### Alterar um contador animado
Localize o elemento com `data-target` em `#sobre` e ajuste os valores:
```html
<div class="about-stat-num" data-target="150" data-suffix="+">0</div>
```

---

## Compatibilidade de Navegadores

| Recurso                  | Chrome | Firefox | Safari | Edge  |
|--------------------------|--------|---------|--------|-------|
| CSS Custom Properties    | ✅ 49+ | ✅ 31+  | ✅ 9.1+| ✅ 15+ |
| CSS Grid                 | ✅ 57+ | ✅ 52+  | ✅ 10.1+| ✅ 16+|
| backdrop-filter          | ✅ 76+ | ✅ 70+  | ✅ 9+  | ✅ 17+ |
| IntersectionObserver     | ✅ 51+ | ✅ 55+  | ✅ 12.1+| ✅ 15+|
| CSS mask-image           | ✅     | ✅      | ✅ (-webkit) | ✅ |

> Recomenda-se Chrome 90+, Firefox 88+, Safari 14+ ou Edge 90+.

---

## Licença

Projeto de uso interno da **Ellos Design**. Todos os direitos reservados © 2024.
