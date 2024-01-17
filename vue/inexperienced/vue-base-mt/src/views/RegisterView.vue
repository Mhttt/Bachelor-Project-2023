<script lang="ts">
import { reactive } from 'vue'
import { Form as ValidationForm, Field, ErrorMessage } from 'vee-validate'

export const store = reactive({
  loggedIn: false,
  username: ''
})

export default {
  components: {
    ValidationForm,
    Field,
    ErrorMessage
  },
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      store
    }
  },
  methods: {
    register() {
      if (this.password !== this.repeatPassword) {
        alert('Passwords do not match')
        return
      }

      if (this.store.username === '') {
        alert('Username is required')
        return
      }

      if (this.email === '') {
        alert('Email is required')
        return
      }

      fetch('http://143.42.222.62:8000/register', {
        method: 'POST',
        body: JSON.stringify({
          username: this.store.username,
          email: this.email,
          password: this.password,
          password_repeat: this.repeatPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          alert('User has been successfully created!')
          this.store.loggedIn = true
        })
        .catch((error) => {
          alert(`Error: ${error}`)
        })
    },
    validateEmail(value: string) {
      // if the field is empty
      if (!value) {
        return 'Email is required'
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (!regex.test(value)) {
        return 'This field must be a valid email'
      }
      // All is good
      return true
    },
    validateUsername(value: string) {
      if (!value) {
        return 'Username is required'
      }
      return true
    },
    validatePassword(value: string) {
      if (!value) {
        return 'Password is required'
      }
      return true
    },
    validateRepeatPassword(value: string) {
      if (!value) {
        return 'You must repeat the password'
      }
      return true
    },
    setUser() {
      this.store.loggedIn = true
    }
  }
}
</script>

<template>
  <ValidationForm class="container" @submit="register">
    <h2>REGISTER</h2>
    <p>Register to leave reviews and comments</p>
    <Field
      name="name"
      type="text"
      class="form-field"
      placeholder="Your name"
      v-model="store.username"
      :rules="validateUsername"
    />
    <ErrorMessage name="name" class="errorMessage" />
    <Field
      name="email"
      type="text"
      class="form-field"
      placeholder="Your email"
      v-model="email"
      :rules="validateEmail"
    />
    <ErrorMessage name="email" class="errorMessage" />
    <Field
      name="password"
      type="password"
      class="form-field"
      placeholder="Your password"
      v-model="password"
      :rules="validatePassword"
    />
    <ErrorMessage name="password" class="errorMessage" />
    <Field
      name="repeatPassword"
      type="password"
      class="form-field"
      placeholder="Repeat password"
      v-model="repeatPassword"
      :rules="validateRepeatPassword"
    />
    <ErrorMessage name="repeatPassword" class="errorMessage" />
    <button class="login-button">Register</button>
    <RouterLink to="/login"><button class="login-button">Login</button> </RouterLink>
  </ValidationForm>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 72px;
  margin-bottom: 400px;
}

.errorMessage {
  color: red;
  font-size: 12px;
}

.container h2 {
  font-size: 40px;
}

.form-field {
  background-color: rgba(231, 228, 228, 0.763);
  margin-top: 15px;
  border-radius: 5px;
  border-style: none;
  width: 650px;
  padding: 10px 0px 10px 20px;
}

.login-button {
  margin-top: 30px;
  color: white;
  background-color: black;
  border-radius: 5px;
  border-style: none;
  padding: 10px 100px 10px 100px;
}
</style>
