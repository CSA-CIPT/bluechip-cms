<script setup lang="ts">
import {ValidateUtil} from "~/util/validate-util";
import {type HelpQuestionAnswer, QuestionAnswer} from "~/model/question/question";

const searchQuery = ref<string>('');
const helpStore = useHelpStore();
const router = useRouter();
const selectedDeleteHelp = ref<HelpQuestionAnswer | null>(null);


const filteredHelp: HelpQuestionAnswer[] = computed(() => {
  if (searchQuery.value.length == 0){
    return helpStore.helpList;
  }
  const query =  searchQuery.value.toLowerCase();
  return helpStore.helpList.filter(helpField => ValidateUtil.combineFields(helpField).toLowerCase().includes(query));
})

const navigateToEditHelp = async (helpEdit: HelpQuestionAnswer) => {
  await router.push(`/helps/${helpEdit.groupId}`);
}

const confirmDelete = (helpDeletion: HelpQuestionAnswer): void => {
  selectedDeleteHelp.value = {...helpDeletion};
  delete_modal.showModal();
};

const deleteHelp = async () => {
  await helpStore.deleteHelpById(selectedDeleteHelp.value.groupId);
  await helpStore.fetchAll();
}


</script>

<template>
  <div class="grid grid-cols-5 gap-4">
    <label class="input input-bordered flex items-center gap-2 mb-5 col-span-4">
      <input type="text" v-model="searchQuery" class="grow" placeholder="Search" />
      <Icon name="material-symbol:search"/>
    </label>
    <NuxtLink to="/helps/new" class="btn">
      <button>New</button>
    </NuxtLink>
  </div>
  <div class="overflow-x-auto overflow-y-auto h-5/6 border-[1px] rounded-md">
    <table class="table table-md">
      <thead>
      <tr>
        <th>Title</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="help in filteredHelp">
        <td>{{help.title}}</td>
        <td>
          <div class="flex gap-3">
<!--            <button @click="navigateToEditHelp(help)" class="btn bg-blue-500 text-white">EDIT</button>-->
            <NuxtLink class="btn bg-blue-500 text-white" :to="{
              path: `/helps/${help.groupId}`,
              query: {helpEdit: help.groupId},
            }">EDIT</NuxtLink>
            <button @click="confirmDelete(help)" class="btn bg-red-500 text-white">DELETE</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <dialog id="delete_modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirm Delete</h3>
        <p class="py-4">Delete Help</p>
        <div class="modal-action">
          <form method="dialog">
            <button @click="deleteHelp" class="btn mr-3 bg-red-500 text-white">Delete</button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>

</template>

<style scoped>

</style>