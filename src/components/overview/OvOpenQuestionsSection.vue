<script setup lang="ts">
import OvSection from './OvSection.vue'
import { OPEN_QUESTIONS } from '../../constants/overview'
</script>

<template>
  <OvSection title="Questions ouvertes">
    <div class="card">
      <ul class="checklist">
        <li v-for="(q, i) in OPEN_QUESTIONS" :key="i">
          <span class="box"></span>
          <span>{{ q }}</span>
        </li>
      </ul>
    </div>
  </OvSection>
</template>
