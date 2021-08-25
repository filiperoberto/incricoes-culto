<template>
  <div id="app" class="container">
    <div class="row print-hide">
      <form class="col-6">
        <div class="mb-3">
          <label for="inputCsv" class="form-label">Carregar Csv</label>
          <load-file
            @json="json = $event"
            id="inputCsv"
            accept=".csv"
            type="csv"
          />
        </div>
        <div class="mb-3">
          <label for="inputJson" class="form-label">Carregar Json</label>
          <load-file
            @json="load($event)"
            id="inputCsv"
            accept=".json"
            type="json"
          />
        </div>
        <div class="mb-3">
          <label for="dataCulto" class="form-label">Data do Culto</label>
          <input
            type="date"
            class="form-control"
            id="dataCulto"
            v-model="data"
          />
        </div>
        <div class="mb-3">
          <label for="vagas" class="form-label">Vagas</label>
          <input
            type="number"
            class="form-control"
            id="vagas"
            v-model.number="vagas"
          />
        </div>
      </form>
      <div class="col-6">
        <todo v-model="todo" />
      </div>
    </div>
    <div class="print-hide row">
      <div class="col-lg-3 col-12">
        <div class="d-grid gap-2">
          <button
            class="btn btn-success"
            type="button"
            @click.prevent.stop="salvar"
          >
            Salvar
          </button>
          <button
            class="btn"
            type="button"
            :disabled="copiado"
            @click="copyEmails"
            :class="{ 'btn-success': copiado, 'btn-secondary': !copiado }"
            v-text="copiado ? 'Copiado!' : 'Copiar E-mails'"
          ></button>
          <button class="btn btn-warning" @click="add" type="button">
            Adicionar Inscrição
          </button>
          <button class="btn btn-primary" @click="print" type="button">
            Gerar PDF
          </button>
          <button class="btn btn-danger" type="button" @click="clearConfirm">
            Limpar
          </button>
          <button
            class="btn btn-outline-dark"
            type="button"
            @click="copiarTextoInscricoesAbertas"
          >
            Texto Inscrições Abertas
          </button>
        </div>
      </div>
    </div>
    <table class="tabela-conteudo">
      <thead>
        <tr>
          <td>
            <div class="header-space">&nbsp;</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="content">
              <culto
                class="primeiro-culto culto"
                :inscricoes="primeiroCulto"
                v-if="primeiroCulto.length"
                :data="dataFormatada"
                :vagas="vagas"
                @up="subir($event)"
                @down="descer($event)"
                @trocaHorario="trocaHorario($event)"
                horario="09h00"
              />
              <culto
                class="culto"
                :inscricoes="segundoCulto"
                v-if="segundoCulto.length"
                :data="dataFormatada"
                :vagas="vagas"
                @up="subir($event)"
                @down="descer($event)"
                @trocaHorario="trocaHorario($event)"
                horario="10h30"
              />
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="footer-space">&nbsp;</div>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="print-hide">
      <hr />
      <resumo :inscricoes="json" />
    </div>
    <div class="print-hide" v-if="data">
      <hr />
      <textos-padrao :data="data" />
    </div>
    <div class="print-hide">
      <hr/>
      <nomes-repetidos :json='json'/>
    </div>

    <div class="print-show header">
      <cabecalho />
    </div>
    <div class="footer print-show">
      <small class="cnpj d-block text-center"
        >CNPJ 85.116.671/0001-75 | Servidão Antônio Irineu da Silva, 325 –
        Córrego Grande – 88037-600 – Florianópolis, SC | +55 (48)
        3304-4925</small
      >
    </div>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
