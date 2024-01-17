// @ts-nocheck //<--- From solid docs
import { createStore } from 'solid-js/store';
import { useForm } from './Validation';
import { Component } from 'solid-js';
import './RegisterPage.css';

const ErrorMessage = (props) => <span class="error-message">{props.error}</span>;

const validEmail = async ({ value }) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return `${value} is already being used`;
  }
};

const RegisterPage: Component = () => {
  const { validate, formSubmit, errors } = useForm({
    errorClass: 'error-input',
  });
  const [fields, setFields] = createStore();

  const fn = (form) => {
    const formData = new FormData(form);

    if (fields.password !== fields.repeatpassword) {
      alert('Passwords do not match');
      return;
    }

    fetch('http://143.42.222.62:8000/register', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_repeat: formData.get('repeatpassword'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        alert('User has been successfully created!');
        setFields({});
        form.reset();
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  };

  return (
    <form use:formSubmit={fn}>
      <div class="register-container">
        <h2>REGISTER</h2>
        <p>Register to leave reviews and comments</p>
        <input
          type="text"
          name="name"
          class="form-field"
          placeholder="Your name"
          onInput={(e) => setFields('name', e.target.value)}
          use:validate
          required
        />
        {errors.name && <ErrorMessage error={errors.name} />}
        <input
          type="email"
          name="email"
          class="form-field"
          placeholder="Your email"
          onInput={(e) => setFields('email', e.target.value)}
          use:validate={[validEmail]}
          required
        />
        {errors.email && <ErrorMessage error={errors.email} />}
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
        <input
          type="password"
          name="repeatpassword"
          class="form-field"
          placeholder="Repeat password"
          onInput={(e) => setFields('repeatpassword', e.target.value)}
          use:validate
          required
        />
        {errors.repeatpassword && <ErrorMessage error={errors.repeatpassword} />}
        <button class="login-button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
