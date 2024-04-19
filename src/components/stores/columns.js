import { defineStore } from 'pinia'
import { createDirectus, readItems, rest, deleteItem, updateItem, createItem, deleteItems } from '@directus/sdk'
const client = createDirectus('http://localhost:8055/').with(rest());
let columnsFromDatabase = await client.request(readItems('columns'))

export const useColumnsStore = defineStore('columns', {
    state: () => ({
        allColumns: columnsFromDatabase,
    }),
    actions: {
        async readAllColumns (url) {
            return await client.request(readItems('columns', {
                filter: {
                    boxId: {
                        _eq: url
                    }
                }
            }))
        },
        async changeColumnsName (col) {
            await client.request(updateItem('columns', col.id, {boxId: col.boxId, columnName: col.columnName, columnNumber: col.columnNumber, isEditing: 0}))
        }
    }
})