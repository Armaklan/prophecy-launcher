<script setup lang="ts">

import HelloWorld from './components/HelloWorld.vue'
import PersonnageList from './components/PersonnageList.vue';
import PersonnageFeuille from './components/PersonnageFeuille.vue';
import { Personnage, personnages } from './models/perso';
import { reactive } from 'vue'
import { ref } from 'vue'
import LanceurDes from './components/LanceurDes.vue';
import InitiativeBar from './components/InitiativeBar.vue'
import LanceurDesMJ from './components/LanceurDesMJ.vue';

interface AppState {
  selectedPersonnage: Personnage;
  isMj: boolean;
}

const state = ref<AppState>({
  selectedPersonnage: null,
  isMj: false
});

const selectPersonnage = (personnage: Personnage) => {
  state.value.selectedPersonnage = personnage;
}

function selectMj() {
  state.value.isMj = true;
}

</script>

<template>
  <PersonnageList v-if="!state.selectedPersonnage && !state.isMj" @select="selectPersonnage($event)" @selectMj="selectMj()"/>
  <div class="container" v-if="state.selectedPersonnage">
    <div class="main">
      <div class="feuille">
        <PersonnageFeuille :personnage="state.selectedPersonnage"></PersonnageFeuille>
      </div>
      <div class="lanceur">
        <LanceurDes :personnage="state.selectedPersonnage"></LanceurDes>
      </div>
    </div>
    <div class="initiativeBar">
      <InitiativeBar :personnage="state.selectedPersonnage"></InitiativeBar>
    </div>
  </div>

  <div class="container" v-if="state.isMj">
    <div class="main">
      <LanceurDesMJ></LanceurDesMJ>
    </div>
    <div class="initiativeBar">
      <InitiativeBar></InitiativeBar>
    </div>
  </div>


</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100vh;
  overflow: hidden;
}

.feuille {
  flex: 1 1 100%;
}

.lanceur {
  min-width: 28em;
  box-sizing: border-box;
  padding: 0 1em;
}

.container {
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.initiativeBar {
  min-height: 12em;
}

.main {
  max-height: calc(100vh - 6em);
  height: calc(100vh - 6em);
  overflow: hidden;
  display: flex;
}

</style>
