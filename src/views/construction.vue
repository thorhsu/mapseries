<template>
  <div class="test-page">
    <BannerMenu :title="banner.title" :visible="functionMenu.visible" @visible="changeVisible"/>
    <div class="function-outer">
      <FunctionMenu v-if="functionMenu.visible" :formList="functionMenu.form_list" :selectedForm="functionMenu.selected" @change="changeForm" />

      <!-- 工程案件詳細資訊 -->
      <ConstructionProjectForm v-if="functionMenu.selected === '工程案件詳細資訊'" />
      <!-- 疏濬案件進度控管 -->
      <DredgingProgressForm v-else-if="functionMenu.selected === '疏濬案件進度控管'" />
      <!-- 業務進度控管 -->
      <BusinessProgressForm v-else-if="functionMenu.selected === '業務進度控管'" />
      <!-- 工作報告進度控管 -->
      <ConstructionProgressForm v-else-if="functionMenu.selected === '工作報告進度控管'" />
      <!-- 年度標案進度控管 -->
      <AnnualProjectProgressForm v-if="functionMenu.selected === '年度標案進度控管'" />
    </div>   
  </div>
</template>

<script>
/* eslint-disable no-console */
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import EventTable from '@/components/construction/shared/eventTable.vue'
import FormPopup from '@/components/construction/shared/formPopup.vue'

import ConstructionProjectForm from '@/components/construction/forms/constructionProject/constructionProjectForm.vue'
import DredgingProgressForm from '@/components/construction/forms/dredgingProgress/dredgingProgressForm.vue'
import BusinessProgressForm from '@/components/construction/forms/businessProgress/businessProgressForm.vue'
import ConstructionProgressForm from '@/components/construction/forms/constructionProgress/constructionProgressForm.vue'
import AnnualProjectProgressForm from '@/components/construction/forms/annualProjectProgress/annualProjectProgressForm.vue'


export default {
  name: "construction",
  components: {
    BannerMenu,
    FunctionMenu,
    EventTable,
    FormPopup,
    ConstructionProjectForm,
    DredgingProgressForm,
    BusinessProgressForm,
    ConstructionProgressForm,
    AnnualProjectProgressForm,
  },
  data() {
    return {
      banner: {
        title: '工程業務控管平台'
      },
      functionMenu: {
        visible: false,
        form_list: [],
        selected: '工程案件詳細資訊',
        waitLoad: false
      },
      events: [
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
      ],
      openedPopup: false,
    };
  },
  mounted() {
    this.prepare_FormList();
  },
  methods: {
    prepare_FormList(){
      this.functionMenu.form_list.push({
        name: "工程案件詳細資訊",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
      this.functionMenu.form_list.push({
        name: "業務進度控管",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
      this.functionMenu.form_list.push({
        name: "工作報告進度控管",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
      this.functionMenu.form_list.push({
        name: "年度標案進度控管",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
      this.functionMenu.form_list.push({
        name: "疏濬案件進度控管",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
    },
    changeVisible(value){
      this.functionMenu.visible = value
    },
    togglePopup(value) {
      this.openedPopup = value
    },
    changeForm(form_Name){
      if(this.functionMenu.waitLoad){
        alert('正在存取Data，停止切換表單功能')
        return 0;
      }
      this.functionMenu.selected = form_Name;
      // this.prepareList()
    },
  }
};
</script>

<style scoped>
  /* Page */
  .test-page {
    background-color: #DFE9F0;
    position: relative;
  }

  /* Other Components */
  .function-outer {
    display: flex;
    position: relative;
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