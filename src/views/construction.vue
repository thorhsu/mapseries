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
          <!-- <ConstructionProgressForm
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <!-- <AnnualProjectProgressForm
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <!-- <BusinessProgressForm
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

          <DredgingProgressForm 
            @handleNewFormSubmit="handleNewFormSubmit" 
          />

          <!-- <ConstructionProjectForm 
            @handleNewFormSubmit="handleNewFormSubmit" 
          /> -->

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
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import EventTable from '@/components/construction/shared/eventTable.vue'
import FormPopup from '@/components/construction/shared/formPopup.vue'
import ConstructionProgressForm from '@/components/construction/constructionProgressForm.vue'
import AnnualProjectProgressForm from '@/components/construction/annualProjectProgressForm.vue'
import BusinessProgressForm from '@/components/construction/businessProgressForm.vue'
import DredgingProgressForm from '@/components/construction/dredgingProgressForm.vue'
import ConstructionProjectForm from '@/components/construction/constructionProjectForm.vue'




export default {
  name: "construction",
  components: {
    BannerMenu,
    FunctionMenu,
    EventTable,
    FormPopup,
    ConstructionProgressForm,
    AnnualProjectProgressForm,
    BusinessProgressForm,
    DredgingProgressForm,
    ConstructionProjectForm
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
      this.functionMenu.data_list.push("工程表單")
      this.functionMenu.data_list.push("其他表單1")
      this.functionMenu.data_list.push("其他表單2")
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
