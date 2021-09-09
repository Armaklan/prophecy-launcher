<script setup lang="ts">
import { ref } from 'vue'
import { Personnage, personnages } from '../models/perso'

const props = defineProps({
  personnage: Personnage
});


</script>

<template>
  <div class="container">
    <h1> {{ personnage.name }} </h1>
    <div class="avatar">
      <el-avatar :size="150" :src="personnage.image"></el-avatar>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-table :data="personnage?.caracteristiques" stripe border>
          <el-table-column prop="key" label="Caractéristique"></el-table-column>
          <el-table-column prop="value"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="personnage?.attributs" stripe border>
          <el-table-column prop="key" label="Attributs"></el-table-column>
          <el-table-column prop="value"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="competences">
      <el-col :span="12">
        <el-table :data="personnage?.competences" stripe border max-height="300">
          <el-table-column prop="key" label="Compétences"></el-table-column>
          <el-table-column prop="value"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
  
</template>

<style scoped>
.competences {
  margin-top: 2em;
}

.avatar {
  margin: 1em 0;
}

.container {
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
