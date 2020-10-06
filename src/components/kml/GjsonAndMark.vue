<template>
  <div>    
      <l-geo-json ref="geoLayer" :visible="gjsonVisible" v-if="geojson" :geojson="geojson" />      
      <l-marker :visible="markerVisible"  v-for="(coordinate, index) in markers" :ref="'marker_' + index" 
          :lat-lng="coordinate" :key="'marker_' + currentTime +index">          
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
                <el-col v-for="label in Object.keys(epsgCodes)" :key="'epsgCode_' + currentTime + epsgCodes[label]" class="text-center" :span="8">
                  <el-checkbox :label="label"></el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
            <el-row type="flex" justify="space-around">              
              <el-col class="text-center" :span="11">
                <el-input  placeholder="X座標" v-model.number="newLongtitude"></el-input>
              </el-col>
              <el-col class="text-center" :span="11">
                <el-input  placeholder="y座標" v-model.number="newLatitude"></el-input>
              </el-col>              
            </el-row>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">          
          <el-button type="primary" @click="toGeoJson">確認</el-button>
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
  name: "GjsonAndMark",
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
        [this.newLongtitude, this.newLatitude] = utils.transferCoordinate(this.epsgCodes[value[0]], 
              this.epsgCodes[value[1]], 
              [this.newLongtitude, this.newLatitude]);
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
      epsgCodes: {"經緯度": 4326, "全球座標": 3857, "TWD97": 3826},
      currentTime: new Date().getTime()
    };
  },
  mounted() {
    if(this.map) {    
      this.fitBounds();
      // 找出每個feature所代表的layer，送出去方便編輯模式
      let editableLayers = [];
      this.$refs.geoLayer.mapObject.eachLayer(layer => {
        editableLayers.push(layer);
      });
      this.$emit("addToEdit", editableLayers);
    }
  },
  beforeUpdate() {
    this.currentTime = new Date().getTime();
  },
  updated() {    
    // 找出每個feature所代表的layer，送出去方便編輯模式
    this.fitBounds();
    let editableLayers = [];
    this.$refs.geoLayer.mapObject.eachLayer(layer => {
      editableLayers.push(layer);
    });
    this.$emit("addToEdit", editableLayers);
  },
  watch: {
  },
  methods: {     
    fitBounds() {
      if(this.gjsonVisible)
        this.map.fitBounds(this.$refs.geoLayer.mapObject.getBounds())
    },
    showLatLng(latlng){
      this.form.epsgCode= ["經緯度"];
      this.oldLnglat = [latlng[1], latlng[0]];
      this.newLongtitude = latlng[1];      
      this.newLatitude = latlng[0];
      this.isCalibration = true;      
    },
    toGeoJson() {
      console.log("to geojson");
      if(this.epsgCodes[this.epsgCode[0]] !== 4326){
        [this.newLongtitude, this.newLatitude] = utils.transferCoordinate(
                this.epsgCodes[this.epsgCode[0]], 
                4326, 
                [this.newLongtitude, this.newLatitude]);
      }
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
          }
        }
      }
      this.isCalibration=false;
      this.oldLnglat = [];
      this.newLongtitude = 0;
      this.newLatitude = 0;
      this.$emit("updateGeojson", geojsonCopy);
    }
  }
};
</script>
