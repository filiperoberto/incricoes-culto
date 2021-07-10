<template>
  <div id="app" class="container">
    <form class="print-hide">
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
        <input type="date" class="form-control" id="dataCulto" v-model="data" />
      </div>
      <div class="mb-3">
        <label for="vagas" class="form-label">Vagas</label>
        <input type="number" class="form-control" id="vagas" v-model="vagas" />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent.stop="salvar"
      >
        Salvar
      </button>
    </form>
    <div class="row mt-2 print-hide">
      <div class="col-2">
        <button
          type="submit"
          class="btn"
          :disabled="copiado"
          :class="{ 'btn-success': copiado, 'btn-secondary': !copiado }"
          @click="copyEmails"
          v-text="copiado ? 'Copiado!' : 'Copiar E-mails'"
        ></button>
      </div>
      <div class="col-2">
        <button type="submit" class="btn btn-secondary" @click="add">
          Adicionar Inscrição
        </button>
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
import Cabecalho from "./components/Cabecalho";
import { parseISO, format } from "date-fns";
export default {
  name: "App",
  components: {
    LoadFile,
    Culto,
    Cabecalho,
  },
  data() {
    return {
      json: [],
      data: null,
      vagas: 60,
      copiado: false,
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
    },
  },
  methods: {
    salvar() {
      const inscricoes = {
        inscricoes: this.json,
        data: this.data,
        vagas: this.vagas,
      };

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
    load({ inscricoes, data, vagas }) {
      this.json = inscricoes;
      this.data = data;
      this.vagas = vagas;
    },
    subir({ item }) {
      const index = this.json.map((v) => v.index).indexOf(item.index);
      this.move(index, index - 1);
    },
    descer({ item }) {
      const index = this.json.map((v) => v.index).indexOf(item.index);
      this.move(index, index + 1);
    },
    move(from, to) {
      if (to < 0) {
        return;
      }
      if (to >= this.json.length) {
        return;
      }
      const elem = this.json.splice(from, 1)[0];
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
        .map((i) => i.email)
        .filter((e) => e !== "")
        .filter((item, pos, self) => self.indexOf(item) == pos)
        .join(";");

      navigator.clipboard.writeText(emails).then(
        () => {
          this.copiado = true;
          setTimeout(() => {
            this.copiado = false;
          }, 5000);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },
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

.print-show {
  display: none;
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
  .print-show {
    display: revert;
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
