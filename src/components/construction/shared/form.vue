<template>
  <div class="form-cont">
    <form class="form">
      <div class="form-row-cont" v-for="(field, index) in fields" :key="index">
        <FormField :field="field" @handleInput="handleInput" />
      </div>
    </form>
    <div class="submit-button" @click="handleNewFormSubmit">
      <span class="button-text">送出</span>
    </div>
  </div>
</template>

<script>
import FormField from "@/components/construction/shared/formField.vue"
export default {
  name: "constructionProjectForm",
  props: ['fields', 'state'],
  components: {
    FormField
  },
  computed: {},
  data() {
    return {
      inputs: {},
    };
  },
  created(){},
  mounted() {},
  methods: {
    handleNewFormSubmit() {
      if(this.state === 'add'){
        // Call Add API
        console.log('add => ', this.inputs)
      }else{
        // Call Edit API 
        console.log('Edit => ', this.inputs)
      }
      this.$emit('closePopup')
    },
    handleInput(field, input) {
      this.inputs[field] = input
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
  .submit-button {
    background-color: #3FA893;
    border-radius: 35px;
    width: auto;
    height: auto;
    max-width: 200px;
    max-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 20px auto 0 auto;
    padding: 1% 0;
  }
</style>