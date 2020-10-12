<template>
  <div class="outer">
    <div class="form-banner">
      <h1 class="banner-title" v-html="title" />
      <div class="banner-info">
        <div v-for="(data, index) of form_info" :key="index" v-html="data" />
      </div>
    </div>
    <div class="form-outer">
      <div class="form-Field-outer form-number-outer">
        <span class="form-title form-number-title">編號：</span>
        <input class="form-number" type="text" v-model="form_data.num">
        <span class="form-title form-number-title">號</span>
      </div>
      <div class="form-Field-outer">
        <div class="form-title">正本</div>
        <input class="form-input" type="text" v-model="form_data.recipient">
      </div>
      <div class="form-Field-outer">
        <div class="form-title">副本</div>
        <input class="form-input" type="text" v-model="form_data.cc">
      </div>
      <div class="form-Field-outer form-two-Field-outer">
        <div class="form-two-Field">
          <div class="form-title">通報者</div>
          <input class="form-input" type="text" v-model="form_data.sender">
        </div>
        <div class="form-two-Field form-two-Field-right">
          <div class="form-title">時間</div>
          <input class="input-date" type="datetime-local" v-model="form_data.time">
        </div>
      </div>
      <div class="form-Field-outer">
        <div class="form-title form-content-title">通報事項</div>
        <textarea class="input-textarea" v-model="form_data.content" />
      </div>
    </div>
    <div class="remark-form-outer">
      <span class="remark-text">接收單位請確認簽名回傳(<b><u>請即回傳</u></b>本府水利處災害緊急應變小組 05-5340546)</span>
      <div class="form-to">
        <div class="form-to-Field">
          <div class="form-to-Field-title">接收單位</div>
          <input class="recipient-input" type="text" v-model="form_data.toGroup">
        </div>
        <div class="form-to-Field">
          <div class="form-to-Field-title">接收人</div>
          <input class="recipient-input" type="text" v-model="form_data.toName">
        </div>
        <div class="form-to-Field">
          <div class="form-to-Field-title">接收時間</div>
          <input class="recipient-input" type="text" v-model="form_data.toDate">
        </div>
      </div>
      <span class="remark-text yulin-text">雲林縣政府水利處災害緊急應變小組</span>
      <div class="submit-button" @click="submitClick">
        傳送
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fax_disaster_add",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      title: '傳真通報',
      form_info: [
        '雲林縣政府水利署',
        '地址：雲林縣斗六市雲林路二段 515 號',
        '電話：05-5522309，5522310',
        '傳真：05-5340546'
      ],
      form_data: {
        num: '',
        recipient: '',
        cc: '',
        sender: '',
        time: '',
        content: '',
        toGroup: '',
        toName: '',
        toDate: ''
      }
    };
  },
  created(){
    this.prepareTime()
  },
  mounted() {},
  methods: {
    prepareTime(){
      let now = new Date();
      this.form_data.time = now.toISOString().split('T')[0] + 'T' + now.toTimeString().split(' ')[0]
    },
    submitClick(){
      console.log(this.form_data)
    }
  }
};
</script>

<style scoped>
  .outer{
    border-radius: 10px;
    background-color: white;
    padding: 1.5% 20%;
  }
  .form-banner {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .banner-info {
    font-size: 18px;
  }
  .form-outer{
    border: .5px solid black;
  }
  .form-Field-outer {
    border: .5px solid black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .form-number-outer {
    justify-content: flex-end;
    padding: 1%;
  }
  .form-number {
    border: 0px;
  }
  .form-title {
    padding: 0 1%;
    font-size: 24px;
    flex-basis: 150px;
    text-align: center;
  }
  .form-number-title {
    flex-basis: auto;
  }
  .form-input {
    border: 0px;
    width: 100%;
    height: auto;
    flex: 1;
    padding: 1%;
    border-left: 2px solid black;
  }
  .form-two-Field-outer {
    display: flex;
    flex: 1;
    align-items: center;
  }
  .form-two-Field{
    display: flex;
    flex: 1;
    align-items: center;
  }
  .form-two-Field-right{
    border-left: 2px solid black;
  }
  .input-date {
    flex: 1;
    padding: 1%;
    border: 0;
    border-left: 2px solid;
  }
  .input-textarea {
    flex: 1;
    border: 0px;
    height: 30vh;
    border-left: 2px solid black;
    padding: 1%;
  }
  .form-content-title {
    writing-mode: vertical-lr;
    display: flex;
    align-items: center;
  }
  .recipient-input {
    border: 0;
    border-bottom: 1px solid black;
  }
  .remark-form-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form-to {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .form-to-Field {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .remark-text {
    width: 100%;
    padding: 2% 0;
    font-size: 24px;
  }
  .yulin-text {
    width: auto;
  }
  .submit-button {
    color: white;
    width: 20vw;
    background: #3FA893;
    cursor: pointer;
    text-align: center;
    border-radius: 30px;
    padding: 1% 0;
  }
  .form-to-Field-title {
    padding-right: 2%;
  }
  @media (min-width: 768px) and (max-width: 1280px){
    .outer {
      padding: 1.5% 5%;
    }
    .form-title {
      font-size: 18px;
      flex-basis: 100px;
      padding: 0;
    }
    .recipient-input{
      width: 60%;
    }
    .submit-button {
      width: 20vw;
      padding: 1% 0;
    }
  }
  @media (max-width: 767px){
    .outer {
      padding: 5%;
    }
    .banner-title {
      font-size: 24px;
      flex: 1;
    }
    .banner-info {
      font-size: 12px;
      flex: 1;
    }
    .form-two-Field-outer {
      display: block;
    }
    .form-number-outer {
      padding: 0;
    }
    .form-title {
      font-size: 18px;
      flex-basis: 100px;
    }
    .form-number-title {
      flex-basis: auto;
    }
    .form-two-Field-right {
      border-left: 0px;
      border-top: 1px solid black;
    }
    .input-date{
      width: 50vw;
      font-size: 12px;
    }
    .form-to {
      display: block;
    }
    .remark-text {
      font-size: 18px;
    }
    .submit-button {
      width: 40vw;
    }
  }
</style>
