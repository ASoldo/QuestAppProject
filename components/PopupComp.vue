<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{textZ}} {{index}} {{id}}</h1>
        <h1>{{coord.lat}} {{coord.lng}}</h1>
        <v-text-field v-model="inputText"></v-text-field>
        <h1>{{inputText}}</h1>
        <v-btn @click="$emit('myevent', index, inputText)">Press me</v-btn>
        <v-btn @click="$emit('deleteevent', id)">Delete me</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PopupComp',
  props: {
    textZ: String,
    index: Number,
    id: Number,
    coord: {
      type: Object,
      default: () => ({
        lat: 0,
        lng: 0
      })
    }
  },
  data(){
    return {
      inputText: '',
      rndId: 0
    }
  },
  created(){
    this.rndId = Math.floor(Math.random() * 10000000).toString()
  },
}
</script>
