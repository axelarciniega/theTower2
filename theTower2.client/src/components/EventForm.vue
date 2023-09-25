<template>
    <p>
  <button class="button-filter my-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
    Create Event
  </button>
</p>
<div style="min-height: 120px;">
  <div class="collapse collapse-horizontal" id="collapseWidthExample">
    <div class="card card-body" style="width: 100%;">
      <form @submit.prevent="createEvent">
        <section class="row justify-content-center">

       
        <div class="col-12 col-md-5 my-3">
            <input v-model="eventData.name" maxlength="40" type="text" placeholder="name" class="form-control" required>
        </div>
        <div class="col-12 col-md-5 my-3">
            <input v-model="eventData.coverImg" type="url" placeholder="Image URl" class="form-control" required>
        </div>
         <div class="col-12 col-md-5">
            <input v-model="eventData.capacity" type="number" placeholder="capacity" class="form-control" required>
        </div>
         <div class="col-12 col-md-5">
            <input v-model="eventData.location" maxlength="30" type="text" placeholder="location" class="form-control" required>
        </div>
         <div class="col-12 col-md-4 my-3">
            <input v-model="eventData.startDate" type="date" placeholder="start date" class="form-control" required>
        </div>
        
        <div class="col-12 col-md-4 my-3">
            <select v-model="eventData.type" class="form-control"  id="event-category" required>
                <option disabled selected value="">Please select a category</option>
                <option value="sport">sport</option>
                <option value="convention">convention</option>
                <option value="concert">concert</option>
                <option value="digital">digital</option>
            </select>
        </div>
         </section>
         <div class="mb-3">
  <label for="Textarea1" class="form-label">Description</label>
  <textarea maxlength="400" v-model="eventData.description" class="form-control" id="Textarea1" rows="3"></textarea>
</div>
<div class="col-12 text-end">
    <button class="">Submit</button>
</div>

      </form>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { useRouter } from 'vue-router';





export default {
setup() {
    const router = useRouter()
    const eventData = ref({})
    function resetForm(){
        eventData.value = {category: ''}
    }
  return {
    eventData,
    async createEvent(){
        try {
            let newEvent = await eventsService.createEvent(eventData.value)
            Pop.success('Created Event')
           
            resetForm()
            router.push({name: 'Event Detail', params: {eventId: newEvent.id}})
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style>

 .button-filter{
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(25deg, #00c4ff, #4800ff);
  color: white;
  font-size: 15px;
  border: solid 2px aqua;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, transform 0.2s;
  }

  .button-filter:hover{
  background: linear-gradient(45deg, #4800ff, #00c4ff);
  transform: translateY(-2px);
  }

</style>