<template>
  <div class="form-cont">
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
        </div>
      </div>

      <div class="form-row-cont">
        <div class="form-rows">
          <label for="content">內容說明</label>
          <textarea id="content" name="content" v-model="newEvent.eventData" required></textarea>
        </div>
      </div>
    </form>
    <div class="submit-button" @click="handleNewFormSubmit">
      <span>+</span>
      <span class="button-text">新增工程表單</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "addEventForm",
  props: ["newEvent"],
  components: {},
  computed: {},
  data() {
    return {
      mobile: false,
      mobilePopup: false
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    changeVisible(){
      this.$emit("visible", !this.visible)
    },
    handleNewFormSubmit() {
      this.$emit("handleNewFormSubmit", this.newEvent)
    },
    handleResize() {
      if (window.innerWidth < 600) {
        this.mobile = true
      }
      else {
        this.mobile = false
      }
    },
    handleMobilePopup() {
      this.mobilePopup = !this.mobilePopup
    }
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
    /* flex: 1; */
    position: relative;
  }
  .form-rows label {
    /* font-size: 1vw; */
    padding-right: 1.7vw;
    flex-basis: 105px;
  }
  .form-rows input {
    flex-grow: 1;
  }
  .form-rows input[type=text] {
    padding: 5px 10px;
  }
  .form-rows textarea {
    width: 100%;
    padding: 5px 10px;
  }
  .between-date {
    padding: 0 5px;
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
</style>