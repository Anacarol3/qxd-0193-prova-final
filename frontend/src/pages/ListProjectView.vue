<template>
  <div class="user-projects-container">
    <div class="header">
      <h2>Projetos de {{ user.name }}</h2>
      <RouterLink to="/projects/add">
        <button class="btn">Novo projeto</button></RouterLink
      >
    </div>
    <ul v-if="!error">
      <li v-for="project in projects" :key="project.id">
        {{ project.name }} - {{ project.progress }}% concluído
        <button class="btn btn-danger">Remover</button>
      </li>
    </ul>
    <div v-else>
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getProjects } from "../services/projectService";
import type { Project, User } from "../types";

const projects = ref<Project[]>([]);
const user = ref<User>({} as User);
const error = ref<string | null>(null);

async function loadUserProjects() {
  const projectsResult = await getProjects();
  if (projectsResult instanceof Error) {
    error.value = "Error ao recuperar os projetos";
  } else {
    projects.value = projectsResult;
  }
}

onMounted(loadUserProjects);
</script>

<style scoped>
.user-projects-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  min-width: 30vw;
}

.actions {
  display: flex;
}

.btn {
  margin-right: 10px;
  color: white;
  background-color: blue;
}

.btn-danger {
  color: white;
  background-color: red;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.modal h3 {
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-actions .btn {
  margin-left: 10px;
}
</style>
