<template>
  <div>    
      <l-geo-json v-if="geojson" :geojson="geojson" />
      <l-marker v-for="(coordinate, index) in markers" :lat-lng="coordinate" :visible="true" :key="index"/>
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
          console.log(utils.flattenToPoints(coordinates));
          return utils.flattenToPoints(coordinates);
      }
      return [];
    }
  },
  data() {
    return {      
    };
  },
  mounted() {
    
  },
  methods: {    
    
    
  }
};
</script>
