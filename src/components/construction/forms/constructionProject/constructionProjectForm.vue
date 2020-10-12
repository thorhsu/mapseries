<template>
  <div class="function-content">
    <div class="content-Style shadow">
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
    </div>
    <div class="content-Style shadow">
      <FormList :device="device" :disasterList="disasterList" @popup="popup" />
    </div>
    <!-- <FormPopup :openedPopup="openedPopup" :fields="fields" @togglePopup="togglePopup" /> -->
  </div>
</template>

<script>
import FormField from "@/components/construction/shared/formField.vue"
import FormList from '@/components/construction/forms/constructionProject/component/list.vue'
// import FormPopup from '@/components/construction/shared/formPopup.vue'

export default {
  name: "constructionProjectForm",
  props: ["newEvent"],
  components: {
    FormField,
    FormList
  },
  computed: {},
  data() {
    return {
      fields: [
        {
          title: "工程名稱",
          input: "",
          inputType: "text",
          inputName: "projectName"
        },
        {
          title: "施工年度",
          input: "",
          inputType: "month",
          inputName: "constructionYear"
        },
        {
          title: "案件承辦人(或移交單位)",
          input: "",
          inputType: "text",
          inputName: "assignee"
        },
        {
          title: "資料建立日期",
          input: "",
          inputType: "date",
          inputName: "startDate"
        },
        {
          title: "主要工程項目描述",
          input: "",
          inputType: "textarea",
          inputName: "projectDescription"
        },
        {
          title: "執行單位",
          input: "",
          inputType: "text",
          inputName: "executionOrg",
        },
        {
          title: "契約金額",
          input: "",
          inputType: "text",
          inputName: "contractAmount"
        },
        {
          title: "是否變更設計、變更設計後金額",
          input: "no",
          inputType: "radio",
          inputName: "designModification",
          subInput: "",
          subInputType: "text",
          subInputName: "modifiedAmount"
        },
        {
          title: "決算金額",
          input: "",
          inputType: "text",
          inputName: "settlementAmount"
        },
        {
          title: "保固年限(結構、非結構)-退保故警示",
          input: "",
          inputType: "text",
          inputName: "warrantyYear"
        },
        {
          title: "管理單位點收人員",
          input: "",
          inputType: "text",
          inputName: "managingPersonnel"
        },
        {
          title: "施工廠商",
          input: "",
          inputType: "text",
          inputName: "contractor"
        },
        {
          title: "訂約日",
          input: "",
          inputType: "date",
          inputName: "contractDate"
        },
        {
          title: "竣工日",
          input: "",
          inputType: "date",
          inputName: "completionDate"
        },
        {
          title: "驗收合格日",
          input: "",
          inputType: "date",
          inputName: "inspectionPassDate"
        },
        {
          title: "監造單位、設計單位",
          input: "",
          inputType: "text",
          inputName: "designPersonnel"
        },
        {
          title: "相關資料上傳",
          input: "",
          inputType: "uploads",
          inputName: "fileUploads"
        },
        {
          title: "施工點位(起訖點座標或KML檔)",
          input: "",
          inputType: "uploads",
          inputName: "kmlUploads"
        }
      ],
      inputs: {},
      device: "",
      disasterList: [],
      popup_view: {
        update: false,
        add: false
      }
    };
  },
  created(){
    this.prepareList();
  },
  mounted() {
    let vue = this;
    this.checkDevice()
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        vue.checkDevice()
      });
    });
  },
  methods: {
    checkDevice(){
      this.windowsWidth = window.innerWidth
      if( this.windowsWidth < 768 ){
        this.device = "mobile"
      } else if(this.windowsWidth < 1280){
        this.device = "tablet"
      }else{
        this.device = "desktop"
      }
    },
    async prepareList(){
      this.disasterList.push({
        construction_name: '雲林淹水整治',
        commit_Log: 1,
        year: '108',
        case_officer: '雲林縣政府',
        company: '很棒的營造',
        Warranty: '保固將到期',
        Packaged: true
      })
      this.disasterList.push({
        construction_name: '雲林淹水整治',
        commit_Log: 20,
        year: '108',
        case_officer: '雲林縣政府',
        company: '很棒的營造',
        Warranty: '',
        Packaged: true
      })
      this.disasterList.push({
        construction_name: '雲林淹水整治',
        commit_Log: 0,
        year: '108',
        case_officer: '雲林縣政府',
        company: '很棒的營造',
        Warranty: '',
        Packaged: false
      })
      this.disasterList.push({
        construction_name: '雲林淹水整治',
        commit_Log: 0,
        year: '108',
        case_officer: '雲林縣政府',
        company: '很棒的營造',
        Warranty: '',
        Packaged: false
      })
    },
    popup(data){
      this.popup_view.update = !this.popup_view.update;
    },
    handleNewFormSubmit() {
      console.log(this.inputs)
      // this.$emit("handleNewFormSubmit", this.inputs)
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
  
  .function-content {
    width: 100%;
    height: auto;
    padding: 35px;
    position: relative;
  }
  .content-Style {
    border-radius: 20px;
    margin: 0 0 17.5px;
  }

  @media (max-width: 767px){
    .function-content {
      padding: 5%;
    }
    .content-Style {
      margin: 0;
    }
  }
  @media screen and (max-width: 500px) {
    .function-content {
      padding: 15px;
    }
  }
</style>