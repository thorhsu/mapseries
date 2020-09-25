<template>
  <div>    
      <l-geo-json ref="geoLayer" :visible="visible" v-if="geojson" :options="{onEachFeature: onEachFeature}" :geojson="geojson" />      
      <l-marker :visible="visible"  v-for="(coordinate, index) in markers" :ref="'marker_' + index" 
          :lat-lng="coordinate" :key="'marker_' +index"/>      
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable vue/valid-v-for */
import { LGeoJson, LMarker } from 'vue2-leaflet';
import L from 'leaflet';
import utils from '@/assets/js/utils.js'

export default {
  components: {
    LGeoJson,
    'l-marker': LMarker
  },
  props: {
    geoJson: {
      type: Object,
      default: () => {}
    },
    map: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    geojson() {            
      return Object.keys(this.geoJson).length? this.geoJson : "";
    },
    markers() {
      let coordinates = [];
      if(Object.keys(this.geoJson).length 
        && this.geoJson.features
        && this.geoJson.features.length) {
          this.geoJson.features.forEach(feature => {            
            coordinates.push(feature.geometry.coordinates);
          });
          return utils.removeDuplicatePoint(utils.flattenToPoints(coordinates, true));
      }
      return [];
    }
  },
  data() {
    return {
      showPointsLayer: false,          
    };
  },
  mounted() {
    if(this.map) {    
      this.map.eachLayer( layer => {    
        if(layer instanceof L.GeoJSON){    
          this.map.fitBounds(layer.getBounds());
        } 
      });
      // 找出每個feature所代表的layer，送出去方便編輯模式
      this.$refs.geoLayer.mapObject.eachLayer(layer => {
        this.$emit("addToEdit", layer);
      });
    }
  },
  beforeUpdate() {
  },
  updated() {    
    // 找出每個feature所代表的layer，送出去方便編輯模式
    this.$refs.geoLayer.mapObject.eachLayer(layer => {
        this.$emit("addToEdit", layer);
    });
  },
  watch: {
  },
  methods: {  
    onEachFeature(feature, layer) { 
      return layer;
    }          
  }
};
</script>
