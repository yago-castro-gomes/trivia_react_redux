import { GRAVATAREMAIL, NAME } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const reduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAREMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case NAME:
    return {
      ...state,
      name: action.payload,
    };
  default: {
    return state;
  }
  }
};

export default reduce;
