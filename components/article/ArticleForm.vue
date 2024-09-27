<template>
  <div class="border-[2px] rounded-md p-5">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-10">
      <div class="md:col-span-1 lg:col-span-2">
        <label class="form-control w-full max-w-md">
          <div class="label">
            <span class="label-text">Title</span>
          </div>

          <div>
            <input @input="validateTitle" v-model="articleForm.title" type="text" placeholder="Title" class="input input-bordered w-full max-w-md" />
            <div class="label">
              <span class="label-text-alt text-red-500">{{formError.title}}</span>
            </div>
          </div>
        </label>

        <label class="form-control">
          <div class="label">
            <span class="label-text">Content</span>
          </div>
          <textarea @input="validateContent" v-model="articleForm.content" class="textarea textarea-bordered h-24" placeholder="Content"></textarea>
          <div class="label">
            <span class="label-text-alt text-red-500">{{formError.content}}</span>
          </div>
        </label>

        <label class="form-control w-full max-w-xs mb-2">
          <div class="label">
            <span class="label-text">Status</span>
          </div>
          <select v-model="articleForm.status" class="select select-bordered w-full max-w-xs">
            <option disabled selected>{{ articleForm.status }}</option>
            <option v-for="status in articleStatus" :key="status" :value="status">{{ status }}</option>
          </select>
        </label>

        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Type</span>
          </div>
          <select v-model="articleForm.type" class="select select-bordered w-full max-w-xs">
            <option disabled selected>{{ articleForm.type }}</option>
            <option v-for="type in articleTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </label>

        <ArticleStock :related-stocks="articleForm.relatedStocks"/>
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.content}}</span>
        </div>
      </div>

      <div class="md:col-span-1 lg:col-span-2 ">
        <div class="label">
          <span class="label-text">Start date</span>
        </div>
        <DateTimePicker
            @date-time-changed="startDateChanged"
            :initial-date="articleForm.startDate"
            :initial-time="articleForm.startDate"
        />

        <div class="label mt-3">
          <span class="label-text">End date</span>
        </div>
        <DateTimePicker
            @date-time-changed="endDateChanged"
            :initial-date="articleForm.endDate"
            :initial-time="articleForm.endDate"
        />
      </div>

      <div v-if="!isNew" class="md:col-span-2 lg:col-span-5">
        <ImageUpload name="Main image" :image-url="articleForm.mainImage" @on-click-upload="onClickUploadMainImage"/>

        <ImageMultiUpload  :images="articleForm.images" title="Content images" @imageChanged="onContentImageChanged" @imageDeleted="onImageDeleted" @imageUpload="onImageUpload"/>
      </div>
    </div>




    <div class="flex justify-end pt-5 gap-3 mt-5">
      <button @click="save" class="btn bg-green-500 text-white">Save</button>
      <button @click="close" class="btn bg-red-500 text-white">Close</button>
    </div>
  </div>

</template>

<script setup lang="ts">
import type {Article} from "~/model/article";
import {ValidateUtil} from "~/util/validate-util";
import DateTimePicker from "~/components/common/DateTimePicker.vue";
import {DateUtil} from "~/util/date-util";
import {ref} from "vue";
import {useArticleStore} from "~/stores/article-store";
import {AssetData} from "~/model/image/image";

const props = defineProps<{
  article?: Article,
  isNew: boolean,
}>();

const articleStore = useArticleStore();
const router = useRouter();

const formError = ref({
  title: '',
  content: '',
  mainImage: '',
  relatedStock: '',
  images: ''
});

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


const articleStatus: string[] = ['OFF', 'ON']
const articleTypes: string[] = ['NEWS', 'TRADING', 'EVENT'];

const validateTitle = () =>{
  if(ValidateUtil.isEmpty(articleForm.value.title)){
    formError.value.title = 'Title is required';
  }else{
    formError.value.title = '';
  }
}

const validateContent = () => {
  if(ValidateUtil.isEmpty(articleForm.value.content)){
    formError.value.content = 'Content is required';
  }else{
    formError.value.content = '';
  }
}

const validateMainImage = () => {
  if(articleImages.value.mainImage == null){
    formError.value.mainImage = 'Main image is required';
  }else{
    formError.value.mainImage = '';
  }
}

const validateStock = () => {
  if(articleForm.value.type == 'NEWS'){
    formError.value.relatedStock = 'Related stocks must be 2';
  }else{
    formError.value.relatedStock = '';
  }
}

const validateContentImages = () =>{
  if(articleImages.value.contentImages.length == 0){
    formError.value.images = 'Content images is required';
  }else{
    formError.value.images = '';
  }
}

const onClickUploadMainImage = async (file: File) =>{
  await articleStore.uploadMainImage(articleForm.value, file);
}

const onContentImageChanged = (files: File[]) =>{
  console.log(files);
  articleForm.value.images = files.map(file => new AssetData(file.name, file.name));
  articleImages.value.contentImages = files;
}

const startDateChanged = (date: string) =>{
  articleForm.value.startDate = date;
  console.log('startDateChanged ', date);
}

const endDateChanged = (date: string) =>{
  articleForm.value.endDate = date;
  console.log('endDateChanged ', date);
}

const save = async () => {
  validateTitle();
  validateContent();
  validateMainImage();
  validateStock();
  validateContentImages();
  if(ValidateUtil.areFieldsEmpty(formError.value)){
    await articleStore.save(articleForm.value);
    await router.replace('/articles');
  }



}

const close = ()=> {
  router.replace('/articles');
}

const onImageDeleted = async (name: string) =>{
  await articleStore.deleteContentImage(articleForm.value, name);
}

const onImageUpload = async (file: File) =>{
  await articleStore.uploadContentImage(articleForm.value, file);
}
watchEffect(() => {
  if (props.article) {
    articleForm.value = {...props.article};
  }
})


</script>
