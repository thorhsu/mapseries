<template>
  <div class="map-sidePanel-cont">
    <div class="sidePanel-title-cont">
      <p>{{title}}</p>
      <hr>
    </div>

    <div class="sidePanel-events-cont">
      <div class="event-cont" v-for="(history, index) in historyList" :key="index" @click="selected_History(history.Id)" :class="{'selected-history': selected_History_Id === history.Id}">
        <div class="event-row">
          <p class="event-name">{{history.Name}}</p>
          <p class="event-time">{{history.Start}} ~ {{history.End}}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "mapSidePanel",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      title: '歷史紀錄',
      historyList: [],
      selected_History_Id: ''
    };
  },
  mounted(){
    this.prepareList()
  },
  methods: {
    async prepareList(){
      this.historyList = []
      let response = await axios.get('https://yliflood.yunlin.gov.tw/v2/api/FloodEvents')
      for(let data of response.data){
        data.Start = data.Start.split('T')[0].replaceAll('-', '/')
        data.End = data.End.split('T')[0].replaceAll('-', '/')
        this.historyList.push(data)
      }
    },
    selected_History(Id){
      this.selected_History_Id = Id
    }
  }
};
</script>

<style scoped>
  .map-sidePanel-cont {
    width: 250px;
    height: 450px;
    background-color: white;
    padding: 20px 0;
    border-radius: 10px;
    margin: 15px;
    padding-right: 10px;
    float: left;
  }
  .sidePanel-title-cont {
    margin: 0 15px;
  }
  .sidePanel-events-cont {
    margin: 0 15px;
    overflow-y: auto;
    height: 350px;
    margin-right: 5px;
  }
  .event-row {
    margin-right: 10px;
    cursor: pointer;
    border-left: 3px solid transparent;
  }
  .event-row:hover {
    background-color: #F4F8FB;
    border-left: 3px solid #FFC401;
  }
  .selected-history {
    background-color: #F4F8FB;
    border-left: 3px solid #FFC401;
  }
  .event-row p {
    margin-bottom: 0;
  }
  .event-name {
    padding-top: 10px;
    padding-left: 10px;
  }
  .event-time {
    color: #A0A0A0;
    font-size: 14px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
  .event-cont hr {
    margin: 0;
  }

  /* ScrollBar */
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #D1D1D1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
  @media screen and (max-width: 767px)  {
    .map-sidePanel-cont {
      width: auto;
      height: 270px;
      float: none;
    }
  }
</style>