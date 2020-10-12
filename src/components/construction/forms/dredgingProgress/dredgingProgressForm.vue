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
/* eslint-disable no-console */
import FormField from "@/components/construction/shared/formField.vue"
import FormList from '@/components/construction/forms/dredgingProgress/component/list.vue'

export default {
  name: "dredgingProgressForm",
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
          title: "案件名稱",
          input: "",
          inputType: "text",
          inputName: "projectName"
        },
        {
          title: "年度",
          input: "",
          inputType: "month",
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
        case_name: '雲林淹水整治',
        commit_Log: 1,
        year: '108',
        case_type: '防汛道路維護清理工程',
        company: '很棒的營造',
        Packaged: true
      })
      this.disasterList.push({
        case_name: '雲林淹水整治',
        commit_Log: 20,
        year: '108',
        case_type: '防汛道路維護清理工程',
        company: '很棒的營造',
        Packaged: true
      })
      this.disasterList.push({
        case_name: '雲林淹水整治',
        commit_Log: 0,
        year: '108',
        case_type: '防汛道路維護清理工程',
        company: '很棒的營造',
        Packaged: false
      })
      this.disasterList.push({
        case_name: '雲林淹水整治',
        commit_Log: 0,
        year: '108',
        case_type: '防汛道路維護清理工程',
        company: '很棒的營造',
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