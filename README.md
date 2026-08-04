# [ILI] LP 05 — STIIM

Landing page do **STIIM**, bioestimulador de Hidroxiapatita de Cálcio (CaHA) de 3ª geração da
**ILIKIA**. Refação completa da primeira versão.

## Stack

HTML + CSS + JS puros, sem framework. Deploy como arquivos estáticos.

```
index.html      estrutura, 10 seções
styles.css      tokens + layout
script.js       reveal por scroll, carrossel, interações
assets/fonts/   Gotham (6 cortes woff2)
assets/img/     imagens da página (WebP), logos (SVG/PNG)
materiais/      briefings, identidade visual, histórico e documentação
```

## Rodar local

```sh
python3 -m http.server 8137
# http://127.0.0.1:8137
```

Precisa ser servido por HTTP. Abrir o `index.html` direto pelo `file://` faz o preload de fonte com
`crossorigin` falhar, e a página cai no fallback métrico em vez de renderizar a Gotham.

## Fundação de design

Uma única variável acoplada ao viewport governa **toda** a tipografia e **todo** o espaçamento:

```css
--u: clamp(13px, 1.111vw, 16px);   /* travada acima de 1440px */
```

Todo o resto deriva dela por razões fixas (`--fs-*`, `--sp-*`). O display tem razões próprias
(`--r-h1`, `--r-h2`, `--r-big`) que caem nos breakpoints, porque título precisa encolher mais que
corpo em tela estreita. Acima de 1440px a página para de crescer — é isso que garante que duas
pessoas em telas diferentes vejam a mesma proporção.

**Não adicionar `clamp()` avulso.** A primeira versão tinha mais de 30, cada um com acoplamento `vw`
diferente, e era a causa do "pra ela a fonte fica pequena, pra mim grande".

## Paleta e tipografia

Extraídas da lâmina oficial (`materiais/STIIM_KVcliente/Saida/VA STIIM.pdf`), não do PPT feito no
Canva.

| Papel | Valor |
|---|---|
| Fundo base | `#EFF0EF` — cinza claro **frio**, não bege |
| Painel | `#F4F4F3` · Escuro `#13171B` |
| Amarelos | família em degradê: `#FFCF29` `#EEC13E` `#FDB92A` `#FFD374` `#FBE06D` `#FBAE2D` |
| Texto | `#231F20` / `#535657` · títulos em ouro `#D9A31B` |

Gotham: **Book 56% + Light 21% do texto da marca; Bold é 6%**. O display vai em Book, com Bold só
nas palavras de ênfase.

## Documentação

- [`materiais/DIAGNOSTICO-E-PLANO.md`](materiais/DIAGNOSTICO-E-PLANO.md) — diagnóstico da v1, as
  contradições entre as rodadas de ajuste e o plano de execução. **Ler antes de mexer.**
- `materiais/Landing Page - STIIM.docx` — briefing original do cliente (5 dobras)
- `materiais/02-ajustes/` — o PPT em que o cliente desenhou a página que espera
- `materiais/00-versoes-koko/` — reskin descartado, para comparação

## Pendências

- Tamanho da microesfera está **inconsistente nas fontes do cliente**: a lâmina diz `~34 µm` numa
  página e `30 µm` em outra, o PPT diz `25–45 µm`, e uma rodada de ajuste pediu explicitamente
  `~34 µm`. A página usa `25–45 µm` (fonte mais recente). Precisa de definição.
- A licença web da **Gotham** (Hoefler&Co) precisa ser confirmada.
- Copy pendente de aprovação.
- Tracking e endpoint do formulário: RD Station configurado com `identificador: lp-stiim`.
