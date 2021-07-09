<template>
  <div>
    <div class='lista'>
      <h5 class="text-center">LISTA DE INSCRIÇÕES – CULTO PRESENCIAL DE {{data}} – {{horario}}</h5>
      <tabela-inscricoes :inscricoes='vagasPreenchidas' :total='totalPreenchidas' @up='subir($event)' @down='descer($event)'/>
    </div>
    <div class='lista'>
      <h6>LISTA DE ESPERA</h6>
      <tabela-inscricoes :inscricoes='reserva' :total='totalreserva'/>
    </div>
  </div>
</template>
<script>
import TabelaInscricoes from "./TabelaInscricoes";
export default {
  components: {
    TabelaInscricoes
  },
  props: {
    inscricoes: {
      type: Array,
      default: () => {
        [];
      },
    },
    data: {
      type: String
    },
    horario: {
      type: String
    },
    vagas: {
      type: Number,
      default: 0
    }
  },

  watch: {
    inscricoes() {
      this.value = [...this.inscricoes];
    },
  },

  data() {
    return {
      value: [],
    };
  },

  computed: {
    inscricoesOrdenadas() {
      let acumulado = 0;

      return [...this.value]
        .sort(
          (a, b) =>
            parseInt(a.vinculo.split("-")[0].trim()) -
            parseInt(b.vinculo.split("-")[0].trim())
        )
        .map((v) => {
          if (!v.remover) {
            acumulado += v.total;
          }
          v.acumulado = acumulado;
          return v;
        });
    },
    vagasPreenchidas() {
      return this.inscricoesOrdenadas.filter(i => i.acumulado <= this.vagas)
    },
    reserva() {

      //let acumulado = 0;

      return this.inscricoesOrdenadas
      .filter(i => i.acumulado > this.vagas)
      /*.map(v => {
        acumulado += v.total;
        v.acumulado = acumulado;
        return v;
      })*/
    },
    totalPreenchidas () {
      return this.vagasPreenchidas.filter(v => !v.remover).map(a => a.total).reduce((a,b) => a+b,0)
    },
    totalreserva () {
      return this.reserva.filter(v => !v.remover).map(a => a.total).reduce((a,b) => a+b,0)
    }
  },

  methods: {
    subir({item}) {
      console.log(item)
      const index = this.value.map(v => v.index).indexOf(item.index)
      this.move(index, index-1)
    },
    descer({item}) {
      const index = this.value.map(v => v.index).indexOf(item.index)
      this.move(index, index+1)
    },
    move(from, to) {
      const elem = this.value.splice(from, 1)[0];
      this.value.splice(to, 0, elem);
    }
  },

  mounted() {
    this.value = [...this.inscricoes];
  },
};
</script>
<style scoped>
  thead {
    -webkit-print-color-adjust: exact; 
  }
</style>
