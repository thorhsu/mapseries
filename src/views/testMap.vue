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

      <div class="map-cont">
        <MapActionsPanel />
        <MapSidePanel />
      </div>

    </div>   
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import MapActionsPanel from '@/components/test/mapActionsPanel.vue'
import MapSidePanel from '@/components/test/mapSidePanel.vue'


export default {
  name: "test",
  components: {
    BannerMenu,
    FunctionMenu,
    MapActionsPanel,
    MapSidePanel
  },
  data() {
    return {
      banner: {
        title: '工程業務控管平台'
      },
      functionMenu: {
        visible: true,
        data_list: []
      },
      events: [
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        }
      ],
      openedPopup: false,
      newEvent: {
        time: {
          start: "",
          end: ""
        },
        eventName: "",
        eventData: ""
      }
    };
  },
  mounted() {
    this.prepare_DataList();
  },
  methods: {
    prepare_DataList(){
      this.functionMenu.data_list.push("工程表單")
      this.functionMenu.data_list.push("其他表單1")
      this.functionMenu.data_list.push("其他表單2")
    },
    changeVisible(value){
      this.functionMenu.visible = value
    },
    togglePopup(value) {
      this.openedPopup = value
    },
    handleNewFormSubmit(newevent) {
      this.events.push(newevent)
      this.newEvent = {
        time: {
          start: "",
          end: ""
        },
        eventName: "",
        eventData: ""
      }
    },
    
  }
};
</script>

<style scoped>
  /* Page */
  .test-page {
    background-color: #DFE9F0;
  }

  /* Other Components */
  .function-outer {
    display: flex;
  }
  .function-content {
    width: 100%;
    height: auto;
    padding: 35px;
    position: relative;
  }

  .map-cont {
    width: 100%;
    height: auto;
    background-color: gainsboro;
  }


  @media screen and (max-width: 500px) {
    .function-content {
      padding: 15px;
    }
  }
  
  
</style>
