// Coloque aqui suas actions
import USER_EMAIL from '../../constants/index';

const userLoginAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export default userLoginAction;
