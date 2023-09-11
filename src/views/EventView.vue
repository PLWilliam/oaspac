<script setup>

import { fetchRss,fetchData } from "@/services/api.js";
import { ref,onBeforeMount } from 'vue';
import { parseString } from "xml2js";
import { decode } from "html-entities";

document.title = 'Evenement';

const eventObject = ref({});
const loaded = ref(false);

const getAllEvent = async()=>{
  const xml = await fetchData('https://latinoclub.fr/api/event');
  await XML(xml);

}

const XML = async (elem) => {

  await parseString(elem.fileContent, (err,result)=>{
    if (err) {
          console.error(err);
        } else {
          result.rss.channel[0].item.forEach((item) => {
            const itemDate = item["content:encoded"][0].split("<br");

            if (eventObject.value.hasOwnProperty(itemDate[0])) {
              item.name = itemDate[0];
              eventObject.value[itemDate[0]].push(item);
            } else {
              item.name = itemDate[0];
              eventObject.value[itemDate[0]] = [item];
            }
          });
          // console.log("dd", eventObject.value);
        }
  });
}

const goto = (event)=>{
  // console.log(event.link[0]);
  window.open(event.link[0], "_blank");
}

onBeforeMount(async()=>{
  await getAllEvent();
  loaded.value = true
})

</script>

<template>
    <!-- <h1>Event</h1> -->
    <div v-if="loaded">
      <div class="allEvent">
        <div v-for="dateObject in eventObject">
          <h2>{{ dateObject[0].name }}</h2>
          <div class="event">
            <div class="soloEvent" v-for="event in dateObject" @click="goto(event)">
              <!-- <a :href="event.link[0]" target="_blank"> -->
                <div><img :src="event.enclosure[0].$.url" alt=""></div>
                <h3>{{ decode(event.title[0]) }}</h3>
                <p>{{ decode(event.description[0]) }}</p>
                <!-- {{ decode(event[0]['content:encoded'][0]) }} -->
                <!-- <button>eaze</button> -->
              <!-- </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        LOADING . . .
    </div>


</template>

<style scoped>

</style>
