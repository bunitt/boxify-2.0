<template>
    <div class="max-w-6xl w-full p-4 mr-auto ml-auto">
        <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="changeState" v-if="isSorting == false">SORT ALPHABETICALLY</button>
        <button class="px-3.5 min-h-9 rounded bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="changeState" v-else>SORT BY DATE</button>
        <div v-for="box in allBox" :key="box.id" class="rounded-lg p-8 mt-3 realshadow">
            <p to="/box" @click="$router.push('/box/' + box.id)" v-if="box.isEditing == 0" class="cursor-pointer text-2xl leading-8 font-sans flex items-center">
                <img v-bind:src="imgs[box.boxType]" class="h-7 mr-2">
                {{ box.boxTitle }}
            </p>
            <input type="text" v-model="box.boxTitle" class="grid text-base w-3/4 h-9 bg-lgray border-b border-gray text-black focus:outline-none focus:border-b-black placeholder:text-gray" placeholder="Type new box name" v-else>
            <div class="flex flex-row">
                <div v-if="box.isShowed == 1" class="w-4/5">
                    <div class="flex flex-col m-0" v-if="box.boxType != 2">
                        <div v-for="i in allItems.filter(e => {return e.boxId == box.id})" :key="i.id" class="ml-1">
                            <p v-if="i.isCharacterize == 1" class="line-through text-pink">{{ i.itemName }}</p>
                            <p v-else-if="box.boxType != 2" class="text-gray">{{ i.itemName }}</p>
                        </div>
                    </div>
                    <div v-if="box.boxType == 2" class="text-gray text-left">
                            {{ inColumnNumber(box) }}
                            <p>{{ columnsNames[0] }}: {{ columnsNumber[0] }}</p>
                            <p>{{ columnsNames[1] }}: {{ columnsNumber[1] }}</p>
                            <p>{{ columnsNames[2] }}: {{ columnsNumber[2] }}</p>
                    </div>
                </div>
                <div v-else class="w-4/5">
                    <div class="bg-lgray text-dgray p-1 rounded-md text-center w-10">
                        ...
                    </div>
                </div>
                <div class="w-1/5 flex place-content-end">
                    <img v-if="box.isShowed == 1" src="../img/chevron-down-solid.svg" class="h-7 mr-2 cursor-pointer" @click="showAndHideNotes(box)">
                    <img v-else src="../img/chevron-up-solid.svg" class="h-7 mr-2 cursor-pointer" @click="showAndHideNotes(box)">
                </div>
            </div>
            <button v-if="box.isEditing == 0" class="px-3.5 min-h-9 rounded-lg bg-purple text-purplewhite tracking-wider text-sm realshadow mt-3 mr-3 hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="changeEditState(box)">EDIT</button>
            <button v-else class="px-3.5 min-h-9 rounded-lg bg-purple text-purplewhite tracking-wider text-sm realshadow mt-3 mr-3 hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="changeEditState(box)">CONFIRM</button>
            <button class="px-3.5 min-h-9 rounded-lg bg-purple text-purplewhite tracking-wider text-sm realshadow hover:bg-lgpurple1 focus:ring-4 focus:ring-purplefocus" @click="deleteBox(box)">DELETE</button>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'    
    import { useBoxStore } from './stores/box.js';
    import { useNotesStore } from './stores/notes';
    import { useColumnsStore } from './stores/columns';

    const notesFromStore = useNotesStore()
    const boxFromStore = useBoxStore()
    const columnsFromStore = useColumnsStore()

    const imgs = ["/src/img/box-solid.svg", "/src/img/list-solid.svg", "/src/img/flipboard.svg"]

    const allBox = ref([])
    const allItems = ref([])
    const allColumns = ref([])
    const isSorting = ref(false)
    let columnsNumber = [0, 0, 0]
    let columnsNames = ["", "", ""]

    async function deleteBox(item) {
        const confirmText = "Are you sure you want to delete?"
        if (confirm(confirmText)) {
            await boxFromStore.deleteBox(item)
            allBox.value = await boxFromStore.readAllBox()
        }
    }

    async function changeEditState(item) {
      if (item.isEditing == 1) {
        item.isEditing = 0
        await boxFromStore.updateBoxTitle(item)
      } else {
        item.isEditing = 1
      }
    }

    function showAndHideNotes(item) {
        if (item.isShowed == 1) {
            item.isShowed = 0
        } else {
            item.isShowed = 1
        }
        boxFromStore.saveShowed(item)
    }

    function inColumnNumber(box) {
        columnsNumber = [0, 0, 0]
        columnsNames = ["", "", ""]

      
        allItems.value.forEach(element => {
            if (element.boxId == box.id) {
                if (element.col == 1) {
                    columnsNumber[0] += 1
                } else if (element.col == 2) {
                    columnsNumber[1] += 1
                } else {
                    columnsNumber[2] += 1
                }
            }
        });

        allColumns.value.forEach(element => {
            if (element.boxId == box.id) {
                if (element.columnNumber == 1) {
                    columnsNames[0] = element.columnName
                } else if (element.columnNumber == 2) {
                    columnsNames[1] = element.columnName
                } else {
                    columnsNames[2] = element.columnName
                }
            }
        });
    }

    async function changeState() {
        isSorting.value = !isSorting.value
        
        if (isSorting.value) {
            allBox.value = await boxFromStore.sortBox()
        } else {
            allBox.value = await boxFromStore.readAllBox()
        }
    }

    onMounted(async () => {
        allBox.value = await boxFromStore.readAllBox()
        allItems.value = await notesFromStore.readAllNotes()
        allColumns.value = await columnsFromStore.readAllColumns()
    })

</script>