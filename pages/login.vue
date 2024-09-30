

<template>
  <div class=" h-screen ">
    <div class="flex justify-center items-center h-full">
      <div class="border-[2px] rounded-md px-5 py-2 w-96 ">
        <label class="">
          <div class="label">
            <span class="label-text text-xl mb-5">Login</span>
          </div>
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
            <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
              type="text"
              class="grow"
              placeholder="Username"
              v-model="loginForm.username"
              @input="validateUsername"
          />
        </label>
        <div class="label">
          <span class="label-text-alt text-red-500 mb-5">{{formError.username}}</span>
        </div>

        <label class="input input-bordered flex items-center gap-2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
            <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
          </svg>
          <input
              type="password"
              class="grow"
              value=""
              v-model="loginForm.password"
              @input="validatePassword"
          />
        </label>
        <div class="label">
          <span class="label-text-alt text-red-500">{{formError.password}}</span>
        </div>

<!--        <p v-if="error" class="text-red-600">{{ errorMessage }}</p>-->

        <button
            @click="submit"
            class="btn bg-blue-500 w-full mt-4 text-white hover:bg-blue-600 mb-3"
        >Login</button>

      </div>
    </div>
  </div>


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {useErrorStore} from "~/stores/error-store";
import {useAuthStore} from "~/stores/auth-store";
import {ValidateUtil} from "~/util/validate-util";
import type {LoginRequest} from "~/model/auth/auth";

const username = ref<string>('');
const password = ref<string>('');
const rememberMe = ref<boolean>(false);
const errorMessage = ref('');
const error = ref(false);
const valid = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const authStore = useAuthStore();
const errorStore = useErrorStore();
const router = useRouter();
const loginForm = ref<LoginRequest>({
  username: '',
  password: '',
});

definePageMeta({
  layout: 'normal'
})

// const usernameRules = [
//   (v: string) => !!v || 'Username is required',
//   (v: string) => (v && v.length >= 3) || 'Username must be at least 3 characters',
// ];
//
// const passwordRules = [
//   (v: string) => !!v || 'Password is required',
//   (v: string) => (v && v.length >= 6) || 'Password must be at least 6 characters',
// ];

const formError = ref({
  username: '',
  password: '',
});

const validateUsername = () => {
  if (ValidateUtil.isEmpty(loginForm.value.username)){
    formError.value.username = 'Username is required';
  }else if (loginForm.value.username.length < 3){
    formError.value.username = 'Username must be at least 3 characters';
  }else {
    formError.value.username = '';
  }
}

const validatePassword = () => {
  if (ValidateUtil.isEmpty(loginForm.value.password)){
    formError.value.password = 'Password is required';
  }else if (loginForm.value.password.length < 6){
    formError.value.password = 'Password must be at least 6 characters';
  }else{
    formError.value.password = '';
  }
}

const submit = async () => {
  validateUsername();
  validatePassword();

  if (ValidateUtil.areFieldsEmpty(formError.value)) {

    await authStore.loginUser(loginForm.value.username, loginForm.value.password);
    console.log(errorStore.statusCode);
    if(authStore.isLoginValid){
      await router.push('/notifications')
    }

    if(errorStore.statusCode === 401){
      console.log('not valid {}', errorStore.statusCode);
      errorMessage.value = 'Incorrect username or password';
      error.value = true;
    }
  }
};

</script>
