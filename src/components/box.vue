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
            <div v-for="i in allItems.filter(e => {return e.boxId == box.id})" :key="i.id">
                <p v-if="i.isCharacterize == 1" class="m-1 line-through text-pink">{{ i.itemName }}</p>
                <p v-else-if="box.boxType != 2" class="m-1 text-gray">{{ i.itemName }}</p>
            </div>
            <div v-if="box.boxType == 2" class="text-gray">
                {{ inColumnNumber(box) }}
                <p>First column: {{ columnOne }}</p>
                <p>Second column: {{ columnTwo }}</p>
                <p>Third column: {{ columnThree }}</p>
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
    const notesFromStore = useNotesStore()
    const boxFromStore = useBoxStore()

    const imgs = ["/src/img/box-solid.svg", "/src/img/list-solid.svg", "/src/img/flipboard.svg"]

    const allBox = ref([])
    const allItems = ref([])
    const isSorting = ref(false)
    let columnOne = 0
    let columnTwo = 0
    let columnThree = 0

    async function deleteBox(item) {
        const confirmText = "Are you sure you want to delete?"
        if (confirm(confirmText)) {
            await boxFromStore.deleteBox(item.id)
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

    function inColumnNumber(box) {
        columnOne = 0
        columnTwo = 0
        columnThree = 0
      
        allItems.value.forEach(element => {
            if (element.boxId == box.id) {
                if (element.col == 1) {
                    columnOne += 1
                } else if (element.col == 2) {
                    columnTwo += 1
                } else {
                    columnThree += 1
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
    })

</script>