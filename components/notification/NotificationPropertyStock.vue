<template>



  <div class="w-full max-w-md">
    <div class="flex items-center mb-3 ">
      <span class="label-text mr-3">Stocks</span>
      <button @click="addStocks" class="btn btn-sm">Add</button>
    </div>

    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <div v-for="(stock, index) in stocks" :key="index">
        <div class="flex gap-2">
          <input @change="onDataChange" v-model="stocks[index]" type="text" placeholder="Target stocks" class="input input-bordered w-full max-w-xs" />
          <button @click="removeStock(index)" class="btn btn-square bg-red-500 text-white">
            <Icon name="iwwa:delete"/>
          </button>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup lang="ts">
import {NotificationToggleStatus, UserStockProperty} from "~/model/notification/notification";
import {defineEmits, defineProps, ref} from 'vue';

const props = defineProps<{
  property: UserStockProperty
}>();

const emits = defineEmits(['onChange'])
const stocks = ref<string[]>(props.property.stocks);

const addStocks = () =>{
  if(stocks.value.length <= 5){
    stocks.value.push('');
    onDataChange();
  }

}

const removeStock = (index: number) => {


  if (stocks.value.length > 1) {
    stocks.value.splice(index , 1);
    onDataChange();
  } else {
    alert("You must have at least one stock input!")
  }
}

const onDataChange = () =>{
  const userStockProperty: UserStockProperty = new UserStockProperty(
      stocks.value,
      NotificationToggleStatus.ON
  )
  emits('onChange', userStockProperty);
}

</script>