# Documentação do Código — Ellos Design

> Referência técnica de todos os componentes, classes CSS e módulos JavaScript do projeto.

---

## Sumário

1. [Estrutura de Arquivos](#estrutura-de-arquivos)
2. [Design Tokens (CSS Custom Properties)](#design-tokens)
3. [Componentes CSS](#componentes-css)
4. [Seções do HTML](#seções-do-html)
5. [Módulos JavaScript](#módulos-javascript)
6. [Sistema de Animações](#sistema-de-animações)
7. [Convenções e Padrões](#convenções-e-padrões)

---

## Estrutura de Arquivos

```
ellos-design/
├── index.html          # Marcação HTML (estrutura e conteúdo)
├── css/
│   └── styles.css      # Todos os estilos (tokens → seções → responsivo)
├── js/
│   └── main.js         # Todos os comportamentos interativos
└── docs/
    ├── CODE.md         # Este arquivo — documentação técnica
    └── README.md       # Documentação do projeto e instruções de uso
```

---

## Design Tokens

Definidos em `:root` no início de `styles.css`. Alterar esses valores propaga a mudança por todo o projeto.

| Token             | Valor padrão                     | Uso                                    |
|-------------------|----------------------------------|----------------------------------------|
| `--bg`            | `#070c16`                        | Fundo primário (mais escuro)           |
| `--bg-2`          | `#0e1626`                        | Fundo secundário (cards, seções alt.)  |
| `--bg-3`          | `#131d30`                        | Fundo terciário (inputs, hover states) |
| `--accent`        | `#2979FF`                        | Cor de destaque principal (azul)       |
| `--accent-2`      | `#00d4ff`                        | Cor de destaque secundária (ciano)     |
| `--accent-glow`   | `rgba(41, 121, 255, 0.25)`       | Sombra/glow nos botões e elementos     |
| `--text`          | `#e8f0ff`                        | Texto principal                        |
| `--text-muted`    | `#7a8fab`                        | Texto secundário / descrições          |
| `--text-subtle`   | `#3d5070`                        | Texto terciário / placeholders         |
| `--border`        | `rgba(41, 121, 255, 0.18)`       | Bordas com acento (hover, foco)        |
| `--border-dim`    | `rgba(255, 255, 255, 0.06)`      | Bordas sutis no estado padrão          |
| `--radius`        | `12px`                           | Border-radius padrão                   |
| `--radius-lg`     | `20px`                           | Border-radius de cards maiores         |
| `--font-display`  | `'Syne', sans-serif`             | Fonte de títulos e destaques           |
| `--font-body`     | `'Outfit', sans-serif`           | Fonte de corpo de texto                |
| `--font-mono`     | `'DM Mono', monospace`           | Fonte de tags, labels e código         |
| `--transition`    | `0.3s ease`                      | Transição padrão de hover              |

---

## Componentes CSS

### `.container`
Container centralizado com largura máxima de `1200px` e padding horizontal de `24px`.

### `.section`
Padding vertical de `120px` (reduz para `80px` em mobile ≤ 768px).

### `.section-tag`
Eyebrow label com linha decorativa à esquerda (pseudo-elemento `::before`). Usa `--font-mono`, maiúsculas e cor `--accent`.

### `.btn` / `.btn-primary` / `.btn-outline`
Componente de botão reutilizável.

- **`.btn`** — base: flex, padding, font-weight 600, transição.
- **`.btn-primary`** — fundo `--accent`, glow via `box-shadow`, hover com `translateY(-2px)`.
- **`.btn-outline`** — borda `--border`, hover muda borda e texto para `--accent`.

### `.reveal` / `.reveal-stagger`
Classes de animação de entrada por scroll. Iniciam invisíveis (`opacity: 0`, `translateY/X`); recebem `.visible` via IntersectionObserver.

- **`.reveal.from-left`** — entra da esquerda (`translateX(-36px)`).
- **`.reveal.from-right`** — entra da direita (`translateX(36px)`).
- **`.reveal-stagger`** — anima os filhos em sequência com `transition-delay` incremental de 0.1s por filho (suporta até 6 filhos).

---

## Seções do HTML

### `#hero`
Seção full-height com grid de duas colunas: texto à esquerda e mockup de dashboard à direita. Contém decorações CSS puras (`.hero-grid`, `.hero-orb`).

**Elementos especiais:**
- `.hero-grid` — grade de pontos com `mask-image` radial.
- `.hero-orb-1` / `.hero-orb-2` — bolas de luz com `filter: blur` e animação `orbFloat`.
- `.float-card-a` / `.float-card-b` — cards flutuantes com animação `cardFloat`.
- `.bar-fill` / `.mc-fill` — barras do mockup animadas por CSS (`barGrow`, `mcRise`).

### `.marquee-section`
Faixa de texto em loop contínuo. O efeito é obtido duplicando o conteúdo e animando `translateX(-50%)` com `animation: marquee`. Pausa ao passar o mouse (`animation-play-state: paused`).

### `#servicos`
Grid responsivo de cards de serviço com `auto-fit minmax(260px, 1fr)`. Cada `.service-card` tem:
- Linha decorativa no topo (`::before`) que aparece no hover.
- Ícone SVG inline dentro de `.service-icon`.
- `.service-link` visível apenas no hover (opacity transition).

### `#sobre`
Grid de duas colunas. A coluna visual contém `.about-img` (background simulado com grid CSS) e `.about-float` (badge posicionado absolutamente). Os números em `.about-stat-num` são animados pelo módulo de contadores do JS.

### `#portfolio`
Grid de três colunas com o primeiro card ocupando duas colunas (`.span2`). Cada card tem:
- `.pcard-bg` — plano de fundo colorido que escala no hover.
- `.pcard-label` — título sempre visível com gradiente.
- `.pcard-overlay` — sobreposição com detalhes que aparece no hover.

### `#depoimentos`
Grid de três colunas com cards `.tcard`. Cada card tem avatar com iniciais gerado via CSS (gradiente em `.tavatar`).

### `#contato`
Grid de duas colunas: formulário à esquerda, informações de contato à direita. O formulário tem `onsubmit="return false"` para evitar recarregamento (sem backend implementado).

### `footer`
Grid de quatro colunas (`2fr 1fr 1fr 1fr`) com links de navegação e ícones de redes sociais SVG inline.

---

## Módulos JavaScript

Todos os módulos estão em `js/main.js` e são carregados ao final do `<body>`, garantindo que o DOM esteja disponível.

### 1. Navbar Scroll (`navbar`)
```js
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });
```
Adiciona/remove `.scrolled` quando o scroll ultrapassa 50px, ativando o efeito de vidro fosco (backdrop-filter).

### 2. Menu Hambúrguer (`hamburger` / `mobileMenu`)
```js
hamburger.addEventListener('click', () => { ... });
document.querySelectorAll('.m-link').forEach(link => { ... });
```
Alterna as classes `.open` no menu e no botão. Bloqueia `body.overflow` enquanto o menu está aberto. Fecha automaticamente ao clicar em qualquer link `.m-link`.

### 3. Scroll Reveal (`revealObs`)
```js
const revealObs = new IntersectionObserver(callback, { threshold: 0.12 });
```
Observa todos os elementos `.reveal` e `.reveal-stagger`. Quando 12% do elemento entra na viewport, adiciona `.visible` e deixa de observá-lo (one-shot, economiza recursos).

### 4. Contador Numérico (`counterObs`)
```js
const counterObs = new IntersectionObserver(callback, { threshold: 0.5 });
```
Observa elementos com `data-target` (valor final) e `data-suffix` (ex.: `+`, `%`). Quando 50% do elemento é visível, inicia a animação com `requestAnimationFrame` usando easing **easeOutQuart** (`1 - (1-p)^4`) em 1400ms.

**Atributos HTML necessários:**
```html
<div data-target="200" data-suffix="+">0</div>
```

### 5. Link Ativo na Navbar (`activeObs`)
```js
const activeObs = new IntersectionObserver(callback, { threshold: 0.4 });
```
Observa todas as `section[id]`. Quando 40% de uma seção está visível, destaca o link correspondente na navbar comparando o `href` do link com o `#id` da seção.

---

## Sistema de Animações

| Animação      | Elemento          | Tipo        | Duração   | Disparador       |
|---------------|-------------------|-------------|-----------|------------------|
| `fadeUp`      | Hero (texto/visual) | CSS keyframe | 0.8s    | Página carrega   |
| `orbFloat`    | `.hero-orb`       | CSS keyframe | 8s loop  | Automático       |
| `cardFloat`   | `.float-card`     | CSS keyframe | 4s loop  | Automático       |
| `pulse`       | `.hero-badge-dot` | CSS keyframe | 2s loop  | Automático       |
| `marquee`     | `.marquee-track`  | CSS keyframe | 22s loop | Automático       |
| `barGrow`     | `.bar-fill`       | CSS keyframe | 1.4s     | Página carrega   |
| `mcRise`      | `.mc-fill`        | CSS keyframe | 1.2s     | Página carrega   |
| `.reveal`     | Seções/cards      | JS + CSS    | 0.75s    | IntersectionObserver |
| Contadores    | `[data-target]`   | JS rAF      | 1.4s     | IntersectionObserver |

---

## Convenções e Padrões

**Nomenclatura CSS:** BEM-light — bloco com hífen, modificador com hífen duplo não é usado; prefixos de contexto são aplicados (ex.: `hero-`, `nav-`, `pcard-`, `tcard-`).

**Ícones:** SVG inline, sem biblioteca externa. Todos usam `stroke` com `fill: none` (exceto ícones de redes sociais, que usam `fill`).

**Fontes:** Carregadas via Google Fonts com `display=swap` para evitar FOUT. Pré-conectadas com `<link rel="preconnect">` para reduzir latência.

**Responsividade:** Mobile-first não adotado; breakpoints descendentes em `@media (max-width: ...)`. Pontos de quebra: `1024px`, `768px`, `480px`.

**Acessibilidade:** Botão hambúrguer tem `aria-label`; a faixa marquee tem `aria-hidden="true"`; ícones sociais têm `aria-label` nos links.
