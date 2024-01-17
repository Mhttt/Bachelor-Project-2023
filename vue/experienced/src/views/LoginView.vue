<script lang="ts">

import { computed, ref } from 'vue';
import { login } from '../api/login';
import jwt_decode from "jwt-decode";
import { useRouter } from 'vue-router';
import store from '../api/store'

export default {
    setup() {
        const router = useRouter()

        const username = ref('');
        const password = ref('');
        const loggedIn = computed(() => store.state.loggedIn)

        const loginSubmit = async () => {
            const response = await login({
                "username": username.value,
                "password": password.value
            })

            const body = await response.json()

            if (response.status === 401) {
                return alert(body.detail)
            }

            const refresh_token: string = body.refresh_token
            localStorage.setItem('refresh_token', 'Bearer ' + refresh_token)
            localStorage.setItem('access_token', 'Bearer ' + body.access_token)

            const decoded_name = jwt_decode(refresh_token).sub
            store.commit('updateLabel', decoded_name);
            store.commit('updateLoginState', true);
            router.push("/")


            return alert(`You have successfully logged in! as ${decoded_name}`)
        }
        return { loginSubmit, username, password, loggedIn}
    }
}
</script>

<template>
    <main>
        <div class="container">
            <h2>LOGIN</h2>
            <p>Login to leave reviews and comments</p>
            <input v-model="username" type="text" class="form-field" placeholder="Your name" />
            <input v-model="password" type="password" class="form-field" placeholder="Your password" />
            <button @click="loginSubmit" class="login-button">Login</button>
        </div>
    </main>
</template>


<style>
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




