<template>

  <div>
    <!-- Inputs -->
    <div class="form-rows" v-if="field.inputType === 'text' || field.inputType === 'date' || field.inputType === 'month'">
      <label v-bind:for="field.inputName">{{field.title}}</label>
      <input 
        v-bind:type="field.inputType" 
        v-bind:id="field.inputName" 
        v-bind:name="field.inputName" 
        v-model="field.input" 
        @input="handleInput"
      >
    </div>

    <!-- Textareas -->
    <div class="form-rows" v-if="field.inputType === 'textarea'">
      <label v-bind:for="field.inputName">{{field.title}}</label>
      <textarea 
        v-bind:id="field.inputName" 
        v-bind:name="field.inputName" 
        v-model="field.input" 
        @input="handleInput"
        rows="3">
      </textarea>
    </div>

    <!-- Radio Buttons -->
    <div class="form-rows" v-if="field.inputType === 'radio'">
      <label v-bind:for="field.inputName">{{field.title}}</label>
      <div class="radio-cont">
        <input 
          id="no" 
          value="no"
          v-bind:type="field.inputType" 
          v-model="field.input" 
          @change="handleInput"
        >
        <label for="no">否</label>

        <input 
          id="yes" 
          value="yes"
          v-bind:type="field.inputType" 
          v-model="field.input"
          @change="handleInput" 
        >
        <label for="yes">是</label>

        <input 
          v-if="displaySubInput"
          v-bind:type="field.subInputType" 
          v-bind:id="field.subInputName" 
          v-bind:name="field.subInputName" 
          v-model="field.subInput" 
          @input="handleInput"
        >
      </div>
    </div>

    <!-- Uploads -->
    <div class="form-rows" v-if="field.inputType === 'uploads'">
      <label v-bind:for="field.inputName">{{field.title}}</label>
      <!-- <input v-bind:type="inputType" v-bind:id="inputName" v-bind:name="inputName" v-model="input" @input="handleInput"> -->
      <img src="@/assets/icons/construction/upload.png" v-if="field.inputName==='fileUploads'" />
      <img src="@/assets/icons/construction/kml.svg" v-if="field.inputName==='kmlUploads'" />
    </div>

    <!-- Dropdowns -->
    <div class="form-rows" v-if="field.inputType === 'select'">
      <label v-bind:for="field.inputName">{{field.title}}</label>
      <select 
        v-bind:name="field.inputName"
        v-bind:id="field.inputName"
        v-model="field.input"
        @change="handleInput"
      >
        <option disabled value="">請選擇案件類型</option>
        <option
          v-for="(option, index) in field.options"
          :key="index"
          v-bind:value="option.value"
        >
            {{option.valueName}}
        </option>
      </select>
    </div>

  </div>

</template>

<script>
export default {
  name: "formField",
  props: ["field"],
  components: {},
  computed: {},
  data() {
    return {
      displaySubInput: false
    };
  },
  methods: {
    handleInput() {
      if (this.field.input==='yes') {
        this.displaySubInput = true
      }
      else {
        this.displaySubInput = false
      }
      if (this.field.subInput !== undefined && this.field.input==='yes') {
        let inputObj = {}
        inputObj[this.field.inputName]= this.field.input,
        inputObj[this.field.subInputName]= this.field.subInput

        this.$emit("handleInput", this.field.inputName, inputObj)
      }
      else {
        this.$emit("handleInput", this.field.inputName, this.field.input)

      }
    }
  }
};
</script>

<style scoped>
  
  .form-rows {
    margin-bottom: 1.5vw;
    display: flex;
    position: relative;
    align-items: center;
  }
  .form-rows label {
    padding-right: 1.7vw;
    flex-basis: 120px;
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
    flex: 1;
  }
  .between-date {
    padding: 0 5px;
  }
  .form-rows img {
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }
  .radio-cont input[type=radio] {
    margin-right: 10px;
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
    .radio-cont {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .radio-cont label {
      margin-bottom: 0;
    }
    .radio-cont input[type=radio] {
      width: 50px;
      margin-right: 0;
    }
  }

</style>