<template>
    <div class="grid grid-cols-5 gap-4">
      <label class="input input-bordered flex items-center gap-2 mb-5 col-span-4">
        <input v-model="searchQuery" type="text" class="grow" placeholder="Search" />
        <Icon name="material-symbols:search"/>
      </label>
      <NuxtLink to="/notifications/new" class="btn">
        <button>New</button>
      </NuxtLink>
    </div>
    <div class="overflow-x-auto overflow-y-auto h-5/6 border-[1px] rounded-md">
        <table class="table table-md">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="notification in filteredNotifications">
                    <td>{{ notification.title }}</td>
                    <td>{{ notification.body }}</td>
                    <td>{{ notification.status }}</td>
                    <td>{{ notification.type }}</td>
                    <td> 
                      <div class="flex gap-3">
                          <button @click="sendAppNotification(notification)" class="btn bg-green-500 text-white">SEND</button>
                          <button @click="navigateToEdit(notification)" class="btn bg-blue-500 text-white">EDIT</button>
                          <button @click="confirmDelete(notification)" class="btn bg-red-500 text-white">DELETE</button>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog id="delete_modal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Confirm delete</h3>
            <p class="py-4">Delete notification</p>
            <div class="modal-action">
              <form method="dialog">
                <button @click="deleteAppNotification" class="btn mr-3 bg-red-500 text-white">Delete</button>
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import type { AppNotification } from '~/model/notification/notification';
import {ValidateUtil} from "~/util/validate-util";

const searchQuery = ref<string>('');
const notificationStore = useNotificationStore();
const router = useRouter();

const selectedDeleteNotification = ref(null);
const filteredNotifications = computed(() => {
  if(searchQuery.value.length == 0) {
    return notificationStore.notifications;
  }
  const query = searchQuery.value.toLowerCase();
  return notificationStore.notifications.filter(notification => ValidateUtil.combineFields(notification).toLowerCase().includes(query));
})

const navigateToEdit = async (notification: AppNotification): void => {
  await router.push(`/notifications/${notification.id}`);
}

const confirmDelete = (notification: AppNotification): void => {
  selectedDeleteNotification.value = {...notification};
  delete_modal.showModal();
};

const sendAppNotification = async (notification: AppNotification): void => {
  await notificationStore.sendAppNotification(notification.id);
}


const deleteAppNotification = async () =>{
  await notificationStore.deleteAppNotification(selectedDeleteNotification.value.id);
  await notificationStore.getAllNotification();
}


</script>