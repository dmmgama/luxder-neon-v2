# Luxder — entrega

- App Néon: https://dmmgama.github.io/luxder-night/
- App Talão: https://dmmgama.github.io/luxder-night/talao.html
- Repositório publicado: https://github.com/dmmgama/luxder-night
- Downloads: `C:/Users/JSJ/Downloads/Luxder-Neon.html` e `C:/Users/JSJ/Downloads/Luxder-Talao.html`.

Os dois HTML são apps completas, autónomas e bilingues PT/EN. Cada um inclui tester, castigos para os devs, questionário de duas pessoas com avatares e compatibilidade fictícia, jogo de 2–4 pessoas, equipas 1v2 e 2v2, votação secreta, desafios opcionais e bicicleta virtual no final.

O modo expresso tem uma ronda; o completo tem três. Os votos são normalizados por equipa para que um par não tenha mais peso do que uma pessoa a solo. Empates dão um ponto a cada vencedor da ronda. Não há recolha de dados, bibliotecas externas, fontes remotas, backend ou instalação.

Publicação em repositório público com GitHub Pages gratuito e HTTPS. Abrir o link no Safari no iPhone. Os ficheiros locais podem ser abertos num browser; a pré-visualização de ficheiros do iOS não substitui o Safari.

Validação: os dois visuais em Chromium/Edge e WebKit; PT/EN, recusa, castigos repetidos, questionário e avatares, 2/3/4 jogadores, todos os formatos, três rondas, interrupção do temporizador, empates, revanche e larguras entre 320 e 430 px. Zero erros de JavaScript. Não foi feito teste num iPhone físico.

Para repetir a verificação local: `node verify.cjs` com Playwright disponível. Definir `LUXDER_WEBKIT=1` para WebKit. Capturas em `qa/`.

O repositório público contém apenas as duas apps e um README. O checkout usado na publicação ficou em `C:/Users/JSJ/AppData/Local/Temp/luxder-night-publish-20260912`.
