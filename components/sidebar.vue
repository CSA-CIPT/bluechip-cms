<template>
    <aside :class="[
        'fixed bg-white rounded-r-lg min-h-screen pt-4',
        'transition-all duration-200',
        'drop-shadow-lg ',
        'z-50',
        isSidebarVisible ? '-translate-x-0 w-[320px]' : '-translate-x-full'
    ]">
        <div class="mr-3 ml-3 rounded-r-lg">
            <div class="flex justify-end">
                <div @click="toggleSidebar" class="hover:bg-gray-200 hover:rounded-lg px-3 py-1.5">
                    <Icon name="streamline:delete-1-solid" class="text-gray-500 text-[10px]" />
                </div>
            </div>

            <NuxtLink to="/notifications" @click.native="closeSidebar">
                <CommonButtonIcon title="Notification" icon="carbon:notification" />
            </NuxtLink>
            <NuxtLink to="/chiptionary" @click.native="closeSidebar">
                <CommonButtonIcon title="Chiptionary" icon="fluent-mdl2:dictionary" />
            </NuxtLink>
            <NuxtLink to="/helps" @click.native="closeSidebar">
              <CommonButtonIcon title="Help" icon="grommet-icons:help-book" />
            </NuxtLink>
            <NuxtLink to="/articles" @click.native="closeSidebar">
                <CommonButtonIcon title="Article" icon="material-symbols:article-outline" icon-size=25 />
            </NuxtLink>

          <div class="mb-6">
            <button @click="authStore.showLogoutConfirmation = true" class="flex items-center p-2 hover:bg-gray-200 rounded-lg">
              <Icon name="tdesign:logout" class="mr-2 text-red-500" />
              <span class="text-red-500">Logout</span>
            </button>
          </div>


        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useNavbarStore} from "~/stores/navbar-store";

const isSidebarVisible = ref(false);
const navbarStore = useNavbarStore();
const authStore = useAuthStore();
const router = useRouter();

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
    isSidebarVisible.value = false;
}

defineExpose({
    toggleSidebar,
    closeSidebar
});
</script>