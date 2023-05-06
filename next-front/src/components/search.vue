<script lang="ts" setup>
import {MagnifyingGlassIcon} from '@heroicons/vue/20/solid';
import {vOnClickOutside} from '@vueuse/components';
import {ref, toRefs, watch} from 'vue';
import type {Ref} from 'vue';
import { csvDataItem } from './cardList.vue';
const props = defineProps<{
    modelValue: (csvDataItem|null)[]
}>();
const {modelValue} = toRefs(props);
const emits = defineEmits(['search', 'update:modelValue']);
const searchValue:Ref<string> = ref('');
const onSearch = (data: (csvDataItem|null)[])=>{
    emits('search', data);
}
const active = ref(false);
const closeModal = () => {
    active.value = false;
}
watch(searchValue, (keyword: string)=>{
    if (keyword === ''){
        onSearch(modelValue.value);
        return;
    }
    const reg = new RegExp(keyword)
    const beforeFilterData = modelValue.value.filter((item) => reg.test(item?.school_name ?? ''));
    onSearch(beforeFilterData);
})
</script>

<template>
    <div class="fixed bottom-2 left-1/2 -translate-x-1/2">
        <div 
            class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-center border-gray-300 border-2 transition-all duration-200"
            :class="[active ? 'w-96 h-16 px-4 gap-2' : 'w-16 h-16']"
            @click="active = !active"
            v-on-click-outside="closeModal"
        >
            <MagnifyingGlassIcon
                class=" w-8 h-8 cursor-pointer"
            />
            <input 
                class="gray-400 h-full outline-none transition-all duration-200"
                :class="[active ? 'w-full' : ' w-0']"
                v-model="searchValue"
            @click.stop/>
        </div>
    </div>
</template>