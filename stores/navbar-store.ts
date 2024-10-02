

export const useNavbarStore = defineStore('navbarStore', () => {
    const navbarText = ref('');

    const updateText = (text :string) => {
        console.log('TEXT:', text)
        if (text.includes('chiptionary')){
            navbarText.value = 'Chiptionary'
        }
        if (text.includes('helps')){
            navbarText.value = 'Help'
        }
        if (text.includes('notifications')){
            navbarText.value = 'Notification'
        }
        if (text.includes('articles')){
            navbarText.value = 'Article'
        }
    }

    return {
        navbarText,
        updateText
    }
});
