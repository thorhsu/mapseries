<template>
  <div class="form-popup-cont" v-show="openedPopup">
    <div class="popup-background"></div>

    <div class="popup-cont">
      <img src="@/assets/icons/close.svg" class="close-icon" 
        @click="togglePopup"/>
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
            <img src="@/assets/icons/construction/upload.png" class="upload-icon" />
            <span>上傳KML</span>
          </div>
        </div>

        <div class="form-row-cont">
          <div class="form-rows">
            <label for="content-edit" class="
            content-label">內容說明</label>
            <textarea id="content-edit" name="content" rows="6"></textarea>
          </div>
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
  name: "formPopup",
  props: ["events", "openedPopup"],
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
    togglePopup() {
      this.$emit("togglePopup", false)
    },
  }
};
</script>

<style scoped>

  .form-cont {
    background-color: white;
    padding: 40px 50px;
    border-radius: 10px;
  }
  .form {
    display: flex;
    padding-top: 35px;
  }
  .form-row-cont {
    flex: 1;
  }
  .form-rows {
    margin-right: 1.5vw;
    margin-bottom: 1.5vw;
    display: flex;
    position: relative;
    align-items: center;
  }
  .form-rows label {
    padding-right: 1.7vw;
  }
  .form-rows input {
    flex-grow: 1;
  }
  .form-rows input[type=text] {
    padding: 5px 10px;
  }
  .content-label {
    align-self: flex-start;
  }
  .form-rows textarea {
    flex-grow: 1;
    padding: 5px 10px;
  }
  .between-date {
    padding: 0 5px;
  }
  .popup-background {
    background-color: #080808;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
    display: block;
  }
  .popup-cont {
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
  .upload-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .submit-button {
    background-color: #3FA893;
    border-radius: 35px;
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 20px auto 0 auto;
  }

  @media screen and (max-width: 1300px) {
    .form {
      display: block;
    }
  }
  @media screen and (max-width: 500px) {
    .form-rows {
      flex-direction: column;
      margin-bottom: 6vw;
      align-items: initial;
    }
  }

</style>