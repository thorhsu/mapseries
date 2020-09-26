<template>
  <div class="outer">
    <div class="menu font_Style" v-text="title" />
    <div class="menu font_Style icon-outer">
      <div class="icon" :class="{icon_show: visible}" @click="changeVisible">
        <img src="@/assets/icons/banner_close.svg" v-if="visible">
        <img src="@/assets/icons/hanbuger.svg" v-else>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: [ "title", "visible"],
  components: {},
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    changeVisible(){
      this.$emit("visible", !this.visible)
    }
  }
};
</script>

<style scoped>
  .outer {
    width: 100%;
    height: auto;
    background-color: #247262;
    display: flex;
  }
  .font_Style {
    font-size: 1.4583vw;
    color: white;
  }
  .menu {
    padding: 1.5625vw 0 1.5625vw 2.083vw;
  }
  .icon-outer {
    padding-left: 3.5%;
  }
  .icon {
    cursor: pointer;
  }

  @media (min-width: 768px) and (max-width: 1280px){
    .outer {
      justify-content: space-between;
    }
    .font_Style {
      /* font-size: 3.64583vw; */
      font-size: 28px;
    }
    .menu {
      padding: 3.90625vw 0 3.90625vw 3.90625vw;
    }
    .icon-outer {
      padding-right: 3.90625vw;
    }
  }

  @media (max-width: 767px){
    .outer {
      justify-content: space-between;
    }
    .font_Style {
      /* font-size: 7.4666vw; */
      font-size: 28px;
    }
    .menu {
      padding: 9.33vw 0 9.33vw 5.333vw;
    }
    .icon-outer {
      padding-right: 5.333vw;
    }
  }
</style>