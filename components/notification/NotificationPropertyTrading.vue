<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">User last trading activity</span>
    </div>
    <input v-model="duration" @change="onDataChange" type="number" max="90" placeholder="Duration" class="input input-bordered w-full max-w-xs" />

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Target user</span>
      </div>
      <select @change="onDataChange" v-model="selectedTargetUser" class="select select-bordered w-full max-w-xs">
        <option disabled selected>{{ selectedTargetUser }}</option>
        <option v-for="(value, key) in targetUser" :key="key" :value="value">
          {{ value }}
        </option>
      </select>
    </label>
  </label>
</template>

<script setup lang="ts">


import {NotificationToggleStatus, UserTradingProperty} from "~/model/notification/notification";
import {defineProps,} from "vue";

const targetUser = ref([
  'With RDN & Market Value',
  'Without RDN or Market Value',
])

const props = defineProps<{
  property: UserTradingProperty;
}>();


const duration = ref<number>(props.property.activeDurationProperty.activeDuration);
const selectedTargetUser = ref<string>(props.property.hasPortfolioStatus === NotificationToggleStatus.OFF ? targetUser.value[1] : targetUser.value[0]);
const hasPortfolioStatus = ref<NotificationToggleStatus>(NotificationToggleStatus.ON);
const emit = defineEmits(['onChange']);

const onPortfolioStatusChanged = () => {
  const index: number = targetUser.value.indexOf(selectedTargetUser.value);

  if(index == 0){
    hasPortfolioStatus.value = NotificationToggleStatus.ON;
  }else{
    hasPortfolioStatus.value = NotificationToggleStatus.OFF;
  }
}


const onDataChange = () =>{
  onPortfolioStatusChanged();
  const property = new UserTradingProperty(
      {
        activeDuration: duration.value,
        status: NotificationToggleStatus.ON,
      },
      hasPortfolioStatus.value,
      NotificationToggleStatus.ON
  );



  emit('onChange', property);
}

watchEffect(() => {

})
</script>
