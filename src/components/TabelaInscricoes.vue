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
        <th class="nome-completo">Nome Completo</th>
        <th class='vinculo'>Vínculo IBRVN</th>
        <th class="print-hide" title="Quantidade integrantes">Qtd Int.</th>
        <th class="nome-completo">Acompanhantes – Cônjuge/Filho(s)</th>
        <th class="print-hide">Email</th>
        <th class="print-hide">Horario Culto</th>
        <th class="print-hide">Concorda</th>
        <th class="vinculo">Total</th>
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
        <td class="print-hide"><time :datetime="inscricao.datahora">{{ inscricao.datahora }}</time></td>
        <td class="nome-completo">
          <span class="print-show">{{ inscricao.nome }}</span>
          <input type="text" class='form-control form-text print-hide' v-model='inscricao.nome'/>
        </td>
        <td class="vinculo">
           <span class="print-show">{{ inscricao.vinculo }}</span>
           <select class="form-select print-hide" v-model='inscricao.vinculo'>
            <option value="1 - Presbítero">1 - Presbítero</option>
            <option value="2 - Música">2 - Música</option>
            <option value="3 - Recepção">3 - Recepção</option>
            <option value="4 - Som/Imagem">4 - Som/Imagem</option>
            <option value="5 - Membro ">5 - Membro </option>
            <option value="6 - Visitante">6 - Visitante</option>
          </select>
        </td>
        <td class="print-hide">{{ inscricao.qtdIntegrantes }}</td>
        <td class="nome-completo">
          <span class="print-show">{{ inscricao.integrantes }}</span>
          <input type="text" class='form-control form-text print-hide' v-model='inscricao.integrantes'/>
        </td>
        <td class="print-hide email">{{ inscricao.email }}</td>
        <td class="print-hide">
          <span class="badge bg-primary" v-if="inscricao.horario === '1º culto, às 09h00'">1º</span>
          <span class="badge bg-success" v-else>2º</span>
        </td>
        <td class="print-hide">
          <span class="badge" :class="{'bg-success' : inscricao.concorda === 'Sim','bg-danger' : inscricao.concorda === 'Não'}">{{ inscricao.concorda }}</span>
          
        </td>
        <td class="text-center vinculo">
          <span class="print-show">{{ inscricao.total }}</span>
          <input max='10' type="number" class='form-control print-hide' v-model.number='inscricao.total'/>
        </td>
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
        <td colspan="8" class="text-end"><strong>TOTAL</strong></td>
        <td class="text-center"><strong>{{ total }}</strong></td>
        <td colspan="2"></td>
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
<style scoped>
@media screen {
  .nome-completo {
    width: 200px;
  }
  .vinculo {
    width: 150px;
  }

  table {
    text-align: center;
  }

  .email {
    font-size: 0.6em;
  }
}
</style>