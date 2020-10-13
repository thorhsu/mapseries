<template>
  <div class="function-content" v-else>
    <div class="content-Style shadow">
      <div v-if="device !== 'mobile'" >
        <DisasterAdd @update_List="update_List"/>
      </div>
    </div>
    <div class="content-Style shadow">
      <DisasterList :device="device" :disasterList="disasterList" @openEditPopup="openEditPopup" @update_List="update_List" />
    </div>
    <div v-if="popup_visible">
      <DisasterUpdate :editData="editData" @update_List="update_List" @closePopup="closePopup" />
    </div>
    <div v-if="mobile_add_popup_visible">
      <DisasterAddMobile @update_List="update_List" @closePopup="closePopup" />
    </div>
  </div>
</template>

<script>
// 傳真通報
import DisasterAdd from '@/components/disaster/disaster/component/add.vue'
import DisasterList from '@/components/disaster/disaster/component/list.vue'
import DisasterUpdate from '@/components/disaster/disaster/component/update.vue'
import DisasterAddMobile from '@/components/disaster/disaster/component/add_mobile.vue'

export default {
  name: "annualProjectProgressForm",
  props: ["newEvent", "mobile_add_popup_visible", "disasterList"],
  components: {
    DisasterAdd,
    DisasterList,
    DisasterUpdate,
    DisasterAddMobile
  },
  computed: {},
  data() {
    return {
      device: "",
      popup_visible: false,
      editData: {}
    };
  },
  created(){},
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
    changeVisible(value){
      this.functionMenu.visible = value
    },
    openEditPopup(data){
      this.editData = data
      this.popup_visible = true
      console.log('edit => ', data)
    },
    closePopup(){
      this.editData = {}
      this.popup_visible = false
      this.$emit('closePopup')
    },
    update_List(){
      this.popup_visible = false
      this.$emit('update_List')
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