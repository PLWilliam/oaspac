<script setup>

import { ref,onBeforeMount } from 'vue';
import { fetchRss,fetchData } from "@/services/api.js";
import { useRouter } from 'vue-router';

document.title = 'Accueil';

const router = useRouter();

const sliders = ref();
const podcasts = ref([]);
const slideNbr = ref(0);
const txt = ref();
const loaded = ref(false);

const getSlider = async()=>{
    sliders.value = await fetchData('https://latinoclub.fr/api/sliders');
    // console.log(sliders.value['hydra:member']);
    sliders.value = sliders.value['hydra:member']
}

const getText = async()=>{
    txt.value = await fetchData('https://latinoclub.fr/api/zone_textes/1');
}

const getPodcast = async()=>{
    const fetchPodcast = await fetchData('https://latinoclub.fr/api/api_podcasts');
    fetchPodcast['hydra:member'].forEach(async (element) => {
        // console.log(element.link);
        podcasts.value.push(await fetchRss(element.link));
    });
    // console.log(podcasts.value);
}

const left = ()=>{
    // console.log(slideNbr.value);
    if(slideNbr.value>0){
        slideNbr.value--;
    }
    else{
        slideNbr.value=sliders.value.length-1;
    }
}

const right = ()=>{
    // console.log(slideNbr.value);
    if(slideNbr.value<sliders.value.length-1){
        slideNbr.value++;
    }
    else{
        slideNbr.value=0;
    }
}

const goto = (id)=>{
    router.push({name:'podcastId',params:{id}});
}

onBeforeMount(async()=>{
  await getSlider();
  await getPodcast();
  await getText();
  loaded.value=true;
  
})
</script>

<template>
    <div class="home" v-if="loaded">
        <div class="containerSlider">
            <div class="slider">
                <a :href="sliders[slideNbr].link" target="_blank"><img :src="sliders[slideNbr].urlImg" alt=""></a>
                <div @click="right"><i class="fa-solid fa-chevron-left"></i></div>
                <div @click="left"><i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </div>

        <h2 class="titre">PODCASTS</h2>
        <div class="containerPodcast">
            <div class="listPodcast">
                <div v-for="podcast in podcasts">
                    <img :src="podcast.image" alt="" @click="goto(podcast.title)">
                    <div class="podcastTitle">{{podcast.title}}</div>
                </div>
            </div>
        </div>

        <h2 class="titre">{{txt.titre}}</h2>
        <div class="txt">
            <div class="containerTxt">
                <p>{{txt.texte}}</p>
            </div>
        </div>
    </div>
    <div v-else>
        LOADING . . .
    </div>
</template>

<style scoped>
.home{
    margin-bottom: 15vh;
}

.containerSlider{
    display: flex;
    justify-content: center;
    width: 100%;
}
.slider{
    width: 80%;
    position: relative;
}

.slider img{
    width: 100%;
    border-radius: 10px;
}

.slider>div:nth-child(2),.slider>div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(217, 217, 217, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top:40%;
}

.slider>div:nth-child(3){
    right: 0;
}

.listPodcast{
    display: flex;
    overflow-x: scroll;
    padding: 3% 10% 3% 10%;
    gap: 20px;
    background-color: rgb(217, 217, 217, 0.5);
}

.listPodcast img{
    border-radius: 10px;
    width: 100px;
}

.listPodcast img:hover{
    cursor: pointer;
}

.podcastTitle{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100px;
}

.txt p{
    padding: 10% ;
    /* height: 10vh; */
    background-color: rgb(217, 217, 217, 0.5);
}

@media (min-width:768px){

    .slider{
        width: 40%;
    }

    .slider>div:nth-child(2),.slider>div:nth-child(3){
        top:45%;
    }

    .containerPodcast{
        display: flex;
        justify-content: center;
    }

    .listPodcast{
        border-radius: 10px;
        width: 75%;
        justify-content: center;
        padding: 2%;
        gap:75px;
        overflow-x:hidden;
        flex-wrap: wrap;
    }

    .listPodcast img{
        width: 150px;
    }

    .podcastTitle{
        width: 150px;
    }

    .containerTxt{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .txt p{
        margin-bottom: 0;
        width: 75%;
        border-radius: 10px 10px 0 0;
        padding: 2%;
    }
}
</style>
