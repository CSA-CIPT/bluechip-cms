<script setup lang="ts">
import type {QuestionAnswer} from "~/model/question/question";
import {ValidateUtil} from "~/util/validate-util";

const props = defineProps<{
  helpGroup?: QuestionAnswer;
}>();

const emit = defineEmits(['onClickSave', 'onClickClose']);
const router = useRouter();
const route = useRoute();
const groupHelpStore = useHelpStore();
const id = route.query.helpGroupEdit;
const idQuestion = route.query.helpEdit;
const idNew = route.query.helpGroupEditNew;

const groupHelpForm = ref<QuestionAnswer>({
  questionGroupId: 0,
  questionId: 0,
  question: '',
  answer: '',
  type: '',
});

const formError = ref({
  question: '',
  answer: '',
  type: '',
});

const validateQuestion = () => {
  if(ValidateUtil.isEmpty(groupHelpForm.value.question)){
    formError.value.question = "Question is required";
  }else {
    formError.value.question = '';
  }
}

const validateAnswer = () => {
  if(ValidateUtil.isEmpty(groupHelpForm.value.answer)){
    formError.value.answer = "Answer is required";
  }else {
    formError.value.answer = '';
  }
}

const validateType = () => {
  if(ValidateUtil.isEmpty(groupHelpForm.value.type)){
    formError.value.type = "Type is required";
  }else {
    formError.value.type = '';
  }
}

// const close = () => {
//   // router.replace(`/helps/${route.query.helpEdit}`);
//   emit('onClickClose');
// }

const save = () => {
  validateQuestion();
  validateAnswer();
  validateType();
  if (ValidateUtil.areFieldsEmpty(formError.value)){
    console.log('TEST', groupHelpForm.value)
    emit('onClickSave', groupHelpForm.value);
  }
}

watchEffect(async () => {
  console.log('change', id);
  if(id){
    groupHelpForm.value = await groupHelpStore.getGroupHelpById(id);
  }

});

onMounted(async () => {
  console.log('init', id);
  // if (id){
  //   await groupHelpStore.getGroupHelpById(id);
  // }
});

</script>

<template>
  <div class="border-[2px] rounded-md p-5">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Question</span>
      </div>

      <div>
        <textarea type="text"
               @input="validateQuestion"
               v-model="groupHelpForm.question"
               placeholder="Question"
               class="textarea textarea-bordered h-[4.5rem] w-full"
        />
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.question}}</span>
        </div>
      </div>
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Answer</span>
      </div>

      <div>
        <textarea type="text"
               @input="validateAnswer"
               v-model="groupHelpForm.answer"
               placeholder="Answer"
               class="textarea textarea-bordered h-[15rem] w-full"
        />
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.answer}}</span>
        </div>
      </div>
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Type</span>
      </div>

      <div>
        <input type="text" @input="validateType" v-model="groupHelpForm.type" placeholder="Type" class="input input-bordered w-full max-w-lg">
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.type}}</span>
        </div>
      </div>
    </label>

    <div class="flex justify-end pt-5 gap-3">
      <button @click="save" class="btn bg-green-500 text-white">Save</button>
      <NuxtLink class="btn bg-red-500 text-white" :to="{
        path: idQuestion ? `/helps/${idQuestion}` : `/helps/${idNew}`,
        // query: {goBack: idQuestion ? idQuestion : idNew}
      }" replace>Close</NuxtLink>
    </div>

  </div>
</template>