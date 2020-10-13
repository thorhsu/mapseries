<template>
  <div class="function-content">
    <div class="content-Style shadow" v-if="device !== 'mobile'">
      <FaxDisasterAdd :state="state" v-if="show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-add">
          傳真通報
          <img class="close-img" v-if="device === 'desktop'" src="@/assets/icons/close.svg">
          <img class="close-img" v-else src="@/assets/icons/disaster/plus.svg">
        </div>
      </div>
    </div>
    <div class="content-Style shadow">
      <FaxDisasterList :device="device" :disasterList="disasterList" @openEditPopup="openEditPopup" v-if="!show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-List">
          檢視傳真通報列表
          <img class="arrow-img" src="@/assets/icons/downArrow.svg">
        </div>
      </div>
    </div>
    <div v-if="popup_visible || mobile_add_popup_visible">
      <FaxDisasterPopup :state="state" :editData="editData" @closePopup="closePopup" />
    </div>
  </div>
</template>

<script>
// 傳真通報
import FaxDisasterAdd from '@/components/disaster/fax_disaster/component/add.vue'
import FaxDisasterList from '@/components/disaster/fax_disaster/component/list.vue'
import FaxDisasterPopup from '@/components/disaster/fax_disaster/component/popup.vue'

export default {
  name: "annualProjectProgressForm",
  props: ["newEvent", "mobile_add_popup_visible"],
  components: {
    FaxDisasterAdd,
    FaxDisasterList,
    FaxDisasterPopup
  },
  computed: {},
  data() {
    return {
      device: "",
      disasterList: [],
      show_view: {
        add: false,
      },
      popup_visible: false,
      state: 'add',
      editData: {}
    };
  },
  created(){
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
      } else if(this.windowsWidth < 1280){
        this.device = "tablet"
      }else{
        this.device = "desktop"
      }
    },
    async prepareList(){
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
    },
    changeVisible(value){
      this.functionMenu.visible = value
    },
    openEditPopup(data){
      this.state = 'edit'
      this.editData = data
      console.log('edit => ', data)
      this.popup_visible = true;
    },
    closePopup(){
      this.state = 'add'
      this.editData = {}
      this.popup_visible = false;
      this.$emit('closePopup')
    },
    update_List(){
      this.prepareList();
    }
  }
};
</script>

<style scoped>
  .form-cont {
    background-color: white;
    padding: 40px 50px;
    border-radius: 10px;
  }
  .submit-button {
    background-color: #3FA893;
    border-radius: 35px;
    width: auto;
    height: auto;
    max-width: 200px;
    max-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 20px auto 0 auto;
    padding: 1% 0;
  }

  /* Mobile Button */
  .add-button-mobile {
    background-color: #3FA893;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
  .add-button-mobile span {
    font-size: 40px;
    color: white;
    font-weight: bold;
    position: relative;
    top: -5px;
  }

  /* Mobile Popup */
  .popup-background {
    background-color: #080808;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
  }
  .form-cont-mobile {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    margin: 2vw;
    width: calc(100% - 4vw);
  }
  .close-icon {
    height: 20px;
    width: 20px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
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
  .hide-add-outer {
    border-radius: 10px;
    background-color: white;
  }
  .show-add {
    width: 100%;
    padding: 20px 42px 20px 87px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .show-List {
    width: 100%;
    padding: 20px 42px 20px 87px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .close-img {
    width: 1.5%;
    transform: rotate(45deg);
  }
  .arrow-img {
    width: auto;
  }
  @media (min-width: 768px) and (max-width: 1280px){
    .hide-add-outer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2% 0;
    }
    .show-add {
      width: 25%;
      padding: 1% 2%;
      border-radius: 30px;
      flex-direction: row-reverse;
      justify-content: center;
      color: white;
      background-color: #3FA893;
    }
    .show-List {
      padding: 1.5% 5%;
    }
    .close-img {
      width: 10%;
      padding: 0 3%;
      transform: rotate(0deg);
    }
  }
  @media (max-width: 767px){
    .function-content {
      padding: 5%;
    }
    .content-Style {
      margin: 0;
    }
  }
  @media screen and (max-width: 500px) {
    .function-content {
      padding: 15px;
    }
  }
</style>