<template>
  <table
    class="
      table table-striped table-hover table-responsive table-bordered
      border-dark
      table-sm
    "
  >
    <thead>
      <tr class="table-secondary table-bordered border-dark">
        <th class="print-hide">Hora Inscrição</th>
        <th>Nome</th>
        <th>Vínculo</th>
        <th class="print-hide">Quantidade integrantes</th>
        <th>Integrantes</th>
        <th class="print-hide">Email</th>
        <th class="print-hide">Horario Culto</th>
        <th class="print-hide">Concorda</th>
        <th>Total</th>
        <th class="print-hide">Acumulado</th>
        <th class="print-hide">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(inscricao, index) in inscricoes"
        :class="{
          'table-success': inscricao.preferencia,
          'table-danger print-hide': inscricao.remover,
        }"
        :key="`inscricao-${index}`"
      >
        <td class="print-hide">{{ inscricao.datahora }}</td>
        <td>{{ inscricao.nome }}</td>
        <td>{{ inscricao.vinculo }}</td>
        <td class="print-hide">{{ inscricao.qtdIntegrantes }}</td>
        <td>{{ inscricao.integrantes }}</td>
        <td class="print-hide">{{ inscricao.email }}</td>
        <td class="print-hide">{{ inscricao.horario }}</td>
        <td class="print-hide">{{ inscricao.concorda }}</td>
        <td class="text-center">{{ inscricao.total }}</td>
        <td class="print-hide text-center">{{ inscricao.acumulado }}</td>
        <td class="print-hide">
          <button
            class="btn btn-primary btn-block col-12"
            @click="inscricao.preferencia = !inscricao.preferencia"
          >
            Preferência
          </button>
          <button
            class="btn btn-danger btn-block col-12 mt-2"
            @click="inscricao.remover = !inscricao.remover"
          >
            Remover
          </button>
          <button
            class="btn btn-success btn-block col-12 mt-2"
            @click="subir(inscricao, index)"
          >
            Subir 1
          </button>
          <button
            class="btn btn-warning btn-block col-12 mt-2"
            @click="descer(inscricao, index)"
          >
            Descer 1
          </button>
        </td>
      </tr>
      <tr class="print-hide">
        <td colspan="9" class="text-end">TOTAL</td>
        <td class="text-center">{{ total }}</td>
        <td></td>
      </tr>
      <tr class="print-show">
        <td colspan="3" class="text-end"><strong>TOTAL</strong></td>
        <td class="text-center">
          <strong>{{ total }}</strong>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    inscricoes: {
      type: Array,
      default: () => {
        [];
      },
    },
    total: Number,
  },
  methods: {
    subir(item, index) {
      this.$emit('up', {item, index})
    },
    descer(item, index) {
      this.$emit('down', {item, index})
    }
  }
};
</script>