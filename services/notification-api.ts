import type { AppNotification } from "~/model/notification/notification";

const axios = () => {
    const { $axios } = useNuxtApp();
    return $axios;
}

const url = '/notifications'
export const notificationAPI = () => {

    const fetchNotification = async (): Promise<AppNotification[]> => {
        const response = await axios().get<AppNotification[]>(url);
        return response.data;
    }

    const fetchNotificationById = async (id: string): Promise<AppNotification> => {
        const response = await axios().get<AppNotification>(url + `/${id}`);
        return response.data;
    }

    const saveNotification = async (data: AppNotification) => {
        await axios().post<AppNotification>(url, data);
    }

    const updateNotification = async (data: AppNotification) => {
        await axios().put<AppNotification>(url, data);
    }

    const deleteNotification = async (id: string) => {
        await axios().delete(url + `/${id}`);
    }

    const sendNotification = async (id: string) => {
        await axios().post(url + `/${id}/send`);
    }

    return {
        fetchNotification,
        saveNotification,
        updateNotification,
        deleteNotification,
        sendNotification,
        fetchNotificationById
    }
}