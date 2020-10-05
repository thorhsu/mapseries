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
        <div class="map-cont-mobile">
          <MapSidePanel/>
        </div>


        <div class="map-cont">
          <MapActionsPanel />
          <MapSidePanel class="map-cont-desktop" />
        </div>
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
        visible: false,
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
      this.functionMenu.data_list.push({
        name: "工程表單",
        img: require('@/assets/icons/disaster/event_icon1.svg')
      })
      this.functionMenu.data_list.push({
        name: "其他表單1",
        img: require('@/assets/icons/disaster/event_icon1.svg')
      })
      this.functionMenu.data_list.push({
        name: "其他表單2",
        img: require('@/assets/icons/disaster/event_icon1.svg')
      })
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
  .map-cont-mobile {
    height: 450px;
    background-color: white;
    border-radius: 10px;
    margin: 15px;
    display: none;
  }


  @media screen and (max-width: 600px){
    .map-cont-mobile {
      display: block;
    }
    .map-cont-desktop {
      display: none;
    }
  }

  
</style>
