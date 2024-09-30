<template>
  <div class="grid grid-cols-5 gap-4">
    <label class="input input-bordered flex items-center gap-2 mb-5 col-span-4">
      <input v-model="searchQuery" type="text" class="grow" placeholder="Search" />
      <Icon name="material-symbols:search"/>
    </label>
    <NuxtLink to="/articles/new" class="btn">
      <button>New</button>
    </NuxtLink>
  </div>
  <div class="overflow-x-auto overflow-y-auto h-5/6 border-[1px] rounded-md">
    <table class="table table-md">
      <thead>
      <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr class="" v-for="article in filteredArticle">
        <td>{{ article.title }}</td>
        <td>{{ article.type }}</td>
        <td>{{ article.status }}</td>
        <td>
          <div class="flex gap-3">
            <button @click="navigateToEdit(article)" class="btn bg-blue-500 text-white">EDIT</button>
            <button @click="confirmDelete(article)" class="btn bg-red-500 text-white">DELETE</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <dialog id="delete_modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirm delete</h3>
        <p class="py-4">Delete Article</p>
        <div class="modal-action">
          <form method="dialog">
            <button @click="deleteArticle" class="btn mr-3 bg-red-500 text-white">Delete</button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import {useArticleStore} from "~/stores/article-store";
import type {Article} from "~/model/article";
import {ValidateUtil} from "~/util/validate-util";

const searchQuery = ref<string>('');
const articleStore = useArticleStore();
const router = useRouter();

const selectedDeleteArticle = ref(null);
const filteredArticle: Article[] = computed(() => {
  if(searchQuery.value.length == 0){
    return articleStore.articles;
  }

  const query = searchQuery.value.toLowerCase();
  return articleStore.articles
      .filter(article => ValidateUtil.combineFields(article).toLowerCase().includes(query));
})

const navigateToEdit = (article: Article) => {
  router.push(`articles/${article.id}`);
}

const confirmDelete = (article: Article): void => {
  selectedDeleteArticle.value = {...article};
  delete_modal.showModal();
};


const deleteArticle = async () =>{
  await articleStore.deleteData(selectedDeleteArticle.value);
  await articleStore.getAll();
}

</script>