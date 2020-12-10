<template>
  <div class="list" v-for="activity in activities" :key="activity.id">
      <router-link :to="{ name:'ActivityDetails' , params:{ id: activity.id }}">
        <div class="single">
            <div class="thumbnail">
                <img :src="activity.coverUrl">
            </div>
            <div class="info">
                <h3>{{ activity.title }}</h3>
                <p>Created By {{ activity.userName }}</p>
            </div>
            <div class="song-number">
                <p>
                    {{ activity.participants.length }}
                </p>
            </div>
        </div>
      </router-link>
  </div>
</template>

<script>
export default {
     props:['activities']
}

</script>

<style scoped>
.list{
    display: inline-block;
    padding: 30px;
}
    .single{
        width: 200px;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background: white;
        margin: 16px 0;
        transition:  all ease 0.2s;
    }
    .single:hover{
        box-shadow: 1px 2px 3px rgba(50,50,50,0.5);
        transform: scale(1.02);
        transition: all ease 0.2s;
    }
    .thumbnail{
        max-width: 150px;
        max-height: 150px;
        overflow: hidden;
        border-radius: 10px;
    }
    img{
       max-width: 200%;
        max-height: 2000%;
        display: block; 
    }
    .info{
        margin:  0 30px;
    }
    .song-number{
        margin-left: auto;
    }
</style>