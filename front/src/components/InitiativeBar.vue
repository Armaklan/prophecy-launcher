<script setup lang="ts">
import { ref } from 'vue'
import { AttributKey, attributs, AttributValue, CaracteristiqueKey, caracteristiques, CompetenceKey, competences, Personnage, personnages, searchAttributValue, searchCompetenceValue } from '../models/perso';

const socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/api');

const props = defineProps({
  personnage: Personnage
});

const initiativesState = ref([]);
const initiativesRange = ref([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

let initiatives = [];

socket.onopen = function(event) {
  console.log("WS ouvert");

  this.onmessage = function(event: MessageEvent<string>) {
    const data = JSON.parse(event.data);
    if(data.type === 'Initiative') {
      const image = data.image;
      initiatives = initiatives.filter(i => i.image !== image);

      console.log(data);

      data.resultats.flatMap(r => r.dices).filter(r => r >= 0).forEach(r => {
        initiatives.push({
          valeur: r,
          image
        })
      });

      initiativesState.value = initiatives;
    }
  }
}

function getInitiativeValues(rank: number) {
  return initiativesState.value.filter(i => i.valeur === rank).map(i => i.image)
}


</script>

<template>
  <div class="main-container">
    <div v-for="v in initiativesRange">
      <h2>{{ v }}</h2>
      <div class="tokens">
        <el-avatar v-for="avatar in getInitiativeValues(v)" :size="40" :src="avatar"></el-avatar>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-container {
  display: flex;
  flex-direction: space-around
}

.main-container > div {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 10em;
}

.main-container > div + div {
  border-left: 1px solid #9f9f9f;
}

.tokens {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>
