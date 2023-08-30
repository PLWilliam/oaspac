<script setup>

import { useRouter } from 'vue-router'
import {fetchData,fetchRss} from '@/services/api.js'
import { ref,onBeforeMount} from 'vue'

const router = useRouter();


const currentPodcast = ref('');
const isMounted = ref(false);

const play = ref([]);
const isPlay = ref([]);

const playLogo = ref([]);

const audio = ref()

const buttonPlayPause = (idx)=>{

    // const audio = document.querySelectorAll('audio');

    console.log(playLogo.value[idx])

    if(isPlay.value[idx]){
        play.value[idx] = 'play';
        audio.value[idx].pause();
        isPlay.value[idx]=0;
        playLogo.value[idx].classList.remove("fa-pause");
        playLogo.value[idx].classList.add("fa-play");
    }
    else{
        for (let i = 0; i < isPlay.value.length; i++) {
            play.value[i]='play'
            isPlay.value[i]=0;     
            audio.value[i].pause();
            playLogo.value[i].classList.remove("fa-pause");
            playLogo.value[i].classList.add("fa-play");
        }
        isPlay.value[idx]=1;
        play.value[idx] = 'pause';
        audio.value[idx].play();
        playLogo.value[idx].classList.add("fa-pause");
        playLogo.value[idx].classList.remove("fa-play");
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

    <main>
        <div class="container">
            <div class="allPodcast">
                <div class="singlePodcast" v-for="( episode,index ) in currentPodcast.items">
                    <img :src="episode.itunes_image.href" alt="">
                    <span>{{ episode.title }}</span>
                    <div class="playerPodcast" @click="buttonPlayPause(index)">
                        <i class="fa-solid fa-play fa-xl" ref="playLogo"></i>
                    </div>
                    <audio :src="episode.enclosures[0].url" ref="audio"></audio>
                </div>
            </div>
        </div>
    </main>


</template>

<style scoped>

</style>
