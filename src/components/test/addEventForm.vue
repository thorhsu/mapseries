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

      <div class="form-rows">
        <label for="content">內容說明</label>
        <textarea id="content" name="content" v-model="newEvent.eventData" required></textarea>
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
    return {};
  },
  mounted() {},
  methods: {
    changeVisible(){
      this.$emit("visible", !this.visible)
    },
    handleNewFormSubmit() {
      this.$emit("handleNewFormSubmit", this.newEvent)
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
    flex: 1;
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
    width: calc(100% - 7vw);
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
</style>