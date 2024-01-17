<script lang="ts">
	import Footer from '../../components/Footer.svelte';
	import Header from '../../components/Header.svelte';
  import Cookies from 'js-cookie';
  import { loggedInUser } from '../../stores'
  import jwt_decode, {type JwtPayload }  from "jwt-decode";

	const apiURL = 'http://143.42.222.62:8000';

	let submitted = false;
	let user = {
		username: '',
		password: ''
	};

  async function handleLogin() {
    if(user.username && user.password) {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const json = await response.json();
      if(!json.detail) {
        //Success
        console.log(json)
        Cookies.set('access_token', json.access_token)
        Cookies.set('refresh', json.refresh_token)
        loggedInUser.set(jwt_decode<JwtPayload>(json.access_token).sub ?? 'Register')
        return alert('Successfully logged in');
      }
    }
  }
</script>

<Header />
<div class="container">
            <h2>Login</h2>
            <form class:submitted on:submit|preventDefault={handleLogin}>
            <input type="text" bind:value={user.username} class="form-field" placeholder="Your username" required/>
            <input type="password" bind:value={user.password} class="form-field" placeholder="Your password" required/>
            <button on:click={() => (submitted = true)} class="login-button">Login</button>
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
