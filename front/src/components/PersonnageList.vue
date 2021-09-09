<script setup lang="ts">
import { ref } from 'vue'
import { Personnage, personnages } from '../models/perso'

const emit = defineEmits<{
  (e: 'select', personnage: Personnage): void
  (e: 'selectMj'): void
}>();

function selectPersonnage(personnage: Personnage) {
  emit('select', personnage);
}

function selectMj() {
  emit('selectMj');
}

const count = ref(0)
</script>

<template>
  <h1>Choisissez votre personnages</h1>

  <div id="avatarContainer">
    <div class="avatar" v-for="personnage in personnages" @click="selectPersonnage(personnage)">
      <el-avatar :size="150" :src="personnage.image"></el-avatar>
      <span class="name">{{ personnage.name }}</span>
    </div>
    <div class="avatar" @click="selectMj()">
      <el-avatar :size="150" src="/public/conteur.jpg"></el-avatar>
      <span class="name">Conteur</span>
    </div>
  </div>
  
</template>

<style scoped>

#avatarContainer {
  display: flex;
  justify-content: center;
}

.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  border: 1px solid transparent;
}

.avatar:hover {
  border: 1px solid rgba(0,0,0, 0.2);
  cursor: pointer;
}

.name {
  margin-top: 1em;
  color: #9f9f9f;
}

.avatar + .avatar {
  margin-left: 1em;
}
</style>
