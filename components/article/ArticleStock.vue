<script setup lang="ts">

import {ref, watchEffect} from "vue";
const props = defineProps<{
  relatedStocks: string[]
}>();

const stocks = ref<string[]>(props.relatedStocks);
const addStocks = () =>{
  console.log('current', stocks.value.length);
  if(props.relatedStocks.length < 2){
    props.relatedStocks.push('');
  }

}

const removeStock = (index: number) => {
  console.log('length', stocks.value);

  if (props.relatedStocks.length > 0) {
    props.relatedStocks.splice(index , 1);
  }
}

watchEffect(() => {
  console.log('related', props.relatedStocks);
  if(props.relatedStocks){
    stocks.value = {...props.relatedStocks};
  }
})

onMounted(() =>{
  if(props.relatedStocks){
    stocks.value = {...props.relatedStocks};
  }
})
</script>

<template>
  <div class="w-full max-w-md mt-5">
    <div class="flex items-center mb-3 ">
      <span class="label-text mr-3">Stocks</span>
      <button @click="addStocks" class="btn btn-sm">Add</button>
    </div>

    <div :class='[
            `grid grid-rows-${props.relatedStocks.length} gap-4`,
        ]'>
      <div v-for="(stock, index) in relatedStocks" :key="index">
        <div class="flex gap-2">
          <input v-model="props.relatedStocks[index]" type="text" placeholder="Target stocks" class="input input-bordered w-full max-w-xs" />
          <button @click="removeStock(index)" class="btn btn-square bg-red-500 text-white">
            <Icon name="iwwa:delete"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>