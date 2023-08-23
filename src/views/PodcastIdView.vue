<script setup>

import { useRouter } from 'vue-router'
import {fetchData,fetchRss} from '@/services/api.js'
import { ref,onBeforeMount} from 'vue'

const router = useRouter();


const currentPodcast = ref('');
const isMounted = ref(false);

const play = ref([]);
const isPlay = ref([]);



const buttonPlayPause = (idx)=>{

    const audio = document.querySelectorAll('audio');

    if(isPlay.value[idx]){
        play.value[idx] = 'play';
        audio[idx].pause();
        isPlay.value[idx]=0;
    }
    else{
        for (let i = 0; i < isPlay.value.length; i++) {
            play.value[i]='play'
            isPlay.value[i]=0;     
            audio[i].pause();
        }
        isPlay.value[idx]=1;
        play.value[idx] = 'pause';
        audio[idx].play();
    }
}


const countPlayButton = (current)=>{
    current.items.forEach(element => {
        isPlay.value.push(0);
        play.value.push('play');
    });
}


onBeforeMount(async()=>{
  const podcastRss = await fetchData('https://latinoclub.fr/api/api_podcasts');
  const id = router.currentRoute.value.params.id;
  // console.log(podcastRss);

  podcastRss['hydra:member'].forEach(async (element) => {
    // console.log(element.link);
    const current = await fetchRss(element.link);
    if(current.title===id){
        currentPodcast.value = current;
        countPlayButton(currentPodcast.value);
        isMounted.value = true;
        // console.log(currentPodcast.value);
    }
  });
  
})



</script>

<template>

    <h1>Solo podcast</h1>


    <div v-if="isMounted">

        {{ currentPodcast.title }}
        <img :src="currentPodcast.image" alt="" style="width: 50px;height: 50px;">

        <div v-for="( episode,index ) in currentPodcast.items">
            <!-- <p>{{ episode }}</p> -->
            <p>{{ episode.itunes_duration }}</p>
            <img :src="episode.itunes_image.href" alt="" style="width: 50px;height: 50px;">
            <p>{{ episode.title }}</p>
            <audio :src="episode.enclosures[0].url" controls></audio>
            <button @click="buttonPlayPause(index)">{{ play[index] }}</button>

        </div>
    </div>



</template>

<style scoped>

</style>
