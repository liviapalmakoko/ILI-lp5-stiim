# STiiM · Ajustes finais · card 86ah19vv5

Repositório: `liviapalmakoko/ILI-lp5-stiim` (clone em `~/repos/ILI-lp5-stiim`)
Branch de trabalho: `ajustes-stiim-86ah19vv5`, criada a partir de `feat/fotos-reais-morfologia`
Espelho: https://stiim.dev.koko.ag (publicação é da Gabs ou do Murilo)

Fontes usadas: `Ajustes LP Stiim.pdf` (anexo do card, 9 páginas, lido página a página),
o prompt em `~/docs/prompt-stiim-ajustes-finais.md`, e
`~/stiim-fotos/biomedicines-14-01447-g004.png` (a `Mdpibiomedicines-14-01447-g004.png`
que o card cita, mesmo arquivo).

---

## 1. Estado do repositório antes de começar

**Qual branch corresponde ao que está no ar.** Não dá para conferir de dentro desta caixa:
`stiim.dev.koko.ag` não responde daqui (fronteira de rede, comportamento esperado). Então
identifiquei pela imagem. Os prints do próprio cliente no PDF mostram, na seção
Lattice-Pore, a esfera dourada com fragmentos ao redor, que é
`stiim-particula-ilustracao-v2.webp`, e no bloco comparativo as duas imagens **colorizadas**
da designer (`stiim-comparador-*-v2.webp`). Essas duas imagens só existem juntas em
`feat/fotos-reais-morfologia` (commit `06228f7`). Portanto o que está no ar é essa branch, e
foi dela que saiu a branch de trabalho.

**Achados que ficam registrados, sem descartar nada:**

| O quê | Situação |
|---|---|
| `feat/fotos-reais-morfologia` | Existe só localmente. `origin/main` está em `8001760`; os três commits seguintes (`ef4debf`, `d17e9e6`, `06228f7`) nunca foram empurrados. |
| `~/stim-dev` e `~/stim-prod` | Cópias fora de git, sem `.git`, idênticas entre si. O `index.html` delas (md5 `762ffe3a`) **não bate com nenhum commit** do repositório. É a derivação de 19/08 feita direto no servidor, com outros recortes da mesma figura (`sem-produtoA-g004a.webp`, `sem-stiim-g004b.webp`). Não foram tocadas nem apagadas. |
| Árvore de trabalho | Limpa (`git status` sem alterações) antes de começar. |
| Nome da branch | `feat/fotos-reais-morfologia` engana: ela é justamente a que **substituiu** as micrografias reais pelas ilustrações da designer. As fotos reais entraram em `ef4debf` e saíram em `06228f7`. |

O `README.md` e `materiais/FONTES-IMAGENS-MORFOLOGIA.md` do repositório continuam válidos e
foram lidos antes de mexer, como o próprio README pede.

---

## 2. Arquivos alterados

| Arquivo | O que mudou |
|---|---|
| `index.html` | Conteúdo: toxina botulínica, rótulos, lista de aplicações, micrografias, referências. |
| `styles.css` | Amarelo, raios de borda, círculos dos números, hierarquia da linha do tempo, exibição das micrografias. |
| `script.js` | Correção de acessibilidade nos dois blocos que viram sanfona no mobile. |

**Assets novos** (todos gerados nesta rodada, origem declarada abaixo):

| Arquivo | Origem | Peso |
|---|---|---|
| `assets/img/fig4a-produtoR.webp` | Recorte do painel **A** de `biomedicines-14-01447-g004.png` | 83 KB |
| `assets/img/fig4b-stiim.webp` | Recorte do painel **B** da mesma figura | 76 KB |
| `assets/img/fig4d-stiim.webp` | Recorte do painel **D** da mesma figura | 49 KB |
| `assets/img/hero-moleculas.webp` | Conversão de `hero-moleculas.png`, sem recorte | 53 KB (era 875 KB) |
| `assets/img/hero-caixas-limpas.webp` | Conversão de `hero-caixas-limpas.png` | 17 KB (era 261 KB) |
| `assets/img/logo-stiim-nav-dark.webp` | Conversão do PNG, reduzido de 615px para 292px | 3 KB (era 20 KB) |
| `assets/img/stiim-ciencia-celular.webp` | Conversão do JPG homônimo | 49 KB (era 276 KB) |
| `assets/img/stiim-estrutura-pele.webp` | Conversão do JPG homônimo | 57 KB (era 321 KB) |
| `assets/img/stiim-resultado-natural.webp` | Conversão do JPG homônimo | 81 KB (era 424 KB) |

Os arquivos originais (PNG e JPG) continuam no repositório, sem uso na página. Não apaguei
nenhum. Os recortes antigos `sem-produtoA-fig4a.webp`, `sem-stiim-fig4b.webp` e
`particula-stiim-fig4d.webp` também continuam lá: são recortes parciais da mesma figura,
com a altura cortada e, no caso do painel D, **sem a letra do painel**. Foram substituídos
pelos recortes novos justamente por isso.

---

## 3. Item a item, o que o PDF pediu

### Palavra proibida: "corporal"

