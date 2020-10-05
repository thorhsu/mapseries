<template>
  <div>
    <l-map
      ref="map"
      :zoom="9"
      :center="center"
      style="height: 100vh"
      :options="options"
    >
      <gmap-tilelayer apikey="AIzaSyA2Kn8mv5cSaew9vwGwKY9DBULqxyRdVbc" :options="options" /> 
      <l-marker :visible="true"  v-for="(data, index) in filteredData" :ref="'marker_' + index" 
          :lat-lng="latLng(data.Coordinate.Latitude, data.Coordinate.Longitude)" :key="'marker_' +index" />          
      
      <l-control position="toprleft">
        <MapSidePanel v-if="device !== 'mobile' && visible" class="map-cont-desktop" />
      </l-control>
      <l-control position="topright">
        <div class="data-closed-cont" @click="toggleLayerPanel" v-show="!layerPanelExpanded">
          <img src="../../assets/icons/disaster-map/search-data.png" />
          <span>顯示資料</span>
        </div>
        <div class="data-expanded-cont" v-show="layerPanelExpanded">
      <div class="popup-background"></div>
      <div class="data-box-cont">
        <div class="data-action" @click="toggleLayerPanel" >
          <span>X</span>
          <!-- <img src="../../assets/icons/disaster-map/close.svg" /> -->
        </div>

        <div class="data-box">
          <div class="data-title">
            <p>test 2 2020-09-01~2020-09-02</p>
            <hr>
          </div>
          <form class="data-box-form">
            <div class="data-row">
              <input type="checkbox" id="rain" name="rain" value="rain" v-model="checkedData">
              <label for="rain">雨量</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="water" name="water" value="water" v-model="checkedData">
              <label for="water">水位</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="flood" name="flood" value="flood" v-model="checkedData">
              <label for="flood">淹水感測</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="tide" name="tide" value="tide" v-model="checkedData">
              <label for="tide">潮位</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="tide-layer" name="tide-layer" value="tide-layer" v-model="checkedData">
              <label for="tide-layer">累積雨量圖層</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="flood-layer" name="flood-layer" value="flood-layer" v-model="checkedData">
              <label for="flood-layer">淹水圖層</label>
              <hr>
            </div>
          </form>
        </div>
      </div>
    </div>
      </l-control>
    </l-map>
  </div>
</template>

<script>
import { LMap, LControl, LMarker } from 'vue2-leaflet';
import { latLng } from "leaflet";
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant';
import MapSidePanel from '@/components/test/mapSidePanel.vue'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default {
  name: "mapLayerPanel",
  props: {
    allData: {
      type: Array,
      default: () => []
    },
    device: {
      type: String,
      default: "desktop"
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LMap, 
    'gmap-tilelayer': Vue2LeafletGoogleMutant,    
    LControl,
    LMarker,
    MapSidePanel
  },
  computed: {
    filteredData(){
      return this.allData.filter(data => this.checkedData.includes(data.GroupName));
    }
    
  },
  data() {
    return {
      checkedData: ["rain", "tide", "water", "flood", "tide-layer", "flood-layer"],      
      layerPanelExpanded: false,
      center: { lat: 24.0025917, lng: 121.3624999 },
      zoom: 10,
      options: {zoomControl: true},
      latLng
    };
  },
  mounted() {
    
  },
  updated() {
    console.log("this", this.allData);
  },
  methods: {
    toggleLayerPanel(e) {
      e.preventDefault;
      this.layerPanelExpanded = !this.layerPanelExpanded
    }
  }
};
</script>

<style scoped>
  .data-closed-cont {
    background-color: #247262;
    color: white;
    height: 75px;
    width: 130px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50vh;
    cursor: pointer;
  }
  .data-closed-cont img {
    height: 45px;
  }
  .data-closed-cont span {
    padding-left: 15px;
  }

  .data-expanded-cont {
    position: absolute;
    right: 0;
    top: 50vh;
  }
  .data-box-cont {
    display: flex;
  }
  .data-action {
    background-color: #247262;
    color: white;
    height: 75px;
    width: 60px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  }
  .data-box {
    border: 3px solid #247262;
    background-color: white;
    box-sizing: border-box;
    width: 300px;
  }
  .data-box-form label {
    margin-bottom: 0;
    margin-left: 15px;
  }
  .data-box-form {
    padding: 15px 15px 0 15px;
  }
  .data-title p {
    margin-bottom: 0;
    margin-top: 0;
    padding: 15px;
  }
  .data-title hr {
    margin-bottom: 0;
    margin-top: 0;
  }
  .popup-background {
    display: none;
  }

  @media screen and (max-width: 1280px) {
    .data-expanded-cont {
      top: 5vh;
    }
    .data-closed-cont {
      top: 40vh;
    }
  }

  @media screen and (max-width: 767px) {
    .data-expanded-cont {
      top: 10vh;
      width: 100%;
      /* transform: translate(0, 10vh); */
    }
    .data-box-cont {
      position: relative;
      width: 100%;
    }
    .data-box {
      width: 100%;
    }
    .data-action {
      background-color: transparent;
      color: #247262;
      position: absolute;
      right: 5px;
      top: -10px;
    }
    .popup-background {
      background-color: #080808;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.7;
      display: block;
    }
  }
</style>
