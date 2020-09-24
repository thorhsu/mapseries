<template>
  <div>
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      style="height: 100vh"
      :options="{zoomControl: false}"
    >     
      <l-control position="topleft">
        <button @click="editMode" >edit</button>
      </l-control> 
      <gmap-tilelayer apikey="AIzaSyA2Kn8mv5cSaew9vwGwKY9DBULqxyRdVbc" :options="options" />      
      <GjsonAndMark  @addToEdit="addToEdit" :visible="true" :geoJson="geoJson" :map="map" />      
    </l-map>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LMap, LControl } from 'vue2-leaflet';
import GjsonAndMark from '@/components/GjsonAndMark';
import L from 'leaflet';
import LDraw from 'leaflet-draw';
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default {
  name: "Leaflet",
  components: {
    LMap, 
    'gmap-tilelayer': Vue2LeafletGoogleMutant,
    GjsonAndMark,
    LControl
  },
  props: {
    center: {
      type: Object,
      default: () => ({ lat: 25.0325917, lng: 121.5624999 })
    },
    zoom: {
      type: Number,
      default: 14
    },
    streetViewControl: {
      type: Boolean,
      default: true
    },
    mapTypeControl: {
      type: Boolean,
      default: true
    },
    fullscreenControl: {
      type: Boolean,
      default: true
    },
    zoomControl: {
      type: Boolean,
      default: true
    },
    geoJson: {
      type: Object,
      default: () => {}
    }
  },
  computed: {    
    geoLayers() {
      let currentLayers = [];
      if(this.map)
        this.map.eachLayer( layer => {
          if(layer instanceof L.GeoJSON){
              currentLayers.push(layer);                   
          } 
        });
      return currentLayers;      
    }
  },
  watch: {
    geoLayers: function(newVal, oldVal){      
      console.log("length", newVal.length, oldVal);
      if(newVal.length > 0)        
        this.map.fitBounds(newVal[newVal.length - 1].getBounds());
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      options: {
        type: 'roadmap'
      },
      infowindow: null,
      markers: [], 
      map: null,
      geojsons: [],
      editableLayers: null,
      mapLoaded: false,
      editLayer: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
      // 測試繪圖工具列
      const drawControl = new window.L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: {
            allowIntersection: false,
            showArea: true
          },
          polygon: false,
          rectangle: false,
          circle: false,
          marker: false
        }
      });

      this.map.addControl(drawControl);

      this.editableLayers = new window.L.FeatureGroup().addTo(this.map);
      console.log("this.editableLayer", this.editableLayers);
      this.map.on(window.L.Draw.Event.CREATED, (e) => {
        // const type = e.layerType;
        const layer = e.layer;
        // 
        this.editableLayers.addLayer(layer);
      });  
      this.mapLoaded = true;                
    });
  },
  methods: {    
    editMode() {
      this.editLayer = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.editableLayers,
          selectedPathOptions: {
              dashArray: '10, 10',

              fill: true,
              fillColor: '#fe57a1',
              fillOpacity: 0.1,

              // Whether to user the existing layers color
              maintainColor: false
          },
          poly: {
              allowIntersection: false
          }
      });
      this.editLayer.enable();    
    },
    addToEdit(layer) {
      this.editableLayers.addLayer(layer);
    }    
  }
};
</script>
