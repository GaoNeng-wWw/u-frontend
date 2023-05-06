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
    <div 
        class="opacity-25 w-16 h-16 bg-white rounded-full flex items-center justify-center text-center border-gray-300 border-2 transition-all duration-200"
        :class="[active ? 'w-5/6 h-16 px-4 gap-2 opacity-100 sm:w-96' : 'w-16 h-16 hover:opacity-95']"
        @click="active = !active"
        v-on-click-outside="closeModal"
        >
        <label for="search-bar">
            <MagnifyingGlassIcon
                class="w-8 h-8 cursor-pointer"
            />
        </label>
        <input 
            id="search-bar"
            class="gray-400 h-full outline-none transition-all duration-200"
            :class="[active ? 'w-full' : ' w-0']"
            v-model="searchValue"
        @click.stop/>
    </div>
</template>