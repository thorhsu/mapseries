<template>
  <div class="test-page">
    <BannerMenu 
      :title="banner.title" 
      :visible="functionMenu.visible" 
      @visible="changeVisible"
    />

    <div class="function-outer">
      <FunctionMenu 
        v-if="functionMenu.visible" 
        :dataList="functionMenu.data_list" 
      />

      <div class="function-content">
        <div class="map-cont">
          <MapLayerPanel :allData="allData"/>
        </div>
      </div>

      

    </div>   
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue';
import FunctionMenu from '@/components/disaster/functionMenu.vue';
import MapLayerPanel from '@/components/disasterMapTest/mapLayerPanel.vue';

export default {
  name: "disasterMapTest",
  components: {
    BannerMenu,
    FunctionMenu,
    MapLayerPanel
  },
  data() {
    return {
      banner: {
        title: 'XXXXX'
      },
      functionMenu: {
        visible: false,
        data_list: []
      },
      allData: [],
      checkedDataMap: {"雨量": "rain", "水位": "water","淹水感測": "flood","潮位": "tide-layer", "累積雨量圖層": "flood-layer"}
    };
  },
  beforeUpdate(){          
    
  },
  created(){    
  },
  mounted() {
    
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
    changeVisible(value){
      if(value){
        this.getAllEvent();
      }
      this.functionMenu.visible = value
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

  
</style>
