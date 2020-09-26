<template>
  <div class="form-comp">
    <div class="form-cont form-desktop">
      <form class="form">
        <div class="form-row-cont">
          <div class="form-rows">
            <label for="date">日期區間</label>
            <input type="date" id="date-start" name="date-start" v-model="newEvent.time.start" required>
            <span class="between-date"> ~ </span>
            <input type="date" id="date-end" name="date-end" v-model="newEvent.time.end" required>
          </div>

          <div class="form-rows">
            <label for="contractor">發包廠商</label>
            <input type="text" id="contractor" name="contractor" v-model="newEvent.eventName" required>
          </div>

          <div class="form-rows">
            <label for="location">施工地點</label>
            <img src="../../assets/icons/upload.png" class="upload-icon" />
            <span>上傳KML</span>
          </div>
        </div>

        <div class="form-row-cont">
          <div class="form-rows">
            <label for="content" class="content-label">內容說明</label>
            <textarea id="content" name="content" v-model="newEvent.eventData" required rows="6"></textarea>
          </div>
        </div>
      </form>
      <div class="submit-button" @click="handleNewFormSubmit">
        <span>+</span>
        <span class="button-text">新增工程表單</span>
      </div>
    </div>

    <div class="add-button-mobile" @click="togglePopup">
      <span>&plus;</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "addEventForm",
  props: ["newEvent", "openedPopup"],
  components: {},
  computed: {},
  data() {
    return {
    };
  },
  methods: {
    changeVisible(){
      this.$emit("visible", !this.visible)
    },
    handleNewFormSubmit() {
      this.$emit("handleNewFormSubmit", this.newEvent)
    },
    togglePopup() {
      this.$emit("togglePopup", true)
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
  .form-rows textarea {
    padding: 5px 10px;
    flex-grow: 1;
  }
  .content-label {
    align-self: flex-start;
  }
  .between-date {
    padding: 0 5px;
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
    display: none;
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

  @media screen and (max-width: 1300px) {
    .form {
      display: block;
    }
    .form-rows {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 600px) {
    .form-desktop {
      display: none
    }
    .add-button-mobile {
      display: flex;
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