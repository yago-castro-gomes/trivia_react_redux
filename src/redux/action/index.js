export const GRAVATAREMAIL = 'GRAVATAREMAIL';
export const NAME = 'NAME';

export const getGravatarEmail = (email) => ({
  type: GRAVATAREMAIL,
  payload: email,
});

export const getName = (name) => ({
  type: NAME,
  payload: name,
});
