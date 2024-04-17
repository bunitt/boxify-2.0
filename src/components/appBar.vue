<template>
    <header class="bg-purple top-0 fixed left-0 w-full shadow-xl h-16 pl-4 p-2 flex items-center max-w-full z-50">    
        <h2 class="text-2xl md:text-3xl lg:text-5xl text-white leading-loose font-normal font-sans"><a href="/">Boxify</a></h2>
        <div class="w-1/4 ml-3">
            <input v-model="text" type="text" class="grid text-base w-full h-6 bg-purple border-b border-lgpurple text-white focus:outline-none focus:border-b-white placeholder:text-lgpurple" placeholder="Add new box"/>
        </div>
        <div class="w-1/4 ml-3">
            <select class="w-full bg-purple border-b h-6 border-lgpurple text-white" v-model="select">
                <option v-for="item in items" v-bind:value="{id:item.id, value: item.name}">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <button @click="addBox" class="ml-3 border border-white px-3.5 min-h-9 rounded text-white text-sm hover:bg-lgpurple1">ADD</button>
    </header>
</template>

<script setup>
    import {onMounted, ref} from 'vue'
    import { createDirectus, createItem, deleteItem, deleteItems, readItems, rest, updateItem } from '@directus/sdk'
    
    const client = createDirectus('http://localhost:8055/').with(rest());
    const allBox = ref([])
    const text = ref("")
    const items = [
        {id:0, name: 'Standard'},
        {id:1, name: 'List'},
        {id:2, name: 'Board'}]
    const select = ref({id: 1, value: 'Standard'})

    async function addBox() {
        console.log(temp)
        if (text.value != "") {
            await client.request(createItem('box', {boxTitle: text.value, boxType: select.value.id, isEditing: 0}))
            text.value = ''
            location.reload();
        }
    }
</script>