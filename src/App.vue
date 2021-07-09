<template>
  <div id="app" class='container'>
    <csv-to-json @json='json = $event'/>
    <culto :inscricoes='primeiroCulto'/>
    <culto :inscricoes='segundoCulto'/>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import CsvToJson from './components/CsvToJson'
import Culto from './components/Culto'
export default {
  name: 'App',
  components: {
    CsvToJson,
    Culto
  },
  data() {
    return {
      json:[]
    }
  },
  computed: {
    primeiroCulto() {
      console.log(this.json)

      return this.json.filter(i => i.horario.indexOf('1') > -1)
    },
    segundoCulto() {
      return this.json.filter(i => i.horario.indexOf('2') > -1)
    }
  }
}
</script>
<style >
@import url('../node_modules/font-awesome/css/all.css');
.container {
  margin-top:20px;
}
</style>
