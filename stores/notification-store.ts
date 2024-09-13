import type { AppNotification } from "~/model/notification/notification";
import { notificationAPI } from "~/services/notification-api";

const {
    fetchNotification,
    updateNotification,
    saveNotification,
    deleteNotification,
    sendNotification,
    fetchNotificationById
} = notificationAPI();

export const useNotificationStore = defineStore('notificationStore', () => {

    const notifications = ref<AppNotification[]>([]);

    const getAllNotification = async () => {
        const fetchedNotifications: AppNotification[] = await fetchNotification();
        fetchedNotifications.forEach(notification => {

            if (notification.scheduledTime == '0') {
                notification.scheduledTime = '';
            }
        });

        notifications.value = fetchedNotifications;
    }

    const saveAppNotification = async (notification: AppNotification) => {
        if(notification.id == ''){
            await saveNotification(notification);
        }else{
            await updateNotification(notification);
        }

    }

    const deleteAppNotification = async (id: string) => {
        await deleteNotification(id);
    }

    const sendAppNotification = async (id: string) => {
        await sendNotification(id);
    }

    const getAppNotificationById = async (id: string) : Promise<AppNotification> => {
        return await fetchNotificationById(id);
    }

    return {
        getAllNotification,
        saveAppNotification,
        deleteAppNotification,
        sendAppNotification,
        getAppNotificationById,
        notifications
    }
})