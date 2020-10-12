<template>
  <div class="outer">
    <div class="function-item" v-for="(data, index) of formList" :key="index" :class="{selected: selectedForm === data.name}" @click="changeForm(data)">
      <img class="item-img" :src="data.img">
      <p class="item-title" v-html="data.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "functionMenu",
  props: ['formList', 'selectedForm'],
  components: {},
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    changeForm(form_Name){
      this.$emit('change', form_Name.name)
    }
  }
};
</script>

<style scoped>
  .outer {
    width: 20%;
    height: auto;
    background-color: white;
  }
  .selected {
    color: #458072;
  }
  .function-item {
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    cursor: pointer;
  }
  .item-img {
    width: 25%;
    padding: 5%;
  }
  .item-title {
    width: 100%;
    /* font-size: 1.4583vw; */
    font-size: 28px;
    margin: 0;
  }
  @media (min-width: 768px) and (max-width: 1280px){
    .outer {
      width: 50%;
      position: absolute;
      z-index: 99;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 767px){
    .outer {
      width: 100%;
      position: absolute;
      z-index: 99;
      right: 0;
      top: 0;
    }
  }
</style>
