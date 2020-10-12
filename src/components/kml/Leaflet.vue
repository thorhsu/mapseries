<template>
  <div>
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      style="height: 100vh"
      :options="{zoomControl: false}"
    >     
      <l-control position="topleft">
        <MapActionsPanel @handleFunctionCall="handleFunctionCall" :modifying.sync="modifying" v-show="isEditing" />
      </l-control> 
      <l-control position="topright">

        <!-- <el-button @click="showLayerManagement=!showLayerManagement" v-if="geoJsons.length" circle style="background-color:rgba(0, 0, 0, 0);float:right">
          <img src="@/assets/icons/map/Layer.png" style="object-fit: cover;width:73px; height:73px" />
        </el-button>
        <LayerManagement @close="showLayerManagement=false"  
          v-show="showLayerManagement" 
          @toEditMode="toEditMode" 
          :geoJsons="geoJsons" :map="map"/> -->
        <div v-show="!isEditing">
          <div @click="showLayerManagement=!showLayerManagement" v-show="geoJsons.length" circle class="layers-button">
            <img src="@/assets/icons/map/Layer.png" />
          </div>
          <LayerManagement :isEditing.sync="isEditing" @close="showLayerManagement=false" 
              v-show="showLayerManagement" @toEditMode="toEditMode" 
              :geoJsons="geoJsons" @updateGeoJsons="updateGeoJsons" :map="map"/>
        </div>

      </l-control>

      <gmap-tilelayer apikey="AIzaSyA2Kn8mv5cSaew9vwGwKY9DBULqxyRdVbc" :options="options" />      
      <GjsonAndMark v-if="isEditing" 
          @addToEdit="addToEdit" 
          @updateGeojson="updateGeojson"
          :markerVisible="markerVisible" 
          :gjsonVisible="gjsonVisible" 
          :isEditing="isEditing"
          :geoJson="editingGeoJson"  
          :map="map" />      

    </l-map>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LMap, LControl } from 'vue2-leaflet';
import GjsonAndMark from '@/components/kml/GjsonAndMark';
import LayerManagement from '@/components/kml/LayerManagement';
import MapActionsPanel from '@/components/kml/MapActionsPanel';

import L from 'leaflet';
import LDraw from 'leaflet-draw';
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import _ from 'lodash';
import tokml  from "tokml";

