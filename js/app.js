const STORAGE_KEY = 'controle_ponto_campo_progressivo_v1';

const byId = (id) => document.getElementById(id);

const form = byId('pontoForm');
const registroId = byId('registroId');

const empresaNomeInput = byId('empresaNome');
const empresaCnpjInput = byId('empresaCnpj');
const responsavelNomeInput = byId('responsavelNome');

const nomeOperadorInput = byId('nomeOperador');
const codigoOperadorInput = byId('codigoOperador');
const dataNascimentoInput = byId('dataNascimento');
const parceiroEquipeInput = byId('parceiroEquipe');
const localOperacaoInput = byId('localOperacao');
const cidadeUfInput = byId('cidadeUf');

const dataInput = byId('data');
const entradaInput = byId('entrada');
const almocoSaidaInput = byId('almocoSaida');
const almocoVoltaInput = byId('almocoVolta');
const pausaInicioInput = byId('pausaInicio');
const pausaFimInput = byId('pausaFim');
const saidaInput = byId('saida');
const metaDiariaInput = byId('metaDiaria');
const turnoBaseInput = byId('turnoBase');
const observacaoInput = byId('observacao');

const filtroMesInput = byId('filtroMes');
const tabelaRegistros = byId('tabelaRegistros');

const previewHoras = byId('previewHoras');
const previewSaldo = byId('previewSaldo');
const previewStatus = byId('previewStatus');

const totalDias = byId('totalDias');
const totalHoras = byId('totalHoras');
const bancoPositivo = byId('bancoPositivo');
const bancoNegativo = byId('bancoNegativo');
const saldoBanco = byId('saldoBanco');
const diasBanco = byId('diasBanco');
const faltamParaDia = byId('faltamParaDia');
const mediaDia = byId('mediaDia');
const heroSaldo = byId('heroSaldo');

const btnLimpar = byId('btnLimpar');
const btnLimparTudo = byId('btnLimparTudo');
const btnNovoRegistro = byId('btnNovoRegistro');
const btnExportar = byId('btnExportar');
const btnImprimir = byId('btnImprimir');

const printEmpresaNome = byId('printEmpresaNome');
const printEmpresaCnpj = byId('printEmpresaCnpj');
const printPeriodo = byId('printPeriodo');
const printGeradoEm = byId('printGeradoEm');
const printResumoOperador = byId('printResumoOperador');
const printTabela = byId('printTabela');
const printTurnoBase = byId('printTurnoBase');
const printMetaDiaria = byId('printMetaDiaria');
const printAssinaturaOperador = byId('printAssinaturaOperador');
const printAssinaturaResponsavel = byId('printAssinaturaResponsavel');

let registros = carregarRegistros();

iniciar();

function iniciar() {
  definirDataAtual();
  definirMesAtual();

  if (empresaNomeInput && !empresaNomeInput.value) empresaNomeInput.value = 'Nome da Empresa';
  if (empresaCnpjInput && !empresaCnpjInput.value) empresaCnpjInput.value = '00.000.000/0001-00';
  if (responsavelNomeInput && !responsavelNomeInput.value) responsavelNomeInput.value = 'Responsável / Conferência';
  if (metaDiariaInput && !metaDiariaInput.value) metaDiariaInput.value = '08:00';
  if (turnoBaseInput && !turnoBaseInput.value) turnoBaseInput.value = '07:30 / 12:00 / 13:00 / 17:30';

  atualizarPreview();
  renderizarTudo();

  form?.addEventListener('submit', salvarRegistro);
  btnLimpar?.addEventListener('click', limparFormulario);
  btnNovoRegistro?.addEventListener('click', limparFormulario);
  btnLimparTudo?.addEventListener('click', apagarTudo);
  btnExportar?.addEventListener('click', exportarCSV);
  btnImprimir?.addEventListener('click', imprimirRelatorio);
  filtroMesInput?.addEventListener('input', renderizarTudo);

  [
    empresaNomeInput,
    empresaCnpjInput,
    responsavelNomeInput,
    nomeOperadorInput,
    codigoOperadorInput,
    dataNascimentoInput,
    parceiroEquipeInput,
    localOperacaoInput,
    cidadeUfInput,
    dataInput,
    entradaInput,
    almocoSaidaInput,
    almocoVoltaInput,
    pausaInicioInput,
    pausaFimInput,
    saidaInput,
    metaDiariaInput,
    turnoBaseInput,
    observacaoInput
  ].forEach((campo) => {
    campo?.addEventListener('input', atualizarPreview);
    campo?.addEventListener('change', atualizarPreview);
  });
}

