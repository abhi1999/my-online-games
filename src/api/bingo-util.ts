import {IBingoRow} from './../common/interfaces';

const shuffle =(array:number[]) =>{
    let counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


export const getBingoNumber =():IBingoRow[]=>{
    const b = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    i = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    n = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
    g = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
    o = [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
    shuffle(b);
    shuffle(i);
    shuffle(n);
    shuffle(g);
    shuffle(o);
  
    const returnObject:IBingoRow[]=[];
    returnObject.push({letter:'b', numbers:b.splice(0,5)});
    returnObject.push({letter:'i', numbers:i.splice(0,5)});
    returnObject.push({letter:'n', numbers:n.splice(0,5)});
    returnObject.push({letter:'g', numbers:g.splice(0,5)});
    returnObject.push({letter:'o', numbers:o.splice(0,5)});
    return returnObject;
    //return {b:b.splice(0,5),i:i.splice(0,5),n:n.splice(0,5),g:g.splice(0,5),o:o.splice(0,5)}
}
