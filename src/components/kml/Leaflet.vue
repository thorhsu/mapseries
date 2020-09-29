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
        <div>
          <button @click="calibrate" >校正模式</button>
          <button @click="edit" >拖曳模式</button>
          <button @click="drawMarker" >畫點工具</button>
          <button @click="drawLine" >畫線工具</button>
          <button @click="drawPoligon" >畫面工具</button>
          <button  >儲存檔案</button>
          <button  >離開</button>
        </div>
        <div>
          <button @click="clear" >取消變更</button>
          <button @click="save" >完成變更</button>
        </div>
      </l-control> 
      <l-control position="topright">
        <el-button v-if="geoJsons.length" circle style="background-color:rgba(0, 0, 0, 0);float:right">
          <img src="@/assets/icons/map/Layer.png" style="object-fit: cover;width:73px; height:73px" />
        </el-button>
        <LayerManagement @toEditMode="toEditMode" :geoJsons="geoJsons" :map="map"/>
        

      </l-control>

      <gmap-tilelayer apikey="AIzaSyA2Kn8mv5cSaew9vwGwKY9DBULqxyRdVbc" :options="options" />      
      <GjsonAndMark v-if="isEditing" @addToEdit="addToEdit" 
          :markerVisible="markerVisible" 
          :gjsonVisible="gjsonVisible" 
          :geoJson="editingGeoJson" @updateGeojson="updateGeojson" 
          :map="map" />      
      <div v-if="!isEditing" id="geoJsonArea">
        <l-geo-json v-for="(geojson, index) in viewGeoJsons" :ref="'geoLayer_' +index" :key="'geoLayer_' +index"
            :geojson="geojson" />      
        
      </div>
    </l-map>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LMap, LControl, LGeoJson } from 'vue2-leaflet';
import GjsonAndMark from '@/components/kml/GjsonAndMark';
import LayerManagement from '@/components/kml/LayerManagement';
import L from 'leaflet';
import LDraw from 'leaflet-draw';
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import _ from 'lodash';

export default {
  name: "Leaflet",
  components: {
    LMap, 
    'gmap-tilelayer': Vue2LeafletGoogleMutant,
    GjsonAndMark,
    LControl,
    LGeoJson,
    LayerManagement
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
      const editingGeojson = this.geojsons.filter(geojson => {
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
    viewGeoJsons() {
      return this.geojsons.map(json => {
        if(json.visible){
          return json.geojson;
        }
      });
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
      infowindow: null,
      markers: [],
      editingLayers: [], 
      map: null,
      geojsons: [],
      editableLayers: null,
      mapLoaded: false,
      editLayer: null,
      polylineDrawer:null,
      markerDrawer:null,
      polygonDrawer:null,
      markerVisible: false,
      gjsonVisible: true,
      isEditing: false,
    };
  },
  created() {
    if(!this.isEditing)
      this.geojsons = _.cloneDeep(this.geoJsons);
  },
  mounted() {
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
      // 將
      this.map.on(window.L.Draw.Event.CREATED, e => this.editableLayers.addLayer(e.layer));  
      this.mapLoaded = true;                
    // }); // end of this.$nextTick()
  },
  beforeUpdate() {
    let put = false
    if(!this.isEditing){
      this.geojsons = _.cloneDeep(this.geoJsons);
      console.log("geoJsons", this.geojsons.length, this.geojsons);
    }
  },
  methods: { 
    clear() {
      if(!this.editLayer)
        return;
      this.editLayer.revertLayers();
      this.editLayer.disable();
    },
    save() {
      if(!this.editLayer)
        return;
      this.editLayer.save();
      this.editLayer.disable();
      var geoJson = this.editableLayers.toGeoJSON();      
      this.updateGeojson(geoJson);      
    }, 
    edit() {      
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
      this.editLayer.enable();    
    },
    addToEdit(layer) {      
      this.editingLayers.push(layer);
      this.editableLayers.addLayer(layer);
    },
    updateGeojson(geoJson) {
      this.clearEditableLayers();
      this.markerVisible = false;
      this.gjsonVisible = true;
      this.geojsons.forEach( geojson => {
        if(geojson.isEditing){          
          geojson.geojson = geoJson;
          geojson.isEditing = false;
        }
      });
      this.isEditing = false;
      // this.$emit("update:geoJson", geojson);
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
    drawPoligon () {
      this.polygonDrawer = new L.Draw.Polygon(this.map);
      this.polygonDrawer.enable();
    },
    clearEditableLayers() {
      // 清空editablelayer
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
      for(let i = 0 ; i < this.geojsons.length; i++) {
        if(this.geojsons[i].file == layer.file) {
          this.geojsons[i] = layer
        }
      }
      console.log(this.geojsons);
    }
  }
};
</script>
