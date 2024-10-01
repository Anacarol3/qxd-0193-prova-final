<template>
  <div class="add-project-container">
    <h2>Adicionar Projeto</h2>
    <form @submit.prevent="addProject">
      <div>
        <label for="name">Nome do Projeto</label>
        <input id="name" type="text" required />
      </div>

      <div>
        <label for="description">Descrição</label>
        <textarea id="description" required></textarea>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>

      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createProject } from "../services/projectService";

const name = ref("");
const description = ref("");
const error = ref<string | null>(null);
const isSubmitting = ref(false);
const router = useRouter();

async function addProject() {
  error.value = null;
  isSubmitting.value = true;

  console.log("addProject");

  try {
    await createProject({
      name: name.value,
      description: description.value,
    });
    router.push("/projects");
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      error.value = err.response.data.errors[0];
    } else {
      error.value = "Erro ao criar o projeto";
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.add-project-container {
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
