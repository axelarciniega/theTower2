<template>
    <div class="container">
        <section class="row">

            <!-- STUB Event Details -->
            <section v-if="event" class="row elevation-5 mt-4">
                <div class="col-12 col-md-4" >
                    <img class="cover-img" :src="event.coverImg" alt="">
                </div>
                <div class="col-12 col-md-8">
                    <section class="row justify-content-between">
                        <div class="col-12 col-md-3">
                            <h3>{{ event.name }}</h3>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>
                            Starting at {{ event.startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }}
                            </h6>
                                
                                <h6>{{ event.startDate.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }}</h6>
                            </div>
                            <div class="col-12">
                                {{ event.description }}
                            </div>
                            <div class=" mt-5 col-12 col-md-3">
                                <span v-if="event.isCanceled == false" class="text-info">{{ event.capacity }}</span> spots left
                            </div>
                            <!-- STUB If cancelled -->
                            <div  class=" mt-5 col-12 col-md-3">
                               <p v-if="event.isCanceled == true">Event is canceled</p>
                            </div>
                            <div class="mt-5 col-12 col-md-3">
                                <button>
                                    Attend
                                </button>
                            </div>
                            <div v-if="accountId == event.creatorId" class="mt-5 col-12 col-md-3">
                                <button  @click.prevent="cancelEvent">
                                    Cancel Event
                                </button>
                            </div>
                    </section>

                </div>
            </section>
                

        </section>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';

export default {
setup() {
    onMounted(()=> {
        getEventById()
    })
    const route = useRoute()
    async function getEventById(){
        try {
            await eventsService.getEventById(route.params.eventId)
        } catch (error) {
            Pop.error(error)
        }
    }



  return {
    event: computed(() => AppState.activeEvent ),


    async cancelEvent(){
        try {
            if( await Pop.confirm()){
                await eventsService.cancelEvent(route.params.eventId)
            }
        } catch (error) {
            Pop.error(error)
        }
    }

  };
},
};
</script>


<style>

.cover-img{
    object-fit: cover;
    object-position: center;
    height: 30vh;
    width: 30vh;
}

</style>