export default {
  name: "Leaflet",
  components: {
    LMap, 
    'gmap-tilelayer': Vue2LeafletGoogleMutant,
    GjsonAndMark,
    LControl,
    LayerManagement,
    MapActionsPanel
  },
  props: {
    center: {
      type: Object,
      default: () => ({ lat: 25.0325917, lng: 121.5624999 })
    },
    zoom: {
      type: Number,
      default: 14
    },
    streetViewControl: {
      type: Boolean,
      default: true
    },
    mapTypeControl: {
      type: Boolean,
      default: true
    },
    fullscreenControl: {
      type: Boolean,
      default: true
    },
    zoomControl: {
      type: Boolean,
      default: true
    },
    geoJsons: {
      type: Array,
      default: () => []
    },
  },
  computed: { 
    editingGeoJson() {
      const editingGeojson = this.geoJsons.filter(geojson => {
        return geojson.isEditing;
      });
      if(editingGeojson && editingGeojson.length > 0) {  
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isEditing = true;      
        return editingGeojson[0].geojson;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.isEditing = false;      
      return {};
    },   
    modified() {
      return this.geoJsons.filter(geoJson => geoJson.modified).length
    }
  },
  watch: {
    
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      options: {
        type: 'roadmap'
      },            
      modifying: false,
      editingLayers: [], 
      map: null,
      editableLayers: null,
      mapLoaded: false,
      editLayer: null,
      editingUuid: "",
      deleteLayer: null,
      polylineDrawer:null,
      markerDrawer:null,
      polygonDrawer:null,
      markerVisible: false,
      gjsonVisible: true,
      isEditing: false,
      showLayerManagement: false,
    };
  },
  created() {
  },
  mounted() {
    // console.log("mounted");
    // this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
      // 測試繪圖工具列
      const drawControl = new window.L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: {
            allowIntersection: false,
            showArea: true
          },
          polygon: false,
          rectangle: false,
          circle: false,
          marker: false
        }
      });

      // 需要預設工具列時加入，目前不需要
      // this.map.addControl(drawControl);

      this.editableLayers = new window.L.FeatureGroup().addTo(this.map);      
      // 將draw出來的圖層加到editableLayers
      this.map.on(window.L.Draw.Event.CREATED, e => {
        this.editingLayers.push(e.layer);
        this.editableLayers.addLayer(e.layer);
        this.save(false);
        this.map.removeLayer(e.layer);
        this.modifying = false;
      });  
      this.mapLoaded = true;                
    // }); // end of this.$nextTick()
  },
  beforeUpdate() {
    // console.log("before updated");
  },
  updated() {
    // console.log("leaflet updated");    
  },
  methods: { 
    updateGeoJsons(geoJsons){
      // 把父組件傳來的geoJsons全部update
      this.geoJsons = geoJsons;
      this.$emit('update:geoJsons', geoJsons);
    },
    handleFunctionCall(functionName) {
      // 控制MapActionPanel傳來的事件
      this[functionName]()
    },
    clear() {
      // 拖曳模式放棄時
      this.markerVisible = false; 
      this.gjsonVisible = true;
      if(!this.editLayer)
        return;
      this.editLayer.revertLayers();
      this.editLayer.disable();      
    },
    save(editing=true) {
      // 確認完成拖曳模式            
      var geoJson = this.editableLayers.toGeoJSON();
      // 如果是新畫的圖形沒有uuid，要加回去
      for(let feature of geoJson.features){
        feature.properties["uuid"] = this.editingUuid;
      }
      if(editing && this.editLayer){
        this.editLayer.save();
        this.editLayer.disable();                        
      }
      this.updateGeojson(geoJson);      
    }, 
    edit() {    
      // 進入拖曳模式  
      this.editLayer = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.editableLayers,
          // 進入edit mode後的樣式
          selectedPathOptions: {
              dashArray: '10, 10',
              fill: true,
              fillColor: '#fe57a1',
              fillOpacity: 0.1,

              // Whether to user the existing layers color
              maintainColor: false
          },
          poly: {
              allowIntersection: false
          }
      });
      console.log("edit layer", this.editLayer.enable, this.editLayer);
      this.editLayer.enable();    
    },
    addToEdit(layers) {
      this.clearEditableLayers();      
      for(let layer of layers) {
        this.editingLayers.push(layer);
        this.editableLayers.addLayer(layer);
      }
      console.log("editable layers", this.editingLayers);
    },
    updateGeojson(geoJson) {
      this.clearEditableLayers();
      this.markerVisible = false;
      this.gjsonVisible = true;
      let mutatedGjsons = _.cloneDeep(this.geoJsons);
      mutatedGjsons.forEach( geojson => {
        if(geojson.isEditing){          
          geojson.geojson = geoJson;
          geojson.modified = true;         
        }
      });
      this.$emit("update:geoJsons", mutatedGjsons);
    },
    drawMarker () {
      this.markerDrawer = new L.Draw.Marker(this.map);
      this.markerDrawer.enable();
    },
    drawLine () {
      this.polylineDrawer = new L.Draw.Polyline(this.map, {
            allowIntersection: true,
            showArea: true
          });
      this.polylineDrawer.enable();
    },
    drawPolygon () {
      this.polygonDrawer = new L.Draw.Polygon(this.map);
      this.polygonDrawer.enable();
    },
    upload(){
      const completedGeoJson = this.editableLayers.toGeoJSON();
      const kmlTxt = tokml(completedGeoJson);
      this.geoJsons.forEach(geoJson => {
        if(geoJson.isEditing){
          geoJson.modified = false;
          geoJson.geojson = completedGeoJson;
        }
      });
      this.updateGeoJsons(this.geoJsons);
      this.modifying = false;
    },
    delete() {      
      this.deleteLayer = new L.EditToolbar.Delete(this.map, {
          featureGroup: this.editableLayers,          
      });
      this.deleteLayer.enable();
    },
    // 取消刪除
    cancelDelete() {
      this.deleteLayer.revertLayers();
      this.deleteLayer.disable();
    },
    // 刪除確認
    saveDelete() {
      this.deleteLayer.save();
      this.deleteLayer.disable();
      this.save(false);
    },
    exit() {      
      let exit = false;
      if(this.modified && confirm("尚未上傳儲存，確認離開？")){        
        exit = true;        
      } else if(!this.modified) {
        exit = true;
      }
      if(exit) {
        this.editingUuid = "";
        this.isEditing = false;
        this.modifying = false;
        this.geoJsons.forEach(geoJson => {
          geoJson.modified = false; 
          geoJson.isEditing = false;
          geoJson.visible =true;
        });
      }
      /* 待完成 */
      // 將遠端的kml拉下來，重新整理
    },
    clearEditableLayers() {
      // 清空editablelayers
      for(const layer of this.editingLayers) {        
        this.editableLayers.removeLayer(layer);
      }
      this.editingLayers = [];
    },
    calibrate() {
      this.clearEditableLayers();
      this.markerVisible = !this.markerVisible;
      this.gjsonVisible = !this.gjsonVisible;
    },
    toEditMode(layer){
      this.isEditing = true;
      let mutatedGjsons = _.cloneDeep(this.geoJsons);
      for(let i = 0 ; i < mutatedGjsons.length; i++) {
        if(mutatedGjsons[i].url === layer.url) {
          this.editingUuid = mutatedGjsons[i].uuid;
          mutatedGjsons[i] = layer
        } else {
          mutatedGjsons[i].isEditing = false;
        }
      }
      this.$emit("update:geoJsons", mutatedGjsons);
    }
  }
};
</script>

<style scoped>

  .layers-button {
    background-color:rgba(0, 0, 0, 0); 
    float:right;
    height: 85px;
    width: 85px;
    cursor: pointer;
    margin: 15px;
  }
  .layers-button img {
    height: 100%;
    width: 100%;
  }

</style>