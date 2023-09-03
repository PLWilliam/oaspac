<script setup>

import { ref,onBeforeMount } from 'vue';
import { fetchRss,fetchData } from "@/services/api.js";
import { useRouter } from 'vue-router';

document.title = 'Podcasts';

const router = useRouter();

const tabPodcast = ref([]);
const loaded = ref(false);

const getPodcast = async()=>{
  const podcastRss = await fetchData('https://latinoclub.fr/api/api_podcasts');

    // console.log(podcastRss);

    podcastRss['hydra:member'].forEach(async (element) => {
      // console.log(element.link);
      tabPodcast.value.push(await fetchRss(element.link));
    });
}

const soloPodcast = (id) =>{
  // console.log(id);
  router.push({name:'podcastId',params:{id}})
}



onBeforeMount(async()=>{
  await getPodcast();
  loaded.value = true

})

</script>

<template>
  <div v-if="loaded">
    <h2 class="titre">NOS PODCASTS</h2>
    
    <main>
      <div class="container">
        <div class="allPodcast">
          <div class="singlePodcast" v-for="podcast in tabPodcast">
            <div class="podcast">
              <div><img :src="podcast.image" alt="" @click="soloPodcast(podcast.title)"></div>
              <span>{{ podcast.title }}</span>
            </div>
          </div> 
        </div>
      </div>
    </main>
  </div>
  <div v-else>
      LOADING . . .
  </div>
</template>

<style scoped>
  main{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .singlePodcast:hover{
    cursor: pointer;
  }
</style>
