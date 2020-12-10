<template>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="activity" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
        <div class="cover">
          <img :src="activity.coverUrl">
        </div>

        <!-- songs list-->
        <div class="song-list">
          <div v-if="!activity.participants.length">No participant for this activity yet.</div>
          <div v-else class="single-song" v-for="user in activity.participants" :key="user.userId" >
            <div class="details">
              <h3>{{ participants.userName }}</h3>
            </div>
          </div>
          <AddParticipant :activity="activity"  />
        </div>
      <!--  -->
    </div>  
    <div class="main-info">
        <h1>{{ activity.title }}</h1>
        <h4>Dates: </h4>
        <h4>Time: </h4>
        <h4>Location: </h4>
        <button>Tags</button>
        <p class="username"> Created By {{ activity.userName }}</p>
        <p class="description">{{ activity.description }}</p>
        <button v-if="ownership" @click="handleDelete">Delete Activity</button>
    </div>
        
  </div>

  <nav class="chat">
    <div>
      <p><strong> Hey There</strong></p>
    </div>
    <ChatWindow />
    <NewChatForm  />
  </nav>  

</template>

<script>
import NewChatForm from '@/components/NewChatForm.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import AddParticipant from '@/components/AddParticipant.vue'
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocment from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'

export default {
    props: ['id'],
    components:{ AddParticipant, NewChatForm , ChatWindow },
    setup(props){
      const { error, document:activity } = getDocment('activities', props.id)
      const { user } = getUser()
      const { deleteDoc, updateDoc } = useDocument('activities', props.id)
      const { deleteImage } = useStorage()
      const router = useRouter()
      
      const ownership = computed(()=>{
        return activity.value && user.value && (user.value.uid == activity.value.userId)
      })

      const handleDelete = async()=>{
        await deleteImage(activity.value.filePath)
        await deleteDoc()
        router.push({ name:'Home' })
      }

      return { error, activity, ownership ,handleDelete, user}
    }
}
</script>

<style >
  .playlist-details{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
    text-align: center;
  }
  .cover{
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img{
    display: block;
    position: absolute;
    top:0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .song-list div{
    padding: 20px;
  }
  /*.playlist-info{

  }*/
  .playlist-info h2{
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p{
    margin-bottom: 20px;
  }
  .username{
    color: #999;
  }
  .description{
    text-align: left;
  }
  .single-song{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
  .main-info{
    text-align: left;
    padding: 10px;
    grid-column: 2/3;
  }
  .main-info p, h2, h4, button, h1{
    padding: 10px;
  }
  .chat{
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: block;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
  }
</style>