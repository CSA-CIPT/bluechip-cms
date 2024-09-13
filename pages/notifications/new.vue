<template>
    <div class="rounded-md p-10">
        <NotificationForm
            @on-click-save="saveNotification"
        />
    </div>
</template>

<script setup lang="ts">

import type {AppNotification} from "~/model/notification/notification";

const notificationStore = useNotificationStore();
const router = useRouter();
const saveNotification = async (notification: AppNotification) => {
  await notificationStore.saveAppNotification(notification);
  await router.replace('/notifications');
}

</script>