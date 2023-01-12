import React, { Component } from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import fetchAnswerTrivia from '../services/apiAnswer';
import Header from '../components/Header';

// let countIndex = -1;

class Game extends Component {
  state = {
    answer: [],
    rndAnswer: [],
    answerNumber: 0,
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

    arr.forEach((element) => {
      // arr2.push(arr[Math.floor(Math.random() * arr.length)]);

      // const index = arr.indexOf(arr2[arr2.length - 1]);
      arr2.splice(Math.floor(Math.random() * arr.length), 0, element);
    });

    this.setState({ rndAnswer: arr2 });
  };

  // handleNumber = () => {
  //   const THREE = 3;
  //   countIndex = countIndex > THREE ? 0 : countIndex + 1;
  //   return countIndex;
  // };

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
                    : `wrong-answer-${index}` }
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
