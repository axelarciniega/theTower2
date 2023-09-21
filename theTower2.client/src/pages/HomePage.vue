<template>
  <div class="container">

    <!-- STUB Create event form -->
    <section class="row">
     <EventForm/>
    </section>


    <!-- STUB My Events -->
    <section class="row">
      <div></div>
    </section>




    <!-- STUB Filter Bar -->
    <section class="row justify-content-between mt-5">
        <button class="col-12 col-md-2" @click="filterBy=''">All</button>
        <button class="col-12 col-md-2" @click="filterBy='sport'">Sports</button>
        <button class="col-12 col-md-2" @click="filterBy='convention'">convention</button>
        <button class="col-12 col-md-2" @click="filterBy='concert'">Concert</button>
        <button class="col-12 col-md-2" @click="filterBy='digital'">Digital</button>
    </section>

    <!-- STUB Event cards -->
    <section class="row g-4 mt-4">
      <h1 class="justify-content-center d-flex">Events🪩</h1>
      <div v-for="e in events" :key="e.id" class="col-12 col-md-3">
         <EventCard :event="e"/>
      </div>
    </section>






  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import {AppState} from '../AppState.js'


export default {
  setup() {
    onMounted(() => {
      getEvents()
    })
    const filterBy = ref('')
    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filterBy,
      events: computed(() => {
        if(!filterBy.value){
          return AppState.towerEvents
        }else{
          return AppState.towerEvents.filter(event => event.type == filterBy.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">



.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
