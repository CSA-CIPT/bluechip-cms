import { defineStore } from "pinia";
import { ref } from "vue";


export const useErrorStore = defineStore('errorStore', () => {
    const message = ref('');
    const statusCode = ref(0);

    function setError(errorMesage: string, code: number) {
        message.value = errorMesage;
        statusCode.value = code;
        console.log('set error', statusCode.value);
    }

    function clearError() {
        message.value = '';
        statusCode.value = 0;
        console.log('clear error');
    }

    return {
        message,
        statusCode,
        setError,
        clearError
    }
})