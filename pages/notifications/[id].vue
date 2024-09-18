<template>
  <div class="rounded-md p-10">
    <NotificationForm
        :notification="notification"
        @on-click-save="saveNotification"
    />
  </div>
</template>

<script setup lang="ts">
import type {AppNotification} from "~/model/notification/notification";

const notificationStore = useNotificationStore();
const router = useRouter();
const route = useRoute();
const notification = ref<AppNotification | null>(null);

const saveNotification = async (notification: AppNotification) => {
  await notificationStore.saveAppNotification(notification);
  await router.replace('/notifications');
}


onMounted(async () => {
  const notificationId =  route.params.id;
  notification.value = await notificationStore.getAppNotificationById(notificationId);
})

</script>