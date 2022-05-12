import Vue from "vue";
import * as L from "leaflet";
import * as GeoCoder from 'leaflet-routing-machine/examples/Control.Geocoder.js'


export default (_, inject) => {
  inject("GeoCoder", GeoCoder);
}
