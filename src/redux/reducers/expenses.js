/* import {
  EXPENSE_PAYLOAD,
} from '../../constants/index';

const INITIAL_STATE = {
  expenses: [],
};

const expenses = (state = INITIAL_STATE, { type, payload }) => {
  console.log(payload);
  let payloadValues;
  if (payload) {
    payloadValues = Object.values(payload);
  }

  switch (type) {
  case EXPENSE_PAYLOAD:
    return {
      ...state,
      expenses: [...state.expenses, { ...payload }],
    };
  default:
    return state;
  }
};

export default expenses;
 */
