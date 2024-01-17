<script lang="ts">
	import Cookies from 'js-cookie';
	import Footer from '../../components/Footer.svelte';
	import Header from '../../components/Header.svelte';
  import { loggedInUser } from '../../stores';

  let userLoggedIn: string;
  loggedInUser.subscribe(userName => {
    userLoggedIn = userName
  })

	const apiURL = 'http://143.42.222.62:8000';

	let repeatPassword = '';
	let submitted = false;
	let user = {
		username: '',
		email: '',
		password: ''
	};

  function logOut() {
    loggedInUser.set('Register')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    return alert('You successfully logged out!')
  }

	async function handleSubmit() {
		if (user.username && user.email && user.password && repeatPassword) {
			if (user.password === repeatPassword) {
				// Handle submit
				const response = await fetch(`${apiURL}/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(user)
				});
				const json = await response.json();
				if (!json.status_code && !json.detail) {
					// Successfull
					return alert('Successfully registered');
				}
				return alert(`Error registrering: ${json.detail}`);
			}
			return alert('Passwords does not match');
		}
		return alert('You must input all fields!');
	}
</script>

<Header />
<div class="container">
	<h2>REGISTER</h2>
	<p>Register to leave reviews and comments</p>
	<form class:submitted on:submit|preventDefault={handleSubmit}>
		<input
			type="text"
			bind:value={user.username}
			class="form-field"
			placeholder="Your name"
			required
		/>
		<input
			type="email"
			bind:value={user.email}
			class="form-field"
			placeholder="Your email"
			required
		/>
		<input
			type="password"
			bind:value={user.password}
			class="form-field"
			placeholder="Your password"
			required
		/>
		<input
			type="password"
			bind:value={repeatPassword}
			class="form-field"
			placeholder="Repeat password"
			required
		/>
		<button on:click={() => (submitted = true)} class="login-button">Register</button>
    {#if userLoggedIn !== 'Register'}
    <button on:click={logOut} class="login-button">Log Out</button>
    {:else}
    <a href="/login" class="login-button">Log in</a>
    {/if}

	</form>
</div>
<Footer />

<style>
	.submitted input:invalid {
		border: 1px solid #c00;
	}

	.submitted input:focus:invalid {
		outline: 1px solid #c00;
	}

	.container {
		margin-top: 100px;
		margin-bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	form {
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
