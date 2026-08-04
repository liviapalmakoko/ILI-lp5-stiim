# LP 05 STIIM — Diagnóstico da v1 e plano de refação

Documento de trabalho. Base: `histórico.pdf` (thread completa do ClickUp, abr 22 → jul 24),
`AJUSTES LP - STIIM .pptx` (briefing do cliente, 15 slides), `página_hoje.html` (LP publicada),
e o feedback de 03/08 recebido por texto.

---

## 1. Resumo executivo

A LP não tem um problema de acabamento acumulado. Ela tem **um erro de premissa na origem** e
**seis rodadas de correção aplicadas na superfície**, nenhuma delas atacando o que o cliente
reclama de verdade.

O erro de origem está registrado no próprio ClickUp, em 25/mai, na primeira entrega:

> "Esse produto tinha muito mais informação além do briefing, aí tive a **liberdade de enriquecer**
> ele. Aí veja com o cliente se ele gosta dessa linha ou se a gente se atenta ao briefing mesmo
> (tava bem pobrinho)."

A LP nasceu como uma proposta autoral paralela ao briefing. O cliente nunca comprou essa proposta —
e a partir daí todo pedido dele foi uma tentativa de puxar a página de volta para o que ele tinha
imaginado, item por item, sem nunca conseguir. Em 23/jul ele parou de descrever e **desenhou a
página inteira num PPT de 15 slides**. Esse PPT é o artefato de maior valor que temos: é o briefing
deixando de ser texto e virando layout.

Duas consequências práticas:

