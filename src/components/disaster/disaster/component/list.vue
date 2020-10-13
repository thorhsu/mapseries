<template>
  <div class="outer">
    <p class="title" v-if="device !== 'mobile'">傳真通報列表</p>
    <div class="function-outer">
      <div v-if="device === 'mobile'" class="paging-cont function-item">
        <el-pagination :page-size="10" :pager-count="5" layout="prev, pager, next" :total="50" :hide-on-single-page="true" />
      </div>
      <div class="function-item">
        <p class="font-Style">每頁</p>
        <el-input v-model="data_count" placeholder=" " type="number" class="input-count" />
        <p class="font-Style">筆</p>
      </div>
      <div v-if="device === 'tablet'" class="paging-cont function-item">
        <el-pagination :page-size="10" :pager-count="5" layout="prev, pager, next" :total="50" :hide-on-single-page="true" />
      </div>
      <div class="function-item input-key-word">
        <el-input v-model="keyWord" placeholder="輸入關鍵字" class="key-word-Style" />
        <img style="margin-right: 5%;" src="@/assets/icons/disaster/search_icon.svg">
      </div>
    </div>
    <div class="dataList-outer">
      <div v-for="(data, index) of disasterList" :key="index" class="data-outer">
        <div class="dataList-Text" v-html="data.Name" />
        <div class="dataList-Text">
          <div v-html="data.time.Start + ' ～ ' + data.time.End" />
        </div>
        <div class="data-function">
          <img src="@/assets/icons/edit.svg" class="function-img" style="background-color: #5d9cec;" @click="openEditPopup(data)">
          <img src="@/assets/icons/location.svg" class="function-img" style="background-color: #5d9cec;">
          <img src="@/assets/icons/download.svg" class="function-img" style="background-color: #5fbeaa;" @click="download(data)">
          <img src="@/assets/icons/delete.svg" class="function-img" style="background-color: #f05050;" @click="deleteData(data)">
        </div>
      </div>
    </div>
    <div class="paging-cont" v-if="device === 'desktop'">
      <el-pagination :page-size="10" :pager-count="5" layout="prev, pager, next" :total="50" :hide-on-single-page="true" />
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "disaster_list",
  props: ['device', 'disasterList'],
  components: {},
  computed: {},
  data() {
    return {
      data_count: 10,
      keyWord: null,
      editPopup: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    openEditPopup(data) {
      this.$emit('openEditPopup', data)
    },
    async download(data){
      try {
        let endpoint = `https://yliflood.yunlin.gov.tw/v2/api/FloodEvents/${data.Id}/File`
        let response = await axios.get(endpoint,{ responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${data.Name}.zip`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        alert(error)
      }
    },
    async deleteData(data){
      try {
        let endpoint = `https://yliflood.yunlin.gov.tw/v2/api/FloodEvent/${data.Id}`
        let response = await axios.delete(endpoint)
        this.$emit('update_List') 
      } catch (error) {
        alert(error)
      }
    }
  }
};
</script>

<style scoped>
  .outer{
    border-radius: 10px;
    background-color: white;
  }
  .img-Style {
    width: 100%;
    height: auto;
  }
  .font-Style{
    margin: 0;
  }
  .input-img {
    padding: 0 3%;
  }
  .title {
    width: 100%;
    height: auto;
    color: #247262;
    padding: 30px 70px;
    margin: 0;
    font-weight: bold;
  }
  .function-outer{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 5% 0 0;
  }
  .function-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-count {
    width: 40%;
    padding: 0 3%;
  }
  .input-key-word {
    border: 3px solid #458072;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    width: 25%;
  }
  .key-word-Style >>> .el-input__inner {
    color: #458072;
    border: 0;
    border-radius: 20px;
  }
  .button-download{
    cursor: pointer;
    background-color: #3FA893;
    color: white;
    border-radius: 30px;
    padding: .5% 2%;
  }
  .banner-title-outer {
    display: flex;
    padding: 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    border-bottom: 3px solid #4E8D80;
  }
  .banner-title {
    flex: 1;
    padding: 1% 0;
  }
  .dataList-outer {
    padding: 0 10% 3%;
  }
  .data-function {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .data-outer {
    width: 100%;
    height: auto;
    display: flex;
    /* justify-content: space-around; */
    justify-content: center;
    border-bottom: 3px solid #4E8D80;
    padding: .5% 0;
    align-items: center;
  }
  .data-time {
    display: flex;
    justify-content: space-between;
  }
  .function-img {
    width: 100%;
    margin: 0 2%;
    cursor: pointer;
    border-radius: 50%;
    padding: 3%;
  }
  .dataList-Text {
    flex: 1;
    text-align: center;
  }
  .dataList-content {
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
  }
  .dataList-commit {
    display: flex;
    align-items: center;
  }
  .commit_Log {
    color: white;
    margin-right: 2%;
    border-radius: 50%;
    background-color: rgb(93, 156, 236);
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  @media (min-width: 768px) and (max-width: 1280px){
    .title {
      text-align: center;
    }
    .function-outer {
      flex-wrap: wrap;
      padding: 0;
    }
    .function-item {
      padding: 1% 0;
      width: 40%;
      justify-content: flex-start;
    }
    .button-download {
      justify-content: center;
    }
    .dataList-outer {
      padding: 3%;
    }
    .function-img {
      width: auto;
      padding: 2%;
    }
    .paging-cont {
      justify-content: flex-end;
    }
  }

  @media (max-width: 767px){
    .function-outer {
      display: flex;
      flex-direction: column-reverse;
      padding: 0 5%;
    }
    .function-item {
      width: 100%;
      margin: 5% 0 0;
    }
    .data-outer {
      display: block;
      padding: 5% 0 0;
    }
    .dataList-outer {
      padding: 5% 10%;
    }
    .data-time {
      justify-content: flex-start;
    }
    .function-img {
      width: auto;
      padding: 2%;
      margin: 2%;
    }
    .dataList-commit {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
    .commit_Log {
      margin-left: 2%;
    }
    .data-function {
      margin-top: 5%;
    }
    .dataList-Text {
      text-align: start;
    }
  }

  .paging-cont {
    padding: 0 0 1%;
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

  /* hide up & down Arrow => el-input type="number" */
  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  /deep/ input[type='number'] {
    -moz-appearance: textfield !important;
  }
</style>
