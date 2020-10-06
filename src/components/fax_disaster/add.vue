<template>
  <div class="outer">
    <div class="form-banner">
      <h1 v-html="title" />
      <div class="banner-info">
        <div v-for="(data, index) of form_info" :key="index" v-html="data" />
      </div>
    </div>
    <div class="form-outer">
      <div class="form-Field-outer form-number-outer">
        <span class="form-title form-number-title">編號：</span>
        <input class="form-number" type="text" v-model="form_data.num" required>
        <span class="form-title form-number-title">號</span>
      </div>
      <div class="form-Field-outer">
        <div class="form-title">正本</div>
        <input class="form-input" type="text" v-model="form_data.recipient" required>
      </div>
      <div class="form-Field-outer">
        <div class="form-title">副本</div>
        <input class="form-input" type="text" v-model="form_data.cc" required>
      </div>
      <div class="form-Field-outer form-two-Field">
        <div class="form-two-Field">
          <div class="form-title">通報者</div>
          <input class="form-input" type="text" v-model="form_data.sender" required>
        </div>
        <div class="form-two-Field form-two-Field-right">
          <div class="form-title">時間</div>
          <input class="input-date" type="date" v-model="form_data.time" required>
        </div>
      </div>
      <div class="form-Field-outer">
        <div class="form-title form-content-title">通報事項</div>
        <textarea class="input-textarea" v-model="form_data.content" required></textarea>
      </div>
    </div>
    <div class="remark-form-outer">
      <span class="remark-text">接收單位請確認簽名回傳(<b><u>請即回傳</u></b>本府水利處災害緊急應變小組 05-5340546)</span>
      <div class="remark-form">
        <div class="remark-form-Field">
          <div>接收單位</div>
          <input class="recipient-input" type="text" v-model="form_data.recipient" required>
        </div>
        <div class="remark-form-Field">
          <div>接收人</div>
          <input class="recipient-input" type="text" v-model="form_data.recipient" required>
        </div>
        <div class="remark-form-Field">
          <div>接收時間</div>
          <input class="recipient-input" type="text" v-model="form_data.recipient" required>
        </div>
      </div>
      <span class="remark-text yulin-text">雲林縣政府水利處災害緊急應變小組</span>
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
        content: ''
      }
    };
  },
  mounted() {},
  methods: {}
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
  .remark-form {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .remark-form-Field {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .remark-text {
    width: 100%;
    padding: 2% 0;
    font-size: 24px;
  }
  .yulin-text {
    width: auto;
  }
  @media (min-width: 768px) and (max-width: 1280px){}
</style>
