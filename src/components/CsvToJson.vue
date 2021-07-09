<template>
  <div>
    <input class='form-control' type='file' @change='carregarArquivo($event)' accept=".csv"/>
  </div>
</template>
<script>
import csv2json from 'csvjson-csv2json'
export default {
  methods: {
    carregarArquivo({target}) {

      let fr = new FileReader()
      fr.onload = () => {
        const json = csv2json(fr.result, {parseNumbers: true}).map((obj,index) => {

          const keys = Object.keys(obj)

          return {
            index,
            'datahora' : obj[keys[0]],
            'nome' : obj[keys[1]],
            'vinculo' : obj[keys[2]],
            'qtdIntegrantes' : obj[keys[3]],
            'integrantes': obj[keys[4]],
            'email' :  obj[keys[5]],
            'horario' :  obj[keys[6]],
            'concorda' :  obj[keys[7]],
            'subtotal' :  obj[keys[8]],
            'total' :  obj[keys[9]],
            'preferencia' : false
          }
        }).filter(obj => obj.email !== 'TOTAL')
        this.$emit('json', json)
      }
      fr.readAsText(target.files[0])
    }
  }


}
</script>