<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import {useData} from './composable/use-data';
import cardList, {csvDataItem, csvKeys} from './components/cardList.vue';
const csvData:Ref<(csvDataItem|null)[] | null> = ref(null);
const csvHeader:Ref<csvKeys | null> = ref(null);
useData()
.then(({header, content}) => {
  csvHeader.value = header;
  csvData.value = content;
  console.log(header);
})
</script>

<template>
  <main class="bg-gray-200 h-full">
    <article class="max-w-7xl mx-auto">
      <header class="h-80 flex flex-col justify-center items-center gap-2">
        <div class="banner-title text-4xl text-center">Night has fallen</div>
        <div class="banner-subtitle text-2xl text-center text-gray-500">Protect yourself</div>
      </header>
      <article>
        <cardList :csv_keys="csvHeader" :csv="csvData" />
        <!-- {{ csvTitle.join(',') }} -->
        ..
      </article>
      <footer>
        Copyright © 2023 an ordinary MtF
      </footer>
    </article>
  </main>
</template>

