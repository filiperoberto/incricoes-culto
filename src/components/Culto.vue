<template>
  <table class="table table-striped table-hover table-responsive" v-if='inscricoes.length'>
      <thead>
        <tr>
          <th>Hora Inscrição</th>
          <th>Nome</th>
          <th>Vínculo</th>
          <th>Quantidade integrantes</th>
          <th>Integrantes</th>
          <th>Email</th>
          <th>Horario Culto</th>
          <th>Concorda</th>
          <th>Subtotal</th>
          <th>Acumulado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='inscricao in inscricoesOrdenadas' :class="{'table-success': inscricao.preferencia}">
          <td>{{inscricao.datahora}}</td>
          <td>{{inscricao.nome}}</td>
          <td>{{inscricao.vinculo}}</td>
          <td>{{inscricao.qtdIntegrantes}}</td>
          <td>{{inscricao.integrantes}}</td>
          <td>{{inscricao.email}}</td>
          <td>{{inscricao.horario}}</td>
          <td>{{inscricao.concorda}}</td>
          <td>{{inscricao.subtotal}}</td>
          <td>{{inscricao.acumulado}}</td>
          <td><button class='btn btn-primary' @click='inscricao.preferencia = !inscricao.preferencia'>Preferência</button></td>
        </tr>
      </tbody>
    </table>
</template>
<script>
export default {

  props: {
    inscricoes: {
      type: Array,
      default:() => {[]}
    }
  },

  computed: {
    inscricoesOrdenadas() {
      return this.inscricoes.sort((a,b) => a.vinculo-b.vinculo)
    }
  }

}
</script>
