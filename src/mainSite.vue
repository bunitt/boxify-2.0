<template>
    <appBar/>
    <navigationBar/>
    <mainContener/>
  </template>
  
  <script setup>
    import appBar from './components/appBar.vue'
    import navigationBar from './components/navigationBar.vue'
    import box from './components/box.vue'
    import mainContener from './components/main.vue'
  
    import {onMounted, ref} from 'vue'
    import { createDirectus, createItem, deleteItem, deleteItems, readItems, rest, updateItem } from '@directus/sdk'
    const client = createDirectus('http://localhost:8055/').with(rest());
    const allBox = ref([])
    const allItems = ref([])
    const isSorting = ref(false)
    const text = ref("")
    const items = ref(['Standard', 'List', 'Board'])
    const select = ref(items.value[0])
    let columnOne = 0
    let columnTwo = 0
    let columnThree = 0
  
    
    async function addBox() {
      let temp = -1
      switch (select.value) {
        case "Standard":
          temp = 0
          break
        case "List": 
          temp = 1
          break
        case "Board":
          temp = 2
          break
      }
      console.log(temp)
      if (text.value != "") {
        await client.request(createItem('box', {boxTitle: text.value, boxType: temp, isEditing: 0}))
        text.value = ''
        allBox.value = await client.request(readItems('box'))
      }
    }
    
    async function deleteBox(item) {
      await client.request(deleteItem('box', item.id))
      await client.request(deleteItems('item', {
        filter: {
          boxId: {
            _eq: item.id,
          },
        },
      }))
      allBox.value = await client.request(readItems('box'))
    }
  
  
    async function changeEditState(item) {
      if (item.isEditing == 1) {
        item.isEditing = 0
        await client.request(updateItem('box', item.id, {boxTitle: item.boxTitle, isEditing: 0}))
      } else {
        item.isEditing = 1
      }
    }
  
    async function changeState() {
      isSorting.value = !isSorting.value
          
      if (isSorting.value) {
        allBox.value = await client.request(readItems('box', {
            sort: ['boxTitle']
        }))
      } else {
        allBox.value = await client.request(readItems('box'))
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
  
  
    onMounted(async () => {
        allBox.value = await client.request(readItems('box'));
        allItems.value = await client.request(readItems('item'))
        console.log(allBox)
    })
  
  </script>