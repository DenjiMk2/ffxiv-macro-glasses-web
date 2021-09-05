<template>
  <div>
    <div>
      <select class="me" v-model="meRole" @change="throwGlass">
        <option value="">宣言</option>
        <option class="tank">MT</option>
        <option class="tank">ST</option>
        <option class="dps">D1</option>
        <option class="dps">D2</option>
        <option class="dps">D3</option>
        <option class="dps">D4</option>
        <option class="healer">H1</option>
        <option class="healer">H2</option>
      </select>
      <button v-on:click="pasteMacro">ペースト</button>
    </div>
    <textarea v-model="inMacro" @input="throwGlass">
    </textarea>
    <pre class="outputPanel" v-html="outMacro" />
    <!-- </pre> -->
  </div>
</template>

<script>
  import convertMacro2Html from '../main/convertMacro2Html';
  export default {
    name: 'main-page',
    data() {
      return {
        inMacro: '',
        outMacro: '',
        meRole: '',
      };
    },
    methods: {
      throwGlass() {
        this.outMacro = convertMacro2Html(this.inMacro, this.meRole);
      },
      pasteMacro() {
        this.inMacro = this.$electron.clipboard.readText();
        this.throwGlass();
      },
    },
  };
</script>

<style>
body{
  font-family: sans-serif;
  background-color: #383838;
  color: #CCCCCC;
}
.outputPanel{
  font-size: 14px;
}
.dps{
  color: #FF9933;
}
.tank{
  color: #0066FF;
}
.healer{
  color: #00CC00;
}
.marker-A{
  color: #db5872;
}
.marker-B{
  color: gold;
}
.marker-C{
  color: blue;
}
.marker-1{
  color: #db5872;
}
.marker-2{
  color: gold;
}
.me{
  color: red;
}
</style>
