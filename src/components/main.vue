<template>
    <main class="max-w-100% lg:pl-64 pr-0 pt-16 pb-0 min-h-screen">
        <box v-if="!$route.params.id"/>
        <div v-for="box in allBox.filter(e => {return e.id == $route.params.id})">
            <notesStandard v-if="box.boxType == 0"/>
            <notesList v-else-if="box.boxType == 1"/>
            <notesBoard v-else-if="box.boxType == 2" />
        </div>
    </main>
</template>

<script setup>
    import box from './box.vue'
    import notesStandard from './notesStandard.vue';
    import notesList from './notesList.vue';
    import notesBoard from './notesBoard.vue';
    import { onMounted, ref } from 'vue'    
    import { createDirectus, readItems, rest } from '@directus/sdk'
    const client = createDirectus('http://localhost:8055/').with(rest());

    const allBox = ref([])

    onMounted(async () => {
        allBox.value = await client.request(readItems('box'));
    })

</script>