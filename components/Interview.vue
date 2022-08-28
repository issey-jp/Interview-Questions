<script>
export default {
  props: { question: [] },
  setup(props) {
    // 編集画面の表示切替
    const activeEdit = ref(null);
    const onEdit = (n) => {
      if (activeEdit.value === n) {
        activeEdit.value = null;
      } else {
        activeEdit.value = n;
      }
    };

    const thisAnswer = ref("");
    const Answers = ref([]);

    // クリップボードに保存
    const doCopy = () => {
      const copy = document.getElementById("result");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(copy.innerText).then(() => {
          alert("コピーしました！");
        });
      }
    };

    // 回答を初期化
    const localAnswers = JSON.parse(localStorage.getItem("myAnswers"));
    console.log(localAnswers);
    if (localAnswers) {
      Answers.value = localAnswers;
    } else {
      props.question.forEach((i) => {
        Answers.value.push("");
      });
    }

    // ローカルストレージに保存
    watch(Answers.value, () => {
      const localData = JSON.stringify(Answers.value);
      localStorage.setItem("myAnswers", localData);
    });

    return {
      activeEdit,
      onEdit,
      thisAnswer,
      Answers,
      doCopy,
    };
  },
};
</script>

<template>
  <div class="uk-container">
    <Summary />
    <table
      class="
        uk-table
        uk-table-divider
        uk-table-striped
        uk-table-responsive
        uk-table-middle
      "
      id="result"
    >
      <thead>
        <tr>
          <th class="uk-width-1-2">質問</th>
          <th>回答</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, i) in question" :key="i">
          <td class="uk-width-1-2@m">
            <h4 class="uk-text-bold" @click="onEdit(i)">
              {{ i + 1 }}:{{ question.title }}
            </h4>
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeEdit === i" uk-grid>
                <div class="uk-width-1-5">
                  <img
                    data-src="/image/kaisya_soudan_man_man_smile.webp"
                    data-width=""
                    data-height=""
                    alt="いらすとやイメージ"
                    class=""
                    uk-img
                  />
                </div>
                <div class="uk-width-expand">
                  <p v-html="question.point"></p>
                </div>
              </div>
            </transition>
          </td>
          <td>
            <transition name="fade" mode="out-in">
              <div v-if="activeEdit === i" uk-margin>
                <textarea
                  class="uk-textarea"
                  v-model="Answers[i]"
                  rows="5"
                  placeholder="回答を記入"
                ></textarea>
                <button
                  class="uk-button uk-button-small uk-button-default"
                  @click="onEdit(i)"
                >
                  保存
                </button>
              </div>
              <div v-else @click="onEdit(i)">
                <p
                  v-if="Answers[i] == '' || Answers[i] == null"
                  class="edit"
                ></p>
                <p v-else>{{ Answers[i] }}</p>
              </div>
            </transition>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="uk-button uk-button-primary" @click="doCopy()">
        クリップボードに保存
      </button>
    </div>
  </div>
</template>