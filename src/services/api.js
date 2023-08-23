import axios from 'axios';
import { parse } from 'rss-to-json';
// import { convert } from "xml-js";

const test = '';

export const chosenPodcast = (id)=>{
    return  id;
}


export const fetchData = async (url) =>{
    const podcastList = await axios.get(url)

    // console.log(podcastList);

    if(podcastList.status==200){
      return podcastList.data;
    }
    else{
      throw new Error("Problem getting radio");
    }
}


export const fetchRss = async (url) => {

    const test = await parse(url);
    
    return test;

}