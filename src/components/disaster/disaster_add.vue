<template>
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
      <div class="button-Add shadow" @click="addData">
        <img class="button-img" src="@/assets/icons/disaster/plus.svg">
        <p class="font-Style">新增事件</p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "disaster_add",
  props: [],
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
  mounted() {},
  methods: {
    async addData(){
      let response = await axios.post('https://yliflood.yunlin.gov.tw/v2/api/FloodEvent', {
        Name: this.disasterName,
        Start: new Date(this.time.start).toISOString(),
        End: new Date(this.time.end).toISOString()
      })
      this.$emit('update_List')
    },
  }
};
</script>

<style scoped>
  .outer{
    border-radius: 10px;
    background-color: white;
    display: flex;
    /* justify-content: space-between; */
    /* align-items: flex-end; */
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
</style>
