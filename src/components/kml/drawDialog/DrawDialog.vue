<template>      
    <el-dialog v-dialogDragAble :visible="dialogOpen" @close="$emit('update:dialogOpen', false)" :title="`${functionTxt}-輸入點座標`"
      width="30%" center>
      <el-form style="align:center">
        <el-form-item style="border-bottom: 2px solid red; padding: 0% 0% 5%;">
          <el-row>
            <el-checkbox-group v-model="epsgCode">      
              <el-col v-for="label in Object.keys(epsgCodes)" :key="`epsgCode_${epsgCodes[label]}`" 
                class="text-center" :span="8">
                <el-checkbox :label="label"></el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
          <el-row type="flex" justify="space-around" :gutter="12">              
            <el-col class="text-center" :span="12">
              <el-input  placeholder="X座標" v-model="newLongtitude"></el-input>
            </el-col>
            <el-col class="text-center" :span="12">
              <el-input  placeholder="y座標" v-model="newLatitude"></el-input>
            </el-col>  
          </el-row>            
          <el-row type="flex" justify="end" style="margin-top:20px" :gutter="12">              
            <el-col class="text-right" :span="24">
              <el-button type="info" round @click="addToCoordinates">新增</el-button>
            </el-col>    
          </el-row>
        </el-form-item>
      </el-form>
      <el-row v-show="coordinates.length">
        <el-col class="text-center" :span="24">WGS84</el-col>        
      </el-row>
      <el-row v-show="coordinates.length" class="text-center">
        <el-col :span="6">Index</el-col>
        <el-col :span="6">X座標</el-col>
        <el-col :span="6">Y座標</el-col>
        <el-col :span="6">刪除</el-col>        
      </el-row>
      <el-row v-for="(coordinate, index) in coordinates" class="text-center" :key="`coordinate_${index}`">
        <el-col :span="6">{{index}}</el-col>
        <el-col :span="6">{{coordinate[0]}}</el-col>
        <el-col :span="6">{{coordinate[1]}}</el-col>
        <el-col :span="6"><i style="color:red; cursor:pointer" @click="remove(index)" class="fas fa-minus-circle fa-sm"></i></el-col>        
      </el-row>
      
      <span slot="footer" class="dialog-footer">          
        <el-button type="primary" @click="toGeoJson">確認</el-button>
      </span>
    </el-dialog>  
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable vue/valid-v-for */
import L from 'leaflet';
import utils from '@/assets/js/utils.js';
import _ from 'lodash';

