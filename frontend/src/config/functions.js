import moment from 'moment';
import { EventBus } from '@EventBus';
import store from '../store';

const dias_semana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function rgbToHtml(r, g, b) {
  const rgb = b | (g << 8) | (r << 16);
  return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
}

function hsvToHtml(h, s, v) {
  let r, g, b;
  if (arguments.length === 1) {
    s = h.s; v = h.v; h = h.h;
  }
  const i = Math.floor(h * 6);
  const f = (h * 6) - i;
  const p = v * (1 - s);
  const q = v * (1 - (f * s));
  const t = v * (1 - ((1 - f) * s));
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: break;
  }
  return rgbToHtml(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

export default {
  clearQuery: text => (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),

  Logout: () => new Promise(async resolve => {
    await store.dispatch('CLEAR_STATE');
    localStorage.clear();
    EventBus.$off();
    resolve(true);
  }),
  onlyNumber: str => {
    if (!str) return str;
    str = String(str);
    return str && str.replace(/\D/g, '');
  },

  uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }),

  getCEPNumbers: cep => cep.replace('-', '').replace('.', ''),

  getNome: nome_completo => {
    let nome = nome_completo.split(' ')[0];
    if (!nome)
      nome = ' ';
    return nome;
  },

  getSobrenome: nome_completo => {
    const nomes = nome_completo.split(' ');
    nomes.splice(0, 1);
    let sobrenome = nomes.join(' ');
    if (!sobrenome)
      sobrenome = ' ';
    return sobrenome;
  },

  calc_data: value => {
    if (value) {
      const json = JSON.parse(value);
      if (json.data_previsto && json.data_inicio) {
        const now = moment(json.data_previsto, 'DD/MM/YYYY'); // Outra data no passado
        const past = moment(json.data_inicio, 'DD/MM/YYYY'); // Data de hoje
        const duration = moment.duration(now.diff(past));
        return duration.asDays() + 1;
      }
      return 1;
    }
    return 1;
  },

  converter_data: (data, ordem) => {
    // ordem == 1 //menor data
    // ordem == 2 //maior data
    let return_data = null;
    if (!data)
      if (ordem === 1)
        return_data = moment('01/01/1900').format('YYYY-MM-DD');
      else
        return_data = moment('31/12/9999').format('YYYY-MM-DD');
    else
      return_data = moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');

    return return_data;
  },

  diferenca_data: (data_inicial, data_final) => {
    const now = moment(data_inicial, 'DD/MM/YYYY'); // Outra data no passado
    const past = moment(data_final, 'DD/MM/YYYY'); // Data de hoje
    const duration = moment.duration(now.diff(past));
    return duration.asDays();
  },

  // receber números
  formatarDecimal: valor => {
    if (valor) {
      if (typeof (valor) === 'string')
        valor = Number(valor);
      valor = valor.toFixed(2);
      if (valor.substr(-2) === '00')
        valor = valor.slice(0, -3);
      return valor.replace('.', ',');
    }
    return 0;
  },

  formatDateToRequest: date => {
    if (!date || date.length !== 10) return null;
    if (date.includes('/'))
      if (date.includes(' '))
        return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm');
      else return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return moment(date).format('YYYY-MM-DD');
  },

  formatDateFromRequest: (date, formato = null) => {
    if (!date) return null;
    if (date.includes(' '))
      return moment(date, formato).format('DD/MM/YYYY HH:mm');
    return moment(date, formato).format('DD/MM/YYYY');
  },

  formatDateFromRequest2: (date, formato = null) => {
    if (!date) return null;
    return moment(date, formato).format('DD/MM/YYYY');
  },

  maskEndereco: endereco => {
    if (!(endereco || {}).id) return null;
    let cep;
    if (endereco.cep) cep = `- ${endereco.cep.substr(0, 5)}-${endereco.cep.substr(5, 3)}`;
    return `${endereco.logradouro ? `${endereco.logradouro}, ` : ''}${endereco.numero ? `${endereco.numero}` : 's/n'}${endereco.complemento ? ` ${endereco.complemento}` : ''}, ${endereco.cidade ? endereco.uf ? `${endereco.cidade}/` : endereco.cidade : ''}${endereco.uf || ''}${cep ? ' ' : ''}${cep}`;
  },

  maskCep: cep => `${cep.substr(0, 5)}-${cep.substr(5, 3)}`,

  maskCpfCnpj: cpf_cnpj => {
    if (!cpf_cnpj || typeof cpf_cnpj !== 'string' || (cpf_cnpj.length !== 11 && cpf_cnpj.length !== 14)) return null;
    if (cpf_cnpj.length === 11)
      return `${cpf_cnpj.substr(0, 3)}.${cpf_cnpj.substr(3, 3)}.${cpf_cnpj.substr(6, 3)}-${cpf_cnpj.substr(9, 2)}`;
    return `${cpf_cnpj.substr(0, 2)}.${cpf_cnpj.substr(2, 3)}.${cpf_cnpj.substr(5, 3)}/${cpf_cnpj.substr(8, 4)}-${cpf_cnpj.substr(12, 2)}`;
  },

  maskNumeroPis: numero_pis => {
    if (!numero_pis || typeof numero_pis !== 'string' || numero_pis.length !== 11) return null;
    return `${numero_pis.substr(0, 3)}.${numero_pis.substr(3, 4)}.${numero_pis.substr(7, 3)}-${numero_pis.substr(10, 1)}`;
  },

  maskTelefone: tel => {
    if (!tel) return '-';
    if (tel.length < 10 || tel.length > 12) return tel;

    const tam = tel.length % 2;
    const dd = tel.substr(0, 2);
    const pri = tel.substr(2, 4 + tam);
    const seg = tel.substr(6 + tam, 4);
    return `(${dd}) ${pri}-${seg}`;
  },

  maskData: (data, formato_saida = null, formato_entrada = null) => {
    if (!data || typeof data !== 'string') return '-';
    const _moment = moment(data, formato_entrada);
    if (!_moment.isValid) return '-';
    return _moment.format(formato_saida || 'DD/MM/YYYY');
  },

  maskMonth: data => {
    data = moment(data, 'YYYY-MM-DD HH:mm:ss').format('MM/YYYY');
    const mes = data.substr(0, 2);
    switch (mes) {
      case '01':
        return data.replace(mes, 'JANEIRO');
      case '02':
        return data.replace(mes, 'FEVEREIRO');
      case '03':
        return data.replace(mes, 'MARÇO');
      case '04':
        return data.replace(mes, 'ABRIL');
      case '05':
        return data.replace(mes, 'MAIO');
      case '06':
        return data.replace(mes, 'JUNHO');
      case '07':
        return data.replace(mes, 'JULHO');
      case '08':
        return data.replace(mes, 'AGOSTO');
      case '09':
        return data.replace(mes, 'SETEMBRO');
      case '10':
        return data.replace(mes, 'OUTUBRO');
      case '11':
        return data.replace(mes, 'NOVEMBRO');
      case '12':
        return data.replace(mes, 'DEZEMBRO');
      default:
        return 'Data inválida';
    }
  },

  maskDinheiro: valor => ((valor || 0) / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),

  maskDinheiro2: valor => (valor || 0)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),

  // Exemplo: Valores em reais => transformar 1000 em R$ 10,00
  transformarPrecoItemUnidade: preco => {
    preco = Number(preco) / 100;
    preco = preco.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    preco = `R$ ${preco}`;
    return preco;
  },

  transformarPrecoItemTotal: (preco, quantidade) => {
    preco = (Number(preco) / 100) * Number(quantidade);
    preco = preco.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    preco = `R$ ${preco}`;
    return preco;
  },

  checarValidadeData(data) {
    // formato DD/MM/YYYY
    const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!regex.test(data))
      return false;
    return true;
  },

  checarValidadeHorario(horario) {
    // formato HH:mm
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regex.test(horario))
      return false;
    return true;
  },

  formatarData(data) {
    // usar no watch da DATA
    // adicionar class="data"
    // formato DD/MM/YYYY
    const dataInputs = document.getElementsByClassName('data');
    const MAX_LENGTH = 10;
    // Remove todos os caracteres que não sejam números
    data = data.replace(/\D/g, '');

    // Insere as barras automaticamente enquanto escreve
    if (data.length > 2)
      data = data.replace(/(\d{2})(\d)/, '$1/$2');

    if (data.length > 5)
      data = data.replace(/(\d{2})(\d)/, '$1/$2');

    const isTextSelected = input => {
      if (typeof input.selectionStart === 'number' && typeof input.selectionEnd === 'number')
        return input.selectionStart !== input.selectionEnd;

      return false;
    };

    const limitarComprimento = event => {
      const dataInput = event.target;
      const maxLengthReached = dataInput.value.length >= MAX_LENGTH;

      if (maxLengthReached && !isTextSelected(dataInput) && event.keyCode !== 8 && event.keyCode !== 46)
        event.preventDefault();
    };

    for (let i = 0; i < dataInputs.length; i++) {
      const dataInput = dataInputs[i];
      dataInput.addEventListener('keydown', limitarComprimento);
    }

    return data;
  }
}