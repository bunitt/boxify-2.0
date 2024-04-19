import { defineStore } from 'pinia'
import { createDirectus, readItems, rest, deleteItem, updateItem, createItem, deleteItems } from '@directus/sdk'
const client = createDirectus('http://localhost:8055/').with(rest());
let notesFromDatabase = await client.request(readItems('item'))   

export const useNotesStore = defineStore('notes', {
    state: () => ({
        allNotes: notesFromDatabase,
    }),
    actions: {
        async readAllNotes() {
            return await client.request(readItems('item'))
        },
        async deleteNote(note) {
            await client.request(deleteItem('item', note.id))
        },
        async saveNotesPosition(element, column) {
            await client.request(updateItem('item', element.id, {
                col: column
            }))
        },
        async addNewNote(text, url) {
            await client.request(createItem('item', {itemName: text, boxId: url, isCharacterize: 0, col: 1}))
        },
        async characterizeNote(note) {
            if (note.isCharacterize == 0) {
                await client.request(updateItem('item', note.id, {boxId: note.boxId, itemName: note.itemName, isCharacterize: 1}))
            } else {
                await client.request(updateItem('item', note.id, {boxId: note.boxId, itemName: note.itemName, isCharacterize: 0}))
            }
        },
        async deleteAllCharacterizedNotes() {
            await client.request(deleteItems('item', {
                filter: {
                    isCharacterize: {
                        _eq: 1
                    }
                }
            }))
        }, 
        async sortNotes() {
            return await client.request(readItems('item', { sort: ['itemName'] }))
        }
    } 
})