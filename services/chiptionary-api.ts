import type {Chiptionary} from "~/model/chiptionary/chiptionary";


const axios = () => {
    const { $axios } = useNuxtApp();
    return $axios;
}

const url = '/csa/words';
export const chiptionaryAPI = () => {
    const getAllChiptionary = async (): Promise<Chiptionary[]> => {
        const response = await axios().get<Chiptionary[]>(url);
        return response.data;
    }

    const saveChiptionary = async (data: Chiptionary) => {
        await axios().post<Chiptionary>(url, data);
    }

    const updateChiptionary = async (data: Chiptionary) => {
        await axios().put<Chiptionary>(url, data);
    }

    const getChiptionary = async (id: string) : Promise<Chiptionary> => {
        const response = await axios().get<Chiptionary>(url + `/${id}`);
        return response.data;
    }

    const deleteChiptionary = async (id: string) => {
        await axios().delete(url + `/${id}`);
    }

    return {
        getAllChiptionary,
        getChiptionary,
        saveChiptionary,
        updateChiptionary,
        deleteChiptionary
    }
}