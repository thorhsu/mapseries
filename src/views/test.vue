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
        <div class="shadow" style="border-radius: 10px;">
          <AddEventForm 
            :newEvent="newEvent"
            @handleNewFormSubmit="handleNewFormSubmit"
          />
        </div>

        <div class="shadow" style="border-radius: 10px;">
          <EventTable
            :events="events"
            :edittingPopup="edittingPopup"
            @handleEditPopup="handleEditPopup"
          />
        </div>

        <EditFormPopup 
          :edittingPopup="edittingPopup"
          @handleEditPopup="handleEditPopup"
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
import EditFormPopup from '@/components/test/editFormPopup.vue'

export default {
  name: "test",
  components: {
    BannerMenu,
    FunctionMenu,
    AddEventForm,
    EventTable,
    EditFormPopup
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
      edittingPopup: false,
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
    handleEditPopup(value) {
      this.edittingPopup = value
    },
    handleNewFormSubmit(newevent) {
      console.log(newevent)
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
  }

  /* Other Components */
  .function-outer {
    display: flex;
  }
  .function-content {
    width: 100%;
    height: auto;
    padding: 35px;
    position: relative;
  }

  /* Form */
  

  /* Table */
  
  /* Edit Popup */
  

  /* RWD */
  @media screen and (max-width: 1300px) {
    .form {
      display: block;
    }
  }
  @media screen and (max-width: 996px) {
    .table-row {
      padding: 0;
    }
    .table-rows hr {
      width: 95%;
    }
  }
  @media screen and (max-width: 768px) {
    .table-row {
      padding: 0 25px;
      flex-direction: column;
      align-items: start;
    }
    .event-actions[data-v-5752faac] {
      align-self: center;
      margin-top: 15px;
    }
  }
</style>
