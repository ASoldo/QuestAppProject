<template>

  <v-container @keyup.ctrl.space="overlayLogic()" v-bind:class="{ active: isActive }" id="map-wrap" fluid class="pa-0 fill-height" style="z-index: 0; padding-bottom: 56px !important;">
  <!-- <v-btn @click="removeMarkers()">SOldo</v-btn>
  <input v-model="input" type="text" placeholder="Type"><button @click="addText(input)">Save</button> -->
  <!-- <h1 class="wow animate animate__bounce" data-wow-iteration="1">{{now}}</h1> -->
    <l-map ref="myMap" @contextmenu="logme($event)" @click="onMapClick($event)" @ready="doSomethingOnReady()" class="cursor-pointer">
      <l-tile-layer url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=Hy1akLD3IImunuiWSB3zREeRuryl8B1SK8qVjDsLh7IuihnNs1QIJsWt8MVKiAOP"></l-tile-layer>

      <v-marker-cluster>
        <l-marker @add="triggerMe($event.target)" :riseOnHover="true" ref="marker" @click="whenClicked" @dragend="dragged" draggable autoPan v-for="(item, i) in markerList" :key="i" :lat-lng="markerList[i]._latlng">
          <l-popup autoClose closeOnEscapeKey keepInView :contentupdate="contentU()">
            <popup-comp v-bind:textZ="'Heyyy '" v-bind:coord="coordZ" v-bind:id="markerList[i].options.__ob__.dep.id" v-bind:index="i" @myevent="buttonPressed" @deleteevent="removeMarker"></popup-comp>
            <soldo></soldo>
            <v-otp-input length="6"></v-otp-input>
          </l-popup>
        </l-marker>

        <div>
          <l-marker :riseOnHover="true" ref="markers" autoPan v-for="(item, i) in remaped" :key="i" :lat-lng="remaped[i]._latlng">
            <l-popup autoClose closeOnEscapeKey keepInView>
              <soldo></soldo>
            </l-popup>
          </l-marker>
        </div>
      </v-marker-cluster>

    </l-map>
  <v-footer style="z-index: 1000;"
    fixed
    app>
    <v-bottom-navigation
      absolute
      color="white"
      horizontal>
      <v-btn :to="'/inspire'" class="wow animate animate__fadeInUp" data-wow-delay="0.2s" data-wow-iteration="1">
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn class="wow animate animate__fadeInUp" data-wow-delay="0.5s" data-wow-iteration="1">
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn class="wow animate animate__fadeInUp" data-wow-delay="0.8s" data-wow-iteration="1">
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>

  <v-overlay @keyup.ctrl.space="overlayLogic()"
  :z-index="10000"
          :absolute="true"
          :value="overlay"
        >
          <v-btn
            color="success"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>


  </v-container>
</template>

<script>

// import leaflet routing from leaflet-routing-machine

import gql from 'graphql-tag'
const fetchTasks = gql`
  query{
  fetchTasks{
    id,
    title,
    description,
    latitude,
    longitude
  }
}
`;
if (process.browser) { // Here we introduce... According to the environment wow.js
var {WOW} = require('../node_modules/wowjs/dist/wow.min.js')
}

