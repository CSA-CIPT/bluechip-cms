<template>
  <div class="flex justify-start items-center">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Account value</span>
      </div>
      <select @change="onDataChange" v-model="selectedValue" class="select select-bordered w-full max-w-xs">
        <option disabled selected>{{ selectedValue }}</option>
        <option v-for="(value, key) in numberRangeCategories" :key="key" :value="value">
          {{ value }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import {NotificationToggleStatus, NumberRangeCategory, NumberRangeProperty} from "~/model/notification/notification";

const props = defineProps<{
  property: NumberRangeCategory
}>();

const emit = defineEmits(['onChange']);

const categories: string[] = [
  '0 - 10.000.000',
  '10.000.000 - 100.000.000',
  '100.000.000 - 500.000.000',
  '500.000.000 - 1.000.000.000',
  '1.000.000.000 - 5.000.000.000',
  '> 5.000.000.000',
];

const getCategoryValue = (category: NumberRangeCategory): string => {
  if(category == NumberRangeCategory.RANGE_0_10M){
    return categories[0];
  }

  if(category == NumberRangeCategory.RANGE_10M_100M){
    return categories[1];
  }

  if(category == NumberRangeCategory.RANGE_100M_500M){
    return categories[2];
  }

  if(category == NumberRangeCategory.RANGE_500M_1B){
    return categories[3];
  }

  if(category == NumberRangeCategory.RANGE_1B_5B){
    return categories[4];
  }

  if(category == NumberRangeCategory.RANGE_OVER_5B){
    return categories[5];
  }

  return '';
}

const getCategory = (category: string): NumberRangeCategory => {
  if(category == '0 - 10.000.000'){
    return NumberRangeCategory.RANGE_0_10M;
  }
  if(category == '10.000.000 - 100.000.000'){
    return NumberRangeCategory.RANGE_10M_100M;
  }
  if(category == '100.000.000 - 500.000.000'){
    return NumberRangeCategory.RANGE_100M_500M;
  }
  if(category == '500.000.000 - 1.000.000.000'){
    return NumberRangeCategory.RANGE_500M_1B;
  }
  if(category == '1.000.000.000 - 5.000.000.000'){
    return NumberRangeCategory.RANGE_1B_5B;
  }
  if(category == '> 5.000.000.000'){
    return NumberRangeCategory.RANGE_OVER_5B;
  }
}

const numberRangeCategories: string[] = ref(categories);
const selectedValue = ref(getCategoryValue(props.property));

const onDataChange = () =>{
  const numberRangeProperty = new NumberRangeProperty(
      getCategory(selectedValue.value),
      NotificationToggleStatus.ON
  )

  emit('onChange', numberRangeProperty);
}
</script>
