<template>
  <div class="rounded-md p-10">
    <HelpNewFormTable
        :help="help"
        @on-click-save="saveHelp"
        @on-click-delete="deleteGroupHelp"
    />
  </div>
</template>

<script setup lang="ts">

import {type HelpQuestionAnswer, QuestionAnswer} from "~/model/question/question";

const helpStore = useHelpStore();
const router = useRouter();
const route = useRoute();
const help = ref<HelpQuestionAnswer | null>(null);
const helpGroup = ref<QuestionAnswer | null>(null);

const saveHelp = async (saveHelp: HelpQuestionAnswer) => {
  await helpStore.save(saveHelp);
  await router.replace('/helps');
}

const deleteGroupHelp = async () => {
  const helpGroupDelete = route.params.id;
  help.value = await helpStore.getHelpById(helpGroupDelete);
}

onMounted(async () => {
  const helpId = route.params.id;
  help.value = await helpStore.getHelpById(helpId);
  console.log('get', help.value);
})

</script>