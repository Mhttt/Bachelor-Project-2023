<script lang="ts">
  import { register } from "../../api/register";
  import "../css/register.css";
  import { form, field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import { email, min, matchField } from "svelte-forms/validators";

  const usernameField = field("username", "", [required()]);
  const emailField = field("email", "", [email()]);
  const passwordField = field("password", "", [required()]);
  const passwordRepeatField = field("password_repeat", "", [
    required(),
    min(8),
    matchField(passwordField),
  ]);
  
  const registerForm = form(
    usernameField,
    emailField,
    passwordField,
    passwordRepeatField
  );

  function hasError(
    type: "username" | "password" | "password_repeat",
    value: string,
    repeat?: string
  ): boolean {
    if (!value.length) {
      return false;
    }

    if (type === "username") {
      if (value.length < 5) {
        return true;
      }
    }

    if (type === "password") {
      if (value.length < 8) {
        return true;
      }
    }

    if (type === "password_repeat") {
      if (value !== repeat) {
        return true;
      }
    }

    return false;
  }

  function hasErrorInUsername(): boolean {
    return hasError("username", $usernameField.value);
  }

  function hasErrorInPassword(): boolean {
    return hasError("password", $passwordField.value);
  }

  function hasErrorInRepeatedPassword(): boolean {
    return hasError(
      "password_repeat",
      $passwordField.value,
      $passwordRepeatField.value
    );
  }

  async function onSubmit() {
    const form = {
      username: $usernameField.value,
      email: $emailField.value,
      password: $passwordField.value,
    };

    if (
      hasErrorInPassword() ||
      hasErrorInUsername() ||
      hasErrorInRepeatedPassword() ||
      $registerForm.hasError("email.not_an_email")
    ) {
      return alert("Invalid form! Please try again");
    }

    const response = await register(form);
    console.log(response);
    if (response.status_code === 400) {
      return alert(`ERROR: ${response.detail}`);
    }

    return alert("You have successfully registered your account!");
  }
</script>

<div class="container">
  <h2>REGISTER</h2>
  <p>Register to leave reviews and comments</p>
  <input
    bind:value={$usernameField.value}
    type="text"
    class="form-field"
    placeholder="Your name"
  />
  {#if $registerForm.hasError("username.required") || hasError("username", $usernameField.value)}
    <div class="error">
      Username is required and should be at least 5 characters
    </div>
  {/if}
  <input
    bind:value={$emailField.value}
    type="text"
    class="form-field"
    placeholder="Your email"
  />
  {#if $registerForm.hasError("email.not_an_email")}
    <div class="error">Email is not valid!</div>
  {/if}
  <input
    bind:value={$passwordField.value}
    type="text"
    class="form-field"
    placeholder="Your password"
  />
  {#if $registerForm.hasError("password.required") || hasError("password", $passwordField.value)}
    <div class="error">
      Password is required and should be at least 8 characters!
    </div>
  {/if}
  <input
    bind:value={$passwordRepeatField.value}
    type="text"
    class="form-field"
    placeholder="Repeat password"
  />
  {#if hasError("password_repeat", $passwordField.value, $passwordRepeatField.value)}
    <div class="error">Passwords do not match!</div>
  {/if}
  <button on:click={() => onSubmit()} class="login-button">Login</button>
</div>

<style>
  input {
    outline: none;
  }

  :global(.invalid),
  :global(.error) {
    border: 1px solid red;
  }

  :global(.valid),
  :global(.foo) {
    border: 1px solid green;
  }

  :global(.dirty) {
    border: 1px dashed black;
  }
</style>
