
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS= 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUES ={
    A: 5,
    B : 4,
    C  : 3,
    D: 2
}


//  1. Deposit some money
const deposit = () => { 
    while (true) {
        const DepositAmount = prompt("Enter the Deposite Amount : ");
        const numberDepositeAmount = parseFloat(DepositAmount);
        if(isNaN(numberDepositeAmount)|| numberDepositeAmount<=0){
         console.log("Invalid deposite amount , Try again");
          }
          else{
             return numberDepositeAmount;
          }
        
    }

};
// 2. Determine number of lines to bet on 
const getNumberOfLines=()=>{
    while (true) {
        const lines = prompt("Enter the Number of Lines to bet on (1-3) : ");
        const numberOfLines = parseFloat(  lines);
        if(isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines> 3){
         console.log("Invalid Number of lines , Try again");
          }
          else{
             return  numberOfLines;
          }
        
    }
}
// 3. Collect the bet amount
const getBet=(balance, lines)=>{
    while (true) {
        const bet = prompt("Enter the total bet per line : ");
        const numberOfBet = parseFloat( bet);
        if(isNaN(numberOfBet)|| numberOfBet<=0 || numberOfBet> balance/lines){
         console.log(" Invalid bet , Try again");
          }
          else{
             return  numberOfBet;
          }
        
    }
};

// 4. Spin the slot machine

const spin=()=>{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i=0; i< COLS ;i++){ 
        reels.push([]);
        const realSymbols = [...symbols];
        for(let j=0;j< ROWS ; j++){
        const randomIndex = Math.floor(Math.random()*realSymbols.length)
        const selectedSymbol = realSymbols[randomIndex]
        reels[i].push(selectedSymbol);
        realSymbols.splice(randomIndex,1);
       }
    }
    return reels;
};

// 5. Check the user Win or Not

// Transpose of Matrix
const transpose = (reels)=>{
    const rows = []
    for(let i=0; i< ROWS ; i++){
        rows.push([]);
        for(let j=0;j<COLS ; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printRows = (rows)=>{
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString+=" | "
            }
        }
        console.log(rowString)
    }
};

// 6. Give the User Winnings

const getWinnings=(rows,bet , lines)=>{
    let winnings =0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame=true;
        for (const symbol of symbols) {
            if(symbol!= symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings+=bet*SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

// 6.Give the user their winnings 

const game=()=>{
  let balance = deposit();
 while(true){
    console.log("You have balance of $"+ balance);
   const NumberOfLines = getNumberOfLines();
   const bet = getBet(balance, NumberOfLines);
   balance -=bet*NumberOfLines;
   const reels = spin();
   const rows = transpose(reels);
   printRows(rows)
   const winnings= getWinnings(rows ,bet,NumberOfLines)
   balance+=winnings;
   console.log("You Won $"+ winnings.toString());
   if(balance<=0){
    console.log("You ran out of Money!")
    break;
   }
   const playAgain = prompt("Do You want to play again (y/n) ?");
   if(playAgain!='y') break;

}
};

game();

 


