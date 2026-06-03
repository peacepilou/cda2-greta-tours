<script setup lang="ts">
import OvHero from './OvHero.vue'
import OvKpiRow from './OvKpiRow.vue'
import OvContextSection from './OvContextSection.vue'
import OvTriptycheSection from './OvTriptycheSection.vue'
import OvTimeBarsSection from './OvTimeBarsSection.vue'
import OvBcSection from './OvBcSection.vue'
import OvAlternanceSection from './OvAlternanceSection.vue'
import OvProjectSection from './OvProjectSection.vue'
import OvOpenQuestionsSection from './OvOpenQuestionsSection.vue'
</script>

<template>
  <div class="view view-enter">
    <OvHero />
    <OvKpiRow />
    <OvContextSection />
    <OvTriptycheSection />
    <OvTimeBarsSection />
    <OvBcSection />
    <OvAlternanceSection />
    <OvProjectSection />
    <OvOpenQuestionsSection />
  </div>
</template>
