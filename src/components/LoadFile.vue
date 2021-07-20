<template>
  <div>
    <input class='form-control' type='file' @change='carregarArquivo($event)' :accept="accept"/>
  </div>
</template>
<script>
import csv2json from 'csvjson-csv2json'
export default {
  props: {
    accept: String,
    type: String
  },
  methods: {
    carregarArquivo({target}) {

      let fr = new FileReader()
      fr.onload = () => {
        let json = {}
        if(this.type === 'csv') {
          json = this.parseCsv(fr.result)
        }
        if(this.type === 'json') {
          json = JSON.parse(fr.result)
        }
        this.$emit('json', json)
      }
      fr.readAsText(target.files[0])
    },
    parseCsv(csv) {
      return csv2json(csv, {parseNumbers: true}).map((obj,index) => {

          const keys = Object.keys(obj)

          return {
            index,
            'datahora' : obj[keys[0]],
            'nome' : obj[keys[1]],
            'vinculo' : obj[keys[2]],
            'qtdIntegrantes' : obj[keys[3]],
            'integrantes': obj[keys[4]] === 'Brasil' ? '': obj[keys[4]],
            'email' :  obj[keys[5]],
            'horario' :  obj[keys[6]],
            'concorda' :  obj[keys[7]],
            'subtotal' :  0,
            'total' :  0,
            'preferencia' : false
          }
        }).filter(obj => obj.email !== 'TOTAL')
        .sort(
          (a, b) => {
            const vinculoA = parseInt(a.vinculo.split("-")[0].trim())
            const vinculoB = parseInt(b.vinculo.split("-")[0].trim())
            const horarioA = parseInt(a.horario.charAt(0))
            const horarioB = parseInt(b.horario.charAt(0))

            return horarioA - horarioB || vinculoA - vinculoB
          }
            
        );

    }
  }


}
</script>