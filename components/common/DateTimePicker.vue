<template>
  <div class="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md max-w-sm">
    <label for="date" class="label-text">Select Date:</label>
    <input
        type="date"
        id="date"
        v-model="date"
        @change="emitDateTime"
        class="input input-bordered w-full max-w-md"
    />
    <label for="time" class="label-text">Select Time:</label>
    <input
        type="time"
        id="time"
        v-model="time"
        @change="emitDateTime"
        class="input input-bordered w-full max-w-md"
    />
    <p class="text-sm text-gray-500">Selected Date and Time: {{ selectedDateTime }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, defineEmits, watchEffect} from 'vue';
import {DateUtil} from "~/util/date-util";

const props = defineProps<{
  initialDate: string,
  initialTime: string
}>();

const date = ref<string>('');
const time = ref<string>('');
const emit = defineEmits(['dateTimeChanged']);

const selectedDateTime = computed(() => {
  if (date.value && time.value) {
    return `${date.value} ${time.value}`;
  }
  return 'No date/time selected';
});


const emitDateTime = (): void => {
  if (date.value && time.value) {
    const combinedDateTime = `${date.value}T${time.value}`;
    emit('dateTimeChanged', DateUtil.dateTimeToUnix(combinedDateTime).toString());
  }
};

onMounted(() => {
  // Initialize `date` and `time` from props in `onMounted`
  date.value = DateUtil.unixToDate(Number(props.initialDate));
  time.value = DateUtil.unixToTime(Number(props.initialTime));
  emitDateTime();  // Emit initial date and time
  console.log(date.value);
  console.log(time.value);
});

watchEffect(() => {
  if (props.initialDate) {
    date.value = DateUtil.unixToDate(Number(props.initialDate));
  }
  if (props.initialTime) {
    time.value = DateUtil.unixToTime(Number(props.initialTime));
  }
})
watchEffect()
</script>
