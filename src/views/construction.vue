<template>
  <div class="test-page">
    <BannerMenu 
      :title="banner.title" 
      :visible="functionMenu.visible" 
      @visible="changeVisible"
    />

    <div class="function-outer">
      <FunctionMenu 
        v-if="functionMenu.visible" 
        :dataList="functionMenu.data_list" 
      />
      <div class="function-content">
        <div class="content-Style shadow">
          <!-- 工程案件詳細資訊 -->
          <!-- <ConstructionProjectForm 
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <!-- 疏濬案件進度控管 -->
          <!-- <DredgingProgressForm 
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <!-- 業務進度控管 -->
          <!-- <BusinessProgressForm
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <!-- 工作報告進度控管 -->
          <!-- <ConstructionProgressForm
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <!-- 年度標案進度控管 -->
          <AnnualProjectProgressForm
            @handleNewFormSubmit="handleNewFormSubmit" 
          />

          <!-- <AddEventForm 
            :newEvent="newEvent"
            @handleNewFormSubmit="handleNewFormSubmit"
            :openedPopup="openedPopup"
            @togglePopup="togglePopup"
          /> -->
        </div>

        <div class="content-Style shadow">
          <EventTable
            :events="events"
            :openedPopup="openedPopup"
            @togglePopup="togglePopup"
          />
        </div>

        <FormPopup 
          :openedPopup="openedPopup"
          @togglePopup="togglePopup"
        />
      </div>
    </div>   
  </div>
</template>

<script>
/* eslint-disable no-console */
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import EventTable from '@/components/construction/shared/eventTable.vue'
import FormPopup from '@/components/construction/shared/formPopup.vue'

import ConstructionProjectForm from '@/components/construction/forms/constructionProjectForm.vue'
import DredgingProgressForm from '@/components/construction/forms/dredgingProgressForm.vue'
import BusinessProgressForm from '@/components/construction/forms/businessProgressForm.vue'
import ConstructionProgressForm from '@/components/construction/forms/constructionProgressForm.vue'
import AnnualProjectProgressForm from '@/components/construction/forms/annualProjectProgressForm.vue'


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
        data_list: []
      },
      events: [
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        }
      ],
      openedPopup: false,
      newEvent: {
        time: {
          start: "",
          end: ""
        },
        eventName: "",
        eventData: ""
      }
    };
  },
  mounted() {
    this.prepare_DataList();
  },
  methods: {
    prepare_DataList(){
      this.functionMenu.data_list.push({
        name: "工程表單",
        img: require('@/assets/icons/disaster/event_icon1.svg')
      })
      this.functionMenu.data_list.push({
        name: "其他表單1",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
      this.functionMenu.data_list.push({
        name: "其他表單2",
        img: require('@/assets/icons/disaster/fax/function-menu.svg')
      })
    },
    changeVisible(value){
      this.functionMenu.visible = value
    },
    togglePopup(value) {
      this.openedPopup = value
    },
    handleNewFormSubmit(newevent) {
      // this.events.push(newevent)
      // this.newEvent = {
      //   time: {
      //     start: "",
      //     end: ""
      //   },
      //   eventName: "",
      //   eventData: ""
      // }
    }
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
