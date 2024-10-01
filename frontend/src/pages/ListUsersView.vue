<template>
  <div class="users-container">
    <div class="header">
      <h2>Lista de Usuários</h2>

      <router-link to="/users/add">
        <button class="btn">Adicionar Usuário</button>
      </router-link>

      <button class="btn" @click="logout">Sair</button>
    </div>
    <table v-if="!error">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Username</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td class="actions">
            <router-link :to="`/users/${user.id}`">
              <button class="btn">Editar</button>
            </router-link>

            <button @click="openModal(user)" class="btn btn-danger">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>{{ error }}</p>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza de que deseja remover o usuário {{ selectedUser?.name }}?
        </p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="btn btn-danger">
            Confirmar
          </button>
          <button @click="closeModal" class="btn">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUsers, removeUser } from "../services/userService";
import { User } from "../types";

const users = ref<User[]>([]);
const error = ref<string | null>(null);
const showModal = ref(false);
const selectedUser = ref<User | null>(null);

async function deleteUser(id: number) {
  const result = await removeUser(id);
  if (result instanceof Error) {
    error.value = "Erro ao remover o usuário.";
  } else {
    loadUsers();
    closeModal();
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  location.reload();
}

function openModal(user: User) {
  selectedUser.value = user;
  showModal.value = true;
}

function closeModal() {
  selectedUser.value = null;
  showModal.value = false;
}

async function confirmDelete() {
  if (selectedUser.value) {
    await deleteUser(selectedUser.value.id);
  }
}

async function loadUsers() {
  const result = await getUsers();
  if (result instanceof Error) {
    error.value = "Erro ao carregar os usuários.";
  } else {
    users.value = result;
  }
}

onMounted(loadUsers);
</script>

<style scoped>
.users-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  min-width: 30vw;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
}

th {
  background-color: #f0f0f0;
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
