// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_EMAIL } from '../../constants/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case USER_EMAIL:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default user;
