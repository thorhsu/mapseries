<template>
  <div class="disaster-outer">
    <BannerMenu :title="banner.title" :visible="functionMenu.visible" @visible="changeVisible" />
    <div class="function-outer">
      <FunctionMenu v-if="functionMenu.visible" :dataList="functionMenu.data_list" />
      <div class="function-content">
        <div class="content-Style shadow">
          <DisasterAdd v-if="device !== 'mobile'" />
        </div>
        <div class="content-Style shadow">
          <DisasterList :device="device" @popup="popup" />
        </div>
        <DisasterPopup v-if="editPopup" @closePopup="closePopup" />
        <DisasterPopupAddMobile v-if="mobile_addPopup" @closePopup="closePopup" />
      </div>
    </div>
    <div v-if="device === 'mobile'" class="mobile-add" @click="mobile_addPopup = !mobile_addPopup">
      <img class="mobile-button" src="@/assets/icons/disaster/plus.svg">
    </div>
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import DisasterAdd from '@/components/disaster/disaster_add.vue'
import DisasterList from '@/components/disaster/disaster_list.vue'
import DisasterPopup from '@/components/disaster/disaster_popup.vue'
import DisasterPopupAddMobile from '@/components/disaster/disaster_popup_add_mobile.vue'

export default {
  name: "Disaster",
  components: {
    BannerMenu,
    FunctionMenu,
    DisasterAdd,
    DisasterList,
    DisasterPopup,
    DisasterPopupAddMobile
  },
  computed: {},
  data() {
    return {
      banner: {
        title: '災情填報系統'
      },
      functionMenu: {
        visible: false,
        data_list: []
      },
      editPopup: false,
      mobile_addPopup: false,
      windowsWidth: 0,
      device: ""
    };
  },
  mounted() {
    this.prepare_DataList();
    
    let vue = this;
    this.checkDevice()
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        vue.checkDevice()
      });
    });
  },
  methods: {
    checkDevice(){
      this.windowsWidth = window.screen.width
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
    prepare_DataList(){
      this.functionMenu.data_list.push("事件列表")
      this.functionMenu.data_list.push("其他表單1")
      this.functionMenu.data_list.push("其他表單2")
    },
    changeVisible(value){
      this.functionMenu.visible = value
    },
    popup(data){
      this.editPopup = !this.editPopup;
    },
    closePopup(){
      this.editPopup = false;
      this.mobile_addPopup = false;
    }
  }
};
</script>

<style scoped>
  .disaster-outer{
    background-color: #DFE9F0;
    position: relative;
  }
  .function-outer {
    display: flex;
    position: relative;
  }
  .function-content {
    width: 100%;
    height: auto;
    padding: 35px;
    position: relative;
  }
  .content-Style {
    border-radius: 20px;
    margin: 0 0 17.5px;
  }
  .mobile-add {
    z-index: 1;
    position: fixed;
    right: 3%;
    bottom: 3%;
    width: 20%;
  }
  .mobile-button {
    width: 100%;
    height: auto;
    background: #3FA893;
    border-radius: 50%;
    padding: 25%;
  }
  @media (max-width: 767px){
    .function-content {
      padding: 5%;
    }
    .content-Style {
      margin: 0;
    }
  }
</style>