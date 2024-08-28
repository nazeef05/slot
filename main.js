const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES ={
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const deposit = () => {
    while (true){
        const depositAmount = prompt(" Enter a deposit amount: ");
        const numberdepositamount = parseFloat(depositAmount);
        
        if (isNaN(numberdepositamount) || numberdepositamount<=0){
            console.log("Invalid deposit, Try Again.");
        } else {
            return numberdepositamount;
        }
    }
};

const getnumoflines = () => {
    while (true){
        const lines=prompt("Enter the number of lines to bet on (1-3)");
        const numoflines= parseFloat(lines);

        if (isNaN(numoflines) || numoflines<=0 || numoflines>3){
            console.log("Invalid Input, Try Again.");
        } else {
            return numoflines;
        }
    }
}

const getbet = (balance,lines) => {
    while (true) {
        const bet = prompt("Enter the total bet: ");
        const numberbet = parseFloat(bet);

        if (isNaN(numberbet) || numberbet<=0 || numberbet >balance/lines){
            console.log("Invalid Input, Try Again.");
        } else {
            return numberbet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i=0; i<count; i++){
            symbols.push(symbol);
        }
    } 
    
    const reels = [];
    for (let i =0; i<COLS; i++){
        reels.push([]);
        const reelsymbols= [...symbols];
        for (let j=0; j<ROWS;j++){
            const randomindex = Math.floor(Math.random()*reelsymbols.length);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomindex,1);
        }
    }
    return reels;
};

const transpose = (reels)=>{
    const rows =[];
    for (let i =0; i<COLS; i++){
        rows.push([]);
        for (let j=0; j<ROWS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows
};

const printrows = (rows) => {
    for (const row of rows) {
        let rowstring = "";
        for (const [i,symbol] of row.entries()){
            rowstring += symbol
            if (i!= row.length-1){
                rowstring +=" | "
            }
        }
        console.log(rowstring)
    }
};

const getwinnings = (rows, bet, lines) => {
    let winnings =0;

    for (let row = 0; row<lines; row++){
        const symbols= rows[row];
        let allsame= true;

        for (const symbol of symbols) {
                if (symbol!= symbols[0]){
                    allsame= false;
                    break;
                }
        }
        
        if (allsame){
            winnings += bet*SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance= deposit();

    while (true){
        console.log("You have a balance of $"+balance);
        const numoflines= getnumoflines();
        const bet= getbet(balance,numoflines);
        balance-= bet*numoflines;
        const reels = spin();
        const rows= transpose(reels);
        printrows(rows);
        const winnings =getwinnings(rows, bet, numoflines);
        balance+=winnings;
        console.log("You won, $"+winnings.toString());
        if (balance<=0){
            console.log("You ran out of money");
            break;
        }
        const playagain=prompt("Do you want to play again?");
        if (playagain!="y") break;
    }
};

game();
