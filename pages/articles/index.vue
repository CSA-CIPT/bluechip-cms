<template>
    <div class=" h-screen p-10">
        <ArticleTable/>
    </div>
</template>

<script setup lang="ts">

import {useArticleStore} from "~/stores/article-store";

const articleStore = useArticleStore();

onMounted(async ()  =>{
  await articleStore.getAll();
});
</script>