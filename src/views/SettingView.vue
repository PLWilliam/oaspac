<script setup>

import { ref,onBeforeMount } from 'vue';
import { fontFamily,fontSize,fontSpacing } from '@/services/fontList.js';
import { setOptionStored } from '@/services/font.js';

document.title = 'Options';

const loaded = ref(false);

onBeforeMount(async()=>{

    const isLocalStorage = localStorage.getItem("isLocalStorage");
    onLaunch();
    loaded.value = true;
})


// const html    = document.querySelector('html');a
// const allInput = document.querySelectorAll("input");

//localStorage.setItem("isLocalStorage", false);
//localStorage.clear();
// console.log(fontFamily);

const fontSelect = ref('');
const vModelFontSize = ref();
const vModelFontSpacing = ref();
const fontFamilyNameSerif = ref();



const onLaunch = () =>{
    const isLocalStorage = localStorage.getItem("isLocalStorage")
    console.log(isLocalStorage);

    if(isLocalStorage == 'false'){

        fontSelect.value = fontFamily[0].fontName;
        vModelFontSize.value = fontSize;
        vModelFontSpacing.value = fontSpacing;
        
        localStorage.setItem("isLocalStorage", true);
        localStorage.setItem("fontName", fontFamily[0].fontName);
        localStorage.setItem("fontSerif", fontFamily[0].serif);
        localStorage.setItem("fontSize", fontSize);
        localStorage.setItem("fontSpacing", fontSpacing);
    }
    else{
        fontSelect.value = localStorage.getItem("fontName");
        vModelFontSize.value = localStorage.getItem("fontSize");
        vModelFontSpacing.value = localStorage.getItem("fontSpacing");
    }

    // setOptionStored()
}

const presetChange = () =>{
    const fontFamilyFind = fontFamily.find((e) => fontSelect.value == e.fontName);
    fontFamilyNameSerif.value = fontFamilyFind.fontName+","+fontFamilyFind.serif;
}


const submitClick  = () =>{
    localStorage.setItem("isLocalStorage", true);

    const fontFamilyFind = fontFamily.find((e) => fontSelect.value == e.fontName);

    localStorage.setItem("fontName", fontFamilyFind.fontName);
    localStorage.setItem("fontSerif", fontFamilyFind.serif);
    localStorage.setItem("fontSize", vModelFontSize.value);
    localStorage.setItem("fontSpacing", vModelFontSpacing.value);

    updateClick();
}

const resetClick = () =>{
    localStorage.clear();
    console.log('storageOff');
    localStorage.setItem("isLocalStorage", true);
    localStorage.setItem("fontName", fontFamily[0].fontName);
    localStorage.setItem("fontSerif", fontFamily[0].serif);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("fontSpacing", fontSpacing);
    fontSelect.value = localStorage.getItem("fontName");
    vModelFontSize.value = localStorage.getItem("fontSize");
    vModelFontSpacing.value = localStorage.getItem("fontSpacing");
}


const updateClick = () =>{
    

    let a = localStorage.getItem("isLocalStorage");
    let b = localStorage.getItem("fontName");
    let c = localStorage.getItem("fontSerif");
    let d = localStorage.getItem("fontSize");
    let e = localStorage.getItem("fontSpacing");
    console.log(a,b,c,d,e);

}


</script>

<template>
    <!-- <h1>Event</h1> -->
    <div v-if="loaded">
        <!-- <form action="cookie.html" method="get"> -->

            <label for="font">Font</label>
            <select name="font" id="" v-model="fontSelect" @change="presetChange">
                <option 
                    v-for="elem in fontFamily" 
                    :value="elem.fontName"
                >
                    {{elem.fontName}}
                </option>
            </select>

            <label for="fontSize">fontSize</label>
            <input type="number" name="fontSize" v-model="vModelFontSize">

            <label for="fontSpacing">fontSpacing</label>
            <input type="number" name="fontSpacing" v-model="vModelFontSpacing">

            <button id="submit" @click="submitClick">submit</button>

            <!-- <input type="submit" value="Submit" id="submit"> -->
        <!-- </form> -->
        <button id="update" @click="updateClick">update</button>
        <button id="reset" @click="resetClick">Reset</button>


        <div id="preset" :style="{fontFamily:fontFamilyNameSerif,fontSize:vModelFontSize+'px',letterSpacing:vModelFontSpacing+'px'}">
            AaZzEeRrTtYy
        </div>



    </div>
    <div v-else>
        LOADING . . .
    </div>


</template>

<style scoped>

</style>
