<script setup>
import axios from 'axios';
import { ref,onBeforeMount } from 'vue';


const tabRadio = ref();
const currentRadio = ref();
const currentRadioName = ref();
const currentRadioImg = ref();
const selectedRadio = ref();
const play = ref('play');
const isPlay = ref(true);


const getAllRadio = async()=>{
  
  const radioList = await axios.get('https://latinoclub.fr/api/api_radios')

  if(radioList.status==200){
    tabRadio.value = radioList.data['hydra:member'];
    const defaultRadio = tabRadio.value.find((e)=> e.isDefault == true);
    updateRadioInfo(defaultRadio);
  }
  else{
    throw new Error("Problem getting radio");
  }
}

const changeRadio = ()=>{
    const newRadio = tabRadio.value.find((e)=> e.nom == selectedRadio.value);
    updateRadioInfo(newRadio);
}

const buttonPlayPause = ()=>{
    const audio = document.querySelector('#audio');

    if(isPlay.value){
        play.value = 'pause';
        audio.play();
        isPlay.value = false;
    }
    else{
        play.value = 'play';
        audio.pause();
        isPlay.value = true;
    }
}

const updateRadioInfo = (radio)=>{

    selectedRadio.value = radio.nom;
    currentRadio.value = radio.fluxAudio;
    currentRadioName.value = radio;
    currentRadioImg.value = radio.imageURL;

    play.value = 'play';
    isPlay.value = true;
}


onBeforeMount(async()=>{
  const listRadio = await getAllRadio();

})


</script>

<template>

    <h1>Player</h1>
    
    <select v-model="selectedRadio" v-on:change="changeRadio">
        <option :value="radio.nom" v-for="radio in tabRadio">
            {{ radio.nom }}
        </option>
    </select>

    <audio :src="currentRadio" id="audio"></audio>

    <button @click="buttonPlayPause">{{ play }}</button>
    {{currentRadioName}}

    <img :src="currentRadioImg" alt="">

    <!-- <audio controls>
        <source src="https://capsaohdf.ice.infomaniak.ch/capsaohdf-128.aac">
    </audio> -->

    <!-- <audio :src="currentRadio"></audio> -->

    <!-- <audio :ref="currentRadio"></audio> -->


</template>

<style scoped>

</style>
