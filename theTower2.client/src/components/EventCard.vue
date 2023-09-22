<template>
    <router-link :to="{path: `events/${event.id}`}">

        <div v-if="event.isCanceled == false" class="selectable card elevation-5">
            <p class="text-center">{{ event.name }}</p>
            
            <img class="cover-image" :src="event.coverImg" alt="">
        </div>
        <div v-if="event.isCanceled == true" class="selectable card elevation-5">
            <p class="text-center bg-danger">Canceled Event</p>
            
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


.cover-image{
    height: 20vh;
    object-fit: cover;
    object-position: center;
}


</style>