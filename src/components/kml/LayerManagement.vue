<template>
  <div>      
    <el-card class="box-card" shadow="always">
      <el-row style="margin: -10px -10px 0 0" >
        <i @click="$emit('close')" style="float:right; color:#999; cursor: pointer" class="fas fa-times fa-lg"></i>
      </el-row>
      <el-row type="flex" align="middle" justify="center" v-for="(layer, index) in geoJsons" :key="'gjLayer_' + currentTime + index" >
        <el-col :span="2"><i @click="edit(layer)" style="cursor:pointer" class="fas fa-pen fa-sm`"></i></el-col>
        <el-col :span="2">
          <i @click="toggleView(layer, index)" 
              style="cursor:pointer" 
              :class="{'fas': true, 'fa-sm': true, 'fa-eye': layer.visible, 'fa-eye-slash': !layer.visible}"></i>          
        </el-col>
        <el-col :span="9">{{layer.file}}</el-col>
        <el-col :span="10">
          <el-input-number v-model="zIndexes[index]" 
              @change="zIndexChange($event, index)" :key="'zIndex_' + currentTime + index" 
              :min="min" :max="max" label="zIndex" size="mini" controls-position="right">
          </el-input-number> 
        </el-col>
        <el-col :span="1"><i style="cursor:pointer" @click="removeLayer(index)" class="el-icon-delete"></i></el-col>
      </el-row>
    </el-card>    
    <div  id="geoJsonArea">
      <l-geo-json v-for="(geoJson, index) in geoJsons" :ref="'geoLayer_' +index" :key="geoJson.uuid"
          :geojson="geoJson.geojson" :visible="geoJson.visible"/>              
    </div>  
  </div>
</template>

<script>
/* eslint-disable no-console */
import { LGeoJson} from 'vue2-leaflet';
export default {
  name: "LayerManagement",
  components: {
    LGeoJson
  },
  props: {
    map: {
      type: Object,
      default: () => {}
    },
    geoJsons: {
      type: Array,
      default: () => []
    },
    isEditing: {
      type: Boolean,
      default: false,
    }
  },
  computed: {        
  },
  data() {
    return {
      zIndexes: [],  
      max: 0,
      min: 99999999,
      currentTime: new Date().getTime()
    };
  },
  created() {
    this.refreshZIndexes();       
  },
  mounted() { 
    this.updateGeoJsonLayers();      
  },
  beforeUpdate() {    
    this.refreshZIndexes();    
  },
  updated() {      
    this.updateGeoJsonLayers();      
  },
  watch: {
    isEditing(newVal, oldVal) {
      if(newVal && !oldVal){
        this.geoJsons.forEach(geoJson => geoJson.visible = false)
        this.$emit("updateGeoJsons", this.geoJsons);        
      }else if(!newVal && oldVal){
        this.geoJsons.forEach(geoJson => geoJson.visible = true)
        this.$emit("updateGeoJsons", this.geoJsons);
      }    
    }
  },
  methods: { 
    refreshZIndexes(){
      this.zIndexes = [];    
      this.old_zIndexes = [];  
      this.min = 99999999;
      this.max = 0;
      this.geoJsons.forEach(geoJson => {           
        if(this.max < geoJson.zIndex){
          this.max = geoJson.zIndex;
        }
        if(this.min > geoJson.zIndex){
          this.min = geoJson.zIndex;
        }        
        this.zIndexes.push(geoJson.zIndex);
        this.old_zIndexes.push(geoJson.zIndex);                
      });      
    },
    toggleView(layer, index){      
      this.geoJsons[index].visible = !this.geoJsons[index].visible;       
      this.currentTime = new Date().getTime();
      this.$emit("updateGeoJsons", this.geoJsons);
    },
    zIndexChange(value, index){      
      const oldValue = this.old_zIndexes[index];         
      for(let i = 0 ; i < this.zIndexes.length; i++){
        if(this.zIndexes[i] === value && index !== i){
           this.zIndexes[i] = oldValue;
          this.geoJsons[i].zIndex = this.zIndexes[i];         
        }
      }
      this.geoJsons[index].zIndex = this.zIndexes[index];       
      this.old_zIndexes = [...this.zIndexes];      
      
      this.currentTime = new Date().getTime();
      this.$emit("updateGeoJsons", this.geoJsons);
    } ,   
    edit(layer){
      this.$emit("update:isEditing", true);
      layer.isEditing = true;
      this.$emit("toEditMode", layer);
    },
    removeLayer(index){
      const removedIndex = this.geoJsons[index].zIndex;
      this.geoJsons.splice(index, 1);   
      // 重算zIndex   
      this.geoJsons.forEach(geoJson => {
        if(geoJson.zIndex > removedIndex){
          geoJson.zIndex = geoJson.zIndex - 1 ;
        }
      });
      // this.refreshZIndexes();
      this.$emit("updateGeoJsons", this.geoJsons);
    },
    updateGeoJsonLayers(){
      this.allGeoJsonLayer = [];   
      for(let geoJson of this.geoJsons) {
        this.map.eachLayer(layer => {
          if(layer instanceof window.L.GeoJSON){
            if(geoJson.uuid === layer.toGeoJSON().features[0].properties.uuid){                 
              layer.setZIndex(geoJson.zIndex);              
            }
          }
        });
      }
    }
  }
};
</script>
<style scoped>
  .box-card {
     width: 288px;
     padding: 0px;
  }
  .el-input-number--mini >>> .el-input__inner{
      border-radius: 25px;     
      height: 22px; 
  }
  .el-input-number--mini >>> input[type="text"].el-input__inner {
    padding-left: 3px;
    padding-right: 3px;
  }
  .el-input-number--mini {
      width: 70px;      
  }
  .el-input-number--mini >>> .el-input-number__decrease {
    border-radius: 0px 0px 25px 0px;
    width:12px;
    height:5px;
  }
  .el-input-number--mini >>> .el-input-number__increase {
    border-radius: 0px 25px 0px 0px;
    width:12px;
    height:5px
  }
</style>
