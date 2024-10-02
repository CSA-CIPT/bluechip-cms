<script setup lang="ts">
import type {Article} from "~/model/article";
import {ref} from "vue";
import {DateUtil} from "~/util/date-util";
import {useArticleStore} from "~/stores/article-store";
import {AssetData} from "~/model/image/image";

const articleStore = useArticleStore();
const router = useRouter();
const props = defineProps<{
  imageUrl: string;
}>();

const currentImageUrl = ref(props.imageUrl);
const fallbackImageUrl = '/images/default_no_image.png';

const articleForm = ref<Article>({
  id: 0,
  title: '',
  type: 'EVENT',
  content: '',
  status: 'OFF',
  mainImage: '',
  startDate: DateUtil.getTodayDateEpochSecond().toString(),
  endDate: DateUtil.getTodayDateEpochSecond().toString(),
  relatedStocks: [],
  images: []
})

const articleImages = ref({
  mainImage: null,
  contentImages: []
})

const onClickUploadMainImage = async (file: File) =>{
  await articleStore.uploadMainImage(articleForm.value, file);
}

const onContentImageChanged = (files: File[]) =>{
  console.log(files);
  articleForm.value.images = files.map(file => new AssetData(file.name, file.name));
  articleImages.value.contentImages = files;
}

const onImageError = () => {
  currentImageUrl.value = fallbackImageUrl;
  console.log('onImageError', currentImageUrl.value);
};

</script>

<template>
  <div>
    <div v-if="currentImageUrl" class="w-1/3">
      <img :src="currentImageUrl" alt="Preview" class="w-full h-auto rounded-lg object-cover" @error="onImageError" />
    </div>
    <div v-else class="w-1/3 flex items-center justify-center bg-gray-100 rounded-lg" style="height: 200px;">
      <span class="text-gray-500">No Image</span>
    </div>
  </div>
</template>

<style scoped>

</style>