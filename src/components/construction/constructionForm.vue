<template>
  <div class="form-cont">
    <form class="form">
      <div class="form-row-cont">
        <ProjectName @handleInput="handleInput" v-show="this.formFields.projectName" />
        <Organization @handleInput="handleInput" v-show="this.formFields.organization" />
        <StartDate @handleInput="handleInput" v-show="this.formFields.startDate" />
        <ProjectDescription @handleInput="handleInput" v-show="this.formFields.projectDescription" />
        <ProgressDescription @handleInput="handleInput" v-show="this.formFields.progressDescription" />
        <ApprovalDate @handleInput="handleInput" v-show="this.formFields.approvalDate" />
        <ApprovalDescription @handleInput="handleInput" v-show="this.formFields.approvalDescription" />
        <FundingRequirements @handleInput="handleInput" v-show="this.formFields.fundingRequirements" />
        <FundingSource @handleInput="handleInput" v-show="this.formFields.fundingOrigin" />
        <Status @handleInput="handleInput" v-show="this.formFields.status" />
        <Uploads v-show="this.formFields.uploads" />
      </div>
    </form>
    <div class="submit-button" @click="handleNewFormSubmit">
      <span class="button-text">送出</span>
    </div>
  </div>
</template>

<script>
import ProjectName from "@/components/forms/fields/projectName.vue"
import Organization from "@/components/forms/fields/organization.vue"
import StartDate from "@/components/forms/fields/startDate.vue"
import ProjectDescription from "@/components/forms/fields/projectDescription.vue"
import ProgressDescription from "@/components/forms/fields/progressDescription.vue"
import ApprovalDate from "@/components/forms/fields/approvalDate.vue"
import ApprovalDescription from "@/components/forms/fields/approvalDescription.vue"
import FundingRequirements from "@/components/forms/fields/fundingRequirements.vue"
import FundingSource from "@/components/forms/fields/fundingSource.vue"
import Status from "@/components/forms/fields/status.vue"
import Uploads from "@/components/forms/fields/uploads.vue"


export default {
  name: "constructionForm",
  props: ["formFields"],
  components: {
    ProjectName,
    Organization,
    StartDate,
    ProjectDescription,
    ProgressDescription,
    ApprovalDate,
    ApprovalDescription,
    FundingRequirements,
    FundingSource,
    Status,
    Uploads
  },
  computed: {},
  data() {
    return {
      inputs: {}
    };
  },
  methods: {
    handleNewFormSubmit() {
      this.$emit("handleNewFormSubmit", this.inputs)
    },
    handleMobilePopup() {
      this.mobilePopup = !this.mobilePopup
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