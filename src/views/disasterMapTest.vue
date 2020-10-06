<template>
  <div class="test-page">
    <BannerMenu :title="banner.title" :visible="functionMenu.visible" @visible="changeVisible" />
    <div class="function-outer">
      <FunctionMenu v-if="functionMenu.visible" :dataList="functionMenu.data_list" />
      <MapSidePanel v-if="device === 'mobile' && functionMenu.visible" @selectHistory="selectHistory"/>
      <div class="function-content">
        <div class="map-cont">
          <MapLayerPanel :allData="allData" :visible="functionMenu.visible" :device="device"/>
          
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
/* eslint-disable no-console */
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import MapLayerPanel from '@/components/disasterMapTest/mapLayerPanel.vue'
import MapSidePanel from '@/components/test/mapSidePanel.vue'


export default {
  name: "disasterMapTest",
  components: {
    BannerMenu,
    FunctionMenu,
    MapLayerPanel,
    MapSidePanel
  },
  data() {
    return {
      banner: {
        title: '水情圖資展示平台'
      },
      functionMenu: {
        visible: false,
        data_list: []
      },
      windowsWidth: 0,
      device: "",
      allData: [],
      checkedDataMap: {"雨量": "rain", "水位": "water","淹水感測": "flood","潮位": "tide-layer", "累積雨量圖層": "flood-layer"},
      selectedHistory: null
    };
  },
  beforeUpdate(){          
    
  },
  created() {
    this.prepare_FunctionList()
  },
  mounted() {
    let vue = this;
    this.checkDevice()
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        vue.checkDevice()
      });
    });
  },
  methods: {
    async getAllEvent() {      
      await fetch(`https://yliflood.yunlin.gov.tw/v2/api/Station/All`)
        .then(result => result.text())
        .then(text => this.allData = JSON.parse(text));    
      this.allData.forEach(data =>{         
        data.GroupName = this.checkedDataMap[data.GroupName]? this.checkedDataMap[data.GroupName] : data.GroupName        
      });
      
      return this.allData;
    },
    checkDevice(){
      this.windowsWidth = window.innerWidth
      if( this.windowsWidth < 768 ){
        this.device = "mobile"
        this.functionMenu.visible = false;
      } else if(this.windowsWidth < 1280){
        this.device = "tablet"
        this.functionMenu.visible = false;
      }else{
        this.device = "desktop"
      }
    },
    changeVisible(value){
      if(value){
        this.getAllEvent();
      }
      this.functionMenu.visible = value
    },
    prepare_FunctionList(){
      this.functionMenu.data_list.push({
        name: "事件總覽",
        img: require('@/assets/icons/map/function-event-all.svg')
      })
      this.functionMenu.data_list.push({
        name: "KML檔案總管理",
        img: require('@/assets/icons/map/function-kml-file.svg')
      })
    },
    selectHistory(data){
      this.selectedHistory = data
      console.log(this.selectedHistory)
    }
  }
};
</script>

<style scoped>
  /* Page */
  .test-page {
    background-color: #DFE9F0;
    position: relative;
  }

  /* Other Components */
  .function-outer {
    display: flex;
    position: relative;
  }
  .function-content {
    width: 100%;
    height: auto;
    /* padding: 35px; */
    position: relative;
  }
  .content-Style {
    border-radius: 20px;
    margin: 0 0 17.5px;
  }

  .map-cont {
    width: 100%;
    height: auto;
    min-height: 100vh;
    background-color: gainsboro;
  }

  @media screen and (max-width: 767px){
    .function-outer {
      display: block;
    }
    .map-cont-desktop {
      display: none;
    }
  }

  
</style>
