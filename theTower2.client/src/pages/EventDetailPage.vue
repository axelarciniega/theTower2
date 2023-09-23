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
                                <!-- FIXME also need to consider a sold out scenario, compare capacity and ticket count -->
                                <div v-if="event.isCanceled == false">
                                        <button v-if="!isAttending && user.isAuthenticated" @click="createTicket">
                                    Attend
                                        </button>
                                        <button v-else-if="user.isAuthenticated" @click="returnTicket">
                                        return Ticket
                                         </button>
                                        <button v-else  disabled>
                                        Log in to get your ticket
                                        </button>
                                
                                </div>
                                <div v-else></div>
                                
                                
                            </div>
                            <div v-if="account.id == event.creatorId && event.isCanceled == false" class="mt-5 col-12 col-md-3">
                                <button  @click.prevent="cancelEvent">
                                    Cancel Event
                                </button>
                                <button v-if="event.isCanceled == true" disabled>Cancel Event</button>


                            </div>
                            
                    </section>

                </div>
            </section>
                

        </section>

        <!-- STUB Comment section -->
        <section class="row">
            <CommentForm/>
            
            <div class="my-2" v-for="comment in eventComments" :key="comment.id">
                <CommentCard :eventComment="comment"/>
            </div>
            
        </section>


    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import { Comment, computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService';
import { commentsService } from '../services/CommentsService';



export default {
    setup() {
        onMounted(() => {
            getEventById();
            getCommentByEvent();
        });
        const route = useRoute();
        
        async function getCommentByEvent() {
            try {
                await commentsService.getCommentByEvent(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            event: computed(() => AppState.activeEvent),
            user: computed(() => AppState.user),
            isAttending: computed(() => AppState.tickets.find(a => a.accountId == AppState.account.id)),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            eventComments: computed(() => AppState.eventComments),
            async createTicket() {
                try {
                    if (AppState.activeEvent.capacity == 0 || AppState.activeEvent.isCanceled == true) {
                        Pop.toast('This event is not available', 'danger');
                    }
                    let ticketData = { eventId: route.params.eventId };
                    await ticketsService.createTicket(ticketData);
                    AppState.activeEvent.capacity--;
                    Pop.success('Congrats, you got the ticket!');
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async returnTicket() {
                try {
                    let ticket = AppState.tickets.find(t => t.accountId == AppState.account.id);
                    await ticketsService.returnTicket(ticket.id);
                    AppState.activeEvent.capacity++;
                    Pop.success('Returned Ticket👍');
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async cancelEvent() {
                try {
                    if (await Pop.confirm()) {
                        await eventsService.cancelEvent(route.params.eventId);
                        Pop.toast('Canceled Event :(');
                    }
                }
                catch (error) {
                    Pop.error(error);
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