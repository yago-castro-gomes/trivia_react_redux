import React, { Component } from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { MD5 } from 'crypto-js';
import fetchAnswerTrivia from '../services/apiAnswer';
import Header from '../components/Header';
import { addAssertions, sumScore } from '../redux/action';

// const MINUS = -1;
// let countIndex = MINUS;
const TIMER = 30;

const difficulty = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class Game extends Component {
  state = {
    answer: [],
    rndAnswer: [],
    answerNumber: 0,
    time: TIMER,
    disableButton: false,
    isNextVisible: false,
    correctAnswer: '',
  };

  async componentDidMount() {
    const answer = await fetchAnswerTrivia();
    const { history } = this.props;

    if (answer.length < 1) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ answer }, this.handleRandon);
    }
    // this.startTimer();
  }

  handleRandon = () => {
    const { answer, answerNumber } = this.state;

    const arr = [answer[answerNumber]
      .correct_answer, ...answer[answerNumber].incorrect_answers];

    const arr2 = [];

    arr.forEach((element) => {
      arr2.splice(Math.floor(Math.random() * arr.length), 0, element);
    });

    this.setState({ rndAnswer: arr2,
      correctAnswer: answer[answerNumber].correct_answer,
    }, this.startTimer);
  };

  // handleNumber = () => {
  //   const THREE = 3;
  //   countIndex = countIndex > THREE ? 0 : countIndex + 1;
  //   return countIndex;
  // };

  startTimer = () => {
    const thousand = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
      const { time } = this.state;
      if (time === 1) {
        clearInterval(this.intervalId);
        this.setState({
          disableButton: true,
          isNextVisible: true,
        });
      }
    }, thousand);
  };

  handleChooseAnswer = (resposta) => {
    const { correctAnswer, time, answer, answerNumber } = this.state;
    const { dispatch } = this.props;

    clearInterval(this.intervalId);
    this.setState({ isNextVisible: true, disableButton: true });

    if (resposta === correctAnswer) {
      // console.log('fui chamado');
      const TEN = 10;
      const key = answer[answerNumber].difficulty;
      const score = TEN + (time * difficulty[key]);
      dispatch(sumScore(score));
      dispatch(addAssertions());
    }
  };

  handleNextAnswer = () => {
    const { answerNumber } = this.state;
    const { history } = this.props;
    const FOUR = 4;
    this.setState((prev) => ({
      isNextVisible: false,
      time: TIMER,
      disableButton: false,
      answerNumber: prev.answerNumber < FOUR ? prev.answerNumber + 1 : 0,
      countNext: prev.countNext + 1,
    }), this.handleRandon);
    if (answerNumber === FOUR) {
      this.updateRanking();
      history.push('/feedback');
    }
  };

  updateRanking = () => {
    const { name, email, score } = this.props;

    let ranking = localStorage.getItem('ranking');
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
      ranking = '[]';
    }

    ranking = JSON.parse(ranking);

    const emailHash = MD5(email).toString();

    const playerInfos = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${emailHash}`,
    };

    ranking.push(playerInfos);

    ranking = ranking.sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);

    localStorage.setItem('ranking', JSON.stringify(ranking));
  };

  changeColor = (item = '') => {
    // console.log(item)
    const { correctAnswer, isNextVisible } = this.state;
    if (isNextVisible) {
      return correctAnswer === item
        ? (
          { border: '3px solid rgb(6, 240, 15)' }
        )
        : (
          { border: '3px solid red' }
        );
    }
  };

  render() {
    const { rndAnswer,
      answer,
      answerNumber,
      isNextVisible,
      disableButton,
      time } = this.state;
    return (
      <>
        <Header />
        <div>
          { time }
        </div>
        <div>
          {answer.length > 0
        && (
          <>
            <p data-testid="question-category">{answer[answerNumber].category}</p>
            <p data-testid="question-text">{answer[answerNumber].question}</p>
            <div data-testid="answer-options">
              {rndAnswer.map((item, index) => (
                <button
                  key={ index }
                  type="button"
                  disabled={ disableButton }
                  data-testid={ item === answer[answerNumber].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${index}` }
                  onClick={ () => this.handleChooseAnswer(item) }
                  style={ this.changeColor(item) }
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}
          {isNextVisible && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextAnswer }
            >
              Next
            </button>)}
        </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  email: globalState.player.gravatarEmail,
  score: globalState.player.score,
});

Game.propTypes = {
  history: P.shape({
    push: P.func,
  }),
  dispatch: P.func,
  email: P.string.isRequired,
  name: P.string.isRequired,
  score: P.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Game);
