<template>
  <div class="disaster-outer">
    <BannerMenu :title="banner.title" :visible="functionMenu.visible" @visible="changeVisible" />
    <div class="function-outer">
      <FunctionMenu v-if="functionMenu.visible" :formList="functionMenu.form_list" :selectedForm="functionMenu.selected" @change="changeForm" />
      <div class="function-content">
        <div class="content-Style shadow">
          <div v-if="device !== 'mobile'" >
            <DisasterAdd v-if="functionMenu.selected === '事件列表'" />
            <FaxDisasterAdd v-else-if="functionMenu.selected === '傳真通報'" />
          </div>
        </div>
        <div class="content-Style shadow">
          <DisasterList v-if="functionMenu.selected === '事件列表'" :device="device" :disasterList="disasterList" @popup="popup" @update_List="update_List"/>
          <FaxDisasterList v-else-if="functionMenu.selected === '傳真通報'" :device="device" :disasterList="disasterList" @popup="popup" />
        </div>
        <div v-if="popup_view.update">
          <DisasterUpdate v-if="functionMenu.selected === '事件列表'" @closePopup="closePopup" />
          <FaxDisasterUpdate v-else-if="functionMenu.selected === '傳真通報'" @closePopup="closePopup" />
        </div>
        <div v-if="popup_view.add">
          <DisasterAddMobile v-if="functionMenu.selected === '事件列表'" @closePopup="closePopup" />
          <FaxDisasterAddMobile v-else-if="functionMenu.selected === '傳真通報'" @closePopup="closePopup" />
        </div>
      </div>
    </div>
    <div v-if="device === 'mobile'" class="mobile-add" @click="popup_view.add = !popup_view.add">
      <img class="mobile-button" src="@/assets/icons/disaster/plus.svg">
    </div>
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
// 事件列表
import DisasterAdd from '@/components/disaster/disaster/add.vue'
import DisasterList from '@/components/disaster/disaster/list.vue'
import DisasterUpdate from '@/components/disaster/disaster/update.vue'
import DisasterAddMobile from '@/components/disaster/disaster/add_mobile.vue'
// 傳真通報
import FaxDisasterAdd from '@/components/disaster/fax_disaster/add.vue'
import FaxDisasterList from '@/components/disaster/fax_disaster/list.vue'
import FaxDisasterUpdate from '@/components/disaster/fax_disaster/update.vue'
import FaxDisasterAddMobile from '@/components/disaster/fax_disaster/add_mobile.vue'

const axios = require('axios');
export default {
  name: "Fax_Disaster",
  components: {
    BannerMenu,
    FunctionMenu,

    DisasterAdd,
    DisasterList,
    DisasterUpdate,
    DisasterAddMobile,

    FaxDisasterAdd,
    FaxDisasterList,
    FaxDisasterUpdate,
    FaxDisasterAddMobile
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
        selected: '傳真通報',
        waitLoad: false,
      },
      popup_view: {
        update: false,
        add: false
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
      this.popup_view.add = false;
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
            data.Start = data.Start.split('T')[0].replaceAll('-', '/')
            data.End = data.End.split('T')[0].replaceAll('-', '/')
            this.disasterList.push(data)
          }
          this.closePopup()
        } catch (error) {
          alert(error)
        }
      }else if(this.functionMenu.selected === '傳真通報'){
        this.disasterList.push({
          disaster_number: '1090527-1740',
          senderGroup: '裕盛機械廠',
          content: '口湖、水林、四湖無淹水災情',
          government_number: 'A1090527001',
          remark: '雲林縣政府水利處',
          commit_Log: 0
        })
        this.disasterList.push({
          disaster_number: '聯雲傳1090528001',
          senderGroup: '聯典機械有限公司',
          content: '1.因豪雨開設，貴府開設，本轄區各站完成戒備，除進行收水站巡查外，並要求操作人員啟動抽水機組進行預抽水作業，將水位保持低水位，提升暴雨之緩衝期。<br>2.為因應突發性暴雨，本公司已備妥自有兩台移動式抽水機，以提升緊急應變能力。',
          government_number: 'A1090527002',
          remark: '雲林縣政府水利處',
          commit_Log: 20
        })
        this.disasterList.push({
          disaster_number: '1090528001',
          senderGroup: '惠民實業股份有限公司',
          content: '1.依據雲林縣水利處傳真通報編號第B1090527-001號辦理<br>2.本轄區各抽水站目前設備狀況良好，操作員待命抽水中。<br>3.維護人員正進行抽水站巡視工作。<br>4.抽水站油料維持安全油位。<br>5.隨時與貴府及公所保持聯繫回報。',
          government_number: 'A1090527003',
          remark: '雲林縣政府水利處',
          commit_Log: 1
        })
        this.disasterList.push({
          disaster_number: '1090527-02',
          senderGroup: '九品股份',
          content: '1.覆貴府109年5月27日通報單編號B1090527-001號。<br>2.本公司維護人員全數都在北區所屬閘門附近巡察，並備妥沙包以備不時之需，如有狀況即刻作緊急應變處理。<br>3.目前台西、麥寮地區無雨，漲潮中，水位正常、維護人員持續監控，如有狀況立即回報。',
          government_number: 'A1090527004',
          remark: '雲林縣政府水利處',
          commit_Log: 0
        })
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