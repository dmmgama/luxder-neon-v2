# Esqueleto da app Luxder v0.2

Um ficheiro HTML. Ecrãs são `<section class="screen">`; só um tem `.on`. Navegação por `go(id)`. Estado em dois objetos JS: `state` (modo tester) e `comp` (competição). Sem rede, sem storage.

## Stack visual atual (direção "Cartoon Néon")

- Fundo tinta-violeta `#0B0A16`, cartões `#17152B`, linhas `#2A2745`
- Acento rosa néon `#FF4FA3` (botão "Sim"), lima `#C9FF3A` (botão "Não"), céu `#5EE3FF` (eles), sol `#FFC63A` (números grandes)
- Display: Bangers. Corpo: Nunito 600/800
- Botões: 96 px de altura mínima, sombra dura sem blur, `:active` afunda 4 px
- Feedback físico: `navigator.vibrate` em cada toque, confetti em canvas nos momentos de clímax
- Avatares: SVG inline por partes (base + acessório + estado), compostos por `draw([q1,q2,q3])`

## Fluxo A: modo tester (1 mulher, 1 telemóvel)

1. **s-beta** "Feita por 2 gajos em 25 minutos. Precisamos de uma tester com bom gosto." Botões iguais: Aceito testar / Não, obrigada. Rodapé: "Não guardamos nada. Zero fotos. Isto morre aqui."
   - Não → **s-recusa**: "A app é tão má que nem merece teste. +10 de inteligência emocional."
2. **s-q** 3 perguntas absurdas, 3 opções com ícone cartoon. Primeiro **eles** respondem sobre si próprios, depois **ela** responde sobre eles.
   - Q1 "Se eles fossem um animal no Lux às 5h?" pato perdido / gato desconfiado / robot com 12% de bateria
   - Q2 "O que trazem sempre na mão?" imperial morna / auscultadores nunca ligados / pastel de nata de emergência
   - Q3 "Estado atual?" a fingir que conhecem o DJ / à procura da saída / energia para mais 6 horas (mentira)
3. **s-avatar** dois avatares lado a lado: "Segundo eles" vs "Segundo ela". Nome composto ("Gato com imperial morna à procura da saída"). Frase por concordância 0-3 ("0 em 3. A versão dela é a oficial a partir de agora.").
4. **s-scan** scanner de dedo cartoon. Segurar 2 s (pointerdown). Anel de progresso, mensagens: "A ler impressão digital… A consultar 3 imperiais… A ignorar o algoritmo… A perguntar ao segurança… Quase. Não largues." Largar cedo dá "Dedo em fuga. Tenta outra vez." Completar dá vibração + confetti.
5. **s-verdict** % gigante (31-96) + frase aleatória ("tem 73% de probabilidade de dançar a mesma música que tu esta noite. Provavelmente por acidente."). Fonte: "estudo inventado da Universidade de Alfama, 2026". Botões iguais: **Aprovado / Chumbado**.
   - Aprovado → **s-match**: "97%. Match. Algoritmo treinado por 2 gajos e 3 imperiais. Verificado por um segurança do Lux." Botões: Modo a dois / Eles vs Elas.
   - Chumbado → **s-castigo**.
6. **s-castigo** castigo para os devs, escalado: nível 1 leve para um deles (ela escolhe qual), nível 2 médio, nível 3 épico para os dois, 4+ remix com copy de esgotamento. Títulos rotativos: "Erro 404: piada não encontrada", "Ela tem razão. Como sempre.", "Falha técnica: humor não encontrado." Botões: Cumprido, novo scan / Chumbar outra vez / Ela ganhou.
7. **s-win** "Arrasaste dois rapazes e uma app inteira. 🏆 Eles vão precisar de terapia. Tu só precisas de mais um copo."
8. **s-report** Relatório de tester: Rigor 94%, Paciência com devs (12% menos 3 por bug), Bugs encontrados, Concordância com eles, Recomenda a amigas: obviamente.

## Fluxo B: modo a dois (ela + ele)

Dois scans seguidos no mesmo pad ("Dedo 1: ela", "Dedo 2: ele") → % de compatibilidade de pista + frase ("Quem ganha a noite: ela. Obviamente." / "Mesmo táxi: não comentamos.").