function carregarRegistros() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvarNoStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
}

function valor(el) {
  return el ? String(el.value || '').trim() : '';
}

function normalizarHora(v) {
  const texto = String(v || '').trim();
  return texto === '' ? '' : texto;
}

function salvarRegistro(evento) {
  evento.preventDefault();

  const registro = {
    id: valor(registroId) || gerarIdSeguro(),
    empresaNome: valor(empresaNomeInput),
    empresaCnpj: valor(empresaCnpjInput),
    responsavelNome: valor(responsavelNomeInput),
    nomeOperador: valor(nomeOperadorInput),
    codigoOperador: valor(codigoOperadorInput),
    dataNascimento: valor(dataNascimentoInput),
    parceiroEquipe: valor(parceiroEquipeInput),
    localOperacao: valor(localOperacaoInput),
    cidadeUf: valor(cidadeUfInput),
    data: valor(dataInput),
    entrada: normalizarHora(entradaInput?.value),
    almocoSaida: normalizarHora(almocoSaidaInput?.value),
    almocoVolta: normalizarHora(almocoVoltaInput?.value),
    pausaInicio: normalizarHora(pausaInicioInput?.value),
    pausaFim: normalizarHora(pausaFimInput?.value),
    saida: normalizarHora(saidaInput?.value),
    metaDiaria: normalizarHora(metaDiariaInput?.value) || '08:00',
    turnoBase: valor(turnoBaseInput) || '07:30 / 12:00 / 13:00 / 17:30',
    observacao: valor(observacaoInput)
  };

  const validacao = validarCamposBasicos(registro);
  if (!validacao.valido) {
    alert(validacao.erro);
    return;
  }

  const validacaoSequencia = validarSequenciaParcial(registro);
  if (!validacaoSequencia.valido) {
    alert(validacaoSequencia.erro);
    return;
  }

  const indiceMesmoDia = registros.findIndex(
    (item) =>
      item.data === registro.data &&
      item.codigoOperador === registro.codigoOperador
  );

  if (registro.id && registros.some((item) => item.id === registro.id)) {
    const indiceId = registros.findIndex((item) => item.id === registro.id);
    registros[indiceId] = registro;
  } else if (indiceMesmoDia >= 0) {
    registro.id = registros[indiceMesmoDia].id;
    registros[indiceMesmoDia] = registro;
  } else {
    registros.push(registro);
  }

  registros.sort((a, b) => obterDataInicial(a).getTime() - obterDataInicial(b).getTime());

  salvarNoStorage();
  renderizarTudo();
  limparFormulario();

  alert('Ponto salvo com sucesso.');
}

function validarCamposBasicos(registro) {
  if (!registro.nomeOperador) return { valido: false, erro: 'Informe o nome do operador.' };
  if (!registro.codigoOperador) return { valido: false, erro: 'Informe o código ou matrícula.' };
  if (!registro.dataNascimento) return { valido: false, erro: 'Informe a data de nascimento.' };
  if (!registro.data) return { valido: false, erro: 'Informe a data de referência.' };

  const pontos = [
    registro.entrada,
    registro.almocoSaida,
    registro.almocoVolta,
    registro.pausaInicio,
    registro.pausaFim,
    registro.saida
  ].filter(Boolean);

  if (!pontos.length) {
    return { valido: false, erro: 'Informe pelo menos um ponto para salvar.' };
  }

  return { valido: true };
}

function validarSequenciaParcial(registro) {
  if (registro.pausaInicio && !registro.almocoVolta) {
    return { valido: false, erro: 'Não é possível lançar pausa extra antes da volta do almoço.' };
  }

  if (registro.pausaFim && !registro.pausaInicio) {
    return { valido: false, erro: 'Preencha o início da pausa extra antes do fim.' };
  }

  if (registro.saida && registro.pausaInicio && !registro.pausaFim) {
    return { valido: false, erro: 'Se houver pausa extra, preencha também o fim da pausa antes da saída.' };
  }

  return { valido: true };
}

