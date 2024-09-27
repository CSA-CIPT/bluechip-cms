<script setup lang="ts">
import {HelpQuestionAnswer} from "~/model/question/question";
import {ValidateUtil} from "~/util/validate-util";

const props = defineProps<{
  helpNew?: HelpQuestionAnswer;
}>();

const emit = defineEmits(['onClickSave']);
const router = useRouter()
const helpNewForm = ref<HelpQuestionAnswer>({
  groupId: 0,
  title: '',
  contents: [],
});

const formError = ref({
  title: '',
  contents: [],
})

const validateTitle = () => {
  if (ValidateUtil.isEmpty(helpNewForm.value.title)){
    formError.value.title = 'Title is required';
  }else {
    formError.value.title = '';
  }
}

const save = () => {
  validateTitle();
  if (ValidateUtil.areFieldsEmpty(formError.value)){
    console.log('TEST', helpNewForm.value)
    emit('onClickSave', helpNewForm.value);
  }
}

const close = () => {
  router.replace('/helps');
}

</script>

<template>
  <div class="border-[2px] rounded-md p-5 mb-7">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Title</span>
      </div>

      <div>
        <input type="text" @input="validateTitle" v-model="helpNewForm.title" placeholder="Title" class="input input-bordered w-full max-w-lg"/>
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.title}}</span>
        </div>
      </div>
    </label>
    <div class="flex justify-end pt-5 gap-3">
      <button @click="save" class="btn bg-blue-500 text-white">Save</button>
      <button @click="close" class="btn bg-red-500 text-white">Close</button>
    </div>
  </div>
</template>

<style scoped>

</style>