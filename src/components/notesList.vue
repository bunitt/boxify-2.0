<template>
    <div v-for="box in allBox.filter(f => {return f.id == $route.params.id})" :key="box.id" class="max-w-6xl w-full p-4 mr-auto ml-auto m-0">
        <h3 class="text-4xl leading-10 font-sans mb-2">
            {{ box.boxTitle }}
        </h3>
        <div class="flex lg:flex-row lg:justify-between flex-col gap-3">
            <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus"  @click="changeState" v-if="isSorting == false">SORT ALPHABETICALLY</button>
            <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="changeState" v-else>SORT BY DATE</button>
            <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="deleteAllCharacterize">DELETE ALL CHARACTERIZED</button>
        </div>
        <div class="max-w-6xl w-full p-4 mr-auto ml-auto">
            <div class="flex flex-wrap -m-3">
                <div class="basis-0 grow max-w-full" v-for="item in allItems.filter(e => {return e.boxId == $route.params.id})">
                    <div v-if="item.isCharacterize == 0" class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white min-w-64" @click="characterizeNote(item)">
                        {{ item.itemName }}
                    </div>
                    <div v-else class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white min-w-64 line-through text-pink" @click="characterizeNote(item)">
                        {{ item.itemName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'    
    import { createDirectus, readItems, rest, deleteItems, updateItem } from '@directus/sdk'
    const client = createDirectus('http://localhost:8055/').with(rest());

    const allBox = ref([])
    const allItems = ref([])
    const isSorting = ref(false)

    async function characterizeNote(note) {
        if (note.isCharacterize == 0) {
            await client.request(updateItem('item', note.id, {boxId: note.boxId, itemName: note.itemName, isCharacterize: 1}))
            allItems.value = await client.request(readItems('item'))
        } else {
            await client.request(updateItem('item', note.id, {boxId: note.boxId, itemName: note.itemName, isCharacterize: 0}))
            allItems.value = await client.request(readItems('item'))
        }
    }

    async function deleteAllCharacterize() {
        const confirtmText = "Are you sure you want to delete?"
        if (confirm(confirtmText)) {
            await client.request(deleteItems('item', {
                filter: {
                    isCharacterize: {
                        _eq: 1
                    }
                }
            }))
            allItems.value = await client.request(readItems('item'))
        }
    }

        async function changeState() {
        isSorting.value = !isSorting.value
        
        if (isSorting.value) {
            allItems.value = await client.request(readItems('item', {
                sort: ['itemName']
            }))
        } else {
            allItems.value = await client.request(readItems('item'))
        }
    }

    onMounted(async () => {
        allBox.value = await client.request(readItems('box'));
        allItems.value = await client.request(readItems('item'))
    })
</script>