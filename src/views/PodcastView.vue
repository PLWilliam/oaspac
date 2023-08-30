<script setup>

import { ref,onBeforeMount } from 'vue';
import { fetchRss,fetchData } from "@/services/api.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const tabPodcast = ref([]);


const soloPodcast = (id) =>{
  // console.log(id);
  router.push({name:'podcastId',params:{id:id}})
}


onBeforeMount(async()=>{
  const podcastRss = await fetchData('https://latinoclub.fr/api/api_podcasts');

  // console.log(podcastRss);

  podcastRss['hydra:member'].forEach(async (element) => {
    // console.log(element.link);
    tabPodcast.value.push(await fetchRss(element.link));
  });




// console.log(tabPodcast.value);


})

</script>

<template>
  <main>
    <div class="container">
              <div class="allPodcast">
                  <div class="singlePodcast" v-for="podcast in tabPodcast">
                      <img :src="podcast.image" alt="" @click="soloPodcast(podcast.title)">
                      <span>{{ podcast.title }}</span>
                  </div> 
              </div>
          </div>
  </main>
</template>

<style scoped>
  main{
      display: flex;
      justify-content: center;
      align-items: center;
  }
</style>
