import React from 'react';
import './App.css'; // Estilo opcional

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
      clicked: false
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
    const { perguntas, respostas, respostasCorretas, maiorNumeroAcertos } = this.state;
    const perguntaAtual = perguntas[perguntaIndex];

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

  handleClick = () => {
    clicked(true);
  };

  reiniciarQuiz = () => {
    this.setState({
      respostas: {},
      respostasCorretas: 0,
      respostaSelecionada: null,
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
  }

  atualizarDataHora = () => {
    this.timerID = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);
  }

  render() {
    const { perguntas, respostas, respostasCorretas, respostaSelecionada, maiorNumeroAcertos, currentDate } = this.state;

    return (
      <div className="quiz">
        <div className='header'>
          <h2>{this.handleSaudacao()} Seja bem-vindo(a) ao Quiz!</h2>
          <p>{currentDate.toLocaleString()}</p>
        </div>
        <div className="resultado">
          <h3>Resultados:</h3>
          <p>Total de respostas corretas: {respostasCorretas}</p>
          <p>Maior número de acertos: {maiorNumeroAcertos}</p>
        </div>

        {perguntas.map((pergunta, index) => (
          <div className="pergunta" key={index}>
            <h3>{index+1} - {pergunta.pergunta}</h3>
            <div className="opcoes">
            {pergunta.opcoes.map((opcao, opcaoIndex) => {
              const respostaSelecionada = respostas[index];
              const respostaCorreta = opcao === pergunta.resposta;
              const classeBotao = respostaSelecionada === opcao ? 'opcao-selecionada' : 'opcao';
              const classeFundo = respostaSelecionada !== undefined && respostaCorreta ? 'correta' : respostaSelecionada === opcao ? 'incorreta' : '';
              const classeSimbolo = respostaSelecionada !== undefined && respostaCorreta ? '✓' : respostaSelecionada === opcao ? 'X' : '';
            
              return (
                <div className='opcao' key={opcaoIndex}>
                    <button
                      onClick={() => this.handleResposta(index, opcao)}
                      className={`${classeBotao} ${classeFundo}`}
                      disabled={respostaSelecionada !== undefined} // Desabilitar botões de resposta já selecionados
                    >
                      {(opcaoIndex === 0) ? 'A' : (opcaoIndex === 1) ? 'B' : (opcaoIndex === 2) ? 'C' : 'D'} - {opcao}
                    </button>
                    {respostaSelecionada === opcao && respostaCorreta && <span className="check"></span>}
                    {respostaSelecionada === opcao && !respostaCorreta && <span className="x"></span>}
                  </div>
                );
              })}
            </div>
            {respostaSelecionada === index && (
              <div className="resposta">
                {respostas[index] === pergunta.resposta ? "" : (
                  <p>Resposta Correta: {pergunta.resposta}</p>
                )}
              </div>
            )}
          </div>
        ))}
        <button id="restart" onClick={this.reiniciarQuiz}>
          Reiniciar
        </button>
      </div>
    );
  }
}

export default Quiz;
