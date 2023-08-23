<script setup>

import { ref,onBeforeMount } from 'vue';
import { fetchRss,fetchData } from "@/services/api.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const tabPodcast = ref([]);


const navigateTo = (id) =>{
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

    <h1>Podcast</h1>


    <div v-for="podcast in tabPodcast">
      <!-- <audio :src="" controls></audio> -->
      <img :src="podcast.image" alt="" style="width: 50px;height: 50px;" @click="navigateTo(podcast.title)">
      <!-- {{podcast.link}} -->
      {{podcast.title}}
    </div>


    <!-- <audio src="https://storage.gra.cloud.ovh.net/v1/AUTH_1db17c9a9c714ce39f508d240f11d920/octopus-bucket/c62218df-0968-40fc-96e7-bc4fa69327a5/049f79ea-cb92-4f33-9869-ec1dc9b7876b.mp3" controls></audio> -->


    <!-- <audio src="https://octopus.saooti.com/main/pub/podcast/273938.mp3" controls></audio> -->

    <!-- https://octopus.saooti.com/main/pub/podcast/273938.mp3 -->


</template>

<style scoped>

</style>
