<template>
  <div>
    <div class="card">
      <div class="card-header">Nomes semelhantes</div>
      <input type="number" class="form-control" v-model.number="distancia" />
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(nome, index) in nomesRepetidos"
          :key="`repetido-${index}`"
        >
          {{ nome.original }} => {{ nome.semelantes }}
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
                levenshtein(i.nome, inscricao.nome) < this.distancia &&
                indexInscricao != index
              );
            })
            .map((i) => i.nome);

          return {
            original: inscricao.nome,
            possuiSemelhantes: semelantes.length > 0,
            semelantes: semelantes.join(" ,"),
          };
        })
        .filter((i) => i.possuiSemelhantes);
    },
  },
};
</script>