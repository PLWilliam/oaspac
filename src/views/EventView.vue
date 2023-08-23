<script setup>

import axios from 'axios';
import { fetchRss,fetchData } from "@/services/api.js";
import { ref,onBeforeMount } from 'vue';
import { parseString } from "xml2js";

const tabEvent = ref();

const getAllEvent = async()=>{
  
    const event = await fetchData('https://latinoclub.fr/event')
    console.log(event.fileContent);

    await fetchRss(); 



    console.log(await fetchRss('https://capsao.com/rss-feed-34'));


}

onBeforeMount(async()=>{
  const event = await getAllEvent();

})

</script>

<template>

    <h1>Event</h1>

</template>

<style scoped>

</style>
