<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter();
const isChecked = ref(false);


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
        <img src="@/assets/img/logo-no-bg.png" id="logo" alt="">
        <input type="checkbox" id="checkbox" v-model="isChecked">
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

</template>

<style scoped>

</style>