## Fluxo C: competição Eles vs Elas (2 + 2, um telemóvel)

Placar sempre visível entre rondas. Cada ronda vale 1 ponto.

1. **Reflexos** (s-reflex): 4 jogadores à vez (Ele 1, Ela 1, Ele 2, Ela 2). Tocar para armar, esperar 1,2-3,7 s aleatórios, círculo fica verde + vibra, tocar. Mede ms. Falso arranque = 999 ms. Ganha o melhor tempo da equipa. Comentários: "<220 ms: Suspeito. Já bebeste?", ">350: A imperial já chegou aos dedos."
2. **Adivinha** (s-guess): 2 rondas. Uma equipa responde em segredo a uma pergunta de 3 opções ("os outros olham para o tecto"), a outra adivinha. Perguntas: música que os leva à pista sem vergonha, a que horas saem do Lux, pior frase de engate, o que fazem quando toca música que odeiam.
3. **Mímica** (s-mime): cada equipa faz uma. Palavra desfocada, "Mostrar 3 s" só para quem mima, depois "Começar 20 s" com contador gigante. A outra equipa é o júri: Acertaram / Falharam. Palavras: elétrico 28 à hora de ponta, segurança do Lux às 6h, DJ que perdeu a pen, táxi que não para no Cais do Sodré, sardinha na brasa, metro fechado às 2h.
4. **Final** (s-cfinal): placar, título ("Elas ganharam. Toda a gente esperava."), castigo para quem perdeu. Se elas perdem: castigo leve e "podem delegar neles, direito adquirido" + botão Outro castigo. Se eles perdem: nível aleatório 1-3. Empate: castigo conjunto leve. Revanche reinicia.

## Listas de castigos (só para os devs)

- **Leve:** dançar 10 s como um pato; frase em francês inventado; elogio sincero ao segurança; ir ao bar em bicos de pés; apresentar-se ao amigo como se não se conhecessem há 10 anos.
- **Médio:** narrar 30 s da noite como documentário National Geographic; só responder "obviamente" até ao próximo scan; fazer a pose de foto de perfil dela em loop 15 s; inventar nome de DJ e apresentar-se assim a 2 pessoas; descrever o próprio look como crítico de moda francês, terminar com "non".
- **Épico (os dois):** coreografia sincronizada de 20 s inventada agora; discurso de Óscares por terem sido chumbados (agradecer à mãe); hino do castigo a capella, refrão a rimar com "Lux"; robot com bateria fraca até ao bar e voltar.

## Ideias que ficaram na gaveta (usa se quiseres)

- Cartão de perfil dela gerado ("Agente Pastel de Nata", bio absurda, selo verificado) como artefacto para mostrar às amigas.
- "Premium: desbloqueia a opção de ele pagar-te um shot" (sempre grátis, piada meta).
- Toggle EN discreto para o público internacional do Lux.
- Ronda 4 "Tribunal": afirmação sobre um dos rapazes, ela decide verdadeiro/falso, sentença gerada.
- Gerador de bio em 1 toque.

## v0.3 (deploy: https://dmmgama.github.io/luxder/)

- PT/EN em todos os textos (toggle no topo). 2 skins funcionais: Cartoon Néon e Sticker Pop (toggle no topo).
- Jogo "Corrida à Bicicleta" para 2-4 pessoas. Modo decidido automaticamente: Duelo (1+1), Disputa (1 de um lado, 2-3 do outro: a pessoa sozinha é júri e "vem de brinde com a bicicleta"), Pares (2+2: 3 perguntas inusitadas, pares por respostas iguais, depois par contra par), Equipas (outras combinações, sorteio).
- 8 rondas para ~25 min: reflexos, adivinha, parvoíces, desafio, adivinha, parvoíces, desafio, reflexos. Prémio parcial estúpido em cada placar. Prémio final: bicicleta (12 variantes). Castigo para quem perde.
- Parvoíces: 26 tarefas de 10 s (língua no nozinho do nariz, alfabeto ao contrário, cara de passaporte...). Sem contacto, sem bebida obrigatória.
- iOS: viewport, sem color-mix, sem callout no long-press, 100dvh, safe-area.
