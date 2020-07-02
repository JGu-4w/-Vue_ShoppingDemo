<template>
  <div id="detail-product-params" v-if="Object.keys(params).length !== 0">
    <div class="rule">
      <p class="rule-key">{{params.rule.key}}</p>
      <table class="rule-set">
        <tr v-for="(tr, index) in params.rule.tables[0]" :key="index">
          <td v-for="(td, indey) in tr" :key="indey">{{td}}</td>
        </tr>
      </table>
      <div class="desc">
        <p>{{params.rule.desc}}</p>
      </div>
    </div>
    <div class="info">
      <p class="info-key">{{params.info.key}}</p>
      <table class="info-set">
        <tr v-for="(tr, index) in params.info.set" :key="index">
          <td>{{tr.key}}</td>
          <td>{{tr.value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProductParams',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  #detail-product-params {
    font-size: 12px;
  }

  .rule, .info {
    padding: 0 10px 10px;
    border-top: 3px solid #f6f6f6;
  }

  .rule-key, .info-key {
    margin: 20px 0 10px;
  }

  .rule-set, .info-set {
    width: 100%;
    border-collapse: collapse;
  }

  .rule-set td, .info-set td {
    border-top: 1px solid rgb(235, 233, 233);
    border-bottom: 1px solid rgb(235, 233, 233);
    padding: 10px 0;
  }

  .info-set tr {
    display: flex;
  }

  .info-set td {
    flex: 25%;
  }

  .info-set td:last-child {
    flex: 75%;
    color: var(--color-high-text);
  }
</style>