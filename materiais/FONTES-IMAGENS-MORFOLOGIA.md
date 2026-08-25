# Fontes das imagens do bloco "Morfologia da superfície"

Atualizado em 2026-08-25.

## O que mudou

Até aqui o bloco usava duas imagens **ilustrativas**, não micrografias reais:

| Antes | O que era |
|---|---|
| `assets/img/sem-produtoA.webp` | render de fragmentos angulares, estilo "areia" |
| `assets/img/sem-stiim-clear.webp` | render CGI de esferas brancas |
| `assets/img/lattice-pore-gerada.webp` | ilustração dourada gerada (bloco Lattice-Pore®) |

Agora são recortes da **Figura 4** do artigo publicado:

| Agora | Origem | Saída |
|---|---|---|
| `assets/img/sem-produtoA-fig4a.webp` | Figura 4, painel **A** | 1200×923 (1.3:1), WebP q86, 83 KB |
| `assets/img/sem-stiim-fig4b.webp` | Figura 4, painel **B** | 1200×923 (1.3:1), WebP q86, 79 KB |
| `assets/img/particula-stiim-fig4d.webp` | Figura 4, painel **D** | 1200×1500 (4:5), WebP q88, 87 KB |

As proporções batem com o CSS (`.comparison figure img` = 1.3/1, `.identity-card img` = 4/5),
então o `object-fit: cover` não corta nada. A barra de escala e a etiqueta do painel foram
mantidas de propósito: é o que torna a citação verificável.

Original em `~/stiim-fotos/biomedicines-14-01447-g004.png` (2586×2860, escala de cinza).
Recorte feito com ImageMagick; sem retoque, sem alteração de contraste, sem tingimento.
Só recorte e redimensionamento.

## Referência

Dal Col V, Matte BF. *Calcium hydroxyapatite biostimulators: a comparative study of biological
response and particle morphology.* Biomedicines. 2026;14(7):1447.
doi:[10.3390/biomedicines14071447](https://doi.org/10.3390/biomedicines14071447)

Citação conferida contra Europe PMC (PMID 42511921) e OpenAlex em 25/08/2026. O texto completo
é de assinatura; o site da MDPI responde 403 a requisições automatizadas (WAF).

## ⚠ Pendência bloqueante antes de publicar

**Qual painel é qual produto não está confirmado.**

O resumo do artigo identifica os dois materiais como **"Sample R"** e **"Sample S"** — não nomeia
marcas. Ele também diz, textualmente:

> SEM analysis showed predominantly spherical microspheres in **both** materials, with qualitative
> differences in **surface microtopography**.

Ou seja: os dois produtos são esféricos. A diferença publicada é de **microtopografia de
superfície**, não de forma da partícula.

O que dá para afirmar olhando a figura: a **coluna da esquerda (painéis A e C)** tem superfície
visivelmente mais rugosa e nodular; a **coluna da direita (painéis B e D)** tem superfície mais
lisa e regular, e esferas mais redondas.

O que **não** dá para afirmar daqui: se a esquerda é Sample R ou Sample S, e qual dos dois é STIIM.
A atribuição usada na página (A = Produto A, B = STIIM) vem da descrição do próprio cliente nos
ajustes — "Produto A: superfície e estrutura irregulares" / "STIIM: superfície regular" — combinada
com o que se vê na figura. É consistente, mas **é inferência, não leitura da legenda**.

Antes de publicar, confirmar contra a legenda da Figura 4 no PDF do artigo:
- se A/C = STIIM, os dois `<img>` do bloco comparativo trocam de lugar, e `particula-stiim-fig4d`
  deve virar o painel C;
- o comentário HTML acima do bloco comparativo marca exatamente onde mexer.

## Ajustes de texto que acompanharam a troca

- "Estrutura irregular, semelhante a areia" → **"Superfície e estrutura irregulares"**
- "Treliça e poros tridimensionais" → **"Superfície regular, estrutura tridimensional e microesferas uniformes"**
- "Microscopia FE-SEM x5.000." → **"Microscopia eletrônica de varredura (MEV). Barra de escala: 50 µm."**

A terceira não estava na lista de ajustes. Foi mudada porque a figura agora creditada não declara
magnificação em nenhum lugar — ela traz barra de escala de 50 µm (painéis A/B) e 40 µm (C/D).
Deixar "x5.000" ao lado de uma figura citada seria afirmar um número que a fonte não sustenta.
Se o "x5.000" vier de outro laudo, é só reverter esta linha e citar aquele laudo.

Fica também registrado: **"semelhante a areia" não se sustenta mais.** A figura real mostra
esferas nos dois produtos. O texto do bloco de distribuição (`index.html`, painel "Produto A")
ainda diz *"Geometria irregular, semelhante a areia, com perda precoce de volume"* — isso
contradiz a imagem que agora está logo acima e a frase do próprio artigo. Não foi alterado
porque não estava no escopo dos ajustes pedidos, mas **precisa de decisão do cliente.**

---

## Adendo 25/08 — o que o resgate do servidor mostrou

Os ajustes de 19/08 foram recuperados dos servidores (`prod-sites` e `dev`, snapshots
byte a byte idênticos) e aplicados na branch. Isso trouxe três fatos novos sobre este bloco.

**1. Já existia uma derivação anterior da mesma Figura 4.** O snapshot de 19/08 usava
`sem-produtoA-g004a.webp` (1232×948) e `sem-stiim-g004b.webp` (1236×951) — recortes da mesma
`g004`, feitos por outra pessoa, com enquadramento diferente do nosso e sem a etiqueta de painel.

**2. A atribuição de painel bate com a nossa.** Comparadas lado a lado, a derivação de 19/08
atribui exatamente como a de hoje:

| Painel | Superfície | 19/08 | Hoje |
|---|---|---|---|
| A (esquerda) | rugosa, nodular | `sem-produtoA-g004a` | `sem-produtoA-fig4a` |
| B (direita) | lisa, regular | `sem-stiim-g004b` | `sem-stiim-fig4b` |

**Isso não fecha a pendência.** As duas derivações partem da mesma figura e, muito
provavelmente, da mesma descrição do cliente ("Produto A: superfície irregular" / "STIIM:
superfície regular"). Duas pessoas repetindo a mesma inferência não é uma segunda fonte —
é a mesma inferência duas vezes. A confirmação continua sendo a legenda da Figura 4 no PDF.
O que muda é o custo do erro: se a atribuição estiver invertida, **já esteve no ar em produção
desde 19/08**, não é um erro novo desta branch.

**3. Dois dos três "ajustes de texto que acompanharam a troca" já estavam no servidor.**
As legendas "Superfície e estrutura irregulares" e "Superfície regular, estrutura
tridimensional e microesferas uniformes" foram aplicadas em 19/08, não hoje — a seção acima
as descreve como se fossem desta troca, o que não procede. Só a terceira
("Microscopia FE-SEM x5.000." → MEV + barra de escala) é de hoje.

Os recortes `g004` de 19/08 **não** foram trazidos para a branch: os de hoje têm proporção
casada com o CSS (1.3:1) e preservam a etiqueta de painel, que é o que torna a citação
verificável. Ficam nos snapshots em `~/stim-prod` e `~/stim-dev` caso seja preciso comparar.
