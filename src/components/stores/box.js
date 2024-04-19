import { defineStore } from 'pinia'
import { createDirectus, readItems, rest, deleteItem, updateItem, createItem, deleteItems } from '@directus/sdk'
const client = createDirectus('http://localhost:8055/').with(rest());
let boxFromDatabase = await client.request(readItems('box'))   

export const useBoxStore = defineStore('box', {
    state: () => ({
        allBox: boxFromDatabase
    }),
    actions: {
        async readAllBox() {
            return await client.request(readItems('box'))
        },
        async addBox(text, selectValue) {
            await client.request(createItem('box', {boxTitle: text, boxType: selectValue, isEditing: 0}))
        },
        async deleteBox(id) {
            await client.request(deleteItem('box', id))
            await client.request(deleteItems('item', {
              filter: {
                boxId: {
                  _eq: id,
                },
              },
            }))
        },
        async updateBoxTitle(item) {
            await client.request(updateItem('box', item.id, {boxTitle: item.boxTitle, isEditing: 0}))
        },
        async sortBox() {
            return await client.request(readItems('box', { sort: ['boxTitle'] }))
        }
    }
})
