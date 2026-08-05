# [ILI] LP 05 — STIIM

Landing page do **STIIM**, bioestimulador de Hidroxiapatita de Cálcio (CaHA) de 3ª geração da
**ILIKIA**. Refação completa da primeira versão.

## Stack

HTML + CSS + JS puros, sem framework. Deploy como arquivos estáticos.

```
index.html      estrutura, 7 blocos principais
styles.css      tokens + layout
script.js       reveal por scroll, menu e formulário
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

A página segue uma gramática visual curta e repetível: fundo claro, amarelo como campo de destaque,
painéis arredondados, produto, círculos e estruturas celulares. Os blocos usam uma grade de até
`1180px`, três padrões de composição e espaçamento amplo. Não há seção azul/escura, tipografia
gigante decorativa, colagem ou carrossel automático.

A referência visual oficial `identidade-produto.png` vem da pasta
`02-referencias-imagem/identidade-marca`. As demais imagens editoriais e técnicas vêm do acervo
aprovado do STIIM, com prioridade para `04-imagens-geradas`, e são convertidas para WebP antes de entrar na página. A pasta
`01-referencia-video` e qualquer asset com fundo azul devem ser desconsiderados.

## Paleta e tipografia

Extraídas da lâmina oficial (`materiais/STIIM_KVcliente/Saida/VA STIIM.pdf`), não do PPT feito no
Canva.

| Papel | Valor |
|---|---|
| Fundo base | `#EDEDEC` — cinza claro neutro |
| Painéis | `#F8F8F6` e branco |
| Amarelo principal | `#FFCA08` |
| Texto | `#232323` / `#686868` · destaques em ouro escuro |

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