**Zero ocorrências, confirmado em dois níveis.** No código-fonte (`index.html`, `styles.css`,
`script.js`) e também no DOM já renderizado, com todas as abas, hotspots e painéis abertos
via script — checando HTML, texto visível, `alt`, `aria-label`, `aria-valuetext`, `title`,
`meta`, JSON-LD e o conteúdo de todos os recursos que a página carrega. Testei
`corporal`, `corporais` e o radical `corpora`, sem distinção de maiúsculas: zero em todos.

A palavra já não estava na página quando comecei — ela saiu na rodada de 19/08, quando duas
áreas anatômicas foram substituídas por "Grandes áreas". Nenhuma reintroduziu.

### Toxina botulínica

Removida. O parágrafo da seção de aplicação era:

> Quando indicado, também pode compor protocolos combinados com **toxina botulínica**, ácido hialurônico, fios e tecnologias.

e passou a ser:

> Quando indicado, também pode compor protocolos combinados com ácido hialurônico, fios e tecnologias.

Grep por `toxina` e por `botul` (que pega qualquer flexão): zero, no fonte e no DOM.

### Amarelo mais sutil

O amarelo da marca (`#FFCA08`) **continua existindo e continua sendo o amarelo de STIIM**.
O que mudou foi o uso: ele deixou de preencher seções inteiras, que era o que dava a cara de
comunicação de massa, e voltou a ser acento (botões, pontos da linha do tempo, círculos dos
números, florzinha da Ilikia).

Três tokens novos entraram, nenhum antigo saiu:

| Token | Valor | Papel |
|---|---|---|
| `--gold-field` | `#f6e6bd` | dourado claro, para área grande |
| `--cream` | `#faf3e2` | creme, base da seção |
| `--gold-ink` | `#5a4708` | texto sobre o campo dourado |

A seção "Resultados que evoluem com o tempo" era `background: var(--yellow)` chapado de borda
a borda. Virou um gradiente creme → dourado claro → creme, e o conteúdo passou a viver dentro
de uma peça arredondada única. Contraste do texto sobre o campo dourado: `#5a4708` sobre
`#f6e6bd` fica bem acima do mínimo AA.

### Cards superiores (a faixa do hero)

Era `bottom: 0` com raio só nos dois cantos de cima, ou seja, literalmente cortada pela
divisão entre as seções. Agora:

- `bottom: 26px` no desktop e `18px` no mobile: a faixa descola da divisão;
- raio igual nos quatro cantos, usando `var(--radius)`;
- mesmo raio em desktop, tablet e mobile (o breakpoint mobile ainda repetia a versão
  cortada, com raio só em cima; foi corrigido);
- uma borda de 1px suave para o card fechar visualmente.

**Raios uniformes em geral.** Entrou o token `--radius-card: 20px` e ele substituiu os
valores soltos que variavam por breakpoint. O caso pior era o card de etapa do mecanismo:
22px no desktop e 16px no mobile. Outros ajustados: painel de vidro do mecanismo (era 42px),
halo dos cards (42px), painel sanfona do mecanismo e da linha do tempo (16px), caixa de marco
da linha do tempo (16px no desktop e 13px no mobile), e os três blocos do comparador (20px
soltos). Nenhum raio de card depende mais de breakpoint.

### Molécula Lattice-Pore · NÃO FOI FEITO, ver bloqueio

Está detalhado em "Bloqueios", item 1. Em resumo: a imagem que o cliente aponta como
"essa que vocês já haviam feito" não existe no projeto em resolução utilizável, e gerar uma
parecida está explicitamente proibido. As duas ocorrências seguem com a imagem atual.

### Comparação de partículas

Feito. As duas ilustrações coloridas saíram e entraram as micrografias reais:

| | Antes | Agora |
|---|---|---|
| Esquerda | `stiim-comparador-maior-concentracao-v2.webp` (ilustração dourada) | `fig4a-produtoR.webp` (painel A, preto e branco) |
| Direita | `stiim-comparador-menor-concentracao-v2.webp` (ilustração dourada) | `fig4b-stiim.webp` (painel B, preto e branco) |
| Rótulo esquerdo | **Produto A** | **Produto R** |
| Legenda do bloco | "Representação ilustrativa da morfologia de superfície." | "Microscopia eletrônica de varredura (MEV). Barra de escala: 50 µm." |
| Crédito | "Morfologia descrita em: …" | "Imagens: …" com o DOI linkado |

**Como os recortes foram feitos.** Achei os limites dos quatro painéis por análise das
colunas e linhas brancas da figura original (2586×2860, escala de cinza) e cortei no limite
exato de cada painel. Só recorte, nada mais: sem colorizar, sem filtro, sem mudar contraste,
sem redimensionar, sem esticar. Cada painel sai inteiro, com a **letra do painel**, a **barra
de escala** e a **etiqueta `INSPECT-LCE-UFSCar`** visíveis.

Para nada ser cortado na tela, o `.comparison figure img` deixou de ser `aspect-ratio: 1.3/1`
com `object-fit: cover` (que comia a barra de escala) e passou a `0.9/1` com
`object-fit: contain` sobre fundo escuro. A proporção do box acompanha a do painel, então na
prática não sobra tarja.

### Texto da seção de distribuição

Trocado exatamente como pedido:

> "Geometria irregular, **semelhante a areia**, com perda precoce de volume."

