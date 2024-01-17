<script lang="ts">
    import { login } from "../../api/login";
    import "../css/register.css";
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { min } from "svelte-forms/validators";
    import { activeUser } from "../../stores/ActiveUserStore";
    import type LoginForm from "../../types/LoginFormInterface";

    const username = field("username", "", [required(), min(5)]);
    const password = field("password", "", [required(), min(5)]);

    const loginForm = form(username, password);

    async function onSubmit() {
        await Promise.all([username.validate(), password.validate()]);

        if ($loginForm.errors.length) {
            return alert("Invalid form! Please try again");
        }

        const response = await login(loginForm.summary() as LoginForm);

        if (response.status_code === 400) {
            return alert(`ERROR: ${response.detail}`);
        }

        activeUser.set({
            username: $username.value,
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
        });

        return alert("You have successfully logged in");
    }
</script>

<div class="container">
    <h2>Login</h2>
    <p>Login to leave reviews and comments</p>
    <input
        bind:value={$username.value}
        type="text"
        class="form-field"
        placeholder="Your name"
    />

    {#if $loginForm.hasError("username.required")}
        <div class="error">Username is required</div>
    {/if}

    {#if $loginForm.hasError("username.min")}
        <div class="error">Username must be at least 5 characters</div>
    {/if}

    <input
        bind:value={$password.value}
        type="text"
        class="form-field"
        placeholder="Your password"
    />

    {#if $loginForm.hasError("password.required")}
        <div class="error">Password is required</div>
    {/if}

    {#if $loginForm.hasError("password.required")}
        <div class="error">Password must be at least 5 characters</div>
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
