<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter();
const test = ref();


const burger = ()=>{
    // const show = document.querySelector('.subMenuPhone')
    test.value = document.querySelector('#checkbox');
    console.log(test.value);
    // document.querySelector('#checkbox').checked  = 'true';
    // console.log(document.querySelector('#checkbox'))
    // show.style.display = 'none'
    // check
}

burger();

const player = () =>{
    // router.push({name:'player'});
    burger();
    // burger.value.style.display='none';
}

const podcast = () =>{
    router.push({name:'podcast'});
    burger.value.style.display='none';
}

const event = () =>{
    router.push({name:'event'});
    burger.value.style.display='none';
}

</script>

<template>
    <header>
        <img src="@/assets/img/logo-no-bg.png" id="logo" alt="">
        <input type="checkbox" id="checkbox">
        <div id="menuPhone">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="subMenuPhone">
                <p>Acueil</p>
                <p @click="player">Player</p>
                <p @click="podcast">Podcast</p>
                <p @click="event">Evenement</p>
            </div>
            <div class="subMenu">
                <p>Accueil</p>
                <p @click="player">Player</p>
                <p @click="podcast">Podcast</p>
                <p @click="event">Evenement</p>
            </div>
    </header>
<!-- 
<button @click="player">Player</button>
<button @click="podcast">Podcast</button>
<button @click="event">Event</button> -->

</template>

<style scoped>

</style>
