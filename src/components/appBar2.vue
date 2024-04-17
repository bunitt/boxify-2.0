<template>
    <header class="bg-purple top-0 fixed left-0 w-full shadow-xl h-16 pl-4 p-2 flex items-center max-w-full z-50">    
        <h2 class="text-2xl md:text-3xl lg:text-5xl text-white leading-loose font-normal font-sans"><a href="/">Boxify</a></h2>
        <div class="w-1/4 ml-3">
            <input v-model="text" type="text" class="grid text-base w-full h-6 bg-purple border-b border-lgpurple text-white focus:outline-none focus:border-b-white placeholder:text-lgpurple" placeholder="Add notes"/>
        </div>
        <button @click="addNewItem" class="ml-3 border border-white px-3.5 min-h-9 rounded text-white text-sm hover:bg-lgpurple1">ADD</button>
    </header>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { createDirectus, createItem, readItems, deleteItem, rest, updateItem, deleteItems } from '@directus/sdk'
    const client = createDirectus('http://localhost:8055/').with(rest());

    const text = ref("")
    const allBox = ref([])
    const allItems = ref([])
    let uri = window.location.href.split('/')

    async function addNewItem() {
        if (text.value != "") {
            await client.request(createItem('item', {itemName: text.value, boxId: uri[4], isCharacterize: 0, col: 1}))
            text.value = ''
            allItems.value = await client.request(readItems('item'))
        }
        location.reload()
    }


</script>