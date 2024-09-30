import {defineStore} from "pinia";
import {articleAPI} from "~/services/article-api";
import type {Article} from "~/model/article";
import {assetAPI} from "~/services/asset-api";
import {AssetData} from "~/model/image/image";

const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    deleteArticleImage,
    addArticleImage
} = articleAPI();

const{
    uploadFile,
    deleteFile,
} = assetAPI();

export const useArticleStore = defineStore('articleStore', () =>{

    const articles = ref<Article[]>([]);

    const getAll = async () => {
        articles.value = await getAllArticles();
    }

    const getById = async (id: string) : Promise<Article> => {
        return await getArticleById(id);
    }

    const save = async (data: Article) => {
        if(data.id == 0){
            await createArticle(data);
        }else{
            console.log('updating', data);
            await updateArticle(data);

        }
    }

    const deleteContentImage = async (article: Article, fileName: string): Promise<void> => {
        await deleteFile(fileName, 'article');

        await deleteArticleImage(article.id, fileName);
    }

    const uploadContentImage = async (article: Article, file: File): Promise<void> => {
        const name = await uploadFile(file, 'article');
        await addArticleImage(article.id, name);
    }

    const uploadMainImage = async (article: Article, mainImage: File): Promise<void> => {
        article.mainImage = await uploadFile(mainImage, 'article');
        await updateArticle(article);

    }

    const deleteData = async (article: Article) : Promise<void> => {
        await deleteArticle(article.id);
        const deletePromises = article.images.map((file) => deleteFile(file.name, 'article'));
        await deleteFile(article.mainImage, 'article');
        await Promise.all(deletePromises);
    }

    return {
        articles,
        getAll,
        getById,
        save,
        deleteData,
        deleteContentImage,
        uploadContentImage,
        uploadMainImage
    }
})