<script setup lang="ts">

import type {QuestionAnswer} from "~/model/question/question";

const groupHelpStore = useHelpStore();
const router = useRouter();
const route = useRoute();
const groupHelp = ref<QuestionAnswer | null>(null);

const id = route.params.id;
const idNewEnd = route.query.helpGroupEditNew
const idEditEnd =  route.query.helpEdit

const saveGroupHelp = async (groupHelp: QuestionAnswer) => {
  console.log('TEST', idNewEnd);
  await groupHelpStore.saveGroup(groupHelp, idNewEnd);
  if (idNewEnd){
    await router.replace(`/helps/${idNewEnd}`);
  }else if (idEditEnd){
    await router.replace(`/helps/${idEditEnd}`);
  }else {
    console.error('id is undefined');
  }
};

const closeGroupHelp = async () => {
  console.log('idEditEnd is undefined', idEditEnd);
  console.log('idEditNew is undefined', idNewEnd);
  if (idEditEnd) {

    await router.replace(`/helps/${idEditEnd}`);
  }else if (idNewEnd){

    await router.replace(`/helps/${idNewEnd}`);
  }else{

  }
};


onMounted(async () => {

  console.log('TEST', id)
  if (typeof id === 'number' && id){
    groupHelp.value = await groupHelpStore.getGroupHelpById(id)
  }

})
</script>

<template>
  <div class="rounded-md p-10">
    <HelpGroupForm
        :help="groupHelp"
        @on-click-save="saveGroupHelp"
        @on-click-close="closeGroupHelp"
    />
  </div>
</template>

<style scoped>

</style>