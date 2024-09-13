<template>
    <div class="border-[2px] rounded-md p-5">
      <div class="pb-3">
        <input @input="validateTitle" v-model="notificationForm.title" type="text" placeholder="Title" class="input input-bordered w-full max-w-lg" />
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.title}}</span>
        </div>
      </div>

      <div class="pb-3">
        <input  @input="validateBody" v-model="notificationForm.body" type="text" placeholder="Description" class="input input-bordered w-full max-w-lg" />
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.body}}</span>
        </div>
      </div>

      <div class="pb-5">
        <select v-model="notificationForm.status" class="select select-bordered w-full max-w-xs">
          <option disabled selected>{{ notificationForm.selectedStatus }}</option>
          <option v-for="status in notificationStatus" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>

      <div class="pb-3">
        <select v-model="notificationForm.type" class="select select-bordered w-full max-w-xs">
          <option disabled selected>{{ notificationForm.selectedType }}</option>
          <option v-for="type in notificationType" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div class="flex justify-end pt-5 gap-3">
        <button @click="save" class="btn bg-green-500 text-white">Save</button>
        <button @click="close" class="btn bg-red-500 text-white">Close</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import type { AppNotification } from '~/model/notification/notification';
import {ValidateUtil} from "~/util/validate-util";

const notificationStatus: string[] = ['OFF', 'ON'];
const notificationType: string[] = ['MARKETING', 'NEWS', 'EVENT'];
const router = useRouter();

const emit = defineEmits(['onClickSave']);
const notificationForm = ref<AppNotification>({
  id: '',
  title: '',
  body: '',
  imageUrl: '',
  status: notificationStatus[0],
  scheduled: 'OFF',
  scheduledDate: '',
  scheduledTime: '',
  scheduleType: 'ONCE',
  type: notificationType[0],
  lastSent: 0,
  stockCode: []
});

const formError = ref({
  title: '',
  body: '',
});

const props = defineProps<{
  notification?: AppNotification;
}>();

const save = () => {

  validateTitle();
  validateBody();
  if(ValidateUtil.areFieldsEmpty(formError.value)) {
    emit('onClickSave', notificationForm.value);
  }

};

const validateTitle = () => {
  if(ValidateUtil.isEmpty(notificationForm.value.title)){
    formError.value.title = 'Title is required';
  }else{
    formError.value.title = '';
  }
};

const validateBody = () => {
  if(ValidateUtil.isEmpty(notificationForm.value.body)){
    formError.value.body = 'Description is required';
  }else{
    formError.value.title = '';
  }
}

const close = () =>{
  router.replace("/notifications");
}

watchEffect(() => {
  if (props.notification) {
    notificationForm.value = { ...props.notification };
  }
});

onMounted(() => {
  if (props.notification) {
    console.log('assigning notification');
    notificationForm.value = props.notification;
  }
});
</script>
