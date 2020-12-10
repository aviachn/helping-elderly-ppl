<template>
  <div class="add-song">
        <button v-if="!isParticipant" @click="handleParticipant">SIGN ME IN!</button>
        <button v-else @click="removeParticipant(user.value.uid)">REMOVE</button> 
  </div>
</template>

<script>
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import { ref } from 'vue'

export default {
    props: ['activity'],
    setup(props){
        const { updateDoc } = useDocument('activities', props.activity.id)
        const { user } = getUser()
        const isParticipant = ref(false)

        const handleParticipant = async()=>{
            const newParticipant = {
                userId: user.value.uid,
                userName: user.value.displayName
            }
            await updateDoc({
                participants: [...props.activity.participants, newParticipant]
             })
             isParticipant.value = true
        }

        const removeParticipant = async(id)=>{
            const partic = activity.value.participants.filter((p)=>p.userId !=id)
            await updateDoc({ participants: partic })
             isParticipant.value = false
        }

        return {handleParticipant, isParticipant, removeParticipant, user }
    }
}
</script>

<style scoped>
    .add-song{
        text-align: center;
        margin-top: 40px;
    }
    form{
        max-width: 100%;
        text-align: left;
    }
</style>