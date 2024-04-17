<template>
    <div v-for="box in allBox.filter(f => {return f.id == $route.params.id})" :key="box.id" class="max-w-6xl w-full p-4 mr-auto ml-auto m-0">
        <h3 class="text-4xl leading-10 font-sans mb-2">
            {{ box.boxTitle }}
        </h3>
        <div>
            <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus"  @click="changeState" v-if="isSorting == false">SORT ALPHABETICALLY</button>
            <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="changeState" v-else>SORT BY DATE</button>
        </div>
        <div class="max-w-6xl w-full p-4 mr-auto ml-auto">
            <div class="flex flex-wrap -m-3">
                <div class="basis-0 grow max-w-full" v-for="item in allItems.filter(e => {return e.boxId == $route.params.id})">
                    <div class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white min-w-64" @click="deleteItemFromBox(item)">
                        {{ item.itemName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'    
    import { createDirectus, readItems, rest, deleteItem } from '@directus/sdk'
    const client = createDirectus('http://localhost:8055/').with(rest());

    const allBox = ref([])
    const allItems = ref([])
    const isSorting = ref(false)

    async function deleteItemFromBox(item) {
        const confirmText = "Are you sure you want to delete?"
        if (confirm(confirmText)) {
            await client.request(deleteItem('item', item.id))
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