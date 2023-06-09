import React from 'react';
import './App.css'; // Estilo opcional

import 'primeicons/primeicons.css';
        

// Função que embaralha um array usando o algoritmo de Fisher-Yates
const shuffleArray = array => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perguntas: [], // Armazenará as perguntas do arquivo dados.json
      respostas: {}, // Armazenará as respostas do usuário
      respostasCorretas: 0, // Contador de respostas corretas
      respostaSelecionada: null, // Índice da pergunta com resposta selecionada
      maiorNumeroAcertos: 0, // Armazenará o maior número de acertos
      currentDate: new Date(), // Armazenará a data e hora atual
      currentPerguntaIndex: 0, // Índice da pergunta atual
      quizConcluido: false, // Indica se o quiz foi concluído
    };
  }

  componentDidMount() {
    this.carregarPerguntas();
    this.atualizarDataHora();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  carregarPerguntas = () => {
    fetch('/data/dados.json') // Caminho relativo para o arquivo dados.json
      .then(response => response.json())
      .then(data => {
        this.setState({ perguntas: data.perguntas }, () => {
          this.shufflePerguntas(); // Chame o método shufflePerguntas após carregar as perguntas
        });
      })
      .catch(error => {
        console.error('Erro ao carregar as perguntas do quiz:', error);
      });
  };

  shufflePerguntas = () => {
    const { perguntas } = this.state;
    const shuffledPerguntas = shuffleArray(perguntas); // Embaralhe as perguntas
    this.setState({ perguntas: shuffledPerguntas.slice(0, 5) }); // Mantenha apenas as 5 primeiras perguntas embaralhadas
  };

  handleResposta = (perguntaIndex, resposta) => {
    const { perguntas, respostas, respostasCorretas, maiorNumeroAcertos, currentPerguntaIndex } = this.state;
    const perguntaAtual = perguntas[currentPerguntaIndex];

    // Verificar se a resposta está correta e se não foi previamente respondida
    if (resposta === perguntaAtual.resposta && respostas[perguntaIndex] === undefined) {
      this.setState(prevState => ({
        respostas: {
          ...respostas,
          [perguntaIndex]: resposta,
        },
        respostasCorretas: prevState.respostasCorretas + 1,
        respostaSelecionada: perguntaIndex,
        maiorNumeroAcertos: Math.max(prevState.respostasCorretas + 1, maiorNumeroAcertos),
      }));
    } else {
      this.setState({
        respostas: {
          ...respostas,
          [perguntaIndex]: resposta,
        },
        respostaSelecionada: perguntaIndex,
      });
    }
  };

  avancarPergunta = () => {
    const { currentPerguntaIndex, perguntas } = this.state;
    const proximaPerguntaIndex = currentPerguntaIndex + 1;
    const isUltimaPergunta = proximaPerguntaIndex === perguntas.length;
    this.setState({
      respostaSelecionada: null,
      currentPerguntaIndex: proximaPerguntaIndex,
      quizConcluido: isUltimaPergunta,
    });
  };

  reiniciarQuiz = () => {
    this.setState({
      respostas: {},
      respostasCorretas: 0,
      respostaSelecionada: null,
      currentPerguntaIndex: 0,
      quizConcluido: false,
    });
    this.carregarPerguntas(); // Chame o método carregarPerguntas para buscar novas perguntas aleatórias ao reiniciar o quiz
  };

  handleSaudacao = () => {
    const currentHour = new Date().getHours();

    let saudacao;

    if (currentHour >= 5 && currentHour < 12) {
      saudacao = "Bom dia!";
    } else if (currentHour >= 12 && currentHour < 18) {
      saudacao = "Boa tarde!";
    } else {
      saudacao = "Boa noite!";
    }

    return saudacao;
  };

  atualizarDataHora = () => {
    this.timerID = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);
  };

  render() {
    const { perguntas, respostas, respostasCorretas, respostaSelecionada, maiorNumeroAcertos, currentDate, currentPerguntaIndex, quizConcluido } = this.state;
    const perguntaAtual = perguntas[currentPerguntaIndex];
    const isUltimaPergunta = currentPerguntaIndex === perguntas.length - 1;
  
    return (
      <div className="container-fluid mx-auto my-3 d-flex flex-column justify-content-around align-items-center quiz">
        <div className='header d-flex flex-column justify-content-between align-items-center mb-3'>
          <h2>{this.handleSaudacao()} Seja bem-vindo(a) ao Quiz!</h2>
          <p className='d-flex flex-row align-items-center'><i className='pi pi-clock mx-1'></i>{currentDate.toLocaleString()}</p>
        </div>        
        {quizConcluido ? (
          <div className="resultado d-flex flex-column align-items-center">
            <h3>Parabéns, você completou o quiz!</h3>
            <p>Total de respostas corretas: {respostasCorretas}</p>
            <p>Maior número de acertos: {maiorNumeroAcertos}</p>
            <button className='restart d-flex flex-row justify-content-start align-items-center rounded p-2' onClick={this.reiniciarQuiz}>Reiniciar Quiz</button>
          </div>
        ) : (
          ""
        )}
        {!quizConcluido && perguntaAtual && (
          <div className='container-fluid border border-1 pb-5 shadow-sm rounded'>
          <div className="pergunta w-100 mt-3">
            <h3>{currentPerguntaIndex + 1} - {perguntaAtual.pergunta}</h3>
            <div className="opcoes text-start">
              {perguntaAtual.opcoes.map((opcao, opcaoIndex) => {
                const respostaSelecionada = respostas[currentPerguntaIndex];
                const respostaCorreta = opcao === perguntaAtual.resposta;
                const classeBotao = respostaSelecionada === opcao ? 'opcao-selecionada d-flex flex-row justify-content-start align-items-center rounded m-1 p-2' : 'opcao d-flex flex-row justify-content-start align-items-center rounded m-1 p-2';
                const classeFundo = respostaSelecionada !== undefined && respostaCorreta ? 'correta d-flex flex-row justify-content-start align-items-center rounded m-1' : respostaSelecionada === opcao ? 'incorreta d-flex flex-row justify-content-start align-items-center rounded m-1' : '';
                const classeSimbolo = respostaSelecionada !== undefined && respostaCorreta ? '✓' : respostaSelecionada === opcao ? 'X' : '';
  
                return (
                  <div className='opcao d-flex flex-row justify-content-start align-items-center' key={opcaoIndex}>
                    <button
                      onClick={() => this.handleResposta(currentPerguntaIndex, opcao)}
                      className={`${classeBotao} ${classeFundo} text-start`}
                      disabled={respostaSelecionada !== undefined} // Desabilitar botões de resposta já selecionados
                    >
                      {(opcaoIndex === 0) ? 'A' : (opcaoIndex === 1) ? 'B' : (opcaoIndex === 2) ? 'C' : 'D'} - {opcao}
                    </button>
                    {respostaSelecionada === opcao && respostaCorreta && <span className="check"><i className='pi pi-check'></i></span>}
                    {respostaSelecionada === opcao && !respostaCorreta && <span className="x"><i className='pi pi-times'></i></span>}
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        )}
  
        {respostaSelecionada !== null && (
          <div className="botoes">
            {isUltimaPergunta ? (
              <button className='restart finish d-flex flex-row justify-content-start align-items-center rounded mt-3 p-2' onClick={this.avancarPergunta}>Finalizar Quiz</button>
            ) : (
              <button className='next d-flex flex-row justify-content-start align-items-center rounded mt-3 p-2' onClick={this.avancarPergunta}>Próxima pergunta</button>
            )}
          </div>
        )}
      </div>
    );
  }  
}

export default Quiz;