<script setup lang="ts">
import { ref } from 'vue'
import { AttributKey, attributs, AttributValue, CaracteristiqueKey, caracteristiques, CompetenceKey, competences, Personnage, personnages, searchAttributValue, searchCompetenceValue } from '../models/perso';

const socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/api');

const attribut = ref<AttributKey>("Physique");
const competence = ref<CompetenceKey|CaracteristiqueKey>("Force");
const tendance = ref<boolean>(false);
const diceResult = ref([]);
const baseDommage = ref(2);
const nbDesDommage = ref(1);
const nbDesInitiatives = ref(3);
const activeTab = ref('test');

const props = defineProps({
  personnage: Personnage
});

function onSubmit() {
  const attributValue = searchAttributValue(props.personnage, attribut.value);
  const competenceValue = searchCompetenceValue(props.personnage, competence.value);
  
  fetch('/api/dicer', { method: 'POST', body: JSON.stringify({
    personnage: props.personnage?.name,
    image: props.personnage?.image,
    type: 'Test', 
    attribut: attribut.value,
    competence: competence.value,
    tendance: tendance.value,
    attributValue,
    competenceValue
  })});
}

function onSubmitDommage() {
  fetch('/api/dicer', { method: 'POST', body: JSON.stringify({
    personnage: props.personnage?.name,
    image: props.personnage?.image,
    type: 'Dommage', 
    baseDommage: baseDommage.value,
    nbDesDommage: nbDesDommage.value
  })});
}

function onSubmitInitiative() {
  fetch('/api/initiative', { method: 'POST', body: JSON.stringify({
    personnage: props.personnage?.name,
    image: props.personnage?.image,
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
    <h2>Resultats des tests</h2>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="Tests standard" name="test">
        <el-form ref="form">
          <el-form-item>
            <el-select v-model="attribut" filterable placeholder="Attributs">
              <el-option
                v-for="item in attributs"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="competence" filterable placeholder="Caractéristique ou compétences">
              <el-option-group label="Caractéristiques" key="attr">
                <el-option
                  v-for="item in caracteristiques"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-option-group>

              <el-option-group label="Compétences" key="comp">
                <el-option
                  v-for="item in competences"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-option-group>
            </el-select>
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
</template>

<style scoped>

.main-container {
  display: flex;
  flex-direction: column;
  max-height: calc( 100vh - 10px);
}

.resultats {
  flex: 1 1 100%;
  overflow: auto;
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
