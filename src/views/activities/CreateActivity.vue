<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create a new activity</h4>
      <input type="text" placeholder="Title" v-model="title" required>
      <!--<textarea placeholder="Category" v-model="category" required></textarea>-->
      <textarea placeholder="Description" v-model="description" required></textarea>
      <!--<textarea placeholder="Tags" v-model="tags" required></textarea>-->
      <!-- upload activity cover image -->
      <label>Upload activity cover image</label>
      <input type="file" @change="handleChange">
      <div class="error">{{ fileError }}</div>
      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('activities')
        const { user } = getUser()
        const router = useRouter()

        const title = ref('')
        //const category = ref('')
        const description =ref('')
        //const tags =ref(null)
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        //allowed file types
        const types = ['image/png','image/jpeg','image/jpg']

        const handleChange = (e) =>{
            const selected = e.target.files[0]
            console.log(selected)

            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            }else{
                file.value = null
                fileError.value = 'Please select an png, jpeg or jpg file ' 
            }
        }

        const handleSubmit = async () =>{
            if(file.value){    
                //console.log(title.value, description.value, file.value)
                isPending.value = true 
                await uploadImage(file.value)
                //console.log('image uploaded, url:', url.value)
                const res = await addDoc({ 
                    title: title.value,
                    //category: category.value,       //
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    //location
                    //start at
                    //ends at
                    //tags: tags.value,                //
                    //numOfParticipants_needed for this activity?:
                    participants: [],               //songs
                    createdAt: timestamp()
                 })
                 isPending.value = false 
                 if(!error.value){
                     //console.log('activity added')
                    router.push({ name: 'ActivityDetails', params:{ id: res.id} })
                 }
            }
        }
        
        return {title, description, handleSubmit, handleChange, fileError, isPending}
    }
}
</script>

<style>

</style>