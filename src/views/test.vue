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

        <!-- Add form -->
        <div class="shadow" style="border-radius: 10px;">
          <div class="form-cont">
            <form class="form">
              <div class="form-row-cont">
                <div class="form-rows">
                  <label for="date">日期區間</label>
                  <input type="date" id="date-start" name="date-start" v-model="newEvent.time.start">
                  <span> ~ </span>
                  <input type="date" id="date-end" name="date-end" v-model="newEvent.time.end">
                </div>

                <div class="form-rows">
                  <label for="contractor">發包廠商</label>
                  <input type="text" id="contractor" name="contractor" v-model="newEvent.eventData">
                </div>

                <div class="form-rows">
                  <label for="location">施工地點</label>
                </div>
              </div>

              <div class="form-rows">
                <label for="content">內容說明</label>
                <textarea id="content" name="content" v-model="newEvent.eventName"></textarea>
              </div>
            </form>
            <div class="submit-button" @click="handleNewFormSubmit">
              <span>+</span>
              <span class="button-text">新增工程表單</span>
            </div>
          </div>
        </div>

        <!-- Bottom table -->
        <div class="shadow" style="border-radius: 10px;">
          <div class="table-cont">
            <div class="table-actions">
              <div>
                <label for="perPage">每頁</label>
                <select id="perPage" name="perPage">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
                <span>筆</span>
              </div>

              <div>
                <el-input
                  class="search-button"
                  placeholder="輸入關鍵字"
                  v-model="searchText">
                  <i class="el-icon-search el-input__icon"
                    slot="suffix"
                    @click="handleSearch">
                  </i>
                </el-input>
              </div>

              <div class="download-button">
                <span class="button-text">下載所有資料</span>
              </div>
            </div>

            <div class="table-rows-cont">
              <div class="table-rows" 
                v-for="(event, index) in events" 
                :key="index">

                <div class="table-row" >
                  <p>{{event.eventName}}</p>
                  <p>{{event.time.start}} ~ {{event.time.end}}</p>
                  <div class="event-actions">
                    <div class="event-button-blue" @click="handleEditPopup(event, index)">
                      <img src="../assets/icons/edit.svg" />
                    </div>
                    <div class="event-button-blue">
                      <img src="../assets/icons/location.svg" />
                    </div>
                    <div class="event-button-green">
                      <img src="../assets/icons/download.svg" />
                    </div>
                    <div class="event-button-red">
                      <img src="../assets/icons/delete.svg" />
                    </div>
                  </div>
                </div>
                <hr>
              </div>
            </div>

            <div class="paging-cont">
              <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="50"
                :hide-on-single-page="true">
              </el-pagination>
            </div>
          </div>
        </div>



        <div class="edit-popup-cont" v-show="editPopup">
          <div class="popup-background"></div>

          <div class="form-cont-edit">
            <img src="../assets/icons/close.svg" class="close-icon" 
              @click="handleEditPopup"/>
            <form class="form">
              <div class="form-row-cont">
                <div class="form-rows">
                  <label for="date">日期區間</label>
                  <input type="date" id="date-start-edit" name="date-start">
                  <span> ~ </span>
                  <input type="date" id="date-end-edit" name="date-end">
                </div>

                <div class="form-rows">
                  <label for="contractor-edit">發包廠商</label>
                  <input type="text" id="contractor-edit" name="contractor">
                </div>

                <div class="form-rows">
                  <label for="location-edit">施工地點</label>
                </div>
              </div>

              <div class="form-rows">
                <label for="content-edit">內容說明</label>
                <textarea id="content-edit" name="content"></textarea>
              </div>
            </form>
            <div class="submit-button">
              <span>+</span>
              <span class="button-text">新增工程表單</span>
            </div>
          </div>
        </div>
      </div>
    </div>
 

    

    
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
export default {
  name: "test",
  components: {
    BannerMenu,
    FunctionMenu
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
      searchText: "",
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
      editPopup: false,
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
    handleSearch(){
      console.log(this.searchText)
    },
    handleEditPopup(e, i) {
      console.log(e)
      this.editPopup = !this.editPopup
    },
    handleNewFormSubmit() {
      console.log(this.newEvent)
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
  .form-cont {
    background-color: white;
    padding: 2vw 3.5vw;
    border-radius: 10px;
  }
  .form {
    display: flex;
  }
  .form-row-cont {
    flex: 1;
  }
  .form-rows {
    margin-right: 1.5vw;
    margin-bottom: 1.5vw;
    display: flex;
    flex: 1;
  }
  .form-rows label {
    /* font-size: 1vw; */
    padding-right: 1.7vw;
  }
  .form-rows input {
    flex-grow: 1;
  }
  .form-rows input[type=text] {
    padding: 5px 10px;
  }
  .form-rows textarea {
    width: calc(100% - 7vw);
    padding: 5px 10px;
  }
  .submit-button {
    background-color: #3FA893;
    border-radius: 35px;
    width: 15vw;
    height: 3.5vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.5vw;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 0 auto;
  }

  /* Table */
  .table-cont {
    background-color: white;
    padding: 2vw 3.5vw;
    margin: 1.5vw 0;
    border-radius: 10px;
  }
  .table-cont select {
    margin: 0 0.5vw;
  }
  .table-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .search-button >>> .el-input__inner {
    border-radius: 35px;
    border-color: #247262;
    border-width: 2px;
  }
  .search-button >>> .el-input__suffix {
    color: #247262;
  }
  .download-button {
    border-radius: 35px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    background-color: #3FA893;
    font-size: 1.3vw;
    width: 13vw;
    height: 40px;
    color: white;
    font-weight: bold;
  }
  .table-rows-cont {
    margin: 2em 0;
  }
  .table-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 50px;
  }
  .table-row p {
    margin-bottom: 0;
  }
  .event-actions {
    display: flex;
  }
  .event-actions img {
    height: 18px;
  }
  .event-button-blue , .event-button-green, .event-button-red {
    margin: 0 5px;
    padding: 4px 8px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }
  .event-button-blue {
    background-color: #5d9cec;
  }
  .event-button-green {
    background-color: #5fbeaa;
  }
  .event-button-red {
    background-color: #f05050;
  }
  .table-rows hr {
    border: 1px solid #4E8D80;
    width: 80%;
  }
  .paging-cont >>> .el-pagination {
    display: flex;
    justify-content: center;
  }
  .paging-cont >>> .el-pagination .btn-next, .el-pagination .btn-prev {
    color: #999A99;
  }
  .paging-cont >>> .el-pager li {
    color: #ECECEC;
  }
  .paging-cont >>> .el-pager li.active {
    background-color: #ECECEC;
    color: #999A99;
    border-radius: 5px;
  }
  .paging-cont >>> .el-pagination button:hover {
    color: #3FA893;
  }

  /* Edit Popup */
  .popup-background {
    background-color: #080808;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
  }
  .form-cont-edit {
    background-color: white;
    padding: 3.5vw 3.5vw 2vw 3.5vw;
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
</style>
