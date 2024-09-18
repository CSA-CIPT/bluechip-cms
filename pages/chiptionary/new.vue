<template>
  <div class="rounded-md p-10">
    <ChiptionaryForm @on-click-save="saveChiptionary"/>
  </div>
</template>

<script setup lang="ts">
import type {Chiptionary} from "~/model/chiptionary/chiptionary";

const chiptionaryStore = useChiptionaryStore();
const router = useRouter();
const saveChiptionary = async (chiptionary: Chiptionary) =>{
  await chiptionaryStore.save(chiptionary);
  await router.replace('/chiptionary');
}
</script>