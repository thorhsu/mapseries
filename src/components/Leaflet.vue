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

      <gmap-tilelayer apikey="AIzaSyA2Kn8mv5cSaew9vwGwKY9DBULqxyRdVbc" :options="options" />      
      <GjsonAndMark  @addToEdit="addToEdit" :markerVisible="markerVisible" :gjsonVisible="gjsonVisible" :geoJson="geoJson" @updateGeojson="updateGeojson" :map="map" />      
    </l-map>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LMap, LControl } from 'vue2-leaflet';
import GjsonAndMark from '@/components/GjsonAndMark';
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
    LControl
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
    geoJson: {
      type: Object,
      default: () => {}
    }
  },
  computed: {    
    
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
    };
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

      // 需要預設工具列時加入
      // this.map.addControl(drawControl);

      this.editableLayers = new window.L.FeatureGroup().addTo(this.map);      
      // 將
      this.map.on(window.L.Draw.Event.CREATED, e => this.editableLayers.addLayer(e.layer));  
      this.mapLoaded = true;                
    // }); // end of this.$nextTick()
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
      console.log("add to layer");
      this.editingLayers.push(layer);
      this.editableLayers.addLayer(layer);
    },
    updateGeojson(geojson) {
      this.clearEditableLayers();
      this.markerVisible = false;
      this.gjsonVisible = true;
      this.$emit("update:geoJson", geojson);
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
    }
  }
};
</script>
