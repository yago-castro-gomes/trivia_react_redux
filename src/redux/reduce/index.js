import { GRAVATAREMAIL, NAME, SUM_SCORE } from '../action';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const reduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAREMAIL:
    return {
      ...state,
      player: {
        ...state.player, gravatarEmail: action.payload,
      },
    };
  case NAME:
    return {
      ...state,
      player: {
        ...state.player, name: action.payload,
      },
    };
  case SUM_SCORE: {
    return {
      ...state,
      player: {
        ...state.player, score: state.player.score + action.payload,
      },
    };
  }
  default: {
    return state;
  }
  }
};

export default reduce;
