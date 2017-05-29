import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sudoku-card',
    templateUrl: '../html/sudoku-card.component.html',
    styleUrls: ['../css/sudoku-card.component.css']
})

export class SudokuCard implements OnInit {
    dimension: number = 3;
    //debuggingPurposes
    grid: Array<Array<number>>=[
        [,2,,6,,8,,,,],
        [5,8,,,,9,7,,,],
        [3,7,,,,,5,,,],
        [,,,,4,,,,,],
        [6,,,,,,,,4,],
        [,,8,,,,,1,3,],
        [,,,,2,,,,,],
        [,,9,8,,,,3,6,],
        [,,9,8,,6,,9,,]]

    constructor() { }

    ngOnInit() { }

    trackByIndex(index: number, obj: any): any {
        return index;
  }
    onKey(event:any, indexy:number,index:number){
        // Get ASCII code of character
        let value = event.key.charCodeAt(0);
        // verify if input is whithin 1-9
        if(value<49 || value>58){
            this.grid[indexy][index]=undefined;
        }
    }
}