<template>
  <Head>
    <Title>準備しておくべき質問リスト</Title>
    <!-- Uikit CDN -->
    <Link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/uikit@3.15.5/dist/css/uikit.min.css"
    />
    <Script
      src="https://cdn.jsdelivr.net/npm/uikit@3.15.5/dist/js/uikit.min.js"
    ></Script>
    <Script
      src="https://cdn.jsdelivr.net/npm/uikit@3.15.5/dist/js/uikit.min.js"
    ></Script>
  </Head>
  <div v-if="loaded">
    <main class="uk-margin uk-section" uk-height-viewport="offset-bottom:15">
      <Interview class="uk-width-5-6@m uk-margin-auto" :question="question" />
    </main>
    <footer class="uk-background-muted flexbox">
      <div></div>
    </footer>
  </div>
  <div v-else>
    <div class="uk-position-center">
      <div uk-spinner></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  setup() {
    const loaded = ref(false);
    const copyright = "Creators School 4.0";
    const question = ref([]);

    axios
      .get("/question.json")
      .then((res) => {
        question.value = res.data;
        loaded.value = true;
      })
      .catch((e) => {
        console.log(e);
      });
    return {
      loaded,
      copyright,
      question,
    };
  },
};
</script>