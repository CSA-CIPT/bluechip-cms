import type {Article} from "~/model/article";

const axios = () => {
    const { $axios } = useNuxtApp();
    return $axios;
}

const url = '/csa/articles';

export const articleAPI = () => {
    const getAllArticles = async (): Promise<Article[]> => {
        const response = await axios().get<Article[]>(`${url}?type=ALL`);
        return response.data;
    }

    const getArticleById = async (id: string): Promise<Article> => {
        const response = await axios().get<Article>(`${url}/${id}`);
        return response.data
    }

    const createArticle = async (article: Article): Promise<void> => {
        await axios().post(url, article);
    }

    const updateArticle = async (article: Article): Promise<void> => {
        await axios().put(url, article);
    }

    const deleteArticle = async (id: string): Promise<void> => {
        await axios().delete<Article>(url + `/${id}`);
    }

    const deleteArticleImage = async (id: string, name: string): Promise<void> => {
        await axios().delete<Article>(`${url}/${id}/images/${name}`);
    }

    const addArticleImage = async (id: string, name: string): Promise<void> => {
        await axios().post<Article>(`${url}/${id}/images/${name}`);
    }

    return{
        getAllArticles,
        getArticleById,
        createArticle,
        updateArticle,
        deleteArticle,
        deleteArticleImage,
        addArticleImage,
    }
}