<template>
    <Sidebar ref="sidebar"/>
    <div class="flex justify-start items-center h-[60px] w-screen py-8 pl-5 pr-5 bg-[#F6F8FA] border-b-[1px] border-b-[#D0D9E0]">
        <div @click="toggleSidebar" class="z-40 flex items-center rounded-lg border-[1px] border-[#D0D9E0] p-2">
            <Icon name="iconamoon:menu-burger-horizontal-duotone" class="text-[18px]" />
        </div>
      <div class="ml-5">{{ navbarStore.navbarText }}</div>
    </div>
   
</template>

<script setup lang="ts">
import type { Sidebar } from '#build/components';
import { onClickOutside } from '@vueuse/core';
import {useNavbarStore} from "~/stores/navbar-store";


const sidebar = ref<InstanceType<typeof Sidebar> | null>(null);
const router = useRouter();
const navbarStore = useNavbarStore();

const toggleSidebar = () => {
    sidebar.value?.toggleSidebar();
};

onClickOutside(sidebar, (_) => {
    sidebar.value?.closeSidebar();
})

onMounted(() => {
  const route = router.currentRoute.value.path;
  navbarStore.updateText(route);
});

watchEffect(() => {
  const route = router.currentRoute.value.path;
  navbarStore.updateText(route);
});

</script>
