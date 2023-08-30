<script setup>
import axios from 'axios';
import { ref,onBeforeMount } from 'vue';


const tabRadio = ref();
const currentRadio = ref();
const currentRadioName = ref();
const currentRadioImg = ref();
const selectedRadio = ref();

const isPlay = ref(true);
const audio = ref();

const playLogo = ref();




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

    if(isPlay.value){
        audio.value.play();
        isPlay.value = false;
        playLogo.value.classList.remove("fa-play");
        playLogo.value.classList.add("fa-pause");
    }
    else{
        audio.value.pause();
        isPlay.value = true;
        playLogo.value.classList.remove("fa-pause");
        playLogo.value.classList.add("fa-play");
    }
}

const updateRadioInfo = (radio)=>{
    selectedRadio.value = radio.nom;
    currentRadio.value = radio.fluxAudio;
    currentRadioName.value = radio;
    currentRadioImg.value = radio.imageURL;
    isPlay.value = true;
}


onBeforeMount(async()=>{
  await getAllRadio();

})


</script>

<template>

    <main>
        <div id="radio">
            <select v-model="selectedRadio" v-on:change="changeRadio">
                <option :value="radio.nom" v-for="radio in tabRadio">
                    {{ radio.nom }}
                </option>
            </select>
            <img :src="currentRadioImg" id="radioImg" alt="">
            <div id="player" @click="buttonPlayPause">
                <i class="fa-solid fa-play fa-2xl" ref="playLogo"></i>
            </div>
            <audio :src="currentRadio" id="audio" ref="audio"></audio>
        </div>
    </main>

</template>

<style scoped>
main{
    height: 70vh;
}
</style>
