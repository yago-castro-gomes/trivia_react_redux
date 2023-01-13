import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import { DATA_TEST_BTN_PLAY, DATA_TEST_BTN_SETTINGS, PLAYER_EMAIL, PLAYER_NAME, questionsResponse, tokenResponse } from "./constants";
import { loginSuccess, writeEmail, writeName } from "./helpers/functions";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('[TELA DE LOGIN] - Testando a tela de login', () => {
  afterEach(() => jest.clearAllMocks())

  test('Testa se é possível digitar o NOME;', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId(DATA_TEST_BTN_PLAY)).toBeDisabled();
    const INPUT_NAME = writeName();
    expect(INPUT_NAME).toHaveValue(PLAYER_NAME);
  });

  test('Testa se é possível digitar o EMAIL;', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId(DATA_TEST_BTN_PLAY)).toBeDisabled();
    const INPUT_EMAIL = writeEmail();
    expect(INPUT_EMAIL).toHaveValue(PLAYER_EMAIL);
  });

  test('Testa se ao apertar o botão de play a rota muda;', async () => {
    global.fetch = jest.fn((param) => Promise.resolve({
      json: () => param === `https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`
      ? Promise.resolve(questionsResponse) : Promise.resolve(tokenResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const { INPUT_NAME } = loginSuccess();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });

  test('Testa se existe um botão de configurações.', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(DATA_TEST_BTN_SETTINGS)).toBeInTheDocument();
  });
});