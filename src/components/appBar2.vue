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
    import { ref } from 'vue'
    import { useNotesStore } from './stores/notes';
    const notesFromStore = useNotesStore()

    const text = ref("")
    const allBox = ref([])
    const allItems = ref([])
    let uri = window.location.href.split('/')

    async function addNewItem() {
        if (text.value != "") {
            uri = window.location.href.split('/')
            await notesFromStore.addNewNote(text.value, uri[4])
            text.value = ''
            allItems.value = await notesFromStore.readAllNotes()
        }
        location.reload()
    }


</script>