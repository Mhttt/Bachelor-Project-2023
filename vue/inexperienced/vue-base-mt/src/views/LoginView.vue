<template>
  <div>
    <ValidationForm class="container" @submit="login">
      <h2>LOGIN</h2>
      <p>Login to leave reviews and comments</p>
      <Field
        type="username"
        name="username"
        aria-placeholder="Your uesrname"
        aria-required="true"
        placeholder="Your username"
        class="form-field"
        :rules="isRequired"
      />
      <ErrorMessage name="email" class="errorMessage" />
      <Field
        type="password"
        name="password"
        aria-placeholder="Your password"
        aria-required="true"
        class="form-field"
        placeholder="Your password"
        :rules="isRequired"
      />
      <ErrorMessage name="password" class="errorMessage" />
      <button class="login-button">Login</button>
    </ValidationForm>
  </div>
</template>

<script lang="ts">
import { Form as ValidationForm, Field, ErrorMessage, validate } from 'vee-validate'
import jwt_decode from 'jwt-decode'
import { store } from '../views/RegisterView.vue'

export default {
  components: {
    ValidationForm,
    Field,
    ErrorMessage
  },
  data() {
    return {
      store
    }
  },
  methods: {
    isRequired(value: string) {
      if (value && value.trim()) {
        return true
      }
      return 'This is required'
    },
    async login(values: { username: string; password: string }) {
      if (values.username && values.password) {
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: values.username, password: values.password })
        }

        const r = await fetch('http://143.42.222.62:8000/login', requestOptions).then((data) => {
          return data.json()
        })

        if (r.access_token) {
          const decodedToken = jwt_decode<{ sub: string }>(r.access_token)
          // save in cookies
          localStorage.setItem('access_token', r.access_token)
          localStorage.setItem('refresh_token', r.refresh_token)
          this.store.loggedIn = true
          this.store.username = decodedToken.sub
        }
      }
      return
    }
  }
}
</script>

<style scoped>
input:valid {
  border-color: green;
}

.errorMessage {
  color: red;
  font-size: 12px;
}

input:invalid {
  border-color: red;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 40px;
  margin-bottom: 40px;
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

button:hover {
  cursor: pointer;
}
</style>
