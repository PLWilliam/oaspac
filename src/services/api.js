import axios from 'axios';
import { parseString } from "xml2js";

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


export const fetchRss = async (elem) => {

  return await parse(elem);
    

}

export const fetchRssURL = async (url) => {
  return await parseString(url);
}