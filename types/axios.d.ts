// types/axios.d.ts
import { NuxtApp } from 'nuxt/app';
import { AxiosInstance } from 'axios';

declare module 'nuxt/app' {
  interface NuxtApp {
    $axios: AxiosInstance;
  }
}
