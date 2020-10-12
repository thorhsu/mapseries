<template>
  <div>    
      <el-dialog v-dialogDragAble :visible.sync="isCalibration" title="輸入點座標"
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
      default: () => {}
    }
  },
  computed: {    
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
    }
  },
  data() {
    return {
      form: {
        epsgCode: ["經緯度"],
      },
      newLongtitude: 0, 
      newLatitude: 0,      
      emptyGeoJson: {"type": "FeatureCollection", "features": []},
      epsgCodes: {"經緯度": 4326, "全球座標": 3857, "TWD97": 3826},      
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
    
  }
};
</script>
