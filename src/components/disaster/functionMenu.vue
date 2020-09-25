<template>
  <div class="outer">
    <div class="function-item" v-for="(data, index) of dataList" :key="index" :class="{selected: selected===data}" @click="selectedList(data)">
      <img src="https://fakeimg.pl/50x50/0ff000/">
      <p class="item-title" v-html="data" />
    </div>
  </div>
</template>

<script>
export default {
  name: "functionMenu",
  props: ['dataList'],
  components: {},
  computed: {},
  data() {
    return {
      selected: ""
    };
  },
  mounted() {
    this.selected = this.dataList[0]
  },
  methods: {
    selectedList(data){
      this.selected = data
    }
  }
};
</script>

<style scoped>
  .outer {
    width: 18.22917vw;
    height: auto;
    background-color: white;
  }
  .selected {
    color: #458072;
  }
  .function-item {
    display: flex;
    /* justify-content: center;
    align-items: center; */
    width: 100%;
    height: auto;
    padding: 0.78125vw 0 0.78125vw 3.125vw;
    align-items: center;
    cursor: pointer;
  }
  .item-title {
    font-size: 1.4583vw;
    margin: 0;
  }
  @media (min-width: 768px) and (max-width: 1280px){

  }

  @media (max-width: 768px){

  }
</style>
