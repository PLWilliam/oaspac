<script setup>

import axios from 'axios';
import { fetchRss,fetchData,fetchRssURL } from "@/services/api.js";
import { ref,onBeforeMount } from 'vue';
import { parseString } from "xml2js";

const tabEvent = ref();

const getAllEvent = async()=>{
  
    // const event = await fetchData('https://latinoclub.fr/event')
    // console.log(event.fileContent);

    // await fetchRss(); 



    // console.log(await fetchRss('https://capsao.com/rss-feed-34'));
    const events = await axios.get('https://latinoclub.fr/api/event')
    // console.log(events);
    // console.log(parseString('https://capsao.com/rss-feed-34'));


  if(events.status==200){
    console.log(events.data.fileContent);
    // console.log(parseString(events.data.fileContent));
    parseString(events.data.fileContent, (err,result)=>{
      if (err) {
          console.error(err);
          // return err;
        }else{
          console.log(result);
          return result;
        }
    })
  }

  

}

onBeforeMount(async()=>{
  await getAllEvent();

})

</script>

<template>

    <h1>Event</h1>

</template>

<style scoped>

</style>