import LoadFile from "./components/LoadFile";
import Culto from "./components/Culto";
import NomesRepetidos from "./components/NomesRepetidos";
import Cabecalho from "./components/Cabecalho";
import Resumo from "./components/Resumo";
import Todo from "./components/Todo";
import TextosPadrao from "./components/TextosPadrao";
import { parseISO, format } from "date-fns";
export default {
  name: "App",
  components: {
    LoadFile,
    Culto,
    Cabecalho,
    Todo,
    Resumo,
    TextosPadrao,
    NomesRepetidos
  },
  data() {
    return {
      json: [],
      data: null,
      vagas: 60,
      todo: [],
      copiado: false,
      saveInterval: null,
      version: 0
    };
  },
  computed: {
    primeiroCulto() {
      return this.json.filter((i) => i.horario.indexOf("1") === 0);
    },
    segundoCulto() {
      return this.json.filter((i) => i.horario.indexOf("2") === 0);
    },
    dataFormatada() {
      if (!this.data) {
        return null;
      }
      return format(parseISO(this.data), "dd/MM/yyyy");
    }
  },
  watch: {
    data() {
      document.title = `Inscrições Culto - ${format(
        parseISO(this.data),
        "dd-MM-yyyy"
      )} - v${this.version}`;
    },
    version() {
      document.title = `Inscrições Culto - ${format(
        parseISO(this.data),
        "dd-MM-yyyy"
      )} - v${this.version}`;
    },
  },
  methods: {
    empacotar() {
      return {
        inscricoes: this.json,
        data: this.data,
        vagas: this.vagas,
        todo: this.todo,
        version: this.version,
      };
    },
    async copiarTextoInscricoesAbertas() {
      const texto = ``;
      await this.copyToClipboard(texto);
    },
    salvar() {
      const inscricoes = this.empacotar();

      this.$store.dispatch("saveJson", inscricoes);

      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(inscricoes))
      );
      element.setAttribute("download", `inscricoes-${this.data}.json`);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    load({ inscricoes, data, vagas, todo, version }) {
      this.json = inscricoes || [];
      this.data = data;
      this.vagas = vagas;
      this.version = version || 0;
      this.todo = todo || [];
    },
    subir({ item }) {
      const index = this.json.map((v) => v.index).indexOf(item.index);
      this.move(index, index - 1);
    },
    descer({ item }) {
      const index = this.json.map((v) => v.index).indexOf(item.index);
      this.move(index, index + 1);
    },
    trocaHorario({ item }) {
      const index = this.json.map((v) => v.index).indexOf(item.index);
      let to = this.primeiroCulto.length;
      if (item.horario.indexOf("2") > -1) {
        to = this.json.length - 1;
      }
      this.move(index, to);
    },
    move(from, to) {
      if (to < 0) {
        return;
      }
      if (to >= this.json.length) {
        return;
      }
      const [elem] = this.json.splice(from, 1);
      this.json.splice(to, 0, elem);
    },
    add() {
      this.json.push({
        index: this.json.length,
        horario: "1º culto, às 09h00",
        total: 0,
      });
    },
    copyEmails() {
      const emails = this.json
        .filter((m) => m.vinculo.indexOf("6") > -1) //visitante
        .map((i) => i.email)
        .filter((e) => e !== "")
        .filter((item, pos, self) => self.indexOf(item) == pos)
        .join(";");

      this.copyToClipboard(emails)
        .then(() => {
          this.copiado = true;
          setTimeout(() => {
            this.copiado = false;
          }, 5000);
        })
        .catch((err) => {
          console.error("Async: Could not copy text: ", err);
        });
    },
    print() {
      window.print();
      this.version++;
    },
    clearConfirm() {
      if (window.confirm("Tem certeza que deseja limpar?")) {
        this.clear();
      }
    },
    clear() {
      this.json = [];
      this.data = null;
      this.vagas = 60;
      this.version = 0;
      this.todo = [];

      const inscricoes = this.empacotar();
      this.$store.dispatch("saveJson", inscricoes);
    },
  },
  mounted() {
    this.load(this.$store.state.json);

    clearInterval(this.saveInterval);
    this.saveInterval = setInterval(() => {
      const inscricoes = this.empacotar();
      this.$store.dispatch("saveJson", inscricoes);
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.saveInterval);
  },
};
</script>
<style>
body {
  overflow: visible;
}
.container {
  margin-top: 20px;
  margin-bottom: 200px;
}

@media screen {
  .print-show {
    display: none;
  }
}

@page {
  size: auto;
}

@page {
  counter-increment: page;
  counter-reset: page 1;
  @top-right {
    content: "Page " counter(page) " of " counter(pages);
  }
}

@media print {
  table {
    page-break-inside: auto;
  }
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }

  .tabela-conteudo {
    width: 100%;
  }

  .print-hide {
    display: none;
  }

  .header,
  .header-space,
  .footer,
  .footer-space {
    height: 100px;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .footer {
    position: fixed;
    bottom: 0;
    counter-increment: page;
  }

  .footer::before {
    /*content: counter(page);*/
    content: "";
    right: 0;
    display: inline-block;
    width: 100%;
    text-align: right;
    top: 100%;
    white-space: nowrap;
    z-index: 20;
  }

  .cnpj {
    font-size: 0.7em;
    margin: auto;
    display: block;
    width: 100%;
    text-align: center;
  }

  table {
    font-size: 0.9em;
  }

  .primeiro-culto {
    page-break-after: always;
  }
}
</style>
