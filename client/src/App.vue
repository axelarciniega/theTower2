<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-black">
    <router-view />
  </main>
   <footer class="bg-black text-light border">
    Events going crazy!
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.border{
  border: 4px solid aqua;
}
</style>
