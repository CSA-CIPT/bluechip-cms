
const axios = () => {
    const { $axios } = useNuxtApp();
    return $axios;
}

const url: string = '/csa/files'

export const assetAPI = () =>{
    const uploadFile = async (file: File, category: string): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await axios().post(url + '/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;

    }
    const deleteFile = async (fileName: string, category: string) : Promise<void> => {
        await axios().delete(url, {
            params: {
                fileName: fileName,
                category: category
            }
        });
    }

    return{
        uploadFile,
        deleteFile,
    }
}