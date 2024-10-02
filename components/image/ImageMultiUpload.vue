<template>
  <div class="flex items-center mt-5 mb-5">
    <span class="label-text mr-5">{{ props.title }}</span>
    <button @click="addFile" class="btn btn-sm">Add</button>
  </div>

  <div class="grid grid-cols-1 gap-4">
    <div v-for="(data, index) in imagesData" :key="index" class="flex items-start">
      <ImageUpload
          class="mr-5"
          :image-url="data.url"
          @onClickUpload="onImageUpload"
          :name="`Content image ${index + 1}`"
      />
      <div class="flex items-center justify-center">
        <button @click="removeFile(data.name, index)" class="btn btn-square bg-red-500 text-white">
          <Icon name="iwwa:delete" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AssetData } from "~/model/image/image";

const files = ref<File[]>([]);
const imagesData = ref<AssetData[]>([]);
let isUserAction = false;

const props = defineProps<{
  title: string;
  images: AssetData[];
}>();



const emit = defineEmits(['imageChanged', 'imageDeleted', 'imageUpload']);

const addFile = () => {
  if (files.value.length < 5) {
    files.value.push(null);
    imagesData.value.push(new AssetData('', ''));
    isUserAction = true;
  }
};

const removeFile = async (name: string, index: number) => {
  if(name != null && name != ''){
    emit('imageDeleted', name);
  }


  files.value.splice(index, 1);
  imagesData.value.splice(index, 1);
};

const onImageUpload = (file: File) => {
  console.log('onImageUpload', file);
  emit('imageUpload', file);
}
onMounted(() => {
  if (props.images) {
    imagesData.value = [...props.images];
  }
});

watch(() => props.images, (newImages) => {
  if (!isUserAction) {

    imagesData.value = [...newImages];
  }

  isUserAction = false;
});
</script>
