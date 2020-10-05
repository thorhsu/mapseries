<template>
  <div>      
    <el-card class="box-card" shadow="always">
      <el-row style="margin: -10px -10px 0 0" >
        <i @click="$emit('close')" style="float:right; " class="far fa-window-close fa-sm"></i>
      </el-row>
      <el-row type="flex" align="middle" justify="center" v-for="(layer, index) in geoJsons" :key="'gjLayer_' + currentTime + index" >
        <el-col :span="2"><i @click="edit(layer)" style="cursor:pointer" class="fas fa-pen fa-sm`"></i></el-col>
        <el-col :span="2"><i style="cursor:pointer" class="fas fa-eye"></i></el-col>
        <el-col :span="9">{{layer.file}}</el-col>
        <el-col :span="10">
          <el-input-number v-model="zIndexes[index]" 
              @change="zIndexChange($event, index)" 
              :min="min" :max="max" label="描述文字" size="mini" controls-position="right">
          </el-input-number> 
        </el-col>
        <el-col :span="1"><i style="cursor:pointer" class="el-icon-delete"></i></el-col>
      </el-row>
    </el-card>    
    <div v-if="!isEditing" id="geoJsonArea">
      <l-geo-json v-for="(geoJson, index) in geoJsons" :ref="'geoLayer_' +index" :key="'geoLayer_' +index"
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
  },
  mounted() { 
    
  },
  beforeUpdate() {
    this.zIndexes = [];    
    this.geoJsons.forEach(geoJson => {
      if(this.max < geoJson.zIndex){
        this.max = geoJson.zIndex;
      }
      if(this.min > geoJson.zIndex){
        this.min = geoJson.zIndex;
      }
      this.zIndexes.push(geoJson.zIndex);
      console.log("zIndexes", this.zIndexes);
    });
  },
  updated() {  
    this.updateGeoJsonLayers();  
    // console.log("test updated");
  },
  watch: {
  },
  methods: { 
    zIndexChange(value, index){
      const oldValue = this.zIndexes[index];   
      console.log("old value", oldValue);   
      for(let i = 0 ; i < this.zIndexes.length; i++){
        if(this.zIndexes[i] === value){
          this.zIndexes[i] = oldValue;
          this.geoJsons[i].zIndex = this.zIndexes[i];         
        }
      }
      this.zIndexes[index] = value;       
      this.geoJsons[index].zIndex = this.zIndexes[index];         
      this.currentTime = new Date().getTime();
      this.$emit("updateGeoJsons", this.geoJsons);
    } ,   
    edit(layer){
      this.$emit("update:isEditing", true);
      layer.isEditing = true;
      this.$emit("toEditMode", layer);
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
