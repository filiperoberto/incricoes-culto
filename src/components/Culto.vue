<template>
  <div>
    <div class="lista">
      <h5 class="text-center">
        LISTA DE INSCRIÇÕES – CULTO PRESENCIAL DE {{ data }} – {{ horario }}
      </h5>
      <tabela-inscricoes
        :inscricoes="vagasPreenchidas"
        :total="totalPreenchidas"
        @up="subir($event)"
        @down="descer($event)"
        @trocaHorario="$emit('trocaHorario', $event)"
      />
    </div>
    <div class="lista">
      <h6>LISTA DE ESPERA</h6>
      <tabela-inscricoes
        :inscricoes="reserva"
        :total="totalreserva"
        @up="subir($event)"
        @down="descer($event)"
        @trocaHorario="$emit('trocaHorario', $event)"
      />
    </div>
  </div>
</template>
<script>
import TabelaInscricoes from "./TabelaInscricoes";
export default {
  components: {
    TabelaInscricoes,
  },
  props: {
    inscricoes: {
      type: Array,
      default: () => {
        [];
      },
    },
    data: {
      type: String,
    },
    horario: {
      type: String,
    },
    vagas: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    inscricoes() {
      this.carregarInscricoes();
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

      return this.value.map((v) => {

        v.total = this.totalItem(v)
        let total = parseInt(v.total);

        if (!v.remover && !isNaN(total)) {
          acumulado += total;
        }
        v.acumulado = acumulado;
        v.horarioOriginal = v.horarioOriginal || v.horario;
        return v;
      });
    },
    vagasPreenchidas() {
      return this.inscricoesOrdenadas.filter((i) => i.acumulado <= this.vagas);
    },
    reserva() {
      let acumulado = 0;

      return this.inscricoesOrdenadas
        .filter((i) => i.acumulado > this.vagas)
        .map((v) => {
          acumulado += v.total;
          v.acumuladoReserva = acumulado;
          return v;
        });
    },
    totalPreenchidas() {
      return this.vagasPreenchidas
        .filter((v) => !v.remover)
        .map((a) => parseInt(a.total))
        .reduce((a, b) => a + b, 0);
    },
    totalreserva() {
      return this.reserva
        .filter((v) => !v.remover)
        .map((a) => parseInt(a.total))
        .reduce((a, b) => a + b, 0);
    },
  },

  methods: {
    subir(event) {
      this.$emit("up", event);
    },
    descer(event) {
      this.$emit("down", event);
    },
    carregarInscricoes() {
      this.value = [...this.inscricoes];
    },
    totalItem (item) {
      return (item.integrantes || '')
      .split(',')
      .map(a => a.trim())
      .filter(a => a !== '').length === item.qtdIntegrantes ? item.qtdIntegrantes + 1 : 'Revisar'
    }
  },

  mounted() {
    this.carregarInscricoes();
  },
};
</script>
