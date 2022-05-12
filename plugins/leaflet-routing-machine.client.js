import Vue from "vue";
import * as L from "leaflet";
import * as LRM from 'leaflet-routing-machine'


export default (_, inject) => {
  inject("LRM", LRM);
}
