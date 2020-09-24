<template>
  <div>    
      <l-geo-json :visible="true" v-if="geojson" :options="{onEachFeature: onEachFeature}" :geojson="geojson" />      
      <l-marker :visible="true"  v-for="(coordinate, index) in markers" :ref="'marker_' + index" 
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
  },
  methods: {  
    onEachFeature(feature, layer) {
      this.$nextTick(() =>
        this.$emit("addToEdit", layer)
      );
    }          
  }
};
</script>
