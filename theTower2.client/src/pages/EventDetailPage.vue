<template>
    <div class="container">
        <section class="row">

            <!-- STUB Event Details -->
            <section v-if="event" class="row elevation-5 mt-4 text-white">
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
                                <span v-if="event.isCanceled == false" class="text-class">{{ event.capacity }}</span> spots left
                            </div>
                            <!-- STUB If cancelled -->
                            <div  class=" mt-5 col-12 col-md-3">
                               <p v-if="event.isCanceled == true">Event is canceled</p>
                            </div>
                            <div class="mt-5 col-12 col-md-3">
                                <!-- FIXME also need to consider a sold out scenario, compare capacity and ticket count -->
                                <div v-if="event.isCanceled == false">
                                        <button class="button-class" v-if="!isAttending && user.isAuthenticated" @click="createTicket">
                                    Attend
                                        </button>
                                        <button class="button-class" v-else-if="user.isAuthenticated" @click="returnTicket">
                                        return Ticket
                                         </button>
                                        <button class="button-class" v-else  disabled>
                                        Log in to get your ticket
                                        </button>
                                
                                </div>
                                <div v-else-if="event.capacity == 0">
                                    <div>
                                        <b>Sold out</b>
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div v-if="account.id == event.creatorId && event.isCanceled == false" class="mt-5 col-12 col-md-3">
                                <button class="delete-button"  @click.prevent="cancelEvent">
                                    Cancel Event
                                </button>
                                <button v-if="event.isCanceled == true" disabled>Cancel Event</button>


                            </div>
                            
                    </section>

                </div>
            </section>
                

        </section>

        <!-- STUB See who is attending here -->
        <section class="row card elevation-5 my-4 background-color">
            <div class="col-12">
                <h5>Peeps who are attending 🪅</h5>
                <img class="profile-pic p-1" v-for="m in tickets" :key="m.id" :src="m.profile.picture" alt="" :title="m.profile.name">
            </div>
        </section>



        <!-- STUB Comment section -->
        <section  class="row">
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
            getMembersByEventId();
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

        async function getMembersByEventId(){
            try {
                await eventsService.getMembersByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
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
            member: computed(()=> AppState.myTickets),
            async createTicket() {
                try {
                    
                    let ticketData = { eventId: route.params.eventId };
                    await ticketsService.createTicket(ticketData);
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

.text-class{
    color: #0add8f;
}
.background-color{
    background: linear-gradient(25deg, #0add8f, #c4e8cb);

}

.delete-button{
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(25deg, #0add8f, #c4e8cb);
    color: black;
    font-size: 15px;
    border: solid 2px aqua;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s, transform 0.2s;
}

.delete-button:hover{
    background: linear-gradient(45deg, #f8bebe, #ff0000);
    transform: translateY(-7px);

}

.button-class{
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(25deg, #0add8f, #c4e8cb);
    color: black;
    font-size: 15px;
    border: solid 2px aqua;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s, transform 0.2s;
}

.button-class:hover{
  background: linear-gradient(45deg, #c4e8cb, #0add8f);
  transform: translateY(-7px);
  }

.profile-pic{
    width: 45px;
    height: 45px;
}

.cover-img{
    object-fit: cover;
    object-position: center;
    height: 30vh;
    width: 30vh;
}

</style>