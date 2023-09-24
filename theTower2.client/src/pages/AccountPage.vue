<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
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
