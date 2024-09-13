<template>
    <div class="hover:bg-gray-200 cursor-pointer rounded-md p-2">
        <div class="flex justify-start items-center">
            <div class="mr-2">
                <Icon :name="icon" class="flex justify-center items-center text-[19px]"/>
            </div>
            <div class="flex text-sm">
                {{ title }}
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
});
</script>