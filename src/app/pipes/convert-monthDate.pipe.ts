import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertmonthDate'
})
export class ConvertmonthDatePipe implements PipeTransform {

  transform(value: number, options: string): string {
    let monthListShort: { [key: string]: string } = {
      "01": "JANV",
      "02": "FEV",
      "03": "MARS",
      "04": "AVR",
      "05": "MAI",
      "06": "JUI",
      "07": "JUIL",
      "08": "AOU",
      "09": "SEP",
      "10": "OCT",
      "11": "NOV",
      "12": "DEC"
    }

    let monthListFull: { [key: string]: string } = {
      "01": "Janvier",
      "02": "Février",
      "03": "Mars",
      "04": "Avril",
      "05": "Mai",
      "06": "Juin",
      "07": "Juillet",
      "08": "Août",
      "09": "Septembre",
      "10": "Octobre",
      "11": "Novembre",
      "12": "Décembre"
    }

    return (options == "full") ? monthListFull[value] : monthListShort[value];
  }

}
