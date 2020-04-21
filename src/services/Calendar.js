// formatting the calendar for portuguese

import { LocaleConfig } from 'react-native-calendars'

const formated =  LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro de','Fevereiro de','Março de','Abril de','Maio de','Junho de','Julho de','Agosto de','Setembro de','Outubro de','Novembro de','Dezembro de'],
    monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
    dayNames: ['Domingo','Segunda-feira','Terça-feria','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    today: 'Aujourd\'hui'
  };
LocaleConfig.defaultLocale = 'br';

module.exports = formated;