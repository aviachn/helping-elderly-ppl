<template>
  <form class="new-message">
      <textarea placeholder="Type a message and hit enter to send..."
       v-model="message" @keypress.enter.prevent="handleSubmit"></textarea>
       <dic class="error">{{ error }}</dic>
  </form>
</template>

<script>
import { ref } from 'vue'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
export default {
    setup(){
        const message = ref('')
        const { user } = getUser()
        const { addDoc, error } = useCollection('messages')

        const handleSubmit = async ()=> {
            const chat = {
                message: message.value,
                name: user.value.displayName,
                createdAt: timestamp()
            }
            //console.log(chat);
            await addDoc(chat)
            //message.value = ''
            if(!error){
                message.value = ''
            }
        }
        
        return { message, handleSubmit, error }
    }
}
</script>

<style scoped>
    .new-message{
       margin: 10px; 
    }
    .new-message textarea{
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 5px;
        box-sizing: border-box;
        border: 0;
        border-radius: 20px;
        font-family: inherit;
        outline: none;
    }
</style>