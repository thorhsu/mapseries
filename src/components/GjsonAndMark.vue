<template>
  <div>    
      <l-geo-json ref="geoLayer" :visible="gjsonVisible" v-if="geojson" :options="{onEachFeature: onEachFeature}" :geojson="geojson" />      
      <l-marker :visible="markerVisible"  v-for="(coordinate, index) in markers" :ref="'marker_' + index" 
          :lat-lng="coordinate" :key="'marker_' +index">          
          <l-popup  :options="options">
            <div style="cursor:pointer" @click="showLatLng(coordinate)" >
              校正座標
            </div>
          </l-popup>
      </l-marker>   
      <el-dialog v-dialogDragAble :visible.sync="isCalibration" title="校正點座標"
        width="30%" center>
        <el-form style="align:center" :model="form">
          <el-form-item style="border-bottom: 2px solid red; padding: 0% 0% 5%;">
            <el-row>
              <el-checkbox-group v-model="epsgCode">      
                <el-col class="text-center" :span="8">
                  <el-checkbox label="經緯度"></el-checkbox>
                </el-col>
                <el-col class="text-center" :span="8">
                  <el-checkbox class="text-center" label="全球座標"></el-checkbox>
                </el-col>
                <el-col class="text-center" :span="8">
                  <el-checkbox class="text-center" label="TWD97"></el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
            <el-row type="flex" justify="space-around">              
              <el-col class="text-center" :span="11">
                <el-input placeholder="X座標" v-model="newLatitude"></el-input>
              </el-col>
              <el-col class="text-center" :span="11">
                <el-input placeholder="y座標" v-model="newLongtitude"></el-input>
              </el-col>              
            </el-row>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">          
          <el-button type="primary" @click="toGeoJson">儲存</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable vue/valid-v-for */
import { LGeoJson, LMarker, LPopup } from 'vue2-leaflet';
import L from 'leaflet';
import utils from '@/assets/js/utils.js';
import _ from 'lodash';

export default {
  components: {
    LGeoJson,
    LMarker,
    LPopup
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
    gjsonVisible: {
      type: Boolean,
      default: true
    },
    markerVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    geojson() { 
      if(this.gjsonVisible)           
        return Object.keys(this.geoJson).length? this.geoJson : this.emptyGeoJson;
      return this.emptyGeoJson;
    },
    epsgCode: {
      get() {
        return this.form.epsgCode;
      },
      set(value) {
        this.form.epsgCode = [value[value.length - 1]];
      }
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
      showParagraph: false,
      options: {},
      isCalibration: false,  
      form: {
        epsgCode: ["經緯度"]
      },
      oldLnglat: [],
      newLongtitude: 0,
      newLatitude: 0, 
      emptyGeoJson: {"type": "FeatureCollection", "features": []},
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
    },    
    showLatLng(latlng){
      this.oldLnglat = [latlng[1], latlng[0]];
      this.newLongtitude = latlng[1];      
      this.newLatitude = latlng[0];
      this.isCalibration = true;      
    },
    toGeoJson() {
      let geojsonCopy = _.cloneDeep(this.geoJson);      
      for(let feature of geojsonCopy.features) {        
        const coordinatesDeepth = utils.getArrayDepth(feature.geometry.coordinates);        
        for(let i = 0 ; i < feature.geometry.coordinates.length; i++){
          let coordinate = []
          switch(coordinatesDeepth){
            case 1:
              coordinate = feature.geometry.coordinates;
              if(JSON.stringify(this.oldLnglat) === JSON.stringify(coordinate)){
                coordinate = [this.newLongtitude, this.newLatitude];
                feature.geometry.coordinates = coordinate;
              }
              break
            case 2:
              coordinate = feature.geometry.coordinates[i];
              if(JSON.stringify(this.oldLnglat) === JSON.stringify(coordinate)){
                coordinate = [this.newLongtitude, this.newLatitude];
                feature.geometry.coordinates[i] = coordinate;
              }
              break;
            case 3:              
              for(let j = 0 ; j < feature.geometry.coordinates[i].length; j++){
                coordinate = feature.geometry.coordinates[i][j];
                if(JSON.stringify(this.oldLnglat) === JSON.stringify(coordinate)){
                  coordinate = [this.newLongtitude, this.newLatitude];
                  feature.geometry.coordinates[i][j] = coordinate;
                }
              }
              break;              
            case 4:              
              for(let j = 0 ; j < feature.geometry.coordinates[i].length; j++){
                for(let k = 0 ; k < feature.geometry.coordinates[i][j].length; k++){
                  coordinate = feature.geometry.coordinates[i][j][k];
                  if(JSON.stringify(this.oldLnglat) === JSON.stringify(coordinate)){
                    coordinate = [this.newLongtitude, this.newLatitude];
                    feature.geometry.coordinates[i][j][k] = coordinate;
                  }
                }
              }
              break;              
          }
        }
      }
      this.$emit("updateGeojson", geojsonCopy);
    }
  }
};
</script>
