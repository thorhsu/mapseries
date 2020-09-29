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
          <MapLayerPanel />
        </div>
      </div>

      

    </div>   
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import MapLayerPanel from '@/components/disasterMapTest/mapLayerPanel.vue'


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
    };
  },
  mounted() {
  },
  methods: {
    changeVisible(value){
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
