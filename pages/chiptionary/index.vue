<template>
   <div class="h-screen p-10">
        <ChiptionaryTable/>
    </div>
</template>

<script setup lang="ts">


import {useChiptionaryStore} from "~/stores/chiptionary-store";

const chiptionaryStore = useChiptionaryStore();

onMounted(async () => {
  await chiptionaryStore.fetchAll();
})
</script>