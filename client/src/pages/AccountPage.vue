<template>
  <div class="container">

    <div class="about text-center text-light">
      <h3>User: {{ account.name }}</h3>
      <img class="rounded" :src="account.picture" alt="" />
    </div>


    <section v-if="myTickets" class="row text-light">
     <!-- STUB Events that I have tickets for  -->
        <h3>Event's I am going to🕶️</h3>
      
      <div v-for="t in myTickets" :key="t.id" class="col-12 col-md-2">
        <EventCard :event="t.event"/>
      </div>
    </section>




  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService';
export default {
  setup() {
    watchEffect(()=> {
      getMyTickets()
    })

    async function getMyTickets(){
      try {
        await accountService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
