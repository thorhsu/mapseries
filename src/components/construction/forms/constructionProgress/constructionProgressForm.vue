<template>
  <div class="function-content">
    <div class="content-Style shadow" v-if="device !== 'mobile'">
      <Form :fields="fields" :state="state" v-if="show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-add">
          工作報告進度控管
          <img class="close-img" v-if="device === 'desktop'" src="@/assets/icons/close.svg">
          <img class="close-img" v-else src="@/assets/icons/disaster/plus.svg">
        </div>
      </div>
    </div>
    <div class="content-Style shadow">
      <FormList :device="device" :disasterList="disasterList" @openEditPopup="openEditPopup" v-if="!show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-List">
          工作報告進度控管列表
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
/* eslint-disable no-console */
import FormList from '@/components/construction/forms/constructionProgress/component/list.vue'
import Form from "@/components/construction/shared/form.vue"
import FormPopup from '@/components/construction/shared/formPopup.vue'

export default {
  name: "constructionProgressForm",
  props: ["newEvent"],
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
          title: "案件名稱",
          input: "",
          inputType: "text",
          inputName: "projectName"
        },
        {
          title: "承辦人",
          input: "",
          inputType: "text",
          inputName: "assignee"
        },
        {
          title: "建立日期",
          input: "",
          inputType: "date",
          inputName: "startDate"
        },
        {
          title: "案件說明",
          input: "",
          inputType: "textarea",
          inputName: "projectDescription"
        },
        {
          title: "進度說明",
          input: "",
          inputType: "textarea",
          inputName: "progressDescription"
        },
        {
          title: "批核日期",
          input: "",
          inputType: "date",
          inputName: "approvalDate"
        },
        {
          title: "批核內容",
          input: "",
          inputType: "textarea",
          inputName: "approvalDescription"
        },
        {
          title: "經費需求",
          input: "no",
          inputType: "radio",
          inputName: "fundingRequirements"
        },
        {
          title: "經費來源",
          input: "",
          inputType: "text",
          inputName: "fundingSource"
        },
        {
          title: "辦理狀態",
          input: "",
          inputType: "text",
          inputName: "status"
        },
        {
          title: "相關資料上傳",
          input: "",
          inputType: "uploads",
          inputName: "fileUploads"
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
        startDate: '108/09/10',
        projectDescription: '雲林縣淹水整治',
        progressDescription: '已清淤，完成50%',
        Packaged: true
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 20,
        startDate: '108/09/10',
        projectDescription: '雲林縣淹水整治',
        progressDescription: '已清淤，完成50%',
        Packaged: true
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 0,
        startDate: '108/09/10',
        projectDescription: '雲林縣淹水整治',
        progressDescription: '已清淤，完成50%',
        Packaged: false
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 0,
        startDate: '108/09/10',
        projectDescription: '雲林縣淹水整治',
        progressDescription: '已清淤，完成50%',
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
          if(field.inputType === "select"){
            for(let option of field.options){
              if(option.valueName === data[field.inputName]){
                field.input = option.value
              }
            }
          }else{
            field.input = data[field.inputName]
          }
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