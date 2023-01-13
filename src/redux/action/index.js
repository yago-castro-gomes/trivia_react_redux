export const GRAVATAREMAIL = 'GRAVATAREMAIL';
export const NAME = 'NAME';
export const SUM_SCORE = 'SUM_SCORE';
export const ADD_ASSETTIONS = 'ADD_ASSETTIONS';

export const getGravatarEmail = (email) => ({
  type: GRAVATAREMAIL,
  payload: email,
});

export const getName = (name) => ({
  type: NAME,
  payload: name,
});

export const sumScore = (score) => ({
  type: SUM_SCORE,
  payload: score,
});

export const addAssertions = () => ({
  type: ADD_ASSETTIONS,
});