function limparFormulario() {
  form?.reset();

  if (registroId) registroId.value = '';
  if (empresaNomeInput) empresaNomeInput.value = 'Nome da Empresa';
  if (empresaCnpjInput) empresaCnpjInput.value = '00.000.000/0001-00';
  if (responsavelNomeInput) responsavelNomeInput.value = 'Responsável / Conferência';
  if (metaDiariaInput) metaDiariaInput.value = '08:00';
  if (turnoBaseInput) turnoBaseInput.value = '07:30 / 12:00 / 13:00 / 17:30';

  definirDataAtual();
  atualizarPreview();
}

function apagarTudo() {
  if (!registros.length) {
    alert('Não há registros para apagar.');
    return;
  }

  if (!confirm('Tem certeza que deseja apagar todos os registros?')) return;

  registros = [];
  salvarNoStorage();
  renderizarTudo();
  limparFormulario();
}

function editarRegistro(id) {
  const r = registros.find((item) => item.id === id);
  if (!r) return;

  if (registroId) registroId.value = r.id;
  if (empresaNomeInput) empresaNomeInput.value = r.empresaNome || 'Nome da Empresa';
  if (empresaCnpjInput) empresaCnpjInput.value = r.empresaCnpj || '00.000.000/0001-00';
  if (responsavelNomeInput) responsavelNomeInput.value = r.responsavelNome || 'Responsável / Conferência';
  if (nomeOperadorInput) nomeOperadorInput.value = r.nomeOperador || '';
  if (codigoOperadorInput) codigoOperadorInput.value = r.codigoOperador || '';
  if (dataNascimentoInput) dataNascimentoInput.value = r.dataNascimento || '';
  if (parceiroEquipeInput) parceiroEquipeInput.value = r.parceiroEquipe || '';
  if (localOperacaoInput) localOperacaoInput.value = r.localOperacao || '';
  if (cidadeUfInput) cidadeUfInput.value = r.cidadeUf || '';
  if (dataInput) dataInput.value = r.data || '';
  if (entradaInput) entradaInput.value = r.entrada || '';
  if (almocoSaidaInput) almocoSaidaInput.value = r.almocoSaida || '';
  if (almocoVoltaInput) almocoVoltaInput.value = r.almocoVolta || '';
  if (pausaInicioInput) pausaInicioInput.value = r.pausaInicio || '';
  if (pausaFimInput) pausaFimInput.value = r.pausaFim || '';
  if (saidaInput) saidaInput.value = r.saida || '';
  if (metaDiariaInput) metaDiariaInput.value = r.metaDiaria || '08:00';
  if (turnoBaseInput) turnoBaseInput.value = r.turnoBase || '07:30 / 12:00 / 13:00 / 17:30';
  if (observacaoInput) observacaoInput.value = r.observacao || '';

  atualizarPreview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirRegistro(id) {
  if (!confirm('Deseja realmente excluir este registro?')) return;
  registros = registros.filter((item) => item.id !== id);
  salvarNoStorage();
  renderizarTudo();
}

function obterRegistrosFiltrados() {
  const filtroMes = valor(filtroMesInput);
  const lista = [...registros].sort((a, b) => obterDataInicial(b).getTime() - obterDataInicial(a).getTime());
  return filtroMes ? lista.filter((item) => String(item.data).startsWith(filtroMes)) : lista;
}

function renderizarTudo() {
  const filtrados = obterRegistrosFiltrados();
  renderizarTabela(filtrados);
  renderizarResumo(filtrados);
  renderizarRelatorioImpressao(filtrados);
}

function renderizarTabela(lista) {
  if (!tabelaRegistros) return;

  if (!lista.length) {
    tabelaRegistros.innerHTML = `
      <tr>
        <td colspan="17" class="empty-state">Nenhum registro encontrado para o período selecionado.</td>
      </tr>
    `;
    return;
  }

  tabelaRegistros.innerHTML = lista.map((registro) => {
    const calculo = calcularRegistro(registro);
    const classeSaldo = calculo.valido
      ? calculo.saldoMinutos > 0 ? 'text-positive' : calculo.saldoMinutos < 0 ? 'text-negative' : 'text-warning'
      : 'text-warning';
    const statusClasse = calculo.valido
      ? calculo.saldoMinutos > 0 ? 'credito' : calculo.saldoMinutos < 0 ? 'debito' : 'zerado'
      : 'zerado';

    return `
      <tr>
        <td>${formatarDataBR(registro.data)}</td>
        <td>${escaparHTML(registro.nomeOperador || '-')}</td>
        <td>${escaparHTML(registro.codigoOperador || '-')}</td>
        <td>${escaparHTML(registro.parceiroEquipe || '-')}</td>
        <td>${escaparHTML(registro.localOperacao || '-')}</td>
        <td>${escaparHTML(registro.cidadeUf || '-')}</td>
        <td>${escaparHTML(registro.entrada || '-')}</td>
        <td>${escaparHTML(registro.almocoSaida || '-')}</td>
        <td>${escaparHTML(registro.almocoVolta || '-')}</td>
        <td>${escaparHTML(registro.pausaInicio || '-')}</td>
        <td>${escaparHTML(registro.pausaFim || '-')}</td>
        <td>${escaparHTML(registro.saida || '-')}</td>
        <td>${calculo.valido ? formatarMinutos(calculo.horasTrabalhadasMinutos) : '--:--'}</td>
        <td class="${classeSaldo}">${calculo.valido ? formatarMinutosAssinado(calculo.saldoMinutos) : '--:--'}</td>
        <td><span class="status-badge ${statusClasse}">${calculo.status}</span></td>
        <td>${escaparHTML(registro.observacao || '-')}</td>
        <td>
          <div class="row-actions">
            <button class="secondary-btn" type="button" onclick="editarRegistro('${registro.id}')">Editar</button>
            <button class="danger-btn" type="button" onclick="excluirRegistro('${registro.id}')">Excluir</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderizarResumo(lista) {
  const calculados = lista.map(calcularRegistro).filter((item) => item.valido);

  const dias = calculados.length;
  const totalTrabalhado = somar(calculados.map((item) => item.horasTrabalhadasMinutos));
  const saldo = somar(calculados.map((item) => item.saldoMinutos));
  const positivo = somar(calculados.filter((item) => item.saldoMinutos > 0).map((item) => item.saldoMinutos));
  const negativo = somar(calculados.filter((item) => item.saldoMinutos < 0).map((item) => Math.abs(item.saldoMinutos)));
  const diasFechados = saldo > 0 ? Math.floor(saldo / 1440) : 0;
  const restoPositivo = saldo > 0 ? saldo % 1440 : 0;
  const faltam = saldo > 0 ? (restoPositivo === 0 ? 0 : 1440 - restoPositivo) : 1440;
  const media = dias ? Math.round(totalTrabalhado / dias) : 0;

  if (totalDias) totalDias.textContent = String(dias);
  if (totalHoras) totalHoras.textContent = formatarMinutos(totalTrabalhado);
  if (bancoPositivo) bancoPositivo.textContent = formatarMinutos(positivo);
  if (bancoNegativo) bancoNegativo.textContent = formatarMinutos(negativo);
  if (saldoBanco) saldoBanco.textContent = formatarMinutosAssinado(saldo);
  if (diasBanco) diasBanco.textContent = String(diasFechados);
  if (faltamParaDia) faltamParaDia.textContent = formatarMinutos(faltam);
  if (mediaDia) mediaDia.textContent = formatarMinutos(media);
  if (heroSaldo) heroSaldo.textContent = formatarMinutosAssinado(saldo);

  if (saldoBanco) saldoBanco.className = saldo > 0 ? 'text-positive' : saldo < 0 ? 'text-negative' : 'text-warning';
  if (heroSaldo) heroSaldo.className = saldo > 0 ? 'text-positive' : saldo < 0 ? 'text-negative' : 'text-warning';
}

function atualizarPreview() {
  const registroTemporario = {
    data: valor(dataInput),
    entrada: normalizarHora(entradaInput?.value),
    almocoSaida: normalizarHora(almocoSaidaInput?.value),
    almocoVolta: normalizarHora(almocoVoltaInput?.value),
    pausaInicio: normalizarHora(pausaInicioInput?.value),
    pausaFim: normalizarHora(pausaFimInput?.value),
    saida: normalizarHora(saidaInput?.value),
    metaDiaria: normalizarHora(metaDiariaInput?.value) || '08:00'
  };

  const calculo = calcularRegistro(registroTemporario);

  if (!calculo.valido) {
    if (previewHoras) previewHoras.textContent = '--:--';
    if (previewSaldo) previewSaldo.textContent = '--:--';
    if (previewStatus) previewStatus.textContent = calculo.status;
    if (previewSaldo) previewSaldo.className = '';
    return;
  }

  if (previewHoras) previewHoras.textContent = formatarMinutos(calculo.horasTrabalhadasMinutos);
  if (previewSaldo) previewSaldo.textContent = formatarMinutosAssinado(calculo.saldoMinutos);
  if (previewStatus) previewStatus.textContent = calculo.status;

  if (previewSaldo) {
    previewSaldo.className =
      calculo.saldoMinutos > 0 ? 'text-positive' :
      calculo.saldoMinutos < 0 ? 'text-negative' :
      'text-warning';
  }
}

function calcularRegistro(registro) {
  const metaMinutos = converterHoraParaMinutos(registro.metaDiaria || '08:00');

  const temEntrada = !!registro.entrada;
  const temAlmocoSaida = !!registro.almocoSaida;
  const temAlmocoVolta = !!registro.almocoVolta;
  const temPausaInicio = !!registro.pausaInicio;
  const temPausaFim = !!registro.pausaFim;
  const temSaida = !!registro.saida;

  if (!temEntrada) {
    return { valido: false, status: 'Aguardando início', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (temPausaFim && !temPausaInicio) {
    return { valido: false, status: 'Pausa incompleta', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (temPausaInicio && !temPausaFim && temSaida) {
    return { valido: false, status: 'Pausa incompleta', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (!temAlmocoSaida) {
    return { valido: false, status: 'Jornada iniciada', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (!temAlmocoVolta) {
    return { valido: false, status: 'Em almoço', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (!temSaida && !temPausaInicio) {
    return { valido: false, status: 'Jornada em andamento', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (temPausaInicio && !temPausaFim) {
    return { valido: false, status: 'Pausa extra em andamento', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  if (!temSaida) {
    return { valido: false, status: 'Aguardando saída', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  const horarios = temPausaInicio && temPausaFim
    ? [registro.entrada, registro.almocoSaida, registro.almocoVolta, registro.pausaInicio, registro.pausaFim, registro.saida]
    : [registro.entrada, registro.almocoSaida, registro.almocoVolta, registro.saida];

  const linhaTempo = criarLinhaDoTempo(registro.data, horarios);

  if (!linhaTempo.length || linhaTempo.length !== horarios.length) {
    return { valido: false, status: 'Horários inválidos', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
  }

  let horasTrabalhadasMinutos = 0;

  if (temPausaInicio && temPausaFim) {
    const [entrada, almocoSaida, almocoVolta, pausaInicio, pausaFim, saida] = linhaTempo;
    const trecho1 = diferencaMinutos(entrada, almocoSaida);
    const trecho2 = diferencaMinutos(almocoVolta, pausaInicio);
    const trecho3 = diferencaMinutos(pausaFim, saida);

    if (trecho1 < 0 || trecho2 < 0 || trecho3 < 0) {
      return { valido: false, status: 'Horários inválidos', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
    }

    horasTrabalhadasMinutos = trecho1 + trecho2 + trecho3;
  } else {
    const [entrada, almocoSaida, almocoVolta, saida] = linhaTempo;
    const trecho1 = diferencaMinutos(entrada, almocoSaida);
    const trecho2 = diferencaMinutos(almocoVolta, saida);

    if (trecho1 < 0 || trecho2 < 0) {
      return { valido: false, status: 'Horários inválidos', horasTrabalhadasMinutos: 0, saldoMinutos: 0 };
    }

    horasTrabalhadasMinutos = trecho1 + trecho2;
  }

  const saldoMinutos = horasTrabalhadasMinutos - metaMinutos;
  const status = saldoMinutos > 0 ? 'Crédito' : saldoMinutos < 0 ? 'Débito' : 'Zerado';

  return {
    valido: true,
    status,
    horasTrabalhadasMinutos,
    saldoMinutos
  };
}

function criarLinhaDoTempo(dataBase, horarios) {
  const base = new Date(`${dataBase}T00:00:00`);
  if (Number.isNaN(base.getTime())) return [];

  const resultado = [];

  for (let i = 0; i < horarios.length; i++) {
    const horario = horarios[i];
    if (!horario || !horario.includes(':')) return [];

    const [hora, minuto] = horario.split(':').map(Number);
    if (Number.isNaN(hora) || Number.isNaN(minuto)) return [];

    const dataHora = new Date(base);
    dataHora.setHours(hora, minuto, 0, 0);

    if (i > 0) {
      while (dataHora <= resultado[i - 1]) {
        dataHora.setDate(dataHora.getDate() + 1);
      }
    }

    resultado.push(dataHora);
  }

  return resultado;
}

function renderizarRelatorioImpressao(lista) {
  try {
    if (!printResumoOperador || !printTabela) return;

    const calculados = lista.map((registro) => ({
      ...registro,
      calculo: calcularRegistro(registro)
    }));

    const validos = calculados.filter((item) => item.calculo.valido);
    const totalTrabalhado = somar(validos.map((item) => item.calculo.horasTrabalhadasMinutos));
    const saldo = somar(validos.map((item) => item.calculo.saldoMinutos));
    const credito = somar(validos.filter((item) => item.calculo.saldoMinutos > 0).map((item) => item.calculo.saldoMinutos));
    const debito = somar(validos.filter((item) => item.calculo.saldoMinutos < 0).map((item) => Math.abs(item.calculo.saldoMinutos)));

    const primeiro = lista[0] || {};
    const operadorPrincipal = primeiro.nomeOperador || 'Não informado';
    const codigoPrincipal = primeiro.codigoOperador || 'Não informado';

    if (printEmpresaNome) printEmpresaNome.textContent = primeiro.empresaNome || valor(empresaNomeInput) || 'Nome da Empresa';
    if (printEmpresaCnpj) printEmpresaCnpj.textContent = `CNPJ: ${primeiro.empresaCnpj || valor(empresaCnpjInput) || '00.000.000/0001-00'}`;
    if (printPeriodo) {
      printPeriodo.textContent = filtroMesInput && filtroMesInput.value
        ? `Período: ${formatarMesAno(filtroMesInput.value)}`
        : 'Período: todos os registros';
    }
    if (printGeradoEm) printGeradoEm.textContent = `Emitido em: ${formatarDataHoraAtual()}`;

    printResumoOperador.innerHTML = `
      <div class="print-kpi"><span>Operador</span><strong>${escaparHTML(operadorPrincipal)}</strong></div>
      <div class="print-kpi"><span>Código</span><strong>${escaparHTML(codigoPrincipal)}</strong></div>
      <div class="print-kpi"><span>Total de dias fechados</span><strong>${validos.length}</strong></div>
      <div class="print-kpi"><span>Horas trabalhadas</span><strong>${formatarMinutos(totalTrabalhado)}</strong></div>
      <div class="print-kpi"><span>Crédito</span><strong>${formatarMinutos(credito)}</strong></div>
      <div class="print-kpi"><span>Débito</span><strong>${formatarMinutos(debito)}</strong></div>
      <div class="print-kpi"><span>Saldo</span><strong>${formatarMinutosAssinado(saldo)}</strong></div>
    `;

    if (printTurnoBase) printTurnoBase.textContent = primeiro.turnoBase || valor(turnoBaseInput) || '07:30 / 12:00 / 13:00 / 17:30';
    if (printMetaDiaria) printMetaDiaria.textContent = primeiro.metaDiaria || valor(metaDiariaInput) || '08:00';

    if (!lista.length) {
      printTabela.innerHTML = `<tr><td colspan="12">Nenhum registro para impressão.</td></tr>`;
    } else {
      printTabela.innerHTML = lista.map((registro) => {
        const calculo = calcularRegistro(registro);
        return `
          <tr>
            <td>${formatarDataBR(registro.data)}</td>
            <td>${escaparHTML(registro.localOperacao || '-')}</td>
            <td>${escaparHTML(registro.cidadeUf || '-')}</td>
            <td>${escaparHTML(registro.entrada || '-')}</td>
            <td>${escaparHTML(registro.almocoSaida || '-')}</td>
            <td>${escaparHTML(registro.almocoVolta || '-')}</td>
            <td>${escaparHTML(registro.pausaInicio || '-')}</td>
            <td>${escaparHTML(registro.pausaFim || '-')}</td>
            <td>${escaparHTML(registro.saida || '-')}</td>
            <td>${calculo.valido ? formatarMinutos(calculo.horasTrabalhadasMinutos) : '--:--'}</td>
            <td>${calculo.valido ? formatarMinutosAssinado(calculo.saldoMinutos) : '--:--'}</td>
            <td>${escaparHTML(registro.observacao || '-')}</td>
          </tr>
        `;
      }).join('');
    }

    if (printAssinaturaOperador) printAssinaturaOperador.textContent = operadorPrincipal;
    if (printAssinaturaResponsavel) {
      printAssinaturaResponsavel.textContent = primeiro.responsavelNome || valor(responsavelNomeInput) || 'Responsável / Conferência';
    }
  } catch (erro) {
    console.error('Erro ao montar relatório de impressão:', erro);
  }
}

function exportarCSV() {
  const lista = obterRegistrosFiltrados();

  if (!lista.length) {
    alert('Não há registros para exportar.');
    return;
  }

  const linhas = [[
    'Empresa',
    'CNPJ',
    'Responsavel',
    'Data',
    'Nome do Operador',
    'Codigo',
    'Data de Nascimento',
    'Parceiro',
    'Local',
    'Cidade/UF',
    'Entrada',
    'Almoco Ida',
    'Almoco Volta',
    'Pausa Inicio',
    'Pausa Fim',
    'Saida',
    'Meta Diaria',
    'Turno Base',
    'Horas Trabalhadas',
    'Saldo',
    'Status',
    'Observacao'
  ]];

  lista.forEach((registro) => {
    const calculo = calcularRegistro(registro);

    linhas.push([
      registro.empresaNome || '',
      registro.empresaCnpj || '',
      registro.responsavelNome || '',
      formatarDataBR(registro.data),
      registro.nomeOperador || '',
      registro.codigoOperador || '',
      registro.dataNascimento ? formatarDataBR(registro.dataNascimento) : '',
      registro.parceiroEquipe || '',
      registro.localOperacao || '',
      registro.cidadeUf || '',
      registro.entrada || '',
      registro.almocoSaida || '',
      registro.almocoVolta || '',
      registro.pausaInicio || '',
      registro.pausaFim || '',
      registro.saida || '',
      registro.metaDiaria || '',
      registro.turnoBase || '',
      calculo.valido ? formatarMinutos(calculo.horasTrabalhadasMinutos) : '',
      calculo.valido ? formatarMinutosAssinado(calculo.saldoMinutos) : '',
      calculo.status || '',
      registro.observacao || ''
    ]);
  });

  const csv = linhas.map((linha) => linha.map(escaparCSV).join(';')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `controle-ponto-${filtroMesInput && filtroMesInput.value ? filtroMesInput.value : 'todos'}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function imprimirRelatorio() {
  renderizarRelatorioImpressao(obterRegistrosFiltrados());
  window.print();
}

function diferencaMinutos(inicio, fim) {
  return Math.round((fim.getTime() - inicio.getTime()) / 60000);
}

function converterHoraParaMinutos(valor) {
  if (!valor || !valor.includes(':')) return NaN;
  const [hora, minuto] = valor.split(':').map(Number);
  return (hora * 60) + minuto;
}

function formatarMinutos(minutos) {
  const total = Math.max(0, Math.round(minutos || 0));
  const horas = Math.floor(total / 60);
  const mins = total % 60;
  return `${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function formatarMinutosAssinado(minutos) {
  const total = Math.round(minutos || 0);
  const sinal = total >= 0 ? '+' : '-';
  const absoluto = Math.abs(total);
  const horas = Math.floor(absoluto / 60);
  const mins = absoluto % 60;
  return `${sinal}${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function formatarDataBR(dataISO) {
  if (!dataISO) return '-';
  const [ano, mes, dia] = dataISO.split('-');
  if (!ano || !mes || !dia) return dataISO;
  return `${dia}/${mes}/${ano}`;
}

function formatarMesAno(valor) {
  if (!valor || !valor.includes('-')) return valor || '-';
  const [ano, mes] = valor.split('-');
  return `${mes}/${ano}`;
}

function formatarDataHoraAtual() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = agora.getFullYear();
  const hora = String(agora.getHours()).padStart(2, '0');
  const minuto = String(agora.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

function obterDataInicial(registro) {
  const data = registro?.data || '1970-01-01';
  const entrada = registro?.entrada || '00:00';
  return new Date(`${data}T${entrada}:00`);
}

function definirDataAtual() {
  if (!dataInput) return;
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  dataInput.value = `${ano}-${mes}-${dia}`;
}

function definirMesAtual() {
  if (!filtroMesInput) return;
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  filtroMesInput.value = `${ano}-${mes}`;
}

function somar(valores) {
  return valores.reduce((acc, valor) => acc + (Number(valor) || 0), 0);
}

function escaparCSV(valor) {
  const texto = String(valor ?? '');
  if (texto.includes(';') || texto.includes('"') || texto.includes('\n')) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

function escaparHTML(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function gerarIdSeguro() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

window.editarRegistro = editarRegistro;
window.excluirRegistro = excluirRegistro;
