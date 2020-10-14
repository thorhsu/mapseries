<template>
  <div class="function-content">
    <div class="content-Style shadow" v-if="device !== 'mobile'">
      <Form :fields="fields" :state="state" v-if="show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-add">
          疏濬案件進度控管
          <img class="close-img" v-if="device === 'desktop'" src="@/assets/icons/close.svg">
          <img class="close-img" v-else src="@/assets/icons/disaster/plus.svg">
        </div>
      </div>
    </div>
    <div class="content-Style shadow">
      <FormList :device="device" :disasterList="disasterList" @openEditPopup="openEditPopup" v-if="!show_view.add" />
      <div class="hide-add-outer" v-else @click="show_view.add = !show_view.add">
        <div class="show-List">
          疏濬案件進度控管列表
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
import Form from "@/components/construction/shared/form.vue"
import FormList from '@/components/construction/forms/dredgingProgress/component/list.vue'
import FormPopup from '@/components/construction/shared/formPopup.vue'

export default {
  name: "dredgingProgressForm",
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
          title: "年度",
          input: "",
          inputType: "text",
          inputName: "constructionYear"
        },
        {
          title: "施工時間",
          input: "",
          inputType: "date",
          inputName: "constructionTime"
        },
        {
          title: "案件類型",
          input: "",
          inputType: "select",
          inputName: "projectType",
          options: [
            {
              value: "river-dredging",
              valueName: "河道疏濬工程"
            },
            {
              value: "access-road-maintenance",
              valueName: "防汛道路維護清理工程"
            },
            {
              value: "derelict-salvage",
              valueName: "漂流物及廢棄物打撈工程"
            },
            {
              value: "other",
              valueName: "其他"
            }
          ]
        },
        {
          title: "結算金額",
          input: "",
          inputType: "text",
          inputName: "settlementAmount"
        },
        {
          title: "建議人",
          input: "",
          inputType: "text",
          inputName: "referrerInfo"
        },
        {
          title: "使用標案、施工廠商名稱",
          input: "",
          inputType: "text",
          inputName: "contractor",
        },
        {
          title: "案件辦理描述",
          input: "",
          inputType: "textarea",
          inputName: "projectDescription"
        },
        {
          title: "備註",
          input: "",
          inputType: "textarea",
          inputName: "notes"
        },
        {
          title: "相關資料上傳",
          input: "",
          inputType: "uploads",
          inputName: "fileUploads"
        },
        {
          title: "施工點位(起、訖)",
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
        projectType: '防汛道路維護清理工程',
        contractor: '很棒的營造',
        Packaged: true
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 20,
        constructionYear: '108',
        projectType: '防汛道路維護清理工程',
        contractor: '很棒的營造',
        Packaged: true
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 0,
        constructionYear: '108',
        projectType: '防汛道路維護清理工程',
        contractor: '很棒的營造',
        Packaged: false
      })
      this.disasterList.push({
        projectName: '雲林淹水整治',
        commit_Log: 0,
        constructionYear: '108',
        projectType: '防汛道路維護清理工程',
        contractor: '很棒的營造',
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