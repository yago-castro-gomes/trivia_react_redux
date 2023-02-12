import { CLEAR_PLAYER_INFOS, ADD_ASSETTIONS, GRAVATAREMAIL,
  NAME, SUM_SCORE } from '../action';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
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
  case SUM_SCORE:
    return {
      ...state,
      player: {
        ...state.player, score: state.player.score + action.payload,
      },
    };
  case CLEAR_PLAYER_INFOS:
    return {
      ...state,
      player: {
        name: '',
        score: 0,
        gravatarEmail: '',
        assertions: 0,
      },
    };
  case ADD_ASSETTIONS:
    return {
      ...state,
      player: {
        ...state.player, assertions: state.player.assertions + 1,
      },
    };
  default: {
    return state;
  }
  }
};

export default reduce;
