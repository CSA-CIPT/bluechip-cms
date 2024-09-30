<script setup lang="ts">

import {type HelpQuestionAnswer, QuestionAnswer} from "~/model/question/question";
import {ValidateUtil} from "~/util/validate-util";

const props = defineProps<{
  help?: HelpQuestionAnswer;
}>();

const emit = defineEmits(['onClickSave', 'onClickDelete']);
const router = useRouter();
const route = useRoute();
const helpForm = ref<HelpQuestionAnswer>({
  groupId: 0,
  title: '',
  contents: [],
});

const searchQuery = ref<String>('');
const groupHelpStore = useHelpStore();
const selectedDeleteGroupHelp = ref<QuestionAnswer | null>(null);

const filteredGroupHelp = computed(() => {
  if (searchQuery.value.length == 0){
    return helpForm.value.contents;
  }
  const query = searchQuery.value.toLowerCase();
  return helpForm.value.contents.filter(groupHelp => ValidateUtil.combineFields(groupHelp).toLowerCase().includes(query));
})

const navigateToEditGroupHelp = async(groupHelpEdit: QuestionAnswer) => {
  await router.push(`/helps/${helpForm.value.groupId}/groups/${groupHelpEdit.questionId}`);
  console.log('init', groupHelpEdit.questionId);
}

const confirmDelete = (groupHelpDeletion: QuestionAnswer): void => {
  selectedDeleteGroupHelp.value = { ...groupHelpDeletion};
  delete_modal.showModal();
};

const deleteGroupHelp = async  () => {
  await groupHelpStore.deleteGroupHelpById(selectedDeleteGroupHelp.value.questionId);
  emit('onClickDelete');
};


const formError = ref({
  title: '',
  contents: [],
});

const validateTitle = () => {
  if (ValidateUtil.isEmpty(helpForm.value.title)){
    formError.value.title = 'Title is required';
  }else {
    formError.value.title = '';
  }
}

const save = () => {
  validateTitle();
  if (ValidateUtil.areFieldsEmpty(formError.value)){
    emit('onClickSave', helpForm.value);
  }
}

const close = () => {
  router.replace('/helps');
}

watchEffect(() => {
  if (props.help) {
    console.log('change', props.help);
    helpForm.value = { ...props.help};
  }
});

onMounted(() => {
  if (props.help){
    console.log('init', props.help);
    helpForm.value = { ...props.help};
  }
});


</script>

<template>
  <div class="border-[2px] rounded-md p-5 mb-7">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Title</span>
      </div>

      <div>
        <input type="text" @input="validateTitle" v-model="helpForm.title" placeholder="Title" class="input input-bordered w-full max-w-lg"/>
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.title}}</span>
        </div>
      </div>
    </label>

    <div class="flex gap-1">
      <button @click="save" class="bg-green-500 text-white px-[10px] py-[8px] rounded-md">Save</button>
      <button @click="close" class="bg-red-500 text-white px-[10px] py-[8px] rounded-md">Close</button>
    </div>

    <label class=""></label>
  </div>

  <div class="grid grid-cols-5 gap-4 mb-2">
    <div class="col-end-7 col-span-2">
      <NuxtLink class="btn w-full" :to="{
        path: `/helps/groups/new`,
        query: {helpGroupEditNew: helpForm.groupId}
      }">New
      </NuxtLink>
    </div>
  </div>

<!--  /helps/groups/new"-->

  <div class="overflow-x-auto overflow-y-auto h-5/6 border-[1px] rounded-md">
    <table class="table table-md">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="groupHelp in filteredGroupHelp">
        <td>{{groupHelp.question}}</td>
        <td>{{groupHelp.answer}}</td>
        <td>{{groupHelp.type}}</td>
        <td>
          <div class="flex gap-3">
<!--            <button @click="navigateToEditGroupHelp(groupHelp)" class="btn bg-blue-500 text-white">EDIT</button>-->
            <NuxtLink class="btn bg-blue-500 text-white" :to="{
              path: `/helps/groups/${groupHelp.questionId}`,
              query: {helpGroupEdit: groupHelp.questionId, helpEdit: helpForm.groupId}
            }">EDIT</NuxtLink>
            <button @click="confirmDelete(groupHelp)" class="btn bg-red-500 text-white">DELETE</button>
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
            <button @click="deleteGroupHelp" class="btn mr-3 bg-red-500 text-white">Delete</button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>

</style>