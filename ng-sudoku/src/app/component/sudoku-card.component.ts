import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

import {CameraDialog} from './camera-dialog.component';
@Component({
    moduleId: module.id,
    selector: 'sudoku-card',
    templateUrl: '../html/sudoku-card.component.html',
    styleUrls: ['../css/sudoku-card.component.css']
})

export class SudokuCard implements OnInit {
    dimension: number = 3;
    //debuggingPurposes
    grid: Array<Array<number>> = [
        [, 6, 2, 5, , , , 9, ,],
        [1, , , ,2, 9, , , ,],
        [, 5, 9, , , 8, 6, , 2,],
        [, 4, 7, 1, 9, , 3, , ,],
        [9, , 6, 3, , 2, 1, , ,],
        [, , 1, , 8, 7, 9, 2, ,],
        [6, , 4, 8, , , 5, 1, ,],
        [, , , 9, 4, , , , 7,],
        [, 9, , , , 1, 4, 8, ,]];

    gridObj: Array<Array<any>>;

    constructor(public dialog: MdDialog) { }

    ngOnInit() {
        this.initialize();
     }
     openCameraDialog(){
        this.dialog.open(CameraDialog);

     }
    trackByIndex(index: number, obj: any): any {
        return index;
    }
    onKey(event: any, indexy: number, index: number) {
        // Get ASCII code of character
        let value = event.key.charCodeAt(0);
        // verify if input is whithin 1-9
        if (value < 49 || value > 58) {
            this.grid[indexy][index] = undefined;
        }
        
    }

    initialize() {
        //Initialize GridObject 
        this.gridObj = this.grid.map(
            line => {
                let lineArray = [];
                for (let i = 0; i < 9; i++) {
                    lineArray[i] = {
                        value: line[i],
                        allowedValues: (line[i] ? undefined : [, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
                        numberAllowedValues: (line[i] ? 0 : 9)
                        //1 means that the i'th element is allowed 
                    }
                }
                return lineArray;
            });
    }

    updateAllowedValues() {

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.gridObj[i][j].value) {
                    this.updateAllowedValuesForCell(i, j);
                }
            }
        }
    }

    updateAllowedValuesForCell(i, j) {
        let needUpdates: Array<Array<number>>=[];
        //clean the line
        for (let m = 0; m < 9; m++) {
            if (!this.gridObj[i][m].value) {
                if (this.gridObj[i][m].allowedValues[this.gridObj[i][j].value]) {
                    this.gridObj[i][m].allowedValues[this.gridObj[i][j].value] = 0;
                    this.gridObj[i][m].numberAllowedValues--;
                    if (this.gridObj[i][m].numberAllowedValues == 1) {
                        //if we numberAllowedValues is on, means we found the value! 
                        needUpdates.push([i, m]);
                    }
                }
            }
        }
        //clean the column
        for (let m = 0; m < 9; m++) {
            if (!this.gridObj[m][j].value) {
                if (this.gridObj[m][j].allowedValues[this.gridObj[i][j].value]) {
                    this.gridObj[m][j].allowedValues[this.gridObj[i][j].value] = 0;
                    this.gridObj[m][j].numberAllowedValues--;
                    if (this.gridObj[m][j].numberAllowedValues == 1) {
                        needUpdates.push([m, j]);
                    }
                }
            }
        }
        //clean the 3*3 grid
        let modi = Math.floor(i / 3);
        let modj = Math.floor(j / 3);

        for (let k = -1; k < 2; k += 2) {
            for (let l = -1; l < 2; l += 2) {
                let indexy1 = 3 * modi + ((i + k + 3) % 3);
                let indexy2 = 3 * modj + ((j + l + 3) % 3);
                if (!this.gridObj[indexy1][indexy2].value) {
                    if (this.gridObj[indexy1][indexy2].allowedValues[this.gridObj[i][j].value]) {
                        this.gridObj[indexy1][indexy2].allowedValues[this.gridObj[i][j].value] = 0;
                        this.gridObj[indexy1][indexy2].numberAllowedValues--;
                        if (this.gridObj[indexy1][indexy2].numberAllowedValues == 1) {
                            needUpdates.push([indexy1, indexy2]);
                        }
                    }
                }
            }
        }
        // needUpdates=undefined;
        if(needUpdates.length>0){
            needUpdates.map(couple => {
            let l = couple[0];
            let m = couple[1];
            this.gridObj[l][m].numberAllowedValues = 0;
            for (let p = 1; p < 10; p++) {
                if (this.gridObj[l][m].allowedValues[p]) {
                    this.gridObj[l][m].value = p;
                    break;
                }
            }
            this.gridObj[l][m].allowedValues = undefined;
            this.grid[l][m]=this.gridObj[l][m].value;
            this.updateAllowedValuesForCell(l, m);
        });
        }

    }
}

