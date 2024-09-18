
import {chiptionaryAPI} from "~/services/chiptionary-api";
import type {Chiptionary} from "~/model/chiptionary/chiptionary";

const {
    getChiptionary,
    getAllChiptionary,
    saveChiptionary,
    updateChiptionary,
    deleteChiptionary
} = chiptionaryAPI();

export const useChiptionaryStore = defineStore('chiptionaryStore', () => {
    const chiptionaryList = ref<Chiptionary[]>([]);

    const fetchAll = async () => {
        chiptionaryList.value = await getAllChiptionary();
    }

    const deleteById = async (id: string) => {
        await deleteChiptionary(id);
    }

    const save = async (data: Chiptionary) => {
        if(data.id == ''){
            await saveChiptionary(data);
        }else{
            await updateChiptionary(data);
        }
    }

    const getById = async (id: string) : Promise<Chiptionary> => {
        return await getChiptionary(id);
    }

    return {
        chiptionaryList,
        getById,
        fetchAll,
        deleteById,
        save,
    }
})