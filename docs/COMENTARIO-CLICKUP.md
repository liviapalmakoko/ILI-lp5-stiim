# Rascunho de comentário pro ClickUp (86ah19vv5) · ajustes finais

> Revisar antes de postar. Tom de pessoa, sem negrito, curto. NÃO postado.
>
> ATENÇÃO: o parágrafo sobre a foto da mulher, mais abaixo, está DESATUALIZADO. A foto foi
> encontrada e aplicada depois; ver o complemento no fim deste arquivo. Se for postar os dois
> de uma vez, corte esse parágrafo.

---

Oi Mari! Fui item por item do PDF, segue o que ficou.

A palavra corporal não aparece em lugar nenhum, conferi no código e também na página já montada, com as abas todas abertas, olhando texto, alt de imagem, meta e dados estruturados. Zero. A menção a toxina botulínica saiu do parágrafo da seção de aplicação.

O amarelo ficou bem mais sutil. Ele continua sendo o amarelo de STIIM, mas parou de preencher seção inteira, que era o que dava aquela cara pesada. A seção de evidências virou um campo dourado claro com creme, e a linha do tempo e os números grandes agora vivem dentro de uma peça só, não mais duas faixas soltas. Diminuí os números e abri o espaço entre eles, que era a sua queixa do mais 449 mais 457 parecendo uma coisa só. Todos os dados oficiais continuam iguais, não mexi em nenhum número.

Os cards do topo agora têm o raio igual nos quatro cantos e em desktop, tablet e celular, e descolaram da divisão entre as seções, não parecem mais cortados.

As micrografias voltaram, em preto e branco, direto do arquivo do artigo. Recortei cada painel no limite exato dele, sem colorizar, sem filtro e sem esticar, então a letra do painel, a barra de escala e a etiqueta do laboratório aparecem inteiras. Produto A virou Produto R nos quatro lugares onde aparecia, e o texto virou Superfície e estrutura irregulares.

No bloco de resposta contínua, o círculo do número ficou bem maior, foi para o meio do card e não encosta mais na borda. Aumentei também a distância entre número, título e descrição, e a composição toda descolou da borda esquerda.

Nas aplicações, os quatro itens agora são exatamente Projeção, Bioestímulo e Qualidade de Pele, Reposicionamento e Estruturação.

Testei o formulário de verdade, de ponta a ponta: enviei um lead pelo formulário mesmo e o RD aceitou com sucesso. Testei também campo vazio, e-mail errado, queda de rede e erro do servidor, e em nenhum deles a página mostra sucesso falso. Pode apagar no RD o lead de teste, nome [TESTE-KOKO] LP STIIM. O console e a rede estão limpos, sem erro e sem 404, e a página ficou bem mais rápida: o Lighthouse foi de 71 para 92 em performance e de 96 para 100 em acessibilidade (achei e corrigi um problema de leitor de tela no menu sanfona do celular).

Duas coisas eu não consegui fazer, e as duas são falta de arquivo:

A molécula dourada. Você pediu para voltar aquela que a gente já tinha feito e deixar dourada sem cara de vidro. O problema é que essa imagem não está no projeto: procurei em tudo, inclusive nas cópias que temos do servidor. A única cópia dela é a miniatura dentro do próprio PDF, com 265 por 148 pixels, que é pequeno demais para um bloco que ocupa meia tela. Como não posso gerar uma parecida, deixei a imagem atual. Se você conseguir o arquivo original em alta com a Li, eu faço o tratamento dourado rapidinho, vale para as duas ocorrências.

A foto da mulher. Mesma coisa: o que veio no PDF é um print do slide inteiro do deck, 768 por 432, com texto e logo por cima, não o arquivo da foto. Recortar a modelo dali sairia borrado. Uma observação: a LP hoje não tem nenhuma mulher de corpo inteiro, a seção usa um retrato de rosto. Pode ser que o pedido seja o contrário, trocar o retrato pela foto do slide. Me confirma qual é, e manda a foto em alta que eu aplico.

E duas coisas que eu queria seu ok antes de publicar:

As imagens que você indicou para o bloco de maior e menor concentração são os painéis B e D do artigo, e no artigo eles são duas ampliações diferentes da mesma morfologia, não duas concentrações. Coloquei as imagens como você pediu, mas não escrevi em nenhuma legenda que a imagem representa uma concentração, para a gente não afirmar o que o estudo não diz. Se o cliente quiser assim mesmo, tudo bem, só queria que você soubesse. Aproveitei e troquei aquele comparador de cortina por duas imagens lado a lado, porque na cortina a barra de escala de um painel e a letra do outro ficavam escondidas.

Nas aplicações, tirei as linhas de apoio que ficavam embaixo de cada item, porque elas descreviam região do rosto e não faziam mais sentido com os títulos novos. Não inventei frase nova no lugar. Se o cliente quiser uma linha em cada uma das quatro, me manda que eu coloco.

Não publiquei nada, está tudo em branch. Assim que você validar eu subo pro espelho.

---

# Complemento (busca dos dois assets)

> Revisar antes de postar. NÃO postado.

---

Oi Mari, voltei nas duas imagens que tinham ficado pendentes. Uma eu achei, a outra não.

A foto da mulher achei em alta. Ela estava dentro do VA STIIM, na página de indicações e áreas de tratamento: é a mesma modelo, mesma pose, mesmo maiô e mesmo fundo do slide que você marcou, só que em 2480 por 3508 a 300 dpi. O print do PDF era pequeno porque era captura de tela do slide, não o arquivo. Já apliquei na seção de aplicações, só recortando pra proporção do bloco, sem retoque nenhum.

Uma consequência dessa troca que eu preciso te contar: os três pontinhos que ficavam em cima do rosto (região malar, contorno facial e mandíbula) saíram. Eles eram posicionados por coordenada em cima de um retrato, e numa foto de corpo inteiro cairiam em lugar nenhum. A seção agora ficou com a mesma leitura do slide de vocês: a foto de um lado e as quatro finalidades numeradas do outro. Mandei print de antes e depois.

Um detalhe pra você confirmar: no slide de referência, embaixo de Bioestímulo e Qualidade de pele, tem escrito Facial e a palavra que não pode. Eu trouxe só a foto, o texto do slide não veio, mas se a ideia era reproduzir o slide inteiro essa legenda não pode entrar.

A molécula eu não achei, e dessa vez procurei sério. Varri todo o histórico do repositório (todos os commits de todas as branches, não só o que está no ar), as duas cópias que temos do servidor, o Drive inteiro do STIIM (KV, Elementos, Saída, Aberto, a pasta de atualizações, as novas imagens, as pastas de assets de julho e a pasta de identidade visual completa), o VA STIIM, o PPT da campanha, o Take One e até os frames dos vídeos e dos GIFs. Foram 314 imagens comparadas uma a uma com a miniatura do PDF.

Tem várias parecidas, e mandei um print com todas elas lado a lado pra você ver, mas nenhuma é aquela. A do PDF é uma esfera de placas chatas sobrepostas, quase branca, com lascas soltas em volta. As nossas são de bolhas ou de favos, douradas ou esverdeadas, e nenhuma tem as lascas. Como não posso gerar uma parecida, deixei as duas ocorrências e o bloco de resposta contínua como estavam.

Consegue perguntar pra Li de onde ela tirou aquela imagem, ou pedir o arquivo original? Com ele em mãos eu faço o acabamento dourado fosco e aplico nos três lugares de uma vez.

Console e rede continuam limpos, e o Lighthouse segue em 91 de performance e 100 de acessibilidade. Nesta rodada não enviei lead nenhum.
