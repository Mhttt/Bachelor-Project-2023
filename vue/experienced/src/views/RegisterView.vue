
<script lang="ts">
import { register } from '@/api/register';
import { Form, Field, ErrorMessage, useForm, type SubmissionHandler } from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    VForm: Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const schema = yup.object({
      username: yup.string().min(6, "User name must be at least 6 characters").required("You need to enter a username"),
      email: yup.string().email("Invalid email address").required("You need to enter an email"),
      password: yup.string().min(6).required("You need to enter a password"),
      repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    })

    const { handleSubmit } = useForm({
      validationSchema: schema,
    })

    const onSubmit: any = handleSubmit(async (values) => {
      const response = await register({
        username: values.username,
        email: values.email,
        password: values.password,
      })

      const data = await response.json()

      if (data.detail) {
        alert(`Error: ${data.detail}`)
        return
      }

      if (response.ok) {
        alert("You have successfully registered your account, congratulations!")
        return
      }

      alert("Something went wrong, please try again later")

    })

    return {
      onSubmit,
      schema,
    }
  }
}

</script>

<template>
  <main>
    <div class="container">
      <h1>REGISTER</h1>
      <p>Register to leave reviews and comments</p>
      <VForm class="container" @submit="onSubmit" :validation-schema="schema">
        <Field name="username" class="form-field" type="username" placeholder="Your name" />
        <ErrorMessage class="error" name="username" />

        <Field name="email" class="form-field" type="email" placeholder="Your email" />
        <ErrorMessage class="error" name="email" />

        <Field name="password" class="form-field" type="password" placeholder="Your password" />
        <ErrorMessage class="error" name="password" />

        <Field name="repeatPassword" class="form-field" type="password" placeholder="Repeat Password" />
        <ErrorMessage class="error" name="repeatPassword" />

        <button class="login-button">Login</button>
      </VForm>
    </div>
  </main>
</template>

<style scoped>
h1 {
  margin-bottom: 8px;
  font-weight: bold;
}

.error {
  color: red
}


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
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