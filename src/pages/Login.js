import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLoginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoginButtonDisabled: true,
      userEmail: '',
      userPassword: '',
    };
  }

  onInputChange = ({ target }) => {
    const {
      name,
      value,
    } = target;

    this.setState({ [name]: value }, () => this.enableLoginButton());
  }

  isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

  enableLoginButton = () => {
    const {
      userEmail,
      userPassword,
    } = this.state;

    const MIN_CHARACTERS = 6;

    this.setState({ isLoginButtonDisabled: true });

    if (
      this.isValidEmail(userEmail)
      && userPassword.length >= MIN_CHARACTERS
    ) {
      this.setState({ isLoginButtonDisabled: false });
    }
  }

  onClickUserLogin = () => {
    const { userEmail } = this.state;
    const {
      history,
      userLoginDispatch,
    } = this.props;

    userLoginDispatch((userEmail));
    history.push('/carteira');
  }

  render() {
    const {
      isLoginButtonDisabled,
    } = this.state;

    return (
      <div>
        <input
          name="userEmail"
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.onInputChange }
        />
        <input
          name="userPassword"
          data-testid="password-input"
          placeholder="Password"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          disabled={ isLoginButtonDisabled }
          onClick={ this.onClickUserLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoginDispatch: (payload) => dispatch(userLoginAction(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLoginDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
