<template>

  <div class="form-rows">
    <label v-bind:for="inputName">{{title}}</label>
    
    <div class="radio-cont">
      <input 
        id="no" 
        value="no"
        v-bind:type="inputType" 
        v-model="input" 
        @input="handleInput"
      >
      <label for="no">否</label>

      <input 
        id="yes" 
        value="yes"
        v-bind:type="inputType" 
        v-model="input" 
        @input="handleInput"
      >
      <label for="yes">是</label>
    </div>
  </div>

</template>

<script>
export default {
  name: "fundingRequirements",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      title: "經費需求",
      input: "no",
      inputType: "radio",
      inputName: "fundingRequirements"
    };
  },
  methods: {
    handleInput() {
      // console.log('a => ', text)
      console.log(this.input)
      // this.$emit("handleInput", this.inputName, this.input)
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
    margin-bottom: 0;
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
  .radio-cont input {
    margin-right: 10px;
  }
  .radio-cont label {
    margin-right: 20px;
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
  }

</style>