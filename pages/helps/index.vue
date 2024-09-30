<template>
  <div class="h-screen p-10">
    <HelpTable/>
  </div>
</template>

<script setup lang="ts">
import {useHelpStore} from "~/stores/help-store";
const helpStore = useHelpStore();

onMounted(async () => {
  await helpStore.fetchAll();
})
</script>