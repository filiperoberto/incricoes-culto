<template>
  <table
    class="
      table table-hover table-responsive table-bordered
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
        <th v-if='false' class="print-hide">Email</th>
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
          'preferencia': inscricao.preferencia,
          'sair': inscricao.sair,
          'table-danger print-hide': inscricao.remover,
        }"
        :key="`inscricao-${index}`"
        :id='`inscricao-${inscricao.index}`'
      >
        <td class="print-hide"><time :datetime="inscricao.datahora">{{ inscricao.datahora }}</time></td>
        <td class="nome-completo">
          <span class="print-show">{{ capitalize(inscricao.nome) }}</span>
          <input type="text" class='form-control form-text print-hide' v-model='inscricao.nome'/>
        </td>
        <td class="vinculo">
           <span class="print-show">{{ inscricao.vinculo }}</span>
           <select class="form-select print-hide" v-model='inscricao.vinculo'>
            <option value="1 - Presbítero">1 - Presbítero</option>
            <option value="2 - Música">2 - Música</option>
            <option value="3 - Recepção">3 - Recepção</option>
            <option value="4 - Som/Imagem">4 - Som/Imagem</option>
            <option value="5 - Membro">5 - Membro </option>
            <option value="6 - Visitante">6 - Visitante</option>
          </select>
        </td>
        <td class="print-hide vinculo">
          <span class="print-show">{{ inscricao.qtdIntegrantes }}</span>
          <input max='10' type="number" class='form-control print-hide' v-model.number='inscricao.qtdIntegrantes'/>
        </td>
        <td class="nome-completo">
          <span class="print-show">{{ capitalize(inscricao.integrantes) }}</span>
          <input type="text" class='form-control form-text print-hide' v-model='inscricao.integrantes'/>
        </td>
        <td class="print-hide email" v-if='false'>{{ inscricao.email }}</td>
        <td class="print-hide">
          <select class="form-select print-hide" v-model='inscricao.horario' :disabled="inscricao.concorda !== 'Sim'" @change='trocaHorario(inscricao, index)'>
            <option value="1º culto, às 09h00">1º</option>
            <option value="2º culto, às 10h30">2º</option>
          </select>
          <span class="badge bg-warning" v-if='inscricao.horario !== inscricao.horarioOriginal'>Mudou</span>
        </td>
        <td class="print-hide">
          <span class="badge" :class="{'bg-success' : inscricao.concorda === 'Sim','bg-danger' : inscricao.concorda === 'Não'}">{{ inscricao.concorda }}</span>
          
        </td>
        <td class="text-center">
          <span v-if="totalItem(inscricao) !=='Revisar'">{{ totalItem(inscricao) }}</span>
          <span v-else class="badge bg-warning print-hide">Revisar</span>
        </td>
        <td class="print-hide text-center">{{ inscricao.acumulado }}</td>
        <td class="print-hide coluna-acoes">
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
            class="btn btn-warning btn-block col-12 mt-2"
            @click="inscricao.sair = !inscricao.sair"
          >
            Cancelar
          </button>
          <hr/>
          <button
            class="btn btn-block col-12 mt-2 btn-outline-dark"
            @click="subir(inscricao, index)"
          >
            <strong>↑</strong>
          </button>
          <button
            class="btn btn-block col-12 mt-2 btn-outline-dark"
            @click="descer(inscricao, index)"
          >
            <strong>↓</strong>
          </button>
        </td>
      </tr>
      <tr class="print-hide">
        <td colspan="8" class="text-end"><strong>TOTAL</strong></td>
        <td class="text-center" >
          <strong v-if='!isNaN(total)'>{{ total }}</strong>
          <span class="badge bg-danger" v-else>Revisar</span>
        </td>
        <td colspan="2"></td>
      </tr>
      <tr class="print-show">
        <td colspan="3" class="text-end"><strong>TOTAL</strong></td>
        <td class="text-center">
          <strong v-if='!isNaN(total)'>{{ total }}</strong>
          <span v-else>?</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import * as capitalize from 'capitalize-pt-br'
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
    },
    totalItem (item) {
      return (item.integrantes || '')
      .split(',')
      .map(a => a.trim())
      .filter(a => a !== '').length === item.qtdIntegrantes ? item.qtdIntegrantes + 1 : 'Revisar'
    },
    capitalize(palavra) {
      return capitalize(palavra)
    },
    trocaHorario(item, index) {
      this.$emit('trocaHorario', {item, index})
    }
  }
};
</script>
<style scoped>
  thead {
    -webkit-print-color-adjust: exact; 
  }

@media screen {

  .sair {
    background-color: #f3da29;
  }

  .preferencia {
    background-color: rgb(110, 196, 110);
  }
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

  .coluna-acoes {
    background: white;
  }
}
</style>