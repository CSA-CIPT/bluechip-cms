<template>
    <div class="h-screen p-10">

      <NotificationTable/>
    </div>
</template>

<script setup lang="ts">


const notificationStore = useNotificationStore();
onMounted(async () => {
    await notificationStore.getAllNotification();
})

</script>