<template>
  <div class="popup-outer">
    <div class="edit-popup-cont">
      <div class="popup-background" @click="closePopup" />
      <div class="form-cont-edit">
        <img src="@/assets/icons/close.svg" class="close-icon" @click="closePopup"/>
        <div class="outer">
          <div class="item-outer">
            <div class="outer-flex">
              <p class="font-Style item-title">日期區間</p>
              <div class="function-outer">
                <input class="input-box" type="date" v-model="time.start" required>
                ～
                <input class="input-box" type="date" v-model="time.end" required>
              </div>
            </div>
            <div class="outer-flex">
              <p class="font-Style item-title">事件名稱</p>
              <div class="function-outer">
                <input class="input-box" type="text" v-model="disasterName" required>
              </div>
            </div>
          </div>
          <div class="button-outer">
            <div class="button-Add shadow" @click="disaster_update">
              <img class="button-img" src="@/assets/icons/disaster/plus.svg">
              <p class="font-Style">修改事件</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "disaster_popup",
  props: ['editData'],
  components: {},
  computed: {},
  data() {
    return {
      time: {
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      disasterName: ''
    };
  },
  mounted() {
    this.prepareData();
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    prepareData(){
      this.time.start = this.editData.Start.split('T')[0]
      this.time.end = this.editData.End.split('T')[0]
      this.disasterName = this.editData.Name
    },
    async disaster_update(){
      try {
        let Id = this.editData.Id
        let response = await axios.put(`https://yliflood.yunlin.gov.tw/v2/api/FloodEvent/${Id}`, {
          Name: this.disasterName,
          Start: new Date(this.time.start).toISOString(),
          End: new Date(this.time.end).toISOString()
        })
        this.$emit('update_List')
      } catch (error) {
        alert(error)
      }
    },
  }
};
</script>

<style scoped>
  .popup-outer{
    border-radius: 10px;
    display: block;
    padding: 1% 5%;
    background-color: white;
  }
  .outer{
    border-radius: 10px;
    background-color: white;
    display: flex;
  }
  .img-Style {
    width: 100%;
    height: auto;
  }
  .font-Style {
    margin: 0;
  }
  .item-title {
    width: 100%;
    text-align: center;
    flex: 1;
  }
  .item-outer {
    width: 100%;
    height: auto;
  }
  .function-outer {
    display: flex;
    align-items: center;
    flex: 2;
  }
  .outer-flex {
    display: flex;
    align-items: center;
    margin: 3% 0;
  }
  .input-box {
    width: 100%;
  }
  .button-outer {
    width: 100%;
    position: relative;
  }
  .button-Add {
    /* margin: 0 10% 3%; */
    width: 20%;
    margin: 0 auto;
    bottom: 10%;
    right: 5%;

    position: absolute;
    cursor: pointer;
    background-color: #3FA893;
    color: white;
    padding: 1%;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-img {
    padding-right: 25px;
  }
  @media (min-width: 768px) and (max-width: 1280px){
    .outer {
      display: block;
      padding: 1% 5%;
    }
    .function-outer {
      flex: 4;
    }
    .button-outer {
      padding: 0 35% 1%;
    }
    .button-Add {
      position: relative;
      width: 100%;
    }
  }
  @media (max-width: 767px){
    .outer {
      display: block;
    }
    .outer-flex {
      display: block;
    }
    .form-cont-edit {
      padding: 5%;
    }
    .function-outer {
      display: block;
    }
    .button-outer {
      padding-top: 5%;
    }
    .button-Add {
      position: relative;
      bottom: 0;
      right: 0;
      width: 75%;
    }
  }
  /* Edit Popup */
  .popup-background {
    background-color: #080808;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
  }
  .form-cont-edit {
    background-color: white;
    /* padding: 3.5vw 3.5vw 2vw 3.5vw; */
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
    z-index: 5;
  }
</style>