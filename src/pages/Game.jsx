import React, { Component } from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import fetchAnswerTrivia from '../services/apiAnswer';
import Header from '../components/Header';

class Game extends Component {
  state = {
    answer: [],
    rndAnswer: [],
    answerNumber: 0,
    number: 0,
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
  }

  handleRandon = () => {
    const { answer, answerNumber } = this.state;

    const arr = [answer[answerNumber]
      .correct_answer, ...answer[answerNumber].incorrect_answers];

    const arr2 = [];

    arr.forEach(() => {
      arr2.push(arr[Math.floor(Math.random() * arr.length)]);

      const index = arr.indexOf(arr2[arr2.length - 1]);
      arr.splice(index, 1);
    });

    this.setState({ rndAnswer: arr2 });
  };

  handleNumber = () => {
    const { number } = this.state;
    const THREE = 3;
    this.setState((prev) => ({ number: prev.number > THREE ? 0 : prev.number + 1 }));
    return number;
  };

  render() {
    const { rndAnswer, answer, answerNumber } = this.state;
    return (
      <>
        <Header />
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
                  data-testid={ item === answer[answerNumber].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${this.handleNumber()}` }
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: P.shape({
    push: P.func,
  }),
}.isRequired;

export default connect()(Game);
