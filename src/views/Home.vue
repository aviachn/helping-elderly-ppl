<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <ListView v-if="documents" :activities="documents"/>
  </div>

</template>

<script>
import getCollection from '../composables/getCollection'
import ListView from '../components/ListView.vue'

export default {
  props:['activities'],
  name: 'Home',
  components:{ ListView },
  setup(){
    const { error, documents } = getCollection('activities')

    return { error,documents}
  }
}
</script>
