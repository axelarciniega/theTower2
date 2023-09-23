<template>
    <div v-if="eventComment">

        <div class="container">
            <section class="row">
                <div class="m-1 col-12 col-md-1">
                    <img class="profile-pic" :src="eventComment.creator?.picture" alt="">
                </div>
                <div class="card elevation-5 col-12 col-md-6 my-2">
                    <b> {{ eventComment.creator?.name }}</b>
                    <p>{{ eventComment.body }}</p>
                    <div v-if="account.id == eventComment.creatorId">
                        <button @click="removeComments"  class="col-2">delete</button>
                    </div>
                    <div v-else></div>
                </div>
            </section>
        </div>
    </div>


</template>

<script>
import { computed } from 'vue';
import { EventComment } from '../models/EventComment';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';

export default {
    props: {eventComment: {type: Object, required: true}},


setup(props) {
  return {
    account: computed(()=> AppState.account),
    user: computed(()=> AppState.user),

    async removeComments(){
        try {
            if(await Pop.confirm()){
                await commentsService.removeComments(props.eventComment.id)
                Pop.success('Removed Comment')

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

.profile-pic{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

</style>