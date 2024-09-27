<script setup lang="ts">
import type {HelpQuestionAnswer} from "~/model/question/question";

const helpStore = useHelpStore();
const router = useRouter();

const saveHelp = async (help: HelpQuestionAnswer) => {
  await helpStore.save(help);
  await router.replace('/helps');
}
</script>

<template>
  <div class="rounded-md p-10">
    <HelpNewForm @on-click-save="saveHelp"/>
  </div>
</template>
