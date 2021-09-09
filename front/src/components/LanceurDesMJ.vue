<script setup lang="ts">
import { ref } from 'vue'
import { attributs, caracteristiques, Personnage, personnages, searchAttributValue, searchCompetenceValue } from '../models/perso';

const socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/api/');

const attribut = ref<number>(0);
const competence = ref<number>(0);
const tendance = ref<boolean>(false);
const image = ref<string>('conteur.jpg');
const diceResult = ref([]);
const baseDommage = ref(2);
const nbDesDommage = ref(1);
const nbDesInitiatives = ref(3);
const activeTab = ref('test');

const name = 'Conteur';
const imageConteur = 'conteur.jpg';

const avatars = [{
  name: 'Kalimshaar',
  value: 'conteur.jpg'
}, {
  name: 'Dragon1',
  value: 'dragon1.jpg'
}, {
  name: 'Dragon2',
  value: 'dragon2.jpg'
}]

function onSubmit() {  
  fetch('api/dicer', { method: 'POST', body: JSON.stringify({
    personnage: name,
    image: imageConteur,
    type: 'Test', 
    attribut: 'Standard',
    competence: '',
    tendance: tendance.value,
    attributValue: attribut.value,
    competenceValue: competence.value
  })});
}

function onSubmitDommage() {
  fetch('api/dicer', { method: 'POST', body: JSON.stringify({
    personnage: name,
    image: imageConteur,
    type: 'Dommage', 
    baseDommage: baseDommage.value,
    nbDesDommage: nbDesDommage.value
  })});
}

function onSubmitInitiative() {
  const imageInitiative = image.value;
  fetch('api/initiative', { method: 'POST', body: JSON.stringify({
    personnage: name,
    image: imageInitiative,
    type: 'Initiative', 
    nbDes: nbDesInitiatives.value
  })});
}

socket.onopen = function(event) {
  console.log("WS ouvert");

  this.onmessage = function(event: MessageEvent<string>) {
    diceResult.value = [ JSON.parse(event.data), ...diceResult.value];
  }
}

</script>

<template>
  <div class="main-container">
    <h2>Lanceur de dés</h2>

    <div class="interior-container">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Tests standard" name="test">
          <el-form ref="form">
            <el-form-item label="Attributs">
              <el-input-number
                v-model="attribut"
                :min="0"
                :max="20"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="Competences">
              <el-input-number
                v-model="competence"
                :min="0"
                :max="20"
              ></el-input-number>
            </el-form-item>
            
            <el-form-item>
              <el-switch
                v-model="tendance"
                active-text="Avec tendance"
                inactive-text="Sans tendance"
              >
              </el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit()">Lancer les dés</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Tests de Dommages" name="dommage">
          <el-form ref="form">
            <el-form-item label="Base de dommages">
              <el-input-number
                v-model="baseDommage"
                :min="0"
                :max="20"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="Nombres de dés">
              <el-input-number
                v-model="nbDesDommage"
                :min="1"
                :max="5"
              ></el-input-number>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="onSubmitDommage()">Lancer les dommages</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Initiative" name="init">
          <el-form ref="form">
            <el-select v-model="image" filterable placeholder="Images">
              <el-option
                v-for="avatar in avatars"
                :key="avatar.value"
                :label="avatar.name"
                :value="avatar.value"
              >
              </el-option>
            </el-select>
            <el-form-item label="Nombres de dés">
              <el-input-number
                v-model="nbDesInitiatives"
                :min="1"
                :max="5"
              ></el-input-number>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="onSubmitInitiative()">Lancer l'initiative</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="resultats">
        <div class="resultat-de" v-for="result in diceResult">
          <div class="identite">
            <el-avatar :size="80" :src="result.image"></el-avatar>
            <span class="name">{{ result.personnage }}</span>
          </div>
          <div class="result" v-if="result.type === 'Test'">
            <b>{{ result.attribut }} - {{ result.competence}}</b>
            <p v-for="de in result.resultats">
              {{ de.type }} {{ de.dice }} ( {{ de.finalResult }})
            </p>
          </div>
          <div class="result" v-if="result.type === 'Dommage'">
            <b>Test de dommages</b>
            <p v-for="r in result.resultats">
              {{ r.dices.join(', ') }} <span>({{ r.result }})</span>
            </p>
          </div>
          <div class="result" v-if="result.type === 'Initiative'">
            <b>Test d'initiatives</b>
            <p v-for="r in result.resultats">
              {{ r.dices.join(', ') }}
            </p>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-container {
  display: flex;
  flex-direction: column;
  max-height: calc( 100vh - 10px);
  justify-content: center;
}

.interior-container {
  display: flex;
  height: calc( 100vh - 80px);
  max-height: calc( 100vh - 280px);
  padding: 0 4em;
}

.resultats {
  flex: 1 1 100%;
  overflow: auto;
  margin-left: 6em;
}

.resultat-de {
  display: flex;
  border: 1px #ebeef5 solid;
  padding: 1em;
  box-sizing: border-box;
  margin-bottom: 1em;
}

.resultat-de .identite {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.resultat-de .result {
  flex: 1 1 auto;
}

</style>
