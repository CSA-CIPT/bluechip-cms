<template>
  <div class="toast toast-end toast-middle">
    <div class="alert alert-success">
      <span>{{message}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()
</script>