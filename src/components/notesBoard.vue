<template>
    <div v-for="box in allBox.filter(f => {return f.id == $route.params.id})" :key="box.id" class="max-w-6xl w-full p-4 mr-auto ml-auto m-0 h-screen">
        <h3 class="text-4xl leading-10 font-sans mb-2">
            {{ box.boxTitle }}
        </h3>
        <div>
            <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="saveBoardChanges">SAVE CHANGES</button>
        </div>
        <div class="max-w-6xl w-full p-4 mr-auto ml-auto h-full">
            <div class="flex justify-between h-full">
                <div class="w-1/4 h-full">
                    <p class="text-4xl">First</p>
                    <draggable v-model="first_column" tag="ul" group="kolumny" class="h-full">
                        <template #item="{element: oneItem}">
                            <div class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white" @dblclick="deleteItemFromBox(oneItem)">
                                {{ oneItem.itemName }}
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="w-1/4 h-full">
                    <p class="text-4xl">Second</p>
                    <draggable v-model="second_column" tag="ul" group="kolumny" class="h-full">
                        <template #item="{element: oneItem}">
                            <div class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white" @dblclick="deleteItemFromBox(oneItem)">
                                {{ oneItem.itemName }}
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="w-1/4 h-full">
                    <p class="text-4xl">Third</p>
                    <draggable v-model="third_column" tag="ul" group="kolumny" class="h-full">
                        <template #item="{element: oneItem}">
                            <div class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white" @dblclick="deleteItemFromBox(oneItem)">
                                {{ oneItem.itemName }}
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { onMounted, ref } from 'vue'    
    import draggable from 'vuedraggable'
    import { useBoxStore } from './stores/box.js';
    import { useNotesStore } from './stores/notes.js'


    const boxFromStore = useBoxStore()
    const notesFromStore = useNotesStore()
    notesFromStore.readAllNotes()

    const first_column = ref([])
    const second_column = ref([])
    const third_column = ref([])
    let uri = window.location.href.split('/')

    const allBox = ref([])
    const allItems = ref([])


    async function deleteItemFromBox(item) {
        const confirmText = "Are you sure you want to delete?"
        if (confirm(confirmText)) {
            notesFromStore.deleteNote(item)
            allItems.value = await notesFromStore.readAllNotes()
        }

        loadOnBoardType()
    }

    async function saveBoardChanges() { 
        allItems.value.forEach(element => {
            for (let i = 0; i < first_column.value.length; i++) {
                if (element == first_column.value.at(i)){
                    notesFromStore.saveNotesPosition(element, 1)
                }
            }
            for (let i = 0; i < second_column.value.length; i++) {
                if (element == second_column.value.at(i)){
                    notesFromStore.saveNotesPosition(element, 2)
                }
            }
            for (let i = 0; i < third_column.value.length; i++) {
                if (element == third_column.value.at(i)){
                    notesFromStore.saveNotesPosition(element, 3)
                }
            }
        });
    }



    function loadOnBoardType() {
        first_column.value = []
        second_column.value = []
        third_column.value = []
        allItems.value.forEach(e => {
            if (e.boxId == uri[4]) {
                if (e.col == 1) {
                    first_column.value.push(e)
                } else if (e.col == 2) {
                    second_column.value.push(e)
                } else if (e.col == 3) {
                    third_column.value.push(e)
                }
            }
        });
    }

    onMounted(async () => {
        allBox.value = await boxFromStore.allBox()
        allItems.value = await notesFromStore.readAllNotes()
        console.log(allItems.value)

        loadOnBoardType()
    })
</script>