virou

> "**Superfície e estrutura irregulares.**"

E "Produto A" virou "Produto R" também aqui, em todos os lugares: botão da legenda,
`aria-label` da curva no gráfico, descrição acessível do SVG e o painel de detalhe.

### Bloco de resposta contínua (mecanismo de ação)

- **Círculo do número maior:** 34px → **52px** no desktop, 30px → **42px** no mobile. O
  número cresceu junto (9px → 14px) para continuar legível dentro dele.
- **Círculo centralizado e sem encostar:** saiu do canto superior direito e foi para o centro
  vertical do card, com 20px de folga até a borda. O padding direito do card subiu de 62px
  para 86px para que texto e círculo não briguem.
- **Composição descolada da borda:** era a queixa direta do cliente. O painel de vidro saiu
  de `left: 0` para `left: 3%` e o texto de `left: 2%` para `left: 6%`. A coluna dos três
  cards saiu de `right: 12%` para `right: 7%`, com o espaço entre eles indo de 18px para 26px.

### Números e cards de etapas

- Separação entre número, título e descrição: o `small` de cada card estava a 7px do título
  (4px no mobile) e foi para 12px (8px no mobile), com peso e tracking maiores para o rótulo
  se diferenciar do título.
- Círculos consistentes: mesmo diâmetro e mesma posição nos três cards, em ambos os
  breakpoints.
- **Hover e foco acessíveis, sem depender só de cor:** o hover agora muda fundo *e* borda, e
  a rotação de -0.7° saiu (movimento gratuito). O estado ativo muda borda, fundo **e** ganha
  um anel em volta do círculo do número, então quem não distingue a cor ainda percebe a
  mudança. O `:focus-visible` com outline de 3px já existia e foi mantido.

### Evidências e resultados ao longo do tempo

- A linha do tempo e os big numbers eram duas faixas soltas sobre o amarelo chapado. Agora
  vivem **dentro da mesma peça arredondada**, com borda e sombra suaves. É isso que resolve
  o "tem bastante conteúdo mas tudo espalhado, não parece que fazem parte de uma única coisa".
- Números menores e com respiro: `clamp(72px…118px)` → `clamp(56px…86px)` nas métricas de
  dois itens e `clamp(64px…92px)` → `clamp(48px…68px)` nas de três. O espaço entre métricas
  subiu de 36px para 56px (e de 26px para 44px nas de três), e entre número e legenda de 12px
  para 16px. Era o "+449%+457%" colado que o cliente marcou.
- O rótulo do período ("2 semanas", "2 meses") também encolheu, de até 66px para até 54px,
  para não competir com a métrica.
- Amarelo sutil aplicado em todos os elementos da seção: trilho, pontos, marcos, texto.
- **Todos os dados oficiais foram preservados, sem exceção:** +70% e +86% (2 semanas),
  +449% e +457% (2 meses), +51%, 85% e 81% (4 meses), 94%, 75% e 2D/3D (12 meses), e os
  marcos de 6 meses e até 24 meses. Nenhum número novo, nenhum número alterado.

### Aplicações e possibilidades

Os quatro itens numerados passaram a ser **exatamente** as quatro expressões pedidas:

| | Antes | Agora |
|---|---|---|
| 01 | Região malar · Projeção e sustentação do terço médio | **Projeção** |
| 02 | Contorno facial · Redefinição do perímetro do rosto | **Bioestímulo e Qualidade de Pele** |
| 03 | Mandíbula · Definição do contorno mandibular e suporte estrutural | **Reposicionamento** |
| 04 | Grandes áreas · Textura, firmeza e qualidade da pele | **Estruturação** |

**Duas decisões que precisam do seu aval:**

1. **As linhas de apoio saíram.** As antigas descreviam sítios anatômicos e não descrevem
   mais nada depois da troca de título. Inventar uma frase nova para cada finalidade seria
   criar indicação clínica sem fonte, o que está proibido. Se o cliente quiser uma linha em
   cada, ela precisa vir dele.
2. **A lista deixou de ser um seletor.** Antes cada item acendia um ponto no rosto. Com os
   títulos novos, essa ligação passaria a afirmar coisas como "Bioestímulo e Qualidade de
   Pele = contorno facial", que nenhuma fonte do projeto sustenta. A lista virou uma `<ol>`
   estática numerada, com o mesmo desenho de linha. Os pontos no rosto continuam interativos
   e continuam nomeando a própria área, ao lado da foto.

**A troca da foto da mulher NÃO foi feita.** Ver "Bloqueios", item 2.

### Imagens científicas e referência bibliográfica

O bloco "Naturalidade para diferentes tempos da pele" passou a usar os painéis **B** e **D**
da Figura 4, em preto e branco, e ganhou a referência embaixo, com o DOI linkado, no formato
exato pedido:

> Imagens: Dal Col V, Matte BF. *Calcium hydroxyapatite biostimulators: a comparative study of
> biological response and particle morphology.* Biomedicines. 2026;14(7):1447.
> DOI: [10.3390/biomedicines14071447](https://doi.org/10.3390/biomedicines14071447).

A mesma referência, no mesmo formato, ficou no bloco de comparação de partículas. Nenhum
autor, título, periódico, ano, volume, número, página ou DOI foi abreviado. A referência tem
16px de folga até a imagem e não encosta na borda do bloco. Ela também já constava na lista
de referências do rodapé e continua lá.

**Uma mudança de apresentação que eu precisei fazer, e o motivo.** Aquele bloco era um
comparador de cortina: duas imagens sobrepostas, com uma alça que revela uma ou outra. Isso
funciona com ilustração, mas com micrografia esconde justamente o que o briefing manda
preservar: no corte padrão de 50%, a barra de escala do painel B e a letra do painel D ficam
fora da área visível. Virou um par lado a lado, que mostra os dois painéis inteiros, cada um
com sua letra, sua escala (50 µm e 40 µm) e a etiqueta do laboratório. Os dois cards de texto
("Maior concentração" / "Menor concentração") continuam iguais, com a copy aprovada.

O JavaScript do comparador continua em `script.js`, inerte por não achar mais o elemento,
caso vocês queiram o comportamento de volta.

---

## 4. Integridade científica: o que eu não afirmei

Três coisas que a fonte não sustenta e que, por isso, a página não afirma:

1. **Painéis B e D não são duas concentrações.** No artigo eles são duas **ampliações**
   diferentes (50 µm e 40 µm) da morfologia, do mesmo material. O cliente pediu essas imagens
   nesse bloco e a troca foi feita, mas nenhuma legenda diz que a imagem representa uma
   concentração: cada painel é rotulado pelo painel e pela escala. Quem fala de maior e menor
   concentração é o texto dos cards, que é copy aprovada e não mudou. **Isso precisa do ok do
   cliente antes de publicar.**

2. **Qual painel é qual produto continua sendo inferência.** O artigo chama os dois materiais
   de "Sample R" e "Sample S" e não nomeia marcas. O pedido de trocar o rótulo antigo por
   "Produto R" **reforça** a leitura de que o painel A é a amostra R do artigo, o que é uma
   coincidência boa, mas ainda não é leitura da legenda da Figura 4. A pendência que já estava
   registrada em `materiais/FONTES-IMAGENS-MORFOLOGIA.md` continua aberta, e o comentário no
   HTML acima do bloco diz exatamente onde mexer se a atribuição estiver invertida.

3. **"Microscopia FE-SEM x5.000" não voltou.** A figura citada não declara magnificação em
   lugar nenhum; ela traz barra de escala. A legenda do bloco diz o que a fonte sustenta:
   "Microscopia eletrônica de varredura (MEV). Barra de escala: 50 µm."

Nenhum dado, resultado, concentração, indicação, referência, percentual ou conclusão clínica
foi inventado nesta rodada.

---

## 5. Testes

### Formulário, de ponta a ponta

Endpoint: `POST https://www.rdstation.com.br/api/1.3/conversions`
Identificador: `lp-stiim` · Token: público do RD Station, o mesmo que já estava no código.
**O endpoint não foi alterado.**

Payload enviado (capturado na requisição real):

```json
{"token_rdstation":"61d98fcb…","identificador":"lp-stiim","nome":"[TESTE-KOKO] LP STIIM",
 "email":"teste-koko-stiim@koko.ag","telefone":"11999990000","cf_cpf_cnpj":"",
 "cf_numero_do_registro":"TESTE-KOKO-0001","cf_especialidade":"Dermatologista",
 "cidade":"Sao Paulo","estado":"SP"}
```

Resposta do RD Station: **HTTP 200** · `{"result":"success","msg":"Lead conversion saved."}`
Front-end depois do envio: formulário oculto, bloco de sucesso visível com "Solicitação
recebida. Nossa equipe entrará em contato pelo canal informado.", nenhum erro na tela.

| Cenário | Resultado |
|---|---|
| Campos obrigatórios vazios | Erro na tela: "Confira os campos obrigatórios para continuar." Foco vai para o primeiro campo inválido (`nome`). Formulário continua visível. |
| E-mail inválido | Mesmo erro, foco em `email`, validação nativa do navegador acusando o `@` faltando. |
| Falha de rede (requisição abortada) | Erro na tela: "Não foi possível enviar agora. Tente novamente em instantes." Sucesso **não** é mostrado. Botão volta a ficar clicável. |
| Erro 500 do servidor | Mesmo tratamento. Sucesso **não** é mostrado. |
| Envio real | 200, lead gravado, sucesso no front. |

Ou seja: falha não é exibida como sucesso em nenhum dos quatro caminhos.

**Lead de teste para apagar no RD Station:**

| Campo | Valor |
|---|---|
| Nome | `[TESTE-KOKO] LP STIIM` |
| E-mail | `teste-koko-stiim@koko.ag` |
| Telefone | `11999990000` |
| Registro | `TESTE-KOKO-0001` |
| Identificador | `lp-stiim` |

Foi enviado **um único** lead. As demais verificações usaram interceptação de requisição, sem
chegar ao RD. Nenhum dado real de usuário foi usado.

### Carregamento, console e rede

Execução limpa, servida por HTTP local (`python3 -m http.server 8137`), em 1440, 768 e 390:

- **Console:** zero `error`, zero `warning`, zero `pageerror`.
- **Rede:** zero requisição falhada, zero resposta 4xx ou 5xx, zero 404.
- **Imagens:** todas carregam, inclusive as três micrografias. Verificado por
  `naturalWidth > 0` em cada `<img>` da página.
- **Fontes:** os seis cortes da Gotham carregam de `assets/fonts/`. Nenhuma fonte faltando.
- **Âncoras e CTAs:** 19 links internos, **nenhuma âncora quebrada** (todo `href="#id"`
  aponta para um elemento existente).
- **Foco:** 53 elementos focáveis, todos com `:focus-visible` visível.

### Responsividade

Shots em `docs/shots/ajustes-finais/`, nas três larguras, por seção
(`hero-cards`, `tecnologia-morfologia`, `resposta-continua`, `evidencias`, `aplicacoes`,
`formulario`) mais a página inteira (`pagina-inteira-1440/768/390.jpg`).

Sem estouro horizontal, sem texto sobreposto, sem bloco cortado e sem área vazia inesperada
em nenhuma das três larguras. As micrografias aparecem inteiras nas três.

### Lighthouse

Rodado com o Chromium da caixa, perfil mobile padrão.

| Categoria | Antes | Depois |
|---|---|---|
| Performance | 71 | **92** |
| Acessibilidade | 96 | **100** |
| Boas práticas | 100 | **100** |
| SEO | 100 | **100** |

| Métrica | Antes | Depois |
|---|---|---|
| First Contentful Paint | 1,7 s | 1,7 s |
| Largest Contentful Paint | 11,3 s | **3,3 s** |
| Total Blocking Time | 180 ms | **0 ms** |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 3,1 s | **1,7 s** |
| Peso total transferido | ~2,5 MB | **471 KB** |

**O que causou o ganho.** Seis imagens pesadas em PNG e JPG viraram WebP, sem recorte e sem
perda visível (PSNR acima de 36 dB nas duas do hero, conferido contra o original). O maior
ofensor era `hero-moleculas.png`: 875 KB, usado duas vezes na primeira dobra. Virou 53 KB.
**As micrografias científicas não foram recomprimidas** além do WebP de qualidade 90 do
recorte original, justamente para não comprometê-las.

### Acessibilidade: um bug real encontrado e corrigido

O Lighthouse acusou `aria-required-children`. A causa: no mobile, o JavaScript transforma os
dois blocos de abas (mecanismo de ação e linha do tempo) em sanfona e **move os painéis para
dentro do container**. Só que esse container é um `role="tablist"`, que só aceita filhos
`role="tab"`. A árvore de acessibilidade ficava inválida, e os botões acumulavam
`aria-selected` e `aria-expanded` ao mesmo tempo, que são padrões diferentes.

Correção: um helper (`aplicarPadraoAria`) troca o padrão ARIA junto com o layout. No desktop
é abas (`tablist` / `tab` / `tabpanel`, com `aria-selected` e tabindex móvel). No mobile é
sanfona (`group` / botão sem role / `region`, com `aria-expanded` e todos os botões
alcançáveis pelo Tab). As buscas pela aba ativa passaram a aceitar os dois atributos, para o
passo ativo não se perder ao girar o aparelho. Acessibilidade foi de 96 para 100.

### Lint, typecheck e build

O projeto é HTML, CSS e JS puros, sem `package.json`, sem framework e sem etapa de build.
Não existe lint, typecheck, build nem suíte de testes para rodar, então não há resultado a
reportar aqui. A verificação equivalente que dá para fazer foi feita: `script.js` foi
checado sintaticamente (`new Function` sobre o arquivo, sem erro) e a página foi carregada e
exercitada de verdade no navegador.

### Grep final

Feito no fonte e também no DOM renderizado, com todas as abas e hotspots acionados:

| Termo | Fonte | DOM, texto, alt, aria, meta, JSON-LD, recursos |
|---|---|---|
| `corporal` / `corporais` / `corpora` | 0 | 0 |
| `toxina` / `botul` | 0 | 0 |
| `Produto A` | 0 | 0 |
| `semelhante a areia` | 0 | 0 |

---

## 6. Bloqueios

### 1. A molécula Lattice-Pore dourada · não dá para fazer daqui

O PDF diz "mudar essa foto de molécula para **essa que vocês já haviam feito**, mas deixar
dourada, sem aspecto de vidro", e mostra ao lado uma miniatura: uma esfera formada por placas
sobrepostas, esbranquiçada, com fragmentos flutuando ao redor.

Essa imagem **não existe no projeto**. Procurei em `assets/img/`, em
`materiais/img-nao-usadas/` (25 arquivos), nas duas cópias de servidor em `~/stim-dev` e
`~/stim-prod` e em toda a caixa. O que existe é parecido, mas não é a mesma peça:
`stiim-particula-ilustracao-v1/v2` é uma esfera de bolhas douradas, `white-molecule` é uma
cúpula de favos, `esfera-lattice-dourada` é outra coisa ainda. A única cópia da imagem
pedida é a miniatura embutida no PDF, com **265 × 148 pixels**.

265 × 148 não serve para um bloco que ocupa meia tela, e as duas saídas possíveis estão
proibidas pelo próprio briefing: "não substitua essa imagem por uma imagem gerada, recriada ou
visualmente parecida". Então não mexi: as duas ocorrências seguem com a imagem que está no ar.

**O que destrava:** o arquivo original da ilustração, em alta, com a Lívia ou no Drive do
projeto. Com ele em mãos o tratamento dourado e sem aspecto de vidro é rápido, e vale para as
duas ocorrências mais o bloco de resposta contínua.

### 2. A foto da mulher na seção de aplicações · mesmo motivo

O PDF pede para substituir a mulher de corpo inteiro e mostra, como referência, um print de
**slide inteiro** do deck do cliente (o layout 400GRAUS), com **768 × 432 pixels**. Não é o
arquivo da foto: é uma captura de tela de uma apresentação, com texto, logo e caixa do produto
por cima. Recortar a modelo dali daria uma imagem borrada, e recriar está proibido.

Vale registrar duas coisas para a conversa com o cliente:

- A LP **não tem** uma mulher de corpo inteiro hoje. A seção de aplicações usa um retrato
  de rosto e ombros. Pode ser que o pedido seja o contrário do que a frase sugere: trocar o
  retrato **pela** foto do slide. Nos dois casos o bloqueio é o mesmo, falta o arquivo.
- O slide de referência usa a palavra proibida em uma das legendas ("Facial & Corporal").
  Se essa arte for aproveitada, esse texto não pode vir junto.

**O que destrava:** o arquivo da foto aprovada, em alta.

### 3. O espelho não é alcançável daqui

`stiim.dev.koko.ag` não responde desta caixa, e não deve mesmo: a separação de rede é de
propósito. Por isso a identificação da branch que está no ar foi feita comparando os prints
do cliente com os assets de cada commit (item 1 deste relatório). Se a Gabs conseguir abrir o
espelho e confirmar que ele mostra a esfera dourada com fragmentos na seção Lattice-Pore, a
base está confirmada. Se mostrar outra coisa, me avisa que eu refaço a branch a partir da
base certa.

### 4. Nada foi publicado (e o push funcionou, não precisou de bundle)

Commit e push apenas na branch de trabalho `ajustes-stiim-86ah19vv5`. `main` não foi tocada.
Publicar é da Gabs ou do Murilo.

A caixa **tem** credencial de push para o repositório da Lívia: o `gh` está autenticado como
`gabriellef1` com escopo `repo`, e o push pelo remote HTTPS passou. Então **não** foi preciso
gerar bundle em `~/docs/stiim-86ah19vv5.bundle`.

Um efeito colateral que vale registrar: como a branch de trabalho saiu de
`feat/fotos-reais-morfologia`, que era local, o push levou junto os três commits que nunca
tinham subido (`ef4debf`, `d17e9e6`, `06228f7`). Eles agora existem no remoto, mas apenas
dentro desta branch de trabalho. `main` continua exatamente onde estava, em `8001760`.

---

## 7. Pendências que continuam abertas

1. **Atribuição painel → produto** da Figura 4, contra a legenda do artigo (item 4.2).
2. **Painéis B e D como comparador de concentração** precisa do ok do cliente (item 4.1).
3. **Linhas de apoio das quatro finalidades**, se o cliente quiser uma descrição em cada.
4. **Imagem da molécula** em alta (bloqueio 1).
5. **Foto aprovada** da seção de aplicações em alta (bloqueio 2).
6. **Lead de teste** a apagar no RD Station: `[TESTE-KOKO] LP STIIM`.
7. **Licença web da Gotham** (Hoefler&Co) continua não confirmada, pendência antiga do README.
8. **Tamanho da microesfera** segue inconsistente entre as fontes do cliente (a página usa
   25–45 µm, a mais recente), pendência antiga do README.

---

## Segurança

- **Nenhum segredo novo no código.** O único valor sensível na página é o token público do
  RD Station, que já estava em `script.js` antes desta rodada e não foi alterado. É token de
  conversão pública, do tipo que precisa ficar no cliente para o formulário funcionar.
  Nenhuma chave, senha, credencial ou string de conexão foi adicionada. Nenhum `.env` foi
  criado ou lido.
- **Endpoints intocados.** `https://www.rdstation.com.br/api/1.3/conversions` continua igual,
  com o mesmo método, os mesmos cabeçalhos e o mesmo formato de payload. O identificador
  `lp-stiim` não mudou. Os scripts de tracking (pixel da Meta e `track-ilikia.koko.ag`)
  também não foram tocados, nem o fluxo de consentimento de cookies que os carrega. Nenhum
  campo do formulário foi adicionado, removido ou renomeado.
- **Um único lead de teste**, identificado como `[TESTE-KOKO]`, com dados fictícios. Nenhum
  dado real de usuário foi enviado. Os testes de erro usaram interceptação, sem tocar o RD.
- **Fronteira de rede respeitada.** Nada tentou alcançar `10.60.x`. O trabalho foi local
  (`127.0.0.1:8137`), mais leitura do ClickUp pela internet. A tentativa de abrir
  `stiim.dev.koko.ag` falhou por timeout, como esperado, e não foi contornada.
- **Zero escrita no ClickUp.** Os cards foram só lidos. O rascunho de comentário está em
  `docs/COMENTARIO-CLICKUP.md`, para a Gabs colar se concordar.
- **Push só na branch de trabalho** `ajustes-stiim-86ah19vv5`. `main` não recebeu nada.
- **Nada foi descartado.** As cópias fora de git em `~/stim-dev` e `~/stim-prod`, a branch
  local `feat/fotos-reais-morfologia` e os assets antigos continuam onde estavam.

---

# Adendo · rodada de busca dos dois assets bloqueados (09/09/2026)

Os bloqueios 1 e 2 do relatório acima diziam que a molécula dourada e a foto da mulher não
existiam no projeto. **Um dos dois estava errado.** Esta rodada refez a busca a sério, em
quatro frentes, e o resultado é: **a foto da mulher existe, em alta, e foi aplicada. A
molécula continua não existindo em lugar nenhum que eu alcance.**

## Como procurei

Montei um acervo de **314 imagens** de todas as origens possíveis e comparei cada uma contra
as duas miniaturas do PDF do cliente, por correlação cruzada normalizada em várias escalas
(template matching), mais inspeção visual em contact sheets. Nenhum candidato de molécula
passou de **0,75** de correlação, e os poucos que chegaram perto casaram pelo fundo branco,
não pelo desenho. Um acerto de verdade ficaria acima de 0,9.

| Frente | O que foi varrido | Resultado |
|---|---|---|
| 1. Git do repo da Lívia | **Todos** os commits de **todas** as refs (`git rev-list --all` + `git ls-tree -r`), 70 blobs de imagem únicos por conteúdo, extraídos com `git cat-file` e inspecionados. Inclui `main`, as três branches locais, `materiais/img-nao-usadas/` (25 arquivos) e a cópia arquivada da LP v1. Conferi também objetos inalcançáveis (`git fsck --unreachable`), stash e reflog. | Molécula: não. Mulher: não. |
| 2. Snapshots do servidor | `~/stim-dev` e `~/stim-prod`, 64 imagens. | Molécula: não. Mulher: não. |
| 3. Drive (rclone, por ID de pasta) | KV STIIM e subpastas **Elementos**, **Saída**, **Aberto**; **Atualizaçoes STIIM/stiim-redesign** (34); **NOVAS IMAGENS - LP STIIM**; **02-STIIM/LOGO STIIM** (18); as duas pastas de assets de 21/07 (`01-modelo-hero…17-integracao`, 32 no total); **id. visual (stiim)** inteira, recursiva, incluindo `v3/04-moleculas-tecnologia`. | **Mulher: ACHADA.** Molécula: não. |
| 4. Materiais compostos | `VA STIIM.pdf` (99 MB, 9 páginas, 71 imagens embutidas extraídas), `CAMPANHA STIIM - APRO DE CRIATIVOS.pptx` (18 mídias), `TAKE ONE - STIIM.pdf`, e frames dos 4 vídeos `TEC-*` e dos 3 GIFs da proposta de 22/07. | **Mulher: ACHADA.** Molécula: não. |

Buscas por nome no Drive, sem distinção de maiúsculas, cobrindo `molecula`, `particula`,
`sphere`, `esfera`, `lattice`, `microesfera` e `STIIM`, também não trouxeram nada novo.

Shots lado a lado em `docs/shots/molecula/`.

## Mulher: ACHADA e APLICADA

**Onde estava:** `VA STIIM.pdf`, página 6 ("Indicações e áreas de tratamento"), imagem
embutida, **2480 × 3508 px a 300 dpi**. Caminho no Drive:
`KV STIIM (1_A49unFXKqx0Oqw2vV6W54iiX507S5fs) > Saida > VA STIIM.pdf`.

É a mesma modelo, mesma pose, mesmo maiô branco, mesmo fundo de mármore e o mesmo lettering
amarelo do slide 400GRAUS que o cliente marcou. O print do PDF tinha 768 × 432 porque é
captura de tela do slide, não o arquivo. A mesma foto aparece também em
`CAMPANHA STIIM - APRO DE CRIATIVOS.pptx` (mídia `image12`, 1080 × 1920) — usei a do VA por
ser a oficial e a de maior resolução.

**O que foi feito:** recorte `2480 × 3100` a partir de `y=300` e redução para
`1200 × 1500`, salvo como `assets/img/aplicacao-modelo-va.webp` (50 KB). Só recorte e
redimensionamento: sem retoque, sem filtro, sem distorção. O 4:5 é a proporção que o card
`.model-card` já usava, então o `object-fit: cover` não corta nada. É o recorte mais fechado
que mantém a modelo inteira; a área de mármore à esquerda faz parte da composição original e
não foi recomposta.

**O que saiu junto, e por quê.** Os três pontos interativos sobre o rosto (Região malar,
Contorno facial, Mandíbula) eram posicionados por coordenadas percentuais calculadas em cima
de um retrato. Sobre uma foto de corpo inteiro eles cairiam em pontos sem significado, e
manter nome de sítio anatômico apontando para o lugar errado é pior do que não ter ponto.
Foram removidos. A seção agora tem a mesma leitura do slide do cliente: a foto de um lado, as
quatro finalidades numeradas do outro. O `object-position` do card voltou para o centro (era
`center 58%`, enquadramento feito para o retrato).

O JavaScript de `[data-application-map]` continua no `script.js` e fica inerte, porque não
encontra mais gatilhos. Nenhum erro no console.

Antes e depois em `docs/shots/molecula/aplicacoes-antes-depois-1440.jpg` e
`-390.jpg`; origem e destino em `docs/shots/molecula/mulher-referencia-vs-encontrada.jpg`.

**Uma coisa para a Mari confirmar:** o slide de referência traz, na legenda do segundo
rótulo, a palavra proibida ("Facial & Corporal"). Trouxe só a **foto**, nunca o texto do
slide, e o grep continua zerado. Mas se a intenção do cliente era reproduzir o slide inteiro,
a legenda não pode vir junto.

## Molécula: NÃO ACHADA. Não gerei nem recriei nada

A imagem que o cliente aponta como "essa que vocês já haviam feito" é uma esfera formada por
**placas chatas sobrepostas**, quase branca com um tom lilás, com **lascas soltas flutuando
em volta**, sobre fundo claro. A única cópia dela que existe é a miniatura embutida no PDF de
ajustes, com **265 × 148 px**.

As candidatas mais próximas, todas descartadas por inspeção lado a lado
(`docs/shots/molecula/molecula-referencia-vs-candidatas.jpg`):

| Candidata | Onde | Tamanho | Por que não é |
|---|---|---|---|
| `MOLECULAS STIIM.png` | Drive, KV STIIM > Elementos | 1308 × 1091 | Esfera celular densa, esverdeada, sem lascas em volta. |
| `stiim-particula-ilustracao-v2.webp` | repo, `assets/img/` (é a que está no ar hoje) | 1254 × 1254 | Esfera de bolhas douradas; tem fragmentos, mas o desenho é outro. |
| `13-lattice-pore-original.png` | Drive, pasta de assets de 21/07 | 941 × 1672 | É a `lattice-pore-gerada`: esfera dourada dentro de fluido creme. |
| `white-molecule.webp` | repo, `materiais/img-nao-usadas/` | 1024 × 1024 | Cúpula de favos branca, sem lascas. |
| `esfera-lattice-dourada.webp` | repo, `materiais/img-nao-usadas/` | 968 × 960 | Esfera de favos amarela chapada. |
| imagem + máscara da p.2 do `VA STIIM.pdf` | Drive, KV STIIM > Saida | 1920 × 1080 | Esfera de células finas, sem lascas; a mais parecida em família, mas não é a mesma peça. |
| `14-microesferas-uniformes.png` | Drive, pasta de assets de 21/07 | 941 × 1672 | Várias microesferas douradas em fluido. |
| `microesfera-stiim-isolada-v2.png` | repo, `assets/img/` | 700 × 700 | Bola dourada com casca de vidro. |
| frames de `TEC-02-degradacao-controlada-camadas.mp4` | Drive, id. visual (stiim) v3 | 1080 × 1918 | Camadas se soltando, mas douradas e em fluido. |

Nenhuma delas é a imagem do PDF, e uma "parecida" não serve: o próprio briefing proíbe
substituir por imagem gerada, recriada ou visualmente parecida. Então **as duas ocorrências e
o bloco de resposta contínua continuam exatamente como estavam.**

**O que destrava:** o arquivo original com a Lívia, ou o link/pasta de onde o cliente tirou
aquela miniatura para o Canva. Com ele em mãos, o tratamento dourado fosco, sem aspecto de
vidro e sem brilho exagerado, é rápido e vale de uma vez para o bloco Lattice-Pore, para a
segunda ocorrência e para o bloco de resposta contínua.

## Validação depois da troca

- Console e rede limpos em 1440, 768 e 390: zero erro, zero requisição falhada, zero 404.
- Grep no fonte e no DOM renderizado: `corporal`, `corporais`, `corpora`, `toxina`, `botul`,
  `Produto A` e `semelhante a areia` seguem em **zero**.
- Lighthouse: Performance **91**, Acessibilidade **100**, Boas práticas **100**, SEO **100**.
  LCP 3,3 s, CLS 0, peso total 472 KB.
- Shots atualizados em `docs/shots/ajustes-finais/` (`aplicacoes-*`, `pagina-inteira-*`).

## Segurança (desta rodada)

- **Nenhum segredo novo.** A rodada só leu do Drive e gravou imagem e texto no repositório.
  Nenhuma credencial entrou no código; o `.env` não foi criado nem lido. O token do
  RD Station segue igual, e não foi tocado.
- **Endpoints intocados.** O formulário, o endpoint do RD Station e os scripts de tracking não
  foram alterados nesta rodada. **Nenhum lead novo foi enviado** — o único lead de teste
  continua sendo o `[TESTE-KOKO] LP STIIM` da rodada anterior.
- **Fronteira de rede respeitada.** Todo o trabalho foi local (`127.0.0.1:8137`) mais leitura
  do Drive e do ClickUp pela internet. Nada tentou alcançar `10.60.x`.
- **Zero escrita no ClickUp e no Drive.** O Drive foi só lido (`rclone copy` para o scratchpad
  da sessão); nada foi enviado, movido ou apagado lá.
- **Push só na branch de trabalho** `ajustes-stiim-86ah19vv5`. `main` não foi tocada.
- **Nada foi descartado.** Os assets antigos, inclusive `aplicacao-rosto-frontal.webp`, que
  saiu da página, continuam no repositório.
