# Quiz App

Este projeto é um aplicativo de quiz desenvolvido em React. O aplicativo carrega perguntas de um arquivo JSON, permite que o usuário responda às perguntas e exibe os resultados.

## Funcionalidades

- Carrega perguntas de um arquivo `dados.json` usando a função `fetch`.
- Embaralha as perguntas aleatoriamente usando o algoritmo de Fisher-Yates.
- Permite que o usuário selecione uma resposta para cada pergunta.
- Mantém o controle das respostas corretas e do número máximo de acertos.
- Exibe os resultados: total de respostas corretas e maior número de acertos alcançados.
- Atualiza a saudação de acordo com a hora do dia.
- Atualiza a data e hora a cada segundo.

## Como executar o projeto

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Faça o download ou clone este repositório.
3. Navegue até o diretório raiz do projeto.
4. Abra um terminal e execute o comando `npm install` para instalar as dependências.
5. Após a instalação das dependências, execute o comando `npm start` para iniciar o aplicativo.
6. O aplicativo será aberto no seu navegador padrão.

## Estrutura do projeto

- `App.css`: Arquivo de estilo CSS opcional para o componente `Quiz`.
- `App.js`: Componente principal que renderiza o aplicativo Quiz.
- `dados.json`: Arquivo JSON contendo as perguntas e respostas.
- `index.js`: Arquivo principal que renderiza o aplicativo React.#
