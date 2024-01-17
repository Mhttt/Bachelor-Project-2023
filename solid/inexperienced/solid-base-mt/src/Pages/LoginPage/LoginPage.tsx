// @ts-nocheck //<--- From solid docs
import { createStore } from 'solid-js/store';
import { useForm } from './../RegisterPage/Validation';
import { Component } from 'solid-js';
import './LoginPage.css';

const ErrorMessage = (props) => <span class="error-message">{props.error}</span>;

const LoginPage: Component = () => {
  const { validate, formSubmit, errors } = useForm({
    errorClass: 'error-input',
  });
  const [fields, setFields] = createStore();

  const fn = async (form) => {
    const formData = new FormData(form);

    const r = await fetch('http://143.42.222.62:8000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await r.json();

    if (json.access_token) {
      alert('Successfully logged in!');
      localStorage.setItem('access_token', json.access_token);
      localStorage.setItem('refresh_token', json.refresh_token);
      return (window.location.href = '/');
    } else {
      alert(`Error logging you in: ${json.detail}`);
    }
  };

  return (
    <form use:formSubmit={fn}>
      <div class="register-container">
        <h2>LOGIN</h2>
        <p>Login to leave reviews and comments</p>
        <input
          type="text"
          name="username"
          class="form-field"
          placeholder="Your username"
          onInput={(e) => setFields('username', e.target.value)}
          use:validate
          required
        />
        {errors.username && <ErrorMessage error={errors.username} />}
        <input
          type="password"
          name="password"
          class="form-field"
          placeholder="Your password"
          minlength="8"
          onInput={(e) => setFields('password', e.target.value)}
          use:validate
          required
        />
        {errors.password && <ErrorMessage error={errors.password} />}
        <button class="login-button" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
