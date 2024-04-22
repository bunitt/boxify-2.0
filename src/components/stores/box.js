import { defineStore } from 'pinia'
import { createDirectus, readItems, rest, deleteItem, updateItem, createItem, deleteItems } from '@directus/sdk'
const client = createDirectus('http://localhost:8055/').with(rest());
let boxFromDatabase = await client.request(readItems('box'))   

export const useBoxStore = defineStore('box', {
    state: () => ({
        allBox: boxFromDatabase,
        boardTypeHandler: [],
        lastBox:[],
    }),
    actions: {
        async readAllBox() {
            return await client.request(readItems('box'))
        },
        async addBox(text, selectValue) {
            await client.request(createItem('box', {boxTitle: text, boxType: selectValue, isEditing: 0}))
            this.boardTypeHandler = await this.readAllBox()
            for (let i = 0; i < this.boardTypeHandler.length; i++) {
                this.lastBox = this.boardTypeHandler[i]
                console.log(this.lastBox)
            }
            console.log(this.lastBox)
            if (this.lastBox.boxType == 2) {
                console.log(this.lastBox)
                await client.request(createItem('columns', {boxId: this.lastBox.id, columnName: "First", columnNumber: 1, isEditing:0}))
                await client.request(createItem('columns', {boxId: this.lastBox.id, columnName: "Second", columnNumber: 2, isEditing:0}))
                await client.request(createItem('columns', {boxId: this.lastBox.id, columnName: "Third", columnNumber: 3, isEditing:0}))
            }
        },
        async deleteBox(item) {
            if (item.boxType == 2) {
                await client.request(deleteItems('columns', {
                    filter:{
                        boxId:{
                            _eq: item.id
                        }
                    }
                }))
            }
            await client.request(deleteItem('box', item.id))
            await client.request(deleteItems('item', {
              filter: {
                boxId: {
                  _eq: item.id,
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
