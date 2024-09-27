import {CreateHelpQuestionAnswer, type HelpQuestionAnswer, QuestionAnswer} from "~/model/question/question";
import {id} from "postcss-selector-parser";


const axios = () => {
    const { $axios } = useNuxtApp();
    return $axios;
}

const url = '/csa/helps';
const questionUrl = '/csa/helps/questions'

export const helpAPI = () =>{
    const getAllHelp = async(): Promise<HelpQuestionAnswer[]> => {
        const response = await axios().get<HelpQuestionAnswer[]>(url);
        return response.data;
    }

    const getAllGroupHelp = async(): Promise<QuestionAnswer[]> => {
        const response = await axios().get<QuestionAnswer[]>(questionUrl);
        return response.data
    }

    const saveHelp = async (data: CreateHelpQuestionAnswer)=> {
        await axios().post<CreateHelpQuestionAnswer>(url, data);
    }

    const saveGroupHelp = async (data: QuestionAnswer) => {
        await axios().post<QuestionAnswer>(questionUrl, data);
    }

    const updateHelp = async (data: CreateHelpQuestionAnswer)=> {
        await axios().put<CreateHelpQuestionAnswer>(url, data);
    }

    const updateGroupHelp = async (data: QuestionAnswer) => {
        await  axios().put<QuestionAnswer>(questionUrl, data);
    }

    const deleteHelp = async  (id: number)=> {
        await axios().delete(url + `/${id}`);
    }

    const deleteGroupsHelp = async (id: number) => {
        await  axios().delete(questionUrl + `/${id}`);
    }

    const getHelp = async (id: string) : Promise<HelpQuestionAnswer> => {
        const response = await axios().get<HelpQuestionAnswer>(url + `/${id}`);
        return response.data;
    }

    const getGroupHelp = async (id: string) : Promise<QuestionAnswer> => {
        const response = await axios().get<QuestionAnswer>(questionUrl + `/${id}`);
        return response.data;
    }

    return {
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
    }
}