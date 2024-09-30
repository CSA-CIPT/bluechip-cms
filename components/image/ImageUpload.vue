<script setup lang="ts">
const file = ref(null);

const props = defineProps<{
  name: string;
  imageUrl: string;
}>();



const currentImageUrl = ref(props.imageUrl);

// Fallback image URL
const fallbackImageUrl = '/images/default_no_image.png';

const emit = defineEmits(['onClickUpload']);

const fileSelected = (event: Event) =>{
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0];

    if (!selectedFile.type.startsWith("image/")) {
      file.value = null;
      return;
    }

    file.value = selectedFile;
  }
}

watch(() => props.imageUrl, (newUrl) => {
  currentImageUrl.value = newUrl;
});

const onImageError = () => {

  currentImageUrl.value = fallbackImageUrl;
  console.log('onImageError', currentImageUrl.value);
};

const upload = async () => {
  if(file.value != null){
    emit('onClickUpload', file.value);
  }
}

</script>

<template>
  <div class="form-control w-full max-w-md border-2 rounded-md border-gray-200 p-4">
    <!-- Left side: Image preview -->
    <div class="flex space-x-4">
      <div v-if="currentImageUrl" class="w-1/3">
        <img :src="currentImageUrl" alt="Preview" class="w-full h-auto rounded-lg object-cover" @error="onImageError" />
      </div>
      <div v-else class="w-1/3 flex items-center justify-center bg-gray-100 rounded-lg" style="height: 200px;">
        <span class="text-gray-500">No Image</span>
      </div>

      <!-- Right side: File upload and name -->
      <div class="w-2/3 flex justify-end items-end">
        <label class="block w-full">
          <span class="block text-sm font-medium text-gray-700">{{ props.name }}</span>
          <input
              ref="file"
              @change="fileSelected"
              accept="image/*"
              type="file"
              class="file-input file-input-bordered w-full max-w-xs"
          />
        </label>
        <button @click="upload"  class="btn ml-3">Upload</button>
      </div>
    </div>
  </div>
</template>
