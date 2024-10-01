<template>
  <div class="register-container">
    <h2>Registrar-se</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Nome</label>
        <input v-model="name" id="name" type="text" required />
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email" required />
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input v-model="password" id="password" type="password" required />
      </div>

      <div class="form-group">
        <label for="role">Papel</label>
        <input v-model="role" id="role" type="text" required />
      </div>

      <button type="submit">Registrar</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/authService";

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const error = ref<string | null>(null);

const router = useRouter();

async function registerUser() {
  const result = await register({
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value,
  });
  if (result instanceof Error) {
    error.value = "Erro ao registrar o usuário.";
  } else {
    router.push("/login");
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  min-width: 30vw;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  width: 100%;
}

input:focus {
  border-color: #42b883;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #36a169;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
