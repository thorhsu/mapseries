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
          <AddEventForm 
            :newEvent="newEvent"
            @handleNewFormSubmit="handleNewFormSubmit"
            :openedPopup="openedPopup"
            @togglePopup="togglePopup"
          />
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
import AddEventForm from '@/components/test/addEventForm.vue'
import EventTable from '@/components/test/eventTable.vue'
import FormPopup from '@/components/test/formPopup.vue'

export default {
  name: "test",
  components: {
    BannerMenu,
    FunctionMenu,
    AddEventForm,
    EventTable,
    FormPopup
  },
  data() {
    return {
      banner: {
        title: '工程業務控管平台'
      },
      functionMenu: {
        visible: true,
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
      this.events.push(newevent)
      this.newEvent = {
        time: {
          start: "",
          end: ""
        },
        eventName: "",
        eventData: ""
      }
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
