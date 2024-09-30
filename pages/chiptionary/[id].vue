<template>
  <div class="rounded-md p-10">
    <ChiptionaryForm
        :chiptionary="chiptionary"
        @on-click-save="saveChiptionary"/>
  </div>
</template>

<script setup lang="ts">
import type {Chiptionary} from "~/model/chiptionary/chiptionary";

const chiptionaryStore = useChiptionaryStore();
const chiptionary = ref<Chiptionary | null>(null);
const route = useRoute();
const router = useRouter();
const saveChiptionary = async (chiptionary: Chiptionary) =>{
  await chiptionaryStore.save(chiptionary);
  await router.replace('/chiptionary');
}

onMounted( async () => {
  const id = route.params.id;
  chiptionary.value = await chiptionaryStore.getById(id);
})
</script>