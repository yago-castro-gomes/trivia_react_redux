import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback'

const INITIAL_STATE = {
    player: {
      name: 'Anderson',
      assertions: 5,
      score: 50,
      gravatarEmail: 'a@a.com',
    },
  };

describe('Testa o component Feedback', () => {
    it('Testa o Header do Feedback', () => {
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');
    
})
})