<template>
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

    <div class="table-actions-mobile">
      <div class="actions-row-mobile">
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

        <div class="paging-cont">
          <el-pagination
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="30"
            :hide-on-single-page="true">
          </el-pagination>
        </div>

      </div>

      <div class="actions-row-mobile">
        <div class="search-cont-mobile">
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
    </div>


    <div class="table-rows-cont">
      <div class="table-rows" 
        v-for="(event, index) in events" 
        :key="index">

        <div class="table-row" >
          <p>{{event.eventName}}</p>
          <p>{{event.time.start}} ~ {{event.time.end}}</p>
          <div class="event-actions">
            <div class="event-button-blue" @click="togglePopup(event, index)">
              <img src="../../assets/icons/edit.svg" />
            </div>
            <div class="event-button-blue">
              <img src="../../assets/icons/location.svg" />
            </div>
            <div class="event-button-green">
              <img src="../../assets/icons/download.svg" />
            </div>
            <div class="event-button-red">
              <img src="../../assets/icons/delete.svg" />
            </div>
          </div>
        </div>
        <hr>
      </div>

      <div class="paging-cont paging-desktop">
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
</template>

<script>
export default {
  name: "eventTable",
  props: ["events", "openedPopup"],
  components: {},
  computed: {},
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    handleNewFormSubmit() {
      this.$emit("handleNewFormSubmit", this.newEvent)
    },
    handleSearch() {

    },
    togglePopup() {
      this.$emit("togglePopup", true)
    }
  }
};
</script>

<style scoped>
  .table-cont {
    background-color: white;
    padding: 40px 50px;
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
    width: 130px;
    height: 40px;
    color: white;
    font-weight: bold;
  }
  .table-rows-cont {
    margin: 2em 0;
  }
  .table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10vw;
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

  /* Mobile */
  .table-actions-mobile {
    display: none;
  }
  .actions-row-mobile {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 996px) {
    .table-row {
      padding: 10px;
    }
    .table-rows hr {
      width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    .table-actions {
      display: none;
    }
    .table-actions-mobile {
      display: block;
    }
    .table-row {
      padding: 0 25px;
      flex-direction: column;
      align-items: start;
    }
    .event-actions {
      align-self: center;
      margin-top: 15px;
    }
    .paging-desktop {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .table-actions-mobile {
      display: flex;
      flex-direction: column-reverse;
    }
    .download-button {
      display: none;
    }
    .search-cont-mobile {
      width: 100%;
    }
    .actions-row-mobile {
      flex-direction: column;
      align-items: center;
    }
  }
</style>