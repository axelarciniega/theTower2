<template>
    
<div class="container">



<!-- STUB create comment form -->
    <section class="row">
        <div class="col-12">
            <h3>Talk with others that are going!</h3>
        </div>
        <form @submit.prevent="createComment">
        <div>
            <textarea  name="Comment" id="" cols="50" required placeholder="Comments" rows="5" v-model="comment.body"></textarea>
        </div>
        <div class="col-12">
            <button>Post</button>
        </div>
    </form>
        
    </section>











</div>


</template>

<script>
import { computed, ref } from 'vue';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';



export default {
setup() {
        const route = useRoute()
        const comment = ref({})
        function resetForm(){
        comment.value = {category: ''}
    }

  return {
    comment,
    eventComment: computed(()=> AppState.eventComments),
     async createComment(){
        try {
            comment.value.eventId = route.params.eventId
        await commentsService.createComment(comment.value)
        resetForm()
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style>
</style>