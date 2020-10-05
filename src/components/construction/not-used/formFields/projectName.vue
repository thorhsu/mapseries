<template>

  <div class="form-rows">
    <label v-bind:for="inputName">{{title}}</label>
    <input v-bind:type="inputType" v-bind:id="inputName" v-bind:name="inputName" v-model="input" @input="handleInput">
  </div>

</template>

<script>
export default {
  name: "projectName",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      title: "案件名稱",
      input: "",
      inputType: "text",
      inputName: "projectName"
    };
  },
  methods: {
    handleInput() {
      this.$emit("handleInput", this.inputName, this.input)
    }
  }
};
</script>

<style scoped>
  
  .form-rows {
    margin-right: 1.5vw;
    margin-bottom: 1.5vw;
    display: flex;
    position: relative;
    align-items: center;
  }
  .form-rows label {
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

  @media screen and (max-width: 500px){
    .form-rows {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 25px;
    }
    .form-rows label {
      flex-basis: 0;
    }
    .form-rows input {
      width: 100%;
    }
  }

</style>