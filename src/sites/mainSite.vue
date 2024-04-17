<template>
    <appBar v-if="!$route.params.id"/>
    <appBar2 v-else/>
    <navigationBar/>
    <mainContener/>
  </template>
  
  <script setup>
    import appBar from '../components/appBar.vue'
    import appBar2 from '../components/appBar2.vue';
    import navigationBar from '../components/navigationBar.vue'
    import mainContener from '../components/main.vue'
  </script>