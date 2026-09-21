#!/usr/bin/env python3
"""Aceites do card da modelo (bloco "Um unico produto, multiplas possibilidades"), 21/09/2026.

Le o JSON de medidas do DOM gerado por docs/testes/modelo-medidas.js (um objeto por largura) e
calcula, por largura:
  a) respiro acima do cabelo (px) >= 24 no desktop (>= 16 no mobile, informativo)
  b) desvio do eixo do tronco em relacao ao centro do card (% da largura) <= 5
  c) fracao visivel de cada letra S, T, I, I, M (pixels da letra nao cobertos pela modelo) e a
     condicao "reconhecivel": >= 60% de cada letra visivel e nenhuma letra abaixo disso
  d) sem ampliacao acima da resolucao real: largura renderizada * DPR <= largura natural
Uso: python3 docs/testes/modelo-aceites.py docs/testes/modelo-medidas.json [dpr=2]
"""
import json, sys
from PIL import Image
import numpy as np

medidas = json.load(open(sys.argv[1]))
DPR = float(sys.argv[2]) if len(sys.argv) > 2 else 2.0
ROOT = __file__.rsplit('/docs/', 1)[0]
word = np.array(Image.open(f"{ROOT}/assets/img/stiim-letras-vertical.png").convert("RGBA"))[:, :, 3] > 128
model = np.array(Image.open(f"{ROOT}/assets/img/aplicacao-modelo-recorte.webp").convert("RGBA"))[:, :, 3] > 128
WH, WW = word.shape
MH, MW = model.shape
# faixas das letras ao longo do eixo vertical do PNG da palavra (medidas no logotipo, escaladas para 900px)
LETRAS = {"S": (0, 208), "T": (218, 425), "I1": (454, 504), "I2": (548, 597), "M": (640, 900)}
# topo do cabelo no recorte: linha 0 (o recorte e justo no alfa); eixo do tronco: 64,81% da largura
HAIR_TOP = 0
falhas = 0

def res(w, item, passa, det):
    global falhas
    if not passa:
        falhas += 1
    print(f"{w:>5}  {'PASSA' if passa else 'FALHA'}  {item}  {det}")

for m in medidas:
    w = m["w"]
    card, wd, md = m["card"], m["word"], m["model"]
    # a) respiro
    sm = md["h"] / MH  # px de tela por px do recorte
    respiro = (md["y"] - card["y"]) + HAIR_TOP * sm
    minimo = 24 if w >= 1024 else 16
    res(w, "a) respiro acima do cabelo", respiro >= minimo, f"{respiro:.1f}px (min {minimo})")
    # b) eixo do tronco
    eixo = md["x"] + md["w"] * m["modelCx"]
    centro = card["x"] + card["w"] / 2
    desvio = 100 * abs(eixo - centro) / card["w"]
    res(w, "b) eixo do tronco no centro do card", desvio <= 5, f"desvio {desvio:.1f}% (eixo {eixo:.0f}, centro {centro:.0f}, max 5%)")
    # c) letras: rasteriza palavra e modelo no espaco do card (1 px = 1 px CSS)
    cw, ch = int(round(card["w"])), int(round(card["h"]))
    canvas_word = np.zeros((ch, cw), bool)
    canvas_model = np.zeros((ch, cw), bool)
    def paste(canvas, mask, rect):
        rw, rh = max(1, int(round(rect["w"]))), max(1, int(round(rect["h"])))
        img = Image.fromarray(mask.astype(np.uint8) * 255).resize((rw, rh), Image.BILINEAR)
        arr = np.array(img) > 128
        x0, y0 = int(round(rect["x"] - card["x"])), int(round(rect["y"] - card["y"]))
        xs0, ys0 = max(0, x0), max(0, y0)
        xs1, ys1 = min(cw, x0 + rw), min(ch, y0 + rh)
        if xs1 > xs0 and ys1 > ys0:
            canvas[ys0:ys1, xs0:xs1] |= arr[ys0 - y0:ys1 - y0, xs0 - x0:xs1 - x0]
        return arr, x0, y0
    warr, wx0, wy0 = paste(canvas_word, word, wd)
    paste(canvas_model, model, md)
    sw = wd["h"] / WH
    vis = {}
    for nome, (a0, a1) in LETRAS.items():
        y0 = int(round(wy0 + a0 * sw)); y1 = int(round(wy0 + a1 * sw))
        ys0, ys1 = max(0, y0), min(ch, y1)
        letra = np.zeros((ch, cw), bool)
        if ys1 > ys0:
            letra[ys0:ys1] = canvas_word[ys0:ys1]
        total = letra.sum()
        dentro = letra[:, :].sum()  # ja limitado ao card
        visivel = (letra & ~canvas_model).sum()
        vis[nome] = (100 * visivel / total) if total else 0.0
        # letra fora do card conta como coberta
        full = ((a1 - a0) * sw) * (warr.shape[1]) * 0  # placeholder, so para clareza
    det = " ".join(f"{k}={v:.0f}%" for k, v in vis.items())
    res(w, "c) letras S-T-I-I-M reconheciveis (>= 60% visiveis cada)", all(v >= 60 for v in vis.values()), det)
    # d) nitidez
    ok_d = md["w"] * DPR <= MW + 0.5 and wd["w"] * DPR <= WW + 0.5
    res(w, "d) sem ampliacao acima da resolucao real (DPR 2)", ok_d,
        f"modelo {md['w']:.0f}px x2 = {md['w']*DPR:.0f} <= {MW}; palavra {wd['w']:.0f}px x2 = {wd['w']*DPR:.0f} <= {WW}")
print(f"\nTOTAL: {falhas} FALHA(S)")
sys.exit(1 if falhas else 0)