import PopupComp from "./PopupComp.vue";
import Soldo from "./Soldo.vue";
export default {


  data(){
    return {
      map: null,
      markerArray: [],
      markerList: [],
      markersList: [],
      remaped: [],
      input: null,
      coordZ: {
        lat: 0,
        lng: 0
      },
      isActive: false,
      overlay: false,
      currentLocation: '',
      ctrlr: null
    }
  },
  watch: {
    coordZ: {
      handler(newVal, oldVal){
        if(newVal.lat === 0 && newVal.lng === 0){

        }

      },
      deep: true
    },
  },
  computed: {
  now() {
    return Date.now()
  }
},
  components:{
    'popup-comp': PopupComp,
    'soldo': Soldo
  },
  created(){
    //find class .leaflet-routing-container and add class .leaflet-routing-container-custom


    //log id and title for fetchTasks
    this.$apollo.query({
      query: fetchTasks,
    }).then(({data}) => {
      console.log(data.fetchTasks);
      // this.markersList = data.fetchTasks;
      this.markersList = data.fetchTasks;
      console.log(this.markersList[0].latitude);

      //remap markersList longitude and latitude to latlng remaped array
      this.remaped = this.markersList.map(item => {
        return {
          _latlng: {
            lat: item.latitude,
            lng: item.longitude
          },
          options: {
            __ob__: {
              dep: item
            }
          }
        }
      });
      console.log(this.remaped);

      //Vuex logic
      this.$store.commit('increment');
      console.log(this.$store.state.count);


    }).catch((error) => {
      console.log(error);
    });
  },
  mounted(){
    this.map = this.$refs.myMap.mapObject;
    this.$nextTick(() => {
      if (process.browser) { // On the page mounted In the life cycle Instantiate according to the environment WOW
        new WOW({animateClass: 'animate__animated'}).init()
      }
    });

    this.ctrlr = this.$L.Routing.control({
      waypoints: [
      ],
      routeWhileDragging: true,
      geocoder: this.$L.Control.Geocoder.nominatim({}),
      reverseWaypoints: true,
	    showAlternatives: true,
      router: new L.Routing.osrmv1({
        language: 'en',
        profile: 'car'
      }),

    }).addTo(this.map);

    this.ctrlr.getPlan().setWaypoints([
      this.$L.latLng(45.8299, 15.9793),
      this.$L.latLng(45.8299, 15.9793),
      // this.$L.latLng(45.6792, 15.949)
    ]);

    // this.$L.Control.geocoder().addTo(this.map);

    var leafletRouting = document.querySelector('.leaflet-routing-container');
    leafletRouting.style.backgroundColor = "white";
    leafletRouting.style.border = "1px solid white";
    leafletRouting.style.color = "black";

  },
  methods: {
    triggerMe(e){
      console.log(e, "Add Me");
    },
    contentU(){
      console.log('contentU')
    },
    overlayLogic(){
      this.overlay = !this.overlay;
      console.log(this.overlay, "overlay");
    },
    whenClicked(e){
      console.log('clicked', e);
      this.map.panTo(e.latlng, 20);
    },
    dragged(e){
      console.log(e);
      this.coordZ = e.target._latlng;
      this.map.panTo(e.target._latlng, 20);
    },
    doSomethingOnReady() {
     var location = this.map.locate({setView: true, maxZoom: 20});

      //set marker on current location
      this.map.on('locationfound', e => {
        //center map on user's location
        this.map.setView(e.latlng, 20);
        this.map.panTo(e.latlng, 20);

        var newMarker = L.marker(e.latlng).addTo(this.map);
      //change marker icon
        newMarker.setIcon(L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        }));

        //add a popup
        newMarker.bindPopup(`Current Location<br> Lat: ${e.latlng.lat}<br> Lng: ${e.latlng.lng}<br> ${this.currentLocation}`);

        //open popup
        newMarker.openPopup();

        console.log('location found', e);
      });

      this.ctrlr.on('routesfound', function(e) {
      console.log(e);
      for(var i = 0; i < e.routes[0].instructions.length; i++) {
        if(e.routes[0].instructions[i].road !== ('')){
          console.log(e.routes[0].instructions[i]);
          this.currentLocation = e.routes[0].instructions[i].road;
          console.log(e.routes[0].instructions[i].road);
          break;
        }}
    });

      this.map.on('popupopen', e => {
        console.log(e.popup._latlng);
        this.isActive = true;
      });

      this.map.on('popupclose', e => {
        this.isActive = false;
      });

     },

     //create a marker on click
      onMapClick(e) {
        var newMarker = this.$L.marker(e.latlng);

        // newMarker.openPopup();
        // console.log(newMarker, "newMarker");
        // console.log(newMarker.getLatLng().lat);
        // console.log(newMarker.getLatLng().lng);

        //get id from newMarker
        // this.coordZ = e.latlng;
        this.markerList.push(newMarker);

        //open popup


        console.log(this.markerList);
        this.map.panTo(e.latlng, 20);

        //get refs

      },

      //remove marker by id
      removeMarker(id) {
        this.markerList = this.markerList.filter(item => item.options.__ob__.dep.id !== id);
      },

      buttonPressed(i, it) {
        console.log('button pressed ' + i + ' ' + it);
      },
      logme(e){
        console.log('logme;', e.latlng);

      }
  },
}
</script>

<style scoped>
  .active {
    /* filter: blur(5px); */
  }

  .cursor-pointer {
    cursor: crosshair;
    margin: 0px;
    padding: 0px;
  }

  .red{
    background-color:#2E2E2E !important;
  }
</style>