export default {
  name: "DrawDialog",
  components: {

  },
  props: {
    geoJson: {
      type: Object,
      required: true,
    },
    functionName: {
      type: String,
      required: true
    },
    dialogOpen: {
      type: Boolean,      
      default: false
    }
  },
  computed: {    
    epsgCode: {
      get() {
        return this.epsgcode;
      },
      set(value) { 
        if(this.coordinates.length){
          this.$alert("不可變換座標系統輸入", "提醒", 'info');                  
          this.epsgcode = [value[0]];        
        } else {
          this.epsgcode = [value[value.length - 1]];        
        }
      }
    },
    functionTxt() {
       return {drawMarker: "點", drawLine: "線", drawPolygon: "面"}[this.functionName]
    }
  },
  data() {
    return {      
      epsgcode: ["經緯度"],      
      newLongtitude: "", 
      newLatitude: "",        
      uuid: "",
      coordinates: [],
      emptyGeoJson: {type: "FeatureCollection", features: []},
      pointGeoJson: {type:"Feature",properties:{},geometry:{type:"Point",coordinates:[]}},
      lineGeoJson: {type:"Feature",properties:{},geometry:{type:"LineString",coordinates:[[],[]]}},
      polygonGeoJson: {type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[],[],[],[]]]}},      
      epsgCodes: {"經緯度": 4326, "全球座標": 3857, "TWD97": 3826},      
    };
  },
  mounted() {
    if(this.geoJson && this.geoJson.features && this.geoJson.features.length){
      this.uuid = this.geoJson.features[0].properties.uuid;
      this.pointGeoJson.properties = {...this.geoJson.features[0].properties};
      this.lineGeoJson.properties = {...this.geoJson.features[0].properties};
      this.polygonGeoJson.properties = {...this.geoJson.features[0].properties};      
    }
  },
  beforeUpdate() {
    
  },
  updated() {   
    if(this.geoJson && this.geoJson.features && this.geoJson.features.length){
      this.uuid = this.geoJson.features[0].properties.uuid;
      this.pointGeoJson.properties = {...this.geoJson.features[0].properties};
      this.lineGeoJson.properties = {...this.geoJson.features[0].properties};
      this.polygonGeoJson.properties = {...this.geoJson.features[0].properties};      
    }     
  },
  watch: {
    epsgcode(newValue, oldValue) {          
      const lon = parseFloat(this.newLongtitude);
      const lat = parseFloat(this.newLatitude);
      if(this.newLongtitude && this.newLatitude && lon && lat){
        [this.newLongtitude, this.newLatitude] = utils.transferCoordinate(this.epsgCodes[oldValue], 
              this.epsgCodes[newValue], 
              [lon, lat]);          
      } else if (this.newLongtitude || this.newLatitude) {        
        this.$alert("無法轉換，X及Y座標均需輸入合格數字", "Error", 'error');
        this.newLatitude = "";
        this.newLongtitude = "";
      }     
    },
    newLatitude(newVal){
      if(newVal != "" && !parseFloat(newVal)){
        this.$alert("Y座標請輸入合格數字", "Error", 'error');
        this.newLatitude = "";
      }
    },
    newLongtitude(newVal){
      if(newVal != "" && !parseFloat(newVal)){
        this.$alert("X座標請輸入合格數字", "Error", 'error');
        this.newLongtitude = "";
      }
    }

  },
  methods: {  
    toGeoJson(){
      switch(this.functionName) {
        case "drawMarker":{
          for(let coordinate of this.coordinates){
            let pointGeoJson = _.cloneDeep(this.pointGeoJson);
            pointGeoJson.geometry.coordinates = [coordinate[0], coordinate[1]];
            this.geoJson.features.push(pointGeoJson);
            this.coordinates = [];
          }
          break;
        }
        case "drawLine": {
          if(this.coordinates.length < 2){
            this.$alert("少於兩點無法構成線，請至少輸入兩點", "提醒", 'info');
            return;
          }
          let lineGeoJson = _.cloneDeep(this.lineGeoJson);
          lineGeoJson.geometry.coordinates = _.cloneDeep(this.coordinates);
          this.geoJson.features.push(lineGeoJson);
          this.coordinates = [];
          break;
        }
        case "drawPolygon": {
          if(this.coordinates.length < 3){
            this.$alert("少於三點無法構成面，請至少輸入三點", "提醒", 'info');
            return;
          }
          // 頭尾的點必須相同
          this.coordinates.push([this.coordinates[0][0], this.coordinates[0][1]]);
          let polygonGeoJson = _.cloneDeep(this.polygonGeoJson);
          polygonGeoJson.geometry.coordinates =[ _.cloneDeep(this.coordinates)];
          this.geoJson.features.push(polygonGeoJson);
          this.coordinates = [];
          break;
        }
      }
      // console.log(this.geoJson);
      
      this.$emit('update:dialogOpen', false)
      this.$emit("updateGeojson", this.geoJson);
    },
    addToCoordinates() {   
      this.newLongtitude = parseFloat(this.newLongtitude + "");
      this.newLatitude = parseFloat(this.newLatitude + "");
      let lon, lat;
      if(this.epsgcode[0] !== 4326){
        [lon, lat] = utils.transferCoordinate(this.epsgCodes[this.epsgcode[0]], 4326, 
                [this.newLongtitude, this.newLatitude]);          
      } else {
        lon = this.newLongtitude;
        lat = this.newLatitude;
      }
      if(lon > 180 || lon < -180){
        this.$alert("經度超過範圍", "Error", 'error');
        return;
      }
      if(lat > 85 || lat < -85){
        this.$alert("緯度超過範圍", "Error", 'error');
        return;
      }
      this.newLongtitude = this.newLongtitude.toFixed(7);
      this.newLatitude = this.newLatitude.toFixed(7);
      this.coordinates.push([lon, lat]);
    },
    remove(index) {
      this.coordinates.splice(index, 1);
    }
  }
};
</script>
