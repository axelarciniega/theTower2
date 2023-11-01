<template>
    <router-link :to="{path: `events/${event.id}`}">
        <div v-if="event.isCanceled == false" class="selectable card elevation-5 background">
            <p class="text-center">{{ event.name }}</p>
            
            <img class="cover-image" :src="event.coverImg" alt="">
        </div>
        <div v-if="event.isCanceled == true" class="selectable card elevation-5 canceled-background">
            <p class="text-center">Canceled Event</p>
            
            <img class="cover-image" :src="event.coverImg" alt="">
        </div>
        <div v-if="event.capacity == 0" class="selectable card elevation-5 canceled-background my-3">
            <p class="text-center">Sold out</p>
            
            <img class="cover-image" :src="event.coverImg" alt="">
        </div>
        
    </router-link>

</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { TowerEvent } from '../models/TowerEvent.js';

export default {
    props: {event: {type: TowerEvent || Object, required: true}},
setup() {
  return {
    
  };
},
};
</script>

<style>

.canceled-background{
    background: linear-gradient(40deg, #ff0000, #f6cccc);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.6s, transform 0.2s;
}

.background{
  background: linear-gradient(40deg, #00c4ff, #4800ff);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.6s, transform 0.2s;
}

.background:hover{
  background: linear-gradient(60deg, #4800ff, #00c4ff);
  transform: translateY(-10px);
}


.cover-image{
    height: 20vh;
    object-fit: cover;
    object-position: center;
}


</style>