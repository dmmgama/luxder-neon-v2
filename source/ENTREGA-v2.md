# Luxder v2 — quatro modos

## Publicação separada

| Visual | App | Repo |
| --- | --- | --- |
| Néon v2 | https://dmmgama.github.io/luxder-neon-v2/ | https://github.com/dmmgama/luxder-neon-v2 |
| Talão v2 | https://dmmgama.github.io/luxder-talao-v2/ | https://github.com/dmmgama/luxder-talao-v2 |

A v1 continua em https://dmmgama.github.io/luxder-night/ e https://dmmgama.github.io/luxder-night/talao.html. O commit original publicado é `e0d9ada417ff31d29ab12a643db60b663bcedf48` e não foi alterado nesta entrega.

## Ficheiros

- Apps completas: `index-v2.html` e `talao-v2.html`.
- Downloads: `C:/Users/JSJ/Downloads/Luxder-Neon-v2.html` e `C:/Users/JSJ/Downloads/Luxder-Talao-v2.html`. Os ficheiros anteriores foram preservados.
- Conteúdo bilingue: `content-v2.js`.
- Lógica e componentes dos novos modos: `modes-v2.js`.
- Visuais por modo: `modes-v2.css`.
- Gerar novamente os dois HTML: `python build-v2.py`. Usa `index.html` da v1 como base; não o modifica.
- Testes: `verify-v2.cjs` com Playwright; `LUXDER_WEBKIT=1` seleciona WebKit.

## Modos

1. **Jogo da bicicleta:** modos existentes de 2–4 jogadores; 20 perguntas, 30 desafios e 104 pitches. Sorteio sem repetição até esgotar o baralho. Votos equilibrados para 1v2, todos contra todos e pares 2v2.
2. **Amor de laboratório:** 2–4 pessoas, cinco perguntas, avatares e resultado para todos os pares (1, 3 ou 6 pares). Três respostas iguais em cinco dão match fictício; percentagem = respostas iguais × 20. Histórias amorosas absurdas e aviso explícito de paródia científica.
3. **Tenta convencer-me:** 100 prompts escritos individualmente em PT e EN; dez por partida, sem repetir. Turnos, cronómetro opcional de dez segundos, aprovação/recusa, delegação nos devs e passar. Não há classificação de pessoas.
4. **Grill me para dating:** 20 temas com três seguimentos específicos cada; seis temas por sessão. Adivinhar sobre a outra pessoa → confirmação/correção → pergunta de seguimento baseada na resposta real. Turnos alternados, opção de passar.

Os modos têm grafismos, cores, tipografia e estruturas de cartão diferentes: competição néon, laboratório romântico, tribuna roxa e dossier de investigação âmbar. O visual Talão adapta os quatro a papel claro.

## Verificação

Ambos os HTML testados em Chromium/Edge e WebKit, em PT e EN: quatro modos, seis pares para quatro participantes, match e não-match, avatares, 100 prompts bilingues únicos, baralho sem repetição, dez turnos de convencimento, seguimentos do Grill, passar, delegar, mudança de língua durante temporizador, cancelamento de temporizador, todos os formatos do jogo original, pontuação e revanche. Verificação de layout a 320 px e capturas a 390 px. Zero erros de JavaScript. Sem teste num iPhone físico.

GitHub Pages público com HTTPS, sem serviços pagos. Sem dependências externas, backend, fontes remotas, teclado, registos, fotos ou armazenamento. A bicicleta é virtual e a ciência é uma piada explícita.
