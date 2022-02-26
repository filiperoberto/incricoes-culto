<template>
  <div>
    <table
      class="
        table table-hover table-responsive table-bordered
        border-dark
        table-sm
        text-center
      "
    >
      <caption>
        Número de inscrições por horário e participantes
      </caption>
      <thead>
        <tr>
          <th>Horário</th>
          <th>Equipe</th>
          <th>Visitantes</th>
          <th>Membros</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(lista, index) in [primeiroCulto, segundoCulto]"
          :key="index"
        >
          <td>
            <span v-if='index===0'>1º culto, às 09h00</span>
            <span v-else>2º culto, às 10h30</span>
          </td>
          <td>{{ equipe(lista).length }}</td>
          <td>{{ membros(lista).length }}</td>
          <td>{{ visitantes(lista).length }}</td>
          <td>{{ lista.length }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="table-warning border-dark">
          <th>Total</th>
          <th>{{ equipe(inscricoes).length }}</th>
          <th>{{ membros(inscricoes).length }}</th>
          <th>{{ visitantes(inscricoes).length }}</th>
          <th>{{ inscricoes.length }}</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    inscricoes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    primeiroCulto() {
      return this.inscricoes.filter((i) => i.horario.indexOf("1") === 0);
    },
    segundoCulto() {
      return this.inscricoes.filter((i) => i.horario.indexOf("2") === 0);
    },
  },
  methods: {
    equipe(inscricoes) {
      return inscricoes.filter(
        (i) => ["1", "2", "3", "4"].indexOf(i.vinculo?.charAt(0)) > -1
      );
    },
    membros(inscricoes) {
      return inscricoes.filter((i) => ["5"].indexOf(i.vinculo?.charAt(0)) > -1);
    },
    visitantes(inscricoes) {
      return inscricoes.filter((i) => ["6"].indexOf(i.vinculo?.charAt(0)) > -1);
    },
  },
};
</script>