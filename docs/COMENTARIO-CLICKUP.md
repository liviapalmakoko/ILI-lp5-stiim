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

---

# Complemento 2 (molécula resolvida)

> Revisar antes de postar. NÃO postado.

---

Oi Mari, a molécula saiu. A chave foi entender que ela não é um desenho separado: é a partícula real do estudo, do painel D daquela mesma figura que a gente já usa, recortada e tratada.

Foi isso que eu fiz. Recortei a partícula inteira do canto superior esquerdo do painel D, com máscara limpa e fundo transparente, sem cortar a borda dela. Em volta coloquei três microesferas soltas do painel B, que é o mesmo material do painel D. De propósito não usei nada dos painéis A e C, porque esses dois são o produto comparador e misturar os dois numa imagem só seria dizer uma coisa que o estudo não diz.

O acabamento é colorização em cima da foto, nada redesenhado. A rampa vai do bronze escuro ao creme, no mesmo tom do amarelo novo da página, e ela para antes do branco puro de propósito: sem branco puro não tem como aparecer reflexo, que era justamente o que dava a cara de vidro. Também não tem transparência nenhuma. A textura de placas continua com o relevo da micrografia, então ela lê como partícula de verdade, com volume.

Apliquei nos dois lugares que você marcou: o bloco da tecnologia Lattice-Pore e o bloco de resposta contínua. Ajustei tamanho e alinhamento nos dois, e conferi em desktop, tablet e celular. No bloco de resposta contínua também baixei o amarelo do fundo, que estava forte e apagava a textura.

Uma coisa importante: as seções científicas não mudaram nada. A figura do artigo continua em preto e branco nos dois lugares onde ela é citada, com a letra do painel, a barra de escala e a referência. A colorização dourada existe só na peça decorativa, e o texto alternativo dela diz que é representação a partir de micrografia, sem afirmar concentração nem produto.

Mandei os prints de antes e depois. O Lighthouse não caiu, continua em 100 de acessibilidade e subiu de 91 para 92 em performance. Console e rede limpos. Nesta rodada não enviei lead nenhum.

---

# Complemento 3 (partícula refeita)

> Revisar antes de postar. NÃO postado.

---

Oi Mari, refiz a partícula. A primeira versão tinha ficado pequena dentro do card, meio chapada e com a cor puxando pro esverdeado.

Continua sendo a mesma partícula real do estudo, mesmo recorte, nada gerado. O que mudou foi o tratamento. Ela agora ocupa cerca de 70% da largura do card, ganhou luz vindo do alto à esquerda e sombra no lado de baixo à direita, então lê como um corpo tridimensional de verdade e não como um adesivo. Coloquei também uma sombrinha de contato embaixo, pra ela pousar em vez de flutuar. A cor ficou mais clara e mais quente, no champagne, sem o tom oliva. E dei uma afiada na textura antes de colorir, pra as placas da superfície voltarem a aparecer, sem virar granulado.

Continua sem reflexo branco e sem transparência, que era o que dava a cara de vidro. Apliquei nos dois blocos e conferi em desktop, tablet e celular.

Sobre o gráfico da distribuição que você pediu pra eu conferir: ele aparece sozinho, sem precisar clicar em nada, tanto em desktop quanto em tablet, e também no modo de menos animação do sistema. Só que eu achei uma fragilidade e corrigi: o estado padrão das curvas era invisível, e elas só apareciam quando a animação rodava. Se por qualquer motivo a animação não disparasse, o gráfico ficaria vazio pra sempre. Agora é o contrário: o padrão é a curva desenhada, e a animação é que parte do vazio. Na prática ninguém vê diferença, mas o gráfico deixou de depender dela pra existir. Foi por isso também que a curva não aparecia nos prints que eu te mandei antes.

Mandei os prints de antes e depois da partícula e do gráfico. Acessibilidade, boas práticas e SEO seguem em 100. Nesta rodada não enviei lead nenhum.
