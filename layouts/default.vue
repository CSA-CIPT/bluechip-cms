<template>

<div>
    <Navbar/>
        <slot />
  <div v-if="authStore.showLogoutConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <p class="text-center mb-4">Are you sure want to logout?</p>
      <div class="flex justify-center space-x-4">
        <button @click="handlePopUpLogout" class="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
        <button @click="authStore.showLogoutConfirmation = false" class="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const handlePopUpLogout = async () => {
  await authStore.logoutUser();
  authStore.showLogoutConfirmation = false;
  await router.push('/login');
};

</script>
