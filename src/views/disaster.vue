<template>
  <div class="disaster-outer">
    <BannerMenu :title="banner.title" :visible="functionMenu.visible" @visible="changeVisible" />
    <div class="function-outer">
      <FunctionMenu v-if="functionMenu.visible" :formList="functionMenu.form_list" :selectedForm="functionMenu.selected" @change="changeForm" />
      <Disaster :disasterList="disasterList" :mobile_add_popup_visible="popup_view.mobile" @closePopup="closePopup" @update_List="update_List" v-if="functionMenu.selected === '事件列表'"/>
      <FaxDisaster :mobile_add_popup_visible="popup_view.mobile" @closePopup="closePopup" v-else-if="functionMenu.selected === '傳真通報'" />
    </div>
    <div v-if="device === 'mobile'" class="mobile-add" @click="popup_view.mobile = !popup_view.mobile">
      <img class="mobile-button" src="@/assets/icons/disaster/plus.svg">
    </div>
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
// 事件列表
import Disaster from '@/components/disaster/disaster/disaster.vue'
// 傳真通報
import FaxDisaster from '@/components/disaster/fax_disaster/fax_disaster.vue'

const axios = require('axios');
export default {
  name: "Fax_Disaster",
  components: {
    BannerMenu,
    FunctionMenu,
    Disaster,
    FaxDisaster
  },
  computed: {},
  data() {
    return {
      banner: {
        title: '災情填報系統'
      },
      functionMenu: {
        visible: false,
        form_list: [],
        selected: '事件列表',
        waitLoad: false,
      },
      popup_view: {
        update: false,
        mobile: false
      },
      windowsWidth: 0,
      device: "",
      disasterList: []
    };
  },
  created() {
    this.prepare_FormList();
    this.prepareList();
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
    prepare_FormList(){
      this.functionMenu.form_list.push({
        name: "事件列表",
        img: require('@/assets/icons/disaster/event_icon1.svg'),
      })
      this.functionMenu.form_list.push({
        name: "傳真通報",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
    },
    changeVisible(value){
      this.functionMenu.visible = value
    },
    popup(data){
      this.popup_view.update = !this.popup_view.update;
    },
    closePopup(){
      this.popup_view.update = false;
      this.popup_view.mobile = false;
    },
    changeForm(form_Name){
      if(this.functionMenu.waitLoad){
        alert('正在存取Data，停止切換表單功能')
        return 0;
      }
      this.functionMenu.selected = form_Name;
      this.prepareList()
    },
    async prepareList(){
      if(this.functionMenu.waitLoad){
        return 0;
      }
      this.disasterList = []
      this.functionMenu.waitLoad = true
      if(this.functionMenu.selected === '事件列表'){
        try {
          let response = await axios.get('https://yliflood.yunlin.gov.tw/v2/api/FloodEvents')
          for(let data of response.data){
            data.time = {
              Start: data.Start.split('T')[0].replaceAll('-', '/'),
              End: data.End.split('T')[0].replaceAll('-', '/')
            }
            this.disasterList.push(data)
          }
          this.closePopup()
        } catch (error) {
          alert(error)
        }
      }
      this.functionMenu.waitLoad = false
    },
    update_List(){
      this.prepareList();
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
    width: 15%;
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