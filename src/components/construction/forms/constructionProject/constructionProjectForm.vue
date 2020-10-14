<template>
  <div class="function-content">
    <div class="content-Style shadow" v-if="device !== 'mobile'">
      <Form :fields="fields" :state="state" v-if="show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-add">
          工程案件詳細資訊
          <img class="close-img" v-if="device === 'desktop'" src="@/assets/icons/close.svg">
          <img class="close-img" v-else src="@/assets/icons/disaster/plus.svg">
        </div>
      </div>
    </div>
    <div class="content-Style shadow">
      <FormList :device="device" :disasterList="disasterList" @openEditPopup="openEditPopup" v-if="!show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-List">
          工程案件詳細資訊列表
          <img class="arrow-img" src="@/assets/icons/downArrow.svg">
        </div>
      </div>
    </div>
    <FormPopup v-if="FormPopupVisible" :state="state" :fields="fields" @closePopup="closePopup" />
    <div v-if="device === 'mobile' && !FormPopupVisible" class="mobile-add" @click="FormPopupVisible = !FormPopupVisible">
      <img class="mobile-button" src="@/assets/icons/disaster/plus.svg">
    </div>
  </div>
</template>

<script>
import Form from "@/components/construction/shared/form.vue"
import FormList from '@/components/construction/forms/constructionProject/component/list.vue'
import FormPopup from '@/components/construction/shared/formPopup.vue'

export default {
  name: "constructionProjectForm",
  props: [],
  components: {
    Form,
    FormList,
    FormPopup
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
          inputType: "text",
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
      state: 'add',
      inputs: {},
      device: "",
      disasterList: [],
      FormPopupVisible: false,
      show_view: {
        add: false,
      },
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
        projectName: '雲林淹水整治',
        commit_Log: 1,
        constructionYear: '108',
        assignee: '雲林縣政府',
        contractor: '很棒的營造',
        Warranty: '保固將到期',
        Packaged: true
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 20,
        constructionYear: '108',
        assignee: '雲林縣政府',
        contractor: '很棒的營造',
        Warranty: '',
        Packaged: true
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 0,
        constructionYear: '108',
        assignee: '雲林縣政府',
        contractor: '很棒的營造',
        Warranty: '',
        Packaged: false
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 0,
        constructionYear: '108',
        assignee: '雲林縣政府',
        contractor: '很棒的營造',
        Warranty: '',
        Packaged: false
      })
    },
    initFields(){
      for(let field of this.fields){
        if(field.inputType === 'date'){
          field.input = new Date().toISOString().split('T')[0]
        }else if(field.inputType === 'radio'){
          field.input = "no"
        }else{
          field.input = ""
        }
      }
    },
    initFields_For_Edit(data){
      for(let field of this.fields){
        if(data.hasOwnProperty(field.inputName)){
          field.input = data[field.inputName]
        }
        // field.input = data[field.inputName]
      }
    },
    openEditPopup(data){
      this.state = 'edit';
      this.initFields_For_Edit(data);
      this.FormPopupVisible = true;
      console.log("edit => ", data)
    },
    handleNewFormSubmit() {
      // Call Add API
      console.log('add => ', this.inputs)
    },
    handleMobilePopup() {
      this.mobilePopup = !this.mobilePopup
    },
    handleInput(field, input) {
      this.inputs[field] = input
    },
    closePopup(){
      this.state = 'add'
      this.FormPopupVisible = false;
      this.initFields()
    }
  }
};
</script>

<style scoped>
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
  .hide-add-outer {
    border-radius: 10px;
    background-color: white;
  }
  .show-add {
    width: 100%;
    padding: 20px 42px 20px 87px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .show-List {
    width: 100%;
    padding: 20px 42px 20px 87px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .close-img {
    width: 1.5%;
    transform: rotate(45deg);
  }
  .arrow-img {
    width: auto;
  }
  .mobile-add {
    z-index: 1;
    position: fixed;
    right: 3%;
    bottom: 3%;
    width: 15%;
  }
  .mobile-button {
    width: 100%;
    height: auto;
    background: #3FA893;
    border-radius: 50%;
    padding: 25%;
  }
  @media (min-width: 768px) and (max-width: 1280px){
    .hide-add-outer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2% 0;
    }
    .show-add {
      width: 25%;
      padding: 1% 2%;
      border-radius: 30px;
      flex-direction: row-reverse;
      justify-content: center;
      color: white;
      background-color: #3FA893;
    }
    .show-List {
      padding: 1.5% 5%;
    }
    .close-img {
      width: 10%;
      padding: 0 3%;
      transform: rotate(0deg);
    }
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