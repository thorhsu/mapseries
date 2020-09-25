<template>
  <div class="edit-popup-cont" v-show="edittingPopup">
    <div class="popup-background"></div>

    <div class="form-cont-edit">
      <img src="../../assets/icons/close.svg" class="close-icon" 
        @click="handleEditPopup"/>
      <form class="form">
        <div class="form-row-cont">
          <div class="form-rows">
            <label for="date">日期區間</label>
            <input type="date" id="date-start-edit" name="date-start">
            <span> ~ </span>
            <input type="date" id="date-end-edit" name="date-end">
          </div>

          <div class="form-rows">
            <label for="contractor-edit">發包廠商</label>
            <input type="text" id="contractor-edit" name="contractor">
          </div>

          <div class="form-rows">
            <label for="location-edit">施工地點</label>
          </div>
        </div>

        <div class="form-rows">
          <label for="content-edit">內容說明</label>
          <textarea id="content-edit" name="content"></textarea>
        </div>
      </form>
      <div class="submit-button">
        <span>+</span>
        <span class="button-text">新增工程表單</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eventTable",
  props: ["events", "edittingPopup"],
  components: {},
  computed: {},
  data() {
    return {
      searchText: ""
    };
  },
  mounted() {},
  methods: {
    handleNewFormSubmit() {
      this.$emit("handleNewFormSubmit", this.newEvent)
    },
    handleEditPopup() {
      this.$emit("handleEditPopup", false)
    },
  }
};
</script>

<style scoped>
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
    padding: 3.5vw 3.5vw 2vw 3.5vw;
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

</style>