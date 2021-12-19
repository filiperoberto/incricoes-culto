<template>
  <h5>Textos Padrão</h5>
  <div class="card">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <a
            class="nav-link"
            :class="{ active: tab.ativo }"
            aria-current="true"
            @click.prevent.stop="trocarAba(tab)"
            href="#"
            >{{ tab.label }}</a
          >
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div class="mb-3 texto-email" v-if="tabs[0].ativo">
        <p>Olá irmãos,</p>
        <p>
          Estão abertas as inscrições para o próximo culto presencial, em
          {{ dataSemAno }}, que deverão ser feitas através deste link:
          <span v-if='cultos === 2'>https://forms.gle/pRxChjVYansE1gK9A</span>
          <span v-else>https://forms.gle/eLF2WmRCp4RGxXDg8</span>
        </p>
        <p>Avisos importantes:</p>
        <p>
          1) *As inscrições se encerram na quinta-feira, às 18h00*. A lista
          inicial de inscritos será repassada até às 21h00, via WhatsApp no
          grupo "Membros IBRVN";
          <br />
          2) O período de ajuste das inscrições será das 8h00 às 20h00 de
          sexta-feira, e a lista final de inscritos será disponibilizada até às
          21h00 de sexta-feira;
          <br />
          3) As inscrições para o culto presencial são semanais. Assim, quem
          desejar assistir o culto presencial na semana seguinte deverá refazer
          sua inscrição quando disponibilizada;
          <br />
          4) O preenchimento do formulário deverá ser feito uma única vez pelo
          membro da igreja responsável pela unidade familiar, sendo permitida a
          inclusão de cônjuge, filho(s) e pais;
          <br />
          5) A inscrição não garante a participação no culto presencial. Aguarde
          a lista de inscritos para saber se você conseguiu a vaga ou se ficou
          na lista de espera.
        </p>

        <p>
          *ATENÇÃO!* Famílias que possuem criança de colo: caso venham a
          participar do culto, não devem ser listadas na inscrição.
        </p>
      </div>
      <div class="mb-3 texto-email" v-if="tabs[1].ativo">
        <h5>IBRVN - Culto presencial</h5>
        <p>Prezado(a) visitante,</p>

        <p>
          Segue em anexo a lista de inscritos para o culto presencial da Igreja
          Batista Reformada Vida Nova (IBRVN), que acontecerá domingo,
          <strong>{{ dataComAno }}</strong
          >, <span v-if='cultos === 2'>em dois horários: 09h00 e 10h30.</span><span v-else>no horário: 10h00.</span>
        </p>

        <p>
          Para confirmar a sua inscrição, verifique se seu nome se encontra na
          presente lista. Caso tenha ficado na lista de espera, você terá
          preferência na inscrição para o culto do domingo seguinte.
        </p>

        <p>Em Cristo,</p>
      </div>
    </div>
  </div>
</template>
<script>
import { parseISO, format } from "date-fns";
export default {
  data() {
    return {
      tabs: [
        {
          label: "Inscrições Abertas",
          ativo: true,
        },
        {
          label: "Email Visitantes",
          ativo: false,
        },
      ],
    };
  },
  props: {
    data: String,
    cultos: Number
  },
  computed: {
    dataSemAno() {
      return format(parseISO(this.data), "dd/MM");
    },
    dataComAno() {
      return format(parseISO(this.data), "dd/MM/yyyy");
    },
  },
  methods: {
    trocarAba(aba) {
      this.tabs.filter((t) => t.ativo).forEach((t) => (t.ativo = false));
      aba.ativo = true;
    },
  },
};
</script>
<style scoped>
.texto-email {
  font: small/ 1.5 Arial, Helvetica, sans-serif;
}
</style>