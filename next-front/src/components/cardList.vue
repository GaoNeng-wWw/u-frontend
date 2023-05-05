<script setup lang="ts">
import card from './card.vue';
import {toRefs} from 'vue';
// ID,名称,相关网页,地理位置(机构声称/其他来源)(仅已知),来源,可能存在对跨性别者的迫害,相关证据,待审核
export interface csvDataItem {
  id: number;
  school_name: string;
  website: string;
  location: string;
  data_source: string;
  persecute: string;
  evidence: string;
  audit: boolean;
}
export type csvKeys = {
  [key in keyof csvDataItem]:{
    name: string
  }
}
const props = defineProps<{
  csv: (csvDataItem|null)[] | null,
  csv_keys: csvKeys | null
}>();

const {csv, csv_keys} = toRefs(props)
</script>

<template>
  <section class="w-full grid grid-cols-2 gap-4">
    <template v-for="item in csv">
      <div class=" max-w-full break-words flex-shrink-0 flex-grow-1">
        <card v-if="item" :key="item?.id">
          <template #header>
            <h1>{{ item?.school_name }}</h1>
          </template>
          <template #content>
            <ul>
              <li v-for="(csvKeyItem, key) in csv_keys">
                {{ csvKeyItem.name }}: {{ item?.[key] }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </template>
  </section>
</template>