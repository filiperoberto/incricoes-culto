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
          <th>Total</th>
          <th>Acumulado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='inscricao in inscricoesOrdenadas' :class="{'table-success': inscricao.preferencia, 'table-danger' : inscricao.remover}">
          <td>{{inscricao.datahora}}</td>
          <td>{{inscricao.nome}}</td>
          <td>{{inscricao.vinculo}}</td>
          <td>{{inscricao.qtdIntegrantes}}</td>
          <td>{{inscricao.integrantes}}</td>
          <td>{{inscricao.email}}</td>
          <td>{{inscricao.horario}}</td>
          <td>{{inscricao.concorda}}</td>
          <td>{{inscricao.total}}</td>
          <td>{{inscricao.acumulado}}</td>
          <td>
            <div class='row'>
            <button class='btn btn-primary btn-block col-12' @click='inscricao.preferencia = !inscricao.preferencia'>Preferência</button>
            <button class='btn btn-danger btn-block col-12 mt-2' @click='inscricao.remover = !inscricao.remover'>Remover</button>
            </div>
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
      default:() => {[]}
    }
  },

  computed: {
    inscricoesOrdenadas() {

      let acumulado = 0;

      return this.inscricoes
      .sort((a,b) => parseInt(a.vinculo.split('-')[0].trim())   - parseInt(b.vinculo.split('-')[0].trim()))
      .map(v => {
        if(!v.remover) {
          acumulado += v.total
        }
        v.acumulado = acumulado
        return v
      })
    }
  }

}
</script>
