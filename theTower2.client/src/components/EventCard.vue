<template>
    <router-link :to="{path: `events/${event.id}`}">

        <div class="selectable card elevation-5 cover-image">
            <p class="text-center">{{ event.name }}</p>
            
            <img :src="event.coverImg" alt="">
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




</style>