1. **O PPT não é uma leva de ajustes, é a especificação.** Ele já foi tratado internamente como
   opinativo ("tem q deixar 100% igual como tá no slide? do jeito que eu tô fazendo achei a proposta
   melhor" — 24/jul). Nesse ponto da relação, propor alternativa ao desenho do cliente é o que
   produziu a frustração. A refação deve implementar o PPT e usar o repertório da Koko para
   **executar melhor o que ele desenhou**, não para propor outra coisa.
2. **Os pedidos repetidos não são 45 pedidos.** São 4 defeitos sistêmicos que se manifestam 45
   vezes. Corrigir o sistema resolve a maior parte da lista de uma vez — e é a única forma de não
   gerar um Frankenstein v2.

---

## 2. Causa raiz: os 4 defeitos sistêmicos

### 2.1 Não existe escala tipográfica — existem ~30 escalas

A página tem **mais de 30 valores `clamp()` distintos**, cada um com um acoplamento diferente ao
viewport: `5.4vw`, `7vw`, `4.5vw`, `3.4vw`, `2.2vw`, `1.18vw`… Cada rodada de ajuste adicionou o
seu. Não há `font-size` base em `:root`.

Isso é a explicação mecânica do feedback mais importante de 03/08:

> "Quando ela abre a LP, a fonte fica muito pequena. Pra mim, já fica muito grande.
> Temos como padronizar isso?"

Com tipografia acoplada a `vw` sem base travada, **duas pessoas em telas diferentes veem
proporções genuinamente diferentes** — não é impressão. Some-se um segundo fator: a página declara
uma fonte de fallback métrica com `size-adjust: 110.59%`. Se a Gotham carrega para uma pessoa e não
para a outra, o texto muda de tamanho de novo. Duas causas independentes, mesmo sintoma.

**Sim, tem como padronizar** — e a resposta é a mesma que resolve o item seguinte.

### 2.2 Não existe escala de espaçamento

> "A distância entre alguns blocos está inconstante. Em alguns é grande, em outros a distância é
> pequena." (03/08) · "o bloco anterior e esse estão muito grudados" (Bloco 10)

Mesma origem: cada seção recebeu padding próprio, ajustado à mão numa rodada específica. Sem escala,
o ritmo vertical é aleatório. É o defeito que faz uma página parecer amadora mesmo quando cada bloco
isolado está correto.

### 2.3 Um único molde repetido 15 vezes

A página tem 15 blocos e **15.470px de altura**. Praticamente todos seguem o mesmo molde:
fundo bege chapado, texto à esquerda, visual à direita, largura total, título + parágrafo + lista.

É exatamente isso que o cliente vem chamando de "blocado" desde 15/jul — a palavra aparece quatro
vezes só naquela rodada — e é o que ele quer dizer com "está muito básico", "ficou um blocão",
"parece que as infos ficaram soltas", "o visual precisa ser mais bonito". Não é sobre nenhum bloco
em específico. É sobre **a ausência de variação de composição ao longo da página**.

E é a raiz da comparação que dói:

> "A cliente está muito frustrada com o visual dessa LP, quando comparada às nossas outras entregas
> que visualmente estão bem mais bonitas."

Nano e Upfull alternam composição: full-bleed, sangria, sobreposição, pull-quote, editorial, dark
section. STIIM não alterna nada.

### 2.4 O amarelo está no lugar errado — e é uma família, não uma cor

O amarelo entrou como **preenchimento chapado de caixas retangulares** (box do hero, chips de
ações-chave, cards de versatilidade, big numbers). Na identidade oficial ele é **uma família de 8
tons em degradê** (`#FFCF29 → #FBE06D`), aplicada em **campos com raio grande, tipografia leve e
grande dentro e muito respiro** — bloco de composição, não highlight de texto. Ver 3-bis.

Daí sai um feedback que parece contraditório mas não é: *"diminuir o box amarelo, deixando do
tamanho do texto"* (hero) convivendo com *"box amarelo: deixar exatamente como está no briefing,
bordas arredondadas, informações dominando mais a tela"* (Bloco 3). Ele não quer menos amarelo nem
mais amarelo: quer o amarelo **como campo, não como marca-texto**.

---

## 3. O briefing do cliente, em dados objetivos

Extraído direto do XML do PPTX — não é interpretação.

### Tipografia
| | |
|---|---|
| Fonte dominante | **Gotham** (632 ocorrências) + **Gotham Bold** (420) |
| Display secundária | **Bebas Neue Bold** (28 ocorrências) |
| Apoio | Open Sans (20) |
| Origem do arquivo | Canva (aparece "Canva Sans" residual) |

### Paleta do PPT (por frequência de uso) — **substituída, ver 3-bis**
| Hex | Uso no PPT | Papel |
|---|---|---|
| `#512801` | 170× | Marrom escuro |
| `#C89116` | 70× | Dourado/ocre |
| `#F3EFE3` | 34× | Creme |
| `#FFD452` | 14× | Amarelo da caixa |
| `#EEE6CD` | 7× | Bege |
| `#E7BE42` | 4× | Dourado saturado |
| `#FF3131` | 17× | Vermelho de anotação (não é cor de design) |

> **Atenção:** este PPT foi feito no Canva e improvisou a paleta. Confrontado com a identidade
> oficial (`materiais/STIIM_KVcliente/Saida/VA STIIM.pdf`), **o marrom `#512801` não existe na marca**
> e **o fundo não é bege**. Vale a tabela 3-bis abaixo. Mantenho esta aqui só como registro do que o
> cliente improvisou quando tentou explicar o que queria.

---

## 3-bis. A identidade oficial — a fonte de verdade

Extraído dos preenchimentos vetoriais e dos spans de texto da lâmina oficial de 9 páginas
(`STIIM_KVcliente/Saida/VA STIIM.pdf`).

### Fundo — e aqui está a resposta sobre o bege
| Hex | Peso | Papel |
|---|---|---|
| **`#EFF0EF`** | **999** (dominante absoluto) | **Fundo base — cinza claro frio** |
| `#F4F4F3` | 212 | Fundo de card / painel |
| `#13171B` | 33 | Painel escuro (quase-preto frio) |
| `#8C8F91` | 8 | Cinza médio |

**O fundo da marca é cinza claro frio, não bege.** Isto encerra o item "o fundo bege tá incomodando
eles, querem que a gente troque isso": não é questão de gosto nem de textura — **a LP está na
temperatura errada**. Nós construímos a página inteira sobre creme/bege quente; a marca é neutra e
fria. Foi uma decisão nossa de 23/jun ("paleta migrada pro amarelo pastel pra diferenciar da Cimed")
que afastou a LP da identidade.

**Correção de outra hipótese minha:** eu havia concluído que ele não queria eliminar o bege, só
colocar textura em cima. Estava errado — ele quer o bege fora. O pedido de "mais imagens nos fundos"
é adicional, não substituto.

### Amarelos — é uma família, não uma cor
| Hex | Peso | |
|---|---|---|
| **`#FFCF29`** | 194 | **Amarelo principal** |
| `#EEC13E` | 126 | Ouro médio (usado também em texto de destaque) |
| `#FDB92A` | 92 | Âmbar |
| `#FFD374` | 48 | Amarelo claro |
| `#FBE06D` | 29 | Amarelo pálido |
| `#FBAE2D` | 24 | Laranja-âmbar |
| `#FEBF30` · `#FDD089` | 15 · 1 | Intermediários |

Na lâmina esses tons não aparecem soltos: formam **gradientes**. A lista "Benefícios do STIIM"
(01→07) desce de um amarelo forte para um pálido, linha por linha. É por isso que o amarelo chapado
da nossa LP parece pobre — ele é um degradê de família, não um preenchimento único.

### Cor de texto
| Hex | Chars | Papel |
|---|---|---|
| `#000000` / `#231F20` | 2079 / 932 | Texto principal |
| `#2D3033` | 620 | Título / texto escuro frio |
| `#535657` | 539 | Texto secundário |
| `#FFFFFF` | 390 | Texto sobre painel escuro/amarelo |
| `#EEC13E` / `#FDB92A` | 113 / 62 | **Títulos em ouro** |

Texto é **neutro escuro frio ou branco**, com ouro nos títulos. Nada de marrom.

### Pesos da Gotham — o dado decisivo
| Corte | Chars | % |
|---|---|---|
| **Gotham-Book** | 3508 | **56%** |
| **Gotham-Light** | 1331 | **21%** |
| Gotham-Bold | 375 | **6%** |
| Gotham-Medium | 347 | 6% |
| Light/Book/Bold Italic | 530 | 9% |

**77% da marca é Book + Light. Bold é 6%.** A LP usa Bold/Black como padrão. Não é uma questão de
gosto: estamos usando a tipografia da marca invertida. Confirma o item 4 com número.

### Forma
Raio de canto **grande** (~24–40px na escala A4) em cards, painéis de imagem e nas linhas amarelas
de benefício — inclusive cantos assimétricos, com um canto reto e três arredondados. Imagens sempre
em painel arredondado, nunca quadrado cru. É o "deixar as imagens arredondadas" e o "bordas
arredondadas" pedidos por ele.

### Escala tipográfica do briefing — o achado mais importante

O canvas do PPT tem **1440pt de largura**, o que mapeia **1:1 para um viewport de 1440px**. Os
tamanhos em pt do briefing são, portanto, pixels diretos. Medido run por run no XML, descartando o
texto vermelho de anotação (`#FF3131` / Bebas Neue):

| Papel | Briefing @1440 | LP hoje @1440 | Gap |
|---|---|---|---|
| Display de hero ("Longevidade é escolha.") | **66px** | 72px (teto do clamp) | LP já está ok, levemente maior |
| Título de seção | **39–66px** | 57,6px (teto do clamp) | equivalente |
| **Corpo de texto** | **24px** | **16–20px** | **LP 20–33% menor** |
| **Eyebrow / label / info de card** | **21–27px** | **~13px** | **LP ~2× menor** |
| Big number (os "01", "02"… dos eixos) | **120–123px** | bem menor | 
| Texto do CTA | 24px | ~13px | ~2× menor |

**Isto inverte o diagnóstico óbvio.** O problema nunca foi título pequeno — os títulos já estão no
tamanho do briefing. O problema é que **o corpo, os labels e as informações de card estão na metade
do tamanho**, e a hierarquia é muito mais contrastada do que a do cliente:

- Razão display : corpo na LP → 72 : 17 = **4,2×**
- Razão display : corpo no briefing → 66 : 24 = **2,75×**

Uma hierarquia mais achatada e com corpo grande é exatamente o que faz uma página "dominar a tela".
E é literalmente o que ele pede, com estas palavras: *"o texto não tá dominando o box"* (Bloco 4),
*"informações dominando mais a tela"* (Bloco 3), *"as infos estão muito pequenas"* e *"os tópicos
podem ficar maiores, porque tem espaço sobrando"* (Bloco 12), *"aumentar a fonte dos boxes"*
(Bloco 6), *"o título das imagens tá muito pequeno"* (Bloco 14).

Ele reclamou de texto pequeno **nove vezes**, e nenhuma delas sobre título.

### Peso e cor do display no briefing
Igualmente importante, e contra-intuitivo:

| | Briefing | LP hoje |
|---|---|---|
| Peso do display | **Gotham regular (Book)** | **Bold / Black** |
| Bold | só nas palavras de ênfase ("**Escolha**", "*geração*") | tudo |
| Cor do display | `#000000` preto (slides 1, 2, 4) e `#512801` (slide 3) | marrom/dourado com degradê |
| Ênfase | itálico + `#E7BE42` dourado numa palavra | várias por linha |
| Corpo | justificado | alinhado à esquerda |

O briefing é **leve e elegante**; a LP é **pesada e chapada**. Ver item 4 — é aqui que mora o pedido
"trocar a fonte pela Gotham".

---

## 4. "Trocar a fonte pela Gotham" — a fonte já é Gotham

Verificado contra o ambiente publicado (`stiim.koko.ag`, autenticado). Os 6 cortes retornam **200**:

```
GothamBook.woff2 200 · GOTHAM-MEDIUM 200 · GOTHAM-BOLD 200
Gotham-Black 200 · Gotham-BookItalic 200 · GothamBoldItalic 200
--font-display / --font-body: 'Gotham', 'Gotham Fallback', Arial, sans-serif
```

E o render da página ao vivo confirma: **o hero está em Gotham**, com as letras geométricas
características. Não há 404, não há fallback. As únicas exceções são componentes embutidos do RD
Station (`#rd-form-*`, `#bricks-component-*`), que injetam `Montserrat !important` e `Raleway` — o
bloco de formulário está tipografado em outra fonte que o resto da página. Isso é real, mas é o
formulário, não a página.

**Então por que ele pede para trocar por Gotham?** Porque é Gotham no **peso errado**. O briefing
usa Gotham **regular (Book)** nas linhas de display, com Bold apenas nas palavras de ênfase. A LP usa
**Bold/Black em tudo**. Para quem não é designer, a mesma fonte em Book e em Black são duas fontes
diferentes — e a dele é a leve.

Somado ao corpo de texto 20–33% menor e aos labels na metade do tamanho (item 3), o resultado é uma
página que não se parece com o briefing dele. "Trocar a fonte" é a melhor descrição que ele consegue
dar para isso.

**Correção de uma hipótese anterior minha:** eu havia levantado que os woff2 estariam dando 404 em
produção e que isso explicaria o tamanho inconsistente entre duas pessoas. Está errado — os arquivos
servem normalmente. A causa do tamanho inconsistente é só a primeira: os ~30 `clamp()` acoplados a
`vw` sem base travada (item 2.1). Aquela continua válida e continua sendo o motivo pelo qual duas
pessoas veem proporções diferentes.

---

## 5. Contradições entre rodadas — o que exige decisão sua

Aqui está a resposta ao que você pediu ("cumprir tudo, mas sinalizar o que causou o Frankenstein").
Estes seis itens **não podem ser cumpridos ao mesmo tempo**: cada rodada pediu o oposto da anterior.

| # | O que foi pedido antes | O que é pedido agora | Recomendação |
|---|---|---|---|
| C1 | **26/mai:** "usamos muito um dourado, o certo seria o amarelo da caixinha, **com muita parcimônia**, deixando apenas para os detalhes" | **03/08:** "trazer mais cor", "mais cor para o box", "trazer cor, negrito, degradê", "box amarelo dominando mais a tela" | O pedido de 26/mai foi **revogado na prática**. Adotar a paleta do PPT (item 3) como fonte única de verdade e abandonar a regra de parcimônia. Amarelo como campo de cor, não como marca-texto. |
| C2 | **25/jun:** "essas moléculas poderiam mexer pra ficar mais dinâmico?" · "sentiu falta de mais motion, coisas que se mexem quando eu scrollo" | **15/jul:** "prefeririam que a gente tirasse as moléculas pequenas e movimentasse as grandes" → **03/08:** "não querem que a caixa fique subindo e descendo" | Motion foi pedido e depois desmontado peça por peça. O que ele rejeita é **movimento em loop, decorativo e sem propósito**. Manter motion **acionado por scroll e por hover** (que ele pede explicitamente em 4 lugares no feedback novo) e eliminar toda animação em loop infinito. |
| C3 | **15/jul:** "essa parte aqui eles estão revendo o estudo pra não terem problemas, aí por enquanto **não precisamos mexer**" (bloco do estudo de microscopia = intocável) | **PPT slide 15:** "REMOVER ESSE BLOCO INTEIRO" | **Falso conflito — resolvido.** O slide 15 não é o bloco do estudo: é o bloco **"STIIM otimiza resultados quando associado a outros procedimentos"** (Protocolos & Combinações), que **já não existe** na página atual. O bloco do estudo de microscopia não é marcado para remoção em nenhum slide. Ele fica. |
| C4 | **23/jun:** "paleta migrada pro amarelo pastel (pra diferenciar da Cimed)" — o bege passou a ser a base da página | **03/08:** "o fundo bege tá incomodando eles, querem que a gente troque isso, criando em IA" | **Não é contradição do cliente — é um desvio nosso.** O bege nunca foi da marca: a base oficial é `#EFF0EF`, cinza claro frio (item 3-bis). A migração de 23/jun foi decisão interna e é a origem do problema. Voltar para a base oficial. |
| C5 | **23/jun:** "'Sete eixos de ação clínica' virou um infográfico circular/visual com animações" (entregue como melhoria) | **03/08:** "na parte dos círculos, querem que aumente mais esses círculos, precisam preencher o quadrante todo" | Sem conflito real — o formato foi aceito, só está subdimensionado. Cumprir. |
| C6 | **15/jul:** "acharam que incluímos muitos quadrados de fotos, podemos achar outra solução" → **22/jul:** resolvido com "foto editorial em sangria" | **03/08:** "deixar as imagens arredondadas" (Bloco 5) · "trabalhar mais imagens nos fundos" | Convergente, não contraditório: menos molduras quadradas iguais, mais imagem como fundo e forma orgânica. Cumprir. |

---

## 6. Como os 45 pedidos de 03/08 se resolvem

Mapeamento dos "blocos" numerados pelo cliente para as seções reais do código, e como cada pedido é
atendido. **Legenda da coluna Divergência:** `—` cumpre literalmente · `~` cumpre o objetivo por
outro caminho (preciso do seu aval) · `!` bloqueado, precisa de decisão.

### 6.1 Itens globais

| Pedido | Como resolvo | Div. |
|---|---|---|
| Trocar a fonte pela Gotham | A fonte **já é** Gotham e serve com 200 em produção (item 4). O que muda: passar o display de **Bold/Black para regular (Book)**, com Bold só nas palavras de ênfase, como no briefing. É o peso, não a fonte. Vale explicar isso à Mariana — senão ele "pede Gotham" de novo na próxima rodada. | ~ |
| "Fonte muito pequena pra ela, muito grande pra mim — dá pra padronizar?" | **Sim, e são duas coisas.** (a) Escala tipográfica única em `:root`, base travada em `rem`, `clamp()` derivado de razão fixa e um viewport de referência — elimina os ~30 clamps ad-hoc que fazem o tamanho variar por tela. (b) **Subir corpo para 24px e labels para 21–27px**, conforme a medição do briefing (item 3): é o que ele chama de "infos muito pequenas" nove vezes. Testar em 1280/1440/1920 e em zoom 100/125/150%. | — |
| Trabalhar melhor visualmente o layout | Endereçado por 2.3: variação de composição ao longo da página, não um molde repetido. | — |
| Fundo bege incomodando, "criando em IA" | **Trocar a base de creme/bege quente para o cinza claro frio oficial `#EFF0EF`** (item 3-bis). Sobre essa base, sistema de fundos alternados: textura de bokeh dourado, imagem em sangria e painel amarelo arredondado. O acervo já tem os fundos oficiais (`STIIM_KVcliente/Elementos/BG STIIM.png`, `MOLECULAS STIIM.png`) — usar antes de gerar em IA. | — |
| Distância entre blocos inconstante | Escala de espaçamento única (2.2). Ritmo vertical derivado de um valor base. | — |
| Trabalhar mais imagens nos fundos | Idem fundos acima. | — |
| Header: STIIM e ILIKIA não estão centralizados | Alinhamento óptico dos dois logos na barra (baseline e altura-x, não bounding box). | — |

### 6.2 Bloco a bloco

| Bloco (cliente) | Seção no código | Pedidos de 03/08 | Como resolvo | Div. |
|---|---|---|---|---|
| **1** Banner principal | `#hero` | Caixa não pode subir e descer · aumentar "STIIM" sem o ícone, do tamanho de "escolha", tirar o ponto final · diminuir o box amarelo pro tamanho do texto e aumentar a fonte | Remover o loop de flutuação (mantém reveal de entrada). Hero refeito na escala do briefing (~180–230px). Box amarelo vira campo justo ao texto. | — |
| **2** O que é STIIM | `#produto` | Recorte das caixas mal feito, muito feio · parte visual e texto mais bonitos · melhorar experiência de leitura | Trocar o recorte por asset limpo (`~/Documents/Stiim/03-fotos-produto`, mockup sem sombra em `~/Downloads`) ou sangria sem recorte. Repaginar o texto. | — |
| **3** Sete eixos + fórmula | `#produto` (2ª parte) | Círculos maiores, preenchendo o quadrante todo · hover: número sai, info entra no lugar · box amarelo exatamente como no briefing, bordas arredondadas, info dominando a tela | Cumpre literalmente. Hover com troca de conteúdo no mesmo lugar (número → label). | — |
| **4** A estrutura que sustenta | `#tecnologia` | Não está visual/bonito · texto não domina o box · seta não centralizada · molécula não está bonita · trocar fundo pela textura do banner principal · alinhar o texto | Cumpre literalmente. Molécula: usar os macros de microesfera do acervo em vez do render atual. | — |
| **5** Diferenciais técnicos | `#tech-deep` | Título fora do padrão (canto + florzinha da Ilikia) · bloco amarelo sob o título com "STIIM" destacado · imagens arredondadas | Cumpre literalmente. A florzinha (`assets/flor-ilikia.svg`) já existe. | — |
| **6** Tecnologia 3ª geração | `#tech-deep` (curva) | Aumentar fonte dos boxes · mais cor no box · tirar molécula transparente dos boxes · florzinha no título · seta do gráfico não é intuitiva — repensar ou remover animação e seta · título mais bonito como no briefing | Cumpre. No gráfico: substituir a seta por affordance explícita (estado de hover legível + legenda ativa) ou remover a interação. | ~ |
| **7** Padrão de degradação | `#tech-deep` (A/B/C) | Título sem a florzinha · A/B/C sem box, infos soltas · falta agregar no visual · espaço muito grande entre uma fonte e outra | Cumpre. A/B/C ganham contêiner próprio; espaçamento pela escala nova. | — |
| **8** Mecanismo de ação | `#mecanismo` | Trazer fundo de imagem, não um bloco de uma cor só · borda nas opções animadas · divisão de bloco é importante | Cumpre literalmente. | — |
| **9** Longevidade celular | `#longevidade-celular` | Visual incomodando · caixas minúsculas · infos e blocos não centralizados · blocos abaixo do título e caixas maiores do outro lado | Cumpre — é uma reorganização de layout explícita, não interpretação. | — |
| **10** Resultados / big numbers | `#longevidade-celular` (2ª parte) | Muito grudado no bloco anterior · trabalhar o lettering dos títulos · seta dentro do box · CTA numa linha só | Cumpre. O "grudado" é resolvido pela escala de espaçamento. | — |
| **11** Evidências científicas | `#evidencias` | Florzinha no título · tirar a frase de referência abaixo do bloco "genes marcados…" | Cumpre literalmente. | — |
| **12** Onde STIIM atua | `#indicacoes` | Imagem da mulher maior do que cabe na tela · tópicos maiores (tem espaço sobrando) · infos muito pequenas · melhorar a qualidade da foto com IA · tirar o CTA "Ver se STIIM cabe na minha prática" | Cumpre. Para a foto: o acervo já tem versões aprovadas em alta (`04-imagens-geradas/modelo-aprovada*`) — trocar antes de tentar upscale. | ~ |
| **13** O paciente moderno | `#perfil` | Fundo igual a todos, querem diferenciar · mais cor como no briefing · título com cor, negrito, degradê | Cumpre literalmente. | — |
| **14** Versatilidade clínica | `#versatilidade` | Ficou um bloco · mais cores nas fontes · aumentar as letras · "Por que é versátil?" em box destacado, maior, com CTA abaixo · título das imagens muito pequeno | Cumpre literalmente. | — |
| **15** Longevidade da Pele | `#longevidade` | Blocão de texto, texto todo igual, sem destaque · trazer solução visual, animação e fundo | Cumpre literalmente. | — |
| **Form** | `#contato` | Mais cor no título ou no fundo · espaço branco sobrando no fim do bloco — cortar ou alargar o formulário | Cumpre. Corrigir também a fonte do form (hoje Montserrat/Raleway do RD, não Gotham). | — |

### 6.3 Pendências antigas que nunca foram fechadas

Estes itens estão na thread, foram assumidos e **não constam como entregues**. Entram na v2 por
padrão:

- Trocas de foto usando a pasta do Drive em "O que é STIIM", "Onde STIIM atua" (modelo maior, com
  fundo removido em PNG) e "O paciente moderno" (trocar a clavícula por rostos) — listadas como
  "ainda pendente do balde" em 20/jul.
- Tirar os exemplos de resposta dos campos do formulário, principalmente do número de registro
  (21/jul).
- Remover todos os travessões dos textos, substituindo por florzinha nos títulos (pedido em 25/jun,
  01/jul e 15/jul — três rodadas). **O rodapé e a lista do bloco de acesso profissional ainda usam
  travessão.**
- PPT slides 11, 13 e 15: remoções de bloco ("retirar blocos sinalizados", "tirar esses 6 blocos,
  está redundante", "remover esse bloco inteiro"). Dependem de ver os slides compostos — ver 7.3.

---

## 7. Bloqueios e decisões

### 7.1 ✅ Acesso ao ambiente publicado — resolvido
`koko / Koko@2026`. Fontes verificadas (item 4), página ao vivo renderizada e comparada.

### 7.2 ✅ Bloco do estudo de microscopia — resolvido, não havia conflito
O slide 15 do PPT se refere a outro bloco ("Protocolos & Combinações"), já removido da página. O
estudo de microscopia fica. Ver C3.

### 7.3 ✅ Slides compostos do PPT — resolvido
`assets/pdfhandler.pdf`, 15 páginas, renderizado e analisado.

**Nota sobre os slides de anotação (11 a 15):** os prints da LP que aparecem neles são de uma
**versão antiga**, ainda com fonte serifada nos títulos. Parte das anotações já foi endereçada nas
rodadas de 19–22/jul. As que **seguem pendentes** e vão para a v2:
- Slide 11 — remover os cards **FIBROBLASTOS** e **ELASTINA** do bloco de evidências (marcados com X)
  e a linha "Genes marcadores de longevidade ativados…". Ainda estão na página. Confirma o pedido do
  Bloco 11 de 03/08.
- Slide 13 — "tirar esses 6 blocos, está redundante" e "deixar mais parecido com o do lado sem ser um
  quadrado a foto".
- Slide 12 — "remover a modelo de cima disso e deixar tudo em um bloco só".
- Slide 14 — substituir as bolinhas pelas douradas do estilo indicado; "brincar mais com cores, bloco
  pra destacar e separar texto".

### 7.4 Fonte Gotham — licença (única pendência real)
A Gotham é da Hoefler&Co, paga, e não está no Google Fonts. Os 6 woff2 já estão em produção, o que
sugere que a licença existe. Vale confirmar que o uso web está coberto antes de seguir apoiando a
identidade toda nela. O briefing também usa **Bebas Neue** em display, que é gratuita.

---

## 8. Plano de execução

**Fase 0 — fundação (antes de qualquer pixel)**
Escala tipográfica única com **corpo em 24px, labels em 21–27px e display em Book** (item 3), escala
de espaçamento única, tokens de cor da paleta oficial da marca cruzada com a do PPT. Resolve sozinho:
tamanho inconsistente entre telas, "infos muito pequenas" (9 ocorrências), "distância entre blocos",
"o texto não domina o box", e o pedido da Gotham.

Tokens fechados a partir da identidade oficial (item 3-bis), não do PPT: base `#EFF0EF`, painel
`#F4F4F3`, escuro `#13171B`, família de amarelos `#FFCF29 → #FBE06D` em degradê, texto
`#231F20`/`#535657`, títulos em ouro `#EEC13E`. Display em **Gotham Book/Light**, Bold reservado a
~6% do texto. Raio grande, com cantos assimétricos.

**Fase 1 — estrutura**
Implementar a arquitetura do PPT. O briefing do cliente tem ~10 blocos; a LP atual tem 15 e
15.470px. A v2 é **mais curta e mais densa**, com composição alternada (sangria, full-bleed,
sobreposição, campo de cor, editorial) em vez de um molde repetido.

**Fase 2 — copy**
Reescrever narrativa e headlines a partir dos textos do PPT, que já são a versão que o cliente
aprovou de si mesmo. Vai para seu aval antes de virar código.

**Fase 3 — blocos e interações**
Bloco a bloco na ordem do item 6.2, com as interações que ele pede (hover nos eixos, hover no
mecanismo, dois carrosséis automáticos), sem animação em loop.

**Fase 4 — passe de conformidade**
Reler os 45 itens de 03/08 contra a página pronta e marcar item por item. Esse checklist preenchido
é o que vai junto na apresentação — é o que evita a sétima rodada.
