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
        <button>test</button>
      </l-control> 
      <gmap-tilelayer apikey="AIzaSyA2Kn8mv5cSaew9vwGwKY9DBULqxyRdVbc" :options="options" />
      <GjsonAndMark :geoJson="geoJson" :map="map" />

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
        console.log(this.$refs.marker_0);
      return currentLayers;      
    }
  },
  watch: {
    geoLayers: function(newVal, oldVal){
      if(newVal.length > 0)        
        this.map.fitBounds(newVal[0].getBounds());
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

      const editableLayers = new window.L.FeatureGroup().addTo(this.map);
      this.map.on(window.L.Draw.Event.CREATED, (e) => {
        // const type = e.layerType;
        const layer = e.layer;

        // Do whatever else you need to. (save to db, add to map etc)
        editableLayers.addLayer(layer);
      });      
    });
    
    // this.initMap();
    // this.setMarker();
  },
  methods: {    
    resetCenter() {
      // set center
      this.map.panTo({ lat: this.center.lat, lng: this.center.lng });
    },
    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
    setMarker() {
      const google = window.google
      
      // clear existing markers
      this.clearMarkers();

      this.restaurants.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: this.map
        });

        // save markers
        this.markers.push(marker);

        const infowindow = new google.maps.InfoWindow({
          content: `
          <div id="content">
            <p id="firstHeading" class="firstHeading">${location.name}</p>
          </div>
        `,
          maxWidth: 200
        });

        marker.addListener("click", () => {
          if (this.infowindow) this.infowindow.close();
          infowindow.open(this.map, marker);
          this.infowindow = infowindow;
        });
      });
    }
  }
};
</script>
