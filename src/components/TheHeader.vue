<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter();
const isChecked = ref(false);


const home = () =>{
    router.push({name:'home'});
    isChecked.value = false;
}

const player = () =>{
    router.push({name:'player'});
    isChecked.value = false;
}

const podcast = () =>{
    router.push({name:'podcast'});
    isChecked.value = false;
}

const event = () =>{
    router.push({name:'event'});
    isChecked.value = false;
}

</script>

<template>
    <header>
        <img src="@/assets/img/Oaspac.png" id="logo" alt="" @click="home">
        <input type="checkbox" id="checkbox" v-model="isChecked">
        <div id="menuPhone">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="subMenuPhone">
            <p @click="home">Accueil</p>
            <p @click="player">Player</p>
            <p @click="podcast">Podcast</p>
            <p @click="event">Evenement</p>
        </div>
        <div class="subMenu">
            <p @click="home">Accueil</p>
            <p @click="player">Player</p>
            <p @click="podcast">Podcast</p>
            <p @click="event">Evenement</p>
        </div>
    </header>

</template>

<style scoped>

    #menuPhone{
        transition: ease-in-out .3s;
    }

    #checkbox:checked~ #menuPhone{
        transform:rotate(-90deg);
        z-index: 99998;
        background: none;
    }

    #logo:hover{
        cursor: pointer;
    }
</style>
