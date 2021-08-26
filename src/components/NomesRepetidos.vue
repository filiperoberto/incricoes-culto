<template>
  <div>
    <h5 class="card-title">Nomes semelhantes</h5>
    <div class="card">
      <div class="card-header">
        <label for="distancia" class="form-label">Distância</label>
        <input type="number" id='distancia' class="form-control" v-model.number="distancia" />
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(nome, index) in nomesRepetidos"
          :key="`repetido-${index}`"
        >
          <a class='btn btn-sm btn-primary' :href="`#inscricao-${nome.original.index}`">{{
            nome.original.nome
          }}</a>
          →
          <a
            class="semelhante btn btn-sm btn-secondary"
            v-for="semelhante in nome.semelantes"
            :key="semelhante.index"
            :href="`#inscricao-${semelhante.index}`"
            >{{ semelhante.nome }}</a
          >
        </li>
        <li class="list-group-item disabled" v-if="!nomesRepetidos.length">
          Nenhum nome semelhante
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as levenshtein from "js-levenshtein";
export default {
  data() {
    return {
      distancia: 7,
    };
  },
  props: {
    json: {
      type: Array,
      defaul: () => [],
    },
  },
  computed: {
    nomesRepetidos() {
      const listaFiltrada = this.json
        .filter((i) => i.nome != "")
        .filter((i) => !i.remover);

      return listaFiltrada
        .map((inscricao, indexInscricao) => {
          const semelantes = listaFiltrada
            .filter((i, index) => {
              return (
                levenshtein(
                  i.nome.toLowerCase(),
                  inscricao.nome.toLowerCase()
                ) < this.distancia && indexInscricao != index
              );
            })
            .map((i) => {
              return { nome: i.nome, index: i.index };
            });

          return {
            original: { nome: inscricao.nome, index: inscricao.index },
            possuiSemelhantes: semelantes.length > 0,
            semelantes,
          };
        })
        .filter((i) => i.possuiSemelhantes);
    },
  },
};
</script>
<style scoped>
.semelhante {
  margin-right: 5px;
}
</style>