<template>
  <div class="m-10">
    <ArticleForm :article="article" :is-new="false"/>
  </div>
</template>

<script setup lang="ts">

import {useArticleStore} from "~/stores/article-store";
import type {Article} from "~/model/article";

const articleStore = useArticleStore();
const route = useRoute();
const router = useRouter();
const article = ref<Article | null>(null);

onMounted(async () => {
  const id = route.params.id;
  article.value = await articleStore.getById(id);
  console.log(article.value);
})
</script>