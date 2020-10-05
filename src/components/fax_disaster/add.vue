<template>
  <div class="outer">
    <div class="form-banner">
      <h1 v-html="title" />
      <div class="banner-info">
        <div v-for="(data, index) of form_info" :key="index" v-html="data" />
      </div>
    </div>
    <div class="form-outer">
      <div class="form-number-outer">
        <span>編號：</span>
        <input class="form-number" type="text" v-model="form_data.num" required>
        <span>號</span>
      </div>
      <div class="form-to-outer">
        <div class="form-title">正本</div>
        <div class="form-to">
          <input class="form-input" type="text" v-model="form_data.num" required>
        </div>
      </div>
      <div class="form-cc-outer">
        <div class="form-title">副本</div>
        <div class="form-cc">
          <input class="form-input" type="text" v-model="form_data.num" required>
        </div>
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
  .form-number-outer {
    border: .5px solid black;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1%;
  }
  .form-number {
    border: 0px;
  }
  .form-to-outer {
    border: .5px solid black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .form-title {
    border-right: 2px solid black;
    padding: 1%;
  }
  .form-to {
    flex: 1;
  }
  .form-input {
    border: 0px;
    width: 100%;
    height: auto;
  }
  .form-cc-outer {
    border: .5px solid black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .form-cc {
    flex: 1;
  }
  @media (min-width: 768px) and (max-width: 1280px){}
</style>
