<template>
  <div class="grid grid-cols-5 gap-4">
    <label class="input input-bordered flex items-center gap-2 mb-5 col-span-4">
      <input v-model="searchQuery" type="text" class="grow" placeholder="Search" />
      <Icon name="material-symbols:search"/>
    </label>
    <NuxtLink to="/chiptionary/new" class="btn">
      <button>New</button>
    </NuxtLink>
  </div>
  <div class="overflow-x-auto overflow-y-auto h-5/6 border-[1px] rounded-md">
    <table class="table table-md">
      <thead>
      <tr>
        <th>Word</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr class="" v-for="chiptionary in filteredChiptionary">
        <td>{{ chiptionary.word }}</td>
        <td>{{ chiptionary.description }}</td>
        <td>
          <div class="flex gap-3">
            <button @click="navigateToEdit(chiptionary)" class="btn bg-blue-500 text-white">EDIT</button>
            <button @click="confirmDelete(chiptionary)" class="btn bg-red-500 text-white">DELETE</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <dialog id="delete_modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirm delete</h3>
        <p class="py-4">Delete Chiptionary</p>
        <div class="modal-action">
          <form method="dialog">
            <button @click="deleteChiptionary" class="btn mr-3 bg-red-500 text-white">Delete</button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>


<script setup lang="ts">
import {ValidateUtil} from "~/util/validate-util";
import type {Chiptionary} from "~/model/chiptionary/chiptionary";

const searchQuery = ref<string>('');
const chiptionaryStore = useChiptionaryStore();
const router = useRouter();
const selectedDeleteChiptionary = ref(null);

const filteredChiptionary: Chiptionary[] = computed(() => {
  if(searchQuery.value.length == 0) {
    return chiptionaryStore.chiptionaryList;
  }

  const query = searchQuery.value.toLowerCase();
  return chiptionaryStore.chiptionaryList
      .filter(chip => ValidateUtil.combineFields(chip).toLowerCase().includes(query));
})

const navigateToEdit = async (chiptionary: Chiptionary) =>{
  await router.push(`/chiptionary/${chiptionary.id}`);
}

const confirmDelete = (chiptionary: Chiptionary): void => {
  selectedDeleteChiptionary.value = {...chiptionary};
  delete_modal.showModal();
};

const deleteChiptionary = async () =>{
  await chiptionaryStore.deleteById(selectedDeleteChiptionary.value.id);
  await chiptionaryStore.fetchAll();
}

</script>