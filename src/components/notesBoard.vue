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
                <div class="w-1/4 h-full" v-for="column in allColumns.filter(e => {return e.columnNumber == 1})" :key="column.id">
                    <p class="text-4xl" v-if="column.isEditing == 0" @click="editColumnName(column)"> {{ column.columnName }} </p>
                    <div v-else class="flex flex-row">
                        <input type="text" v-model="column.columnName" class="grid text-base w-3/4 h-9 bg-lgray border-b border-gray text-black focus:outline-none focus:border-b-black placeholder:text-gray" >
                        <button @click="editColumnName(column)" class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus">OK</button>
                    </div>
                    <draggable v-model="first_column" tag="ul" group="kolumny" class="h-full">
                        <template #item="{element: oneItem}">
                            <div class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white" @dblclick="deleteItemFromBox(oneItem)">
                                {{ oneItem.itemName }}
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="w-1/4 h-full" v-for="column in allColumns.filter(e => {return e.columnNumber == 2})" :key="column.id">
                    <p class="text-4xl" v-if="column.isEditing == 0" @click="editColumnName(column)">{{ column.columnName }}</p>
                    <div v-else class="flex flex-row">
                        <input type="text" v-model="column.columnName" class="grid text-base w-3/4 h-9 bg-lgray border-b border-gray text-black focus:outline-none focus:border-b-black placeholder:text-gray" >
                        <button @click="editColumnName(column)" class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus">OK</button>
                    </div>
                    <draggable v-model="second_column" tag="ul" group="kolumny" class="h-full">
                        <template #item="{element: oneItem}">
                            <div class="block overflow-hidden break-words relative cursor-pointer text-center rounded-lg p-5 m-2 realshadow bg-white" @dblclick="deleteItemFromBox(oneItem)">
                                {{ oneItem.itemName }}
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="w-1/4 h-full" v-for="column in allColumns.filter(e => {return e.columnNumber == 3})" :key="column.id">
                    <p class="text-4xl" v-if="column.isEditing == 0" @click="editColumnName(column)"> {{ column.columnName }}</p>
                    <div v-else class="flex flex-row">
                        <input type="text" v-model="column.columnName" class="grid text-base w-3/4 h-9 bg-lgray border-b border-gray text-black focus:outline-none focus:border-b-black placeholder:text-gray" >
                        <button @click="editColumnName(column)" class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus">OK</button>
                    </div>
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
    import { onMounted, ref, watch } from 'vue'    
    import draggable from 'vuedraggable'
    import { useBoxStore } from './stores/box.js';
    import { useNotesStore } from './stores/notes.js'
    import { useColumnsStore } from './stores/columns';
    import { useRoute } from 'vue-router';


    const boxFromStore = useBoxStore()
    const notesFromStore = useNotesStore()
    const columnsFromStore = useColumnsStore()
    let uri = window.location.href.split('/')


    const first_column = ref([])
    const second_column = ref([])
    const third_column = ref([])

    const allBox = ref([])
    const allItems = ref([])
    const allColumns = ref([])

    async function deleteItemFromBox(item) {
        const confirmText = "Are you sure you want to delete?"
        if (confirm(confirmText)) {
            notesFromStore.deleteNote(item)
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



    async function loadOnBoardType() {
        allBox.value = await boxFromStore.readAllBox()
        allItems.value = await notesFromStore.readAllNotes()
        allColumns.value = await columnsFromStore.readSomeColumns(uri[4])
        console.log(uri[4])
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

    async function editColumnName(col) {
        if (col.isEditing == 0) {
            col.isEditing = 1
        } else {
            col.isEditing = 0
            await columnsFromStore.changeColumnsName(col)
        }
    }

    const route = useRoute()
    watch(route, async () => { 
        uri = window.location.href.split('/')
        loadOnBoardType()
    })

    onMounted(async () => {
        await loadOnBoardType()
    })
</script>