<template>
  <div class="outer">
    <div class="item-outer">
      <div class="outer-flex">
        <p class="font-Style item-title">日期區間</p>
        <div class="function-outer">
          <el-date-picker v-model="time.start" type="datetime" placeholder="選擇日期時間"></el-date-picker>
          ～
          <el-date-picker v-model="time.end" type="datetime" placeholder="選擇日期時間"></el-date-picker>
        </div>
      </div>
      <div class="outer-flex">
        <p class="font-Style item-title">事件名稱</p>
        <div class="function-outer event-items">
          <el-input v-model="eventData" placeholder=" "></el-input>
        </div>
      </div>
    </div>
    <div>
      <div class="button-Add">+ 新增事件</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "disaster_add",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      time: {
        start: '',
        end: ''
      },
      eventData: ''
    };
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<style scoped>
  .outer{
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .font-Style {
    margin: 0;
  }
  .item-title {
    padding: 30px 35px 30px 70px;
  }
  .item-outer {
    width: 70%;
    height: auto;
  }
  .outer-flex {
    display: flex;
    align-items: center;
  }
  .event-items {
    width: 43%;
  }
  .button-Add {
    margin: 0 90px 30px 0;
    cursor: pointer;
  }
  @media (min-width: 768px) and (max-width: 1280px){

  }

  @media (max-width: 768px){

  }
</style>
