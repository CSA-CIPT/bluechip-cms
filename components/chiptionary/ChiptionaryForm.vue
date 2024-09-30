<template>
  <div class="border-[2px] rounded-md p-5">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Word</span>
      </div>

      <div>
        <input @input="validateWord" v-model="chiptionaryForm.word" type="text" placeholder="Word" class="input input-bordered w-full max-w-lg" />
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.word}}</span>
        </div>
      </div>
    </label>

    <label class="form-control w-full max-w-md">
      <div class="label">
        <span class="label-text">Description</span>
      </div>

      <div>
        <textarea @input="validateDescription" v-model="chiptionaryForm.description" type="text" placeholder="Description" class="form-control textarea textarea-bordered textarea-lg h-48 w-full max-w-md" />
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.description}}</span>
        </div>
      </div>
    </label>

    <div class="flex justify-end pt-5 gap-3">
      <button @click="save" class="btn bg-green-500 text-white">Save</button>
      <button @click="close" class="btn bg-red-500 text-white">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Chiptionary} from "~/model/chiptionary/chiptionary";
import {ValidateUtil} from "~/util/validate-util";
import {onMounted, ref} from "vue";

const props = defineProps<{
  chiptionary?: Chiptionary;
}>();

const emit = defineEmits(['onClickSave']);
const router = useRouter();
const chiptionaryForm = ref<Chiptionary>({
  id: '',
  word: '',
  description: ''
});

const formError = ref({
  word: '',
  description: ''
});

const validateWord = () =>{
  if(ValidateUtil.isEmpty(chiptionaryForm.value.word)){
    formError.value.word = 'Word is required';
  }else{
    formError.value.word = '';
  }
}

const validateDescription = () =>{
  if(ValidateUtil.isEmpty(chiptionaryForm.value.description)){
    formError.value.description = 'Description is required';
  }else{
    formError.value.description = '';
  }
}

const save = () => {
  validateWord();
  validateDescription();
  if(ValidateUtil.areFieldsEmpty(formError.value)){
    emit('onClickSave', chiptionaryForm.value);
  }

}

const close = () =>{
  router.replace("/chiptionary");
}

watchEffect(() => {

  if (props.chiptionary) {
    chiptionaryForm.value = { ...props.chiptionary };

  }
});

onMounted(() => {

  if (props.chiptionary) {
    chiptionaryForm.value = { ...props.chiptionary };
  }
});

</script>