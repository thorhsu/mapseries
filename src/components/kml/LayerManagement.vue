<template>
  <div>      
    <el-card class="box-card" shadow="always">
      <el-row style="margin: -10px -10px 0 0" >
        <i @click="$emit('close')" style="float:right; " class="far fa-window-close fa-sm"></i>
      </el-row>
      <el-row type="flex" align="middle" justify="center" v-for="(layer, index) in geoJsons" :key="'gjLayer_' + index" >
        <el-col :span="2"><i @click="edit(layer)" style="cursor:pointer" class="fas fa-pen fa-sm`"></i></el-col>
        <el-col :span="2"><i style="cursor:pointer" class="fas fa-eye"></i></el-col>
        <el-col :span="9">{{layer.file}}</el-col>
        <el-col :span="10">
          <el-input-number controls-position="right" :min="1" 
              :max="3" size="mini" >
          </el-input-number>
        </el-col>
        <el-col :span="1"><i style="cursor:pointer" class="el-icon-delete"></i></el-col>
      </el-row>
    </el-card>    
    <div v-if="!isEditing" id="geoJsonArea">
      <l-geo-json v-for="(geojson, index) in viewGeoJsons" :ref="'geoLayer_' +index" :key="'geoLayer_' +index"
          :geojson="geojson" />              
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
    viewGeoJsons() {
      return this.geoJsons.map(json => {
        if(json.visible){
          return json.geojson;
        }
      });
    }
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  beforeUpdate() {
  },
  updated() {    
    
  },
  watch: {
  },
  methods: {  
    edit(layer){
      layer.isEditing = true;
      this.$emit("toEditMode", layer);
    }
  }
};
</script>
<style scoped>
  .box-card {
     width: 288px;
     padding: 0px;
  }
  .el-input-number--mini {
      width: 55px;
      line-height: 12px;
  }
  .el-input-number--mini >>> .el-input__inner{
      border-radius: 25px;
  }
  .el-input-number--mini >>> .el-input-number__decrease {
    border-radius: 0px 0px 25px 0px;
    width:12px;
  }
  .el-input-number--mini >>> .el-input-number__increase {
    border-radius: 0px 25px 0px 0px;
    width:12px;
  }
</style>
