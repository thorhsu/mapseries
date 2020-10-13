<template>
  <div class="form-popup-cont">
    <div class="popup-background" @click="closePopup"/>
    <div class="popup-cont">
      <img src="@/assets/icons/close.svg" class="close-icon" @click="closePopup" />
      <Form :fields="fields" :state="state" @closePopup="closePopup" />
    </div>
  </div>
</template>

<script>
import Form from "@/components/construction/shared/form.vue"
export default {
  name: "formPopup",
  props: ["fields", 'state'],
  components: {
    Form
  },
  computed: {},
  data() {
    return {
      searchText: ""
    };
  },
  mounted() {},
  methods: {
    closePopup() {
      this.$emit("closePopup")
    },
  }
};
</script>

<style scoped>

  .form-cont {
    background-color: white;
    padding: 0;
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
    z-index: 5;
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