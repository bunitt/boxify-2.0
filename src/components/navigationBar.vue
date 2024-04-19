<template>
  <nav class="left-0 z-30 fixed top-16 bottom-0 w-64 right-auto border-r-2 bg-purple flex flex-col max-w-full duration-200 border-purple border-solid border-y-0 border-l-0 text-purplewhite -translate-x-full lg:translate-x-0" style="height: calc(100% - 64px); transition-property: box-shadow, transform, visibility, width, height, left, right, top, bottom;">
    <div class="h-full max-w-full overflow-x-hidden overflow-y-auto" style="flex: 0 1 auto">
      <li v-for="box in allBox" :key="box.id" @click="$router.push('/box/'+box.id)" class="cursor-pointer m-2">{{ box.boxTitle }}</li>
    </div>
  </nav>
</template>

<script setup>
    import { onMounted, ref } from 'vue'    
    import { useBoxStore } from './stores/box.js';

    const boxFromStore = useBoxStore()

    const allBox = ref([])

    onMounted(async () => {
      allBox.value = await boxFromStore.readAllBox()
    })
</script>