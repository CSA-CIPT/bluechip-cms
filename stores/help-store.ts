import {CreateHelpQuestionAnswer, type HelpQuestionAnswer, QuestionAnswer} from "~/model/question/question";
import {helpAPI} from "~/services/help-api";

const {
    getAllHelp,
    getAllGroupHelp,
    saveHelp,
    saveGroupHelp,
    updateHelp,
    updateGroupHelp,
    deleteHelp,
    deleteGroupsHelp,
    getHelp,
    getGroupHelp
} = helpAPI()

export const useHelpStore = defineStore('helpStore', () => {
    const helpList = ref<HelpQuestionAnswer[]>([]);
    const fetchAll = async () => {
        helpList.value = await getAllHelp();
    }

    const save = async (data: HelpQuestionAnswer)=> {
        if (data.groupId == 0){
            await saveHelp(new CreateHelpQuestionAnswer(0, data.title));
        }else {
            await updateHelp(new CreateHelpQuestionAnswer(data.groupId, data.title));
        }
    }

    const saveGroup = async (data: QuestionAnswer, questionGroupId: number) => {
        if (data.questionId == 0){
            data.questionGroupId = questionGroupId;
            await saveGroupHelp(data);
        }else {
            await updateGroupHelp(data);
        }
    }

    const deleteHelpById = async (id: string) => {
        await deleteHelp(id);
    }

    const  deleteGroupHelpById = async (id: string) => {
        await deleteGroupsHelp(id);
    }

    const getHelpById = async (id: string) : Promise<HelpQuestionAnswer> => {
        return await getHelp(id);
    }

    const getGroupHelpById = async (id: string) : Promise<QuestionAnswer> => {
        return await getGroupHelp(id);
    }

    return{
        helpList,
        fetchAll,
        save,
        saveGroup,
        deleteHelpById,
        deleteGroupHelpById,
        getHelpById,
        getGroupHelpById,
    }

})