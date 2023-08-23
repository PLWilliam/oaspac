<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

const player = () =>{
    router.push({name:'player'});
}

const podcast = () =>{
    router.push({name:'podcast'});
}

const event = () =>{
    router.push({name:'event'});
}

</script>

<template>

<button @click="player">Player</button>
<button @click="podcast">Podcast</button>
<button @click="event">Event</button>

</template>

<style scoped>

</style>
