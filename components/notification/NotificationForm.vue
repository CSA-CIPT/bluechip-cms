<template>
    <div class="border-[2px] rounded-md p-5">

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Title</span>
        </div>

        <div>
          <input @input="validateTitle" v-model="notificationForm.title" type="text" placeholder="Title" class="input input-bordered w-full max-w-lg" />
          <div class="label">
            <span class="label-text-alt text-red-500">{{formError.title}}</span>
          </div>
        </div>
      </label>


      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Description</span>
        </div>

        <div>
          <input  @input="validateBody" v-model="notificationForm.body" type="text" placeholder="Description" class="input input-bordered w-full max-w-lg" />
          <div class="label">
            <span class="label-text-alt text-red-500">{{formError.body}}</span>
          </div>
        </div>
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Status</span>
        </div>
        <div>
          <select v-model="notificationForm.status" class="select select-bordered w-full max-w-xs">
            <option disabled selected>{{ notificationForm.selectedStatus }}</option>
            <option v-for="status in notificationStatus" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Type</span>
        </div>
        <div class="pb-3">
          <select v-model="notificationForm.type" class="select select-bordered w-full max-w-xs">
            <option disabled selected>{{ notificationForm.type }}</option>
            <option v-for="type in notificationType" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </label>

      <label class="form-control w-full max-w-md">
        <div class="label">
          <span class="label-text">Notification target</span>
        </div>
        <div class="flex justify-start items-center">
          <select v-model="selectedNotificationProperty" @change="notificationTargetChange" class="select select-bordered w-full max-w-md">
            <option disabled selected>{{ selectedNotificationProperty }}</option>
            <option v-for="(value, key) in notificationPropertySelect" :key="key" :value="value">
              {{ value }}
            </option>
          </select>
        </div>
      </label>

      <div class="mt-3">
        <component :is="getPropertyWidget"  :property="selectedWidgetProps" @onChange="propertyWidgetValueChanged" />
      </div>

      <div class="flex justify-end pt-5 gap-3">
        <button @click="save" class="btn bg-green-500 text-white">Save</button>
        <button @click="close" class="btn bg-red-500 text-white">Close</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, onMounted, ref} from 'vue';
import {
  AppNotification,
  NotificationToggleStatus,
  NumberRangeCategory, NumberRangeProperty, UserStockProperty,
  UserTradingProperty,
} from '~/model/notification/notification';
import {ValidateUtil} from "~/util/validate-util";
import NotificationPropertyStock from "~/components/notification/NotificationPropertyStock.vue";
import NotificationPropertySelectRangeValue from "~/components/notification/NotificationPropertySelectRangeValue.vue";
import NotificationPropertyTrading from "~/components/notification/NotificationPropertyTrading.vue";

const notificationStatus: string[] = ['OFF', 'ON'];
const notificationType: string[] = ['MARKETING', 'NEWS', 'EVENT'];
const router = useRouter();

const notificationPropertySelect = ref([
  'All active users',
  'All active users with specific stocks',
  'All active users with selected account value',
  'All active users, cash only',
  'All active users, not trading for specific time',
  'All new active users'
])

const selectedNotificationProperty = ref(notificationPropertySelect.value[0])


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
  stockCode: [],
  notificationProperty: {
    userStockProperty: {
      stocks: [],
      status: NotificationToggleStatus.OFF,
    },
    numberRangeProperty: {
      numberRangeCategory: NumberRangeCategory.RANGE_0_10M,
      status: NotificationToggleStatus.OFF,
    },
    noStocks: NotificationToggleStatus.OFF,
    onlyNewUser: NotificationToggleStatus.OFF,
    userTradingProperty: {
      activeDurationProperty: {
        activeDuration: 0,
        status: NotificationToggleStatus.OFF
      },
      hasPortfolioStatus: NotificationToggleStatus.OFF,
      status: NotificationToggleStatus.OFF,
    },
    useProperty: NotificationToggleStatus.OFF,
  }
});

const formError = ref({
  title: '',
  body: '',
});

const props = defineProps<{
  notification?: AppNotification;
}>();


const getPropertyWidget = computed(() => {
  const selectedIndex = notificationPropertySelect.value.indexOf(selectedNotificationProperty.value);

  if (selectedIndex === 1) {
    return NotificationPropertyStock;
  }
  if (selectedIndex === 2) {
    return NotificationPropertySelectRangeValue;
  }
  if (selectedIndex === 4) {
    return NotificationPropertyTrading;
  }
  return null;
});

const selectedWidgetProps = computed(() => {
  const selectedIndex = notificationPropertySelect.value.indexOf(selectedNotificationProperty.value);

  switch (selectedIndex) {
    case 1:
      return notificationForm.value.notificationProperty.userStockProperty;
    case 2:
      return notificationForm.value.notificationProperty.numberRangeProperty.numberRangeCategory;
    case 4:
      return notificationForm.value.notificationProperty.userTradingProperty;
    default:
      return {};
  }
});

const turnOffAllProperty = () =>{
  notificationForm.value.notificationProperty.userStockProperty.status = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.numberRangeProperty.status = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.noStocks = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.onlyNewUser = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.userTradingProperty.status = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.userTradingProperty.activeDurationProperty.status = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.userTradingProperty.hasPortfolioStatus = NotificationToggleStatus.OFF;
  notificationForm.value.notificationProperty.useProperty = NotificationToggleStatus.ON;
}

const notificationTargetChange = () => {
  const index: number = notificationPropertySelect.value.indexOf(selectedNotificationProperty.value);
  if(index == 5){
    turnOffAllProperty();
    notificationForm.value.notificationProperty.onlyNewUser = NotificationToggleStatus.ON;
  }

  if(index == 3){
    turnOffAllProperty();
    notificationForm.value.notificationProperty.noStocks = NotificationToggleStatus.ON;
  }
}


const propertyWidgetValueChanged = (value: any) =>{

  turnOffAllProperty();
  if(value instanceof UserTradingProperty){
    notificationForm.value.notificationProperty.userTradingProperty = value;
  }

  if(value instanceof NumberRangeProperty){
    notificationForm.value.notificationProperty.numberRangeProperty = value;
  }

  if(value instanceof UserStockProperty){
    notificationForm.value.notificationProperty.userStockProperty = value;
  }



}

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
    notificationForm.value = { ...props.notification };
  }
});
</script>
