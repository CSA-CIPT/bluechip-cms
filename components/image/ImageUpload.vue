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
  if (file.value != null) {
    // Emit the file to the parent or make the upload API call here
    emit('onClickUpload', file.value);

    // Simulate an upload process and set the new image URL after uploading
    // Assuming the backend returns the URL of the uploaded image, replace this with your logic
    const newImageUrl = URL.createObjectURL(file.value); // You can replace this with the URL from your server

    // Update the preview immediately with the new image URL
    currentImageUrl.value = newImageUrl;

    // Optionally reset the file input if you want to clear it after the upload
    file.value = null;
  }
}

</script>

<template>
  <div class="form-control w-full max-w-md border-2 rounded-md border-gray-200 p-4">
    <!-- Image preview (Left side) -->
    <div class="flex space-x-4">
      <div class="w-1/2 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden" style="height: 200px;">
        <img
            v-if="currentImageUrl"
            :src="currentImageUrl"
            alt="Preview"
            class="max-w-full max-h-full rounded-lg object-contain"
            @error="onImageError"
        />
        <span v-else class="text-gray-500">No Image</span>
      </div>

      <!-- File upload and name (Right side) -->
      <div class="w-1/2 flex flex-col justify-between relative">
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">{{ props.name }}</span>
          <label class="block w-full">
            <input
                ref="file"
                @change="fileSelected"
                accept="image/*"
                type="file"
                class="file-input file-input-bordered w-full"
            />
          </label>
        </div>
        <button @click="upload" class="btn absolute bottom-0 right-0">Upload</button>
      </div>
    </div>
  </div>
</template>
