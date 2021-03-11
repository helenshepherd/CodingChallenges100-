// Exercise 1
// function that takes in the numerator and denominator of a fraction, reduces the fraction to its lowest possible terms,
// and returns the numerator and denominator of the new fraction

function reduceFraction(num, den){
    //find greatest common denonimator of the numerator and denominator
    // Code to find greatest common deominator adapted from https://www.freecodecamp.org/news/how-to-use-the-euclidean-algorithm-to-find-the-greatest-common-divisor-gcd/
    // accessed 7.12.2020, rewritten to use x and y, brackets added, code to find denominator, and to return new fraction, added
    // end of referenced code.
    function gcd(x,y){
        if (y==0){
            return x;
        }
        else{
            return gcd(y, (x%y));
        }  
    };
let denominator = gcd(num,den);
// divide each number by highest denominator to create new fraction
return [num/denominator,den/denominator];
}


// Exercise 2
// function that checks if a date is 'magic' ie if the day * month = last two digits of the year
function isMagicDate(day, month, year){
    //grab last two digits of the year
    let lastTwoYear = year.toString().slice(-2);
    //check if day * month is equal to lastTwoYear
    if (day*month == lastTwoYear){
        return true;
    }
    else{
        return false;
    }
}

// Exercise 3
// function that takes in an array and returns an array of all possible subarrays
function sublist(l){
//create new array for subarrays, including blank subarray    
let subarrays = [[]];  
//for each item in l, append that item plus each subarray beginning with it to the array of subarrays
l.forEach((item,index) => {
    //add from the current index position to the index position + a length that starts at 1 and increases until the end of the array
    for (let length = 1; length < (l.length)-index+1; length++){
        subarrays.push(l.slice(index,(index+length)));
    }
});
return subarrays;
}

// Exercise 4
//function that takes in a word and returns the pigLatin form of the word
function pigLatin(word){
    // set up strings to use as checks for consonants, vowels and punctuation
    let consonants = "bcdfghjklmnpqrstvwxyz";
    let vowels = "aeiou";
    let punctuation = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\";
    //check whether the word begins with an Upper Case letter
    let checkUpper = (word[0]===word[0].toUpperCase());
    //reverse the string and check for punctuation at the end
    let reversedWord = word.split("").reverse();
    let puncReversed = "";
    reversedWord.forEach(element => {
        if (punctuation.includes(element)){
            puncReversed += element;
            word = word.slice(0,-1);    
        }
    });
    //reverse selected punctuation back to original text direction
    let punc = puncReversed.split("").reverse().join("");
    //if the word begins with a vowel, add 'way' to end + any original punctuation     
    if (vowels.includes(word[0].toLowerCase())){
            return word+'way'+punc;
    }
    //if the word begins with a consonant, grab the start of the word up til the first vowel, add this into 'initialString'
    else{
        let initialString = "";
        for (let i=0; i<word.length; i++){
            if (consonants.includes(word[0].toLowerCase())){
                initialString += word[0];
                word = word.slice(1);
            }
            else{
                break;
            }
        }
        //if the word began with a capital, capitalise the new first letter and make the original first letter lower case
        if (checkUpper ==  true){
            return word[0].toUpperCase()+word.slice(1)+initialString.toLowerCase()+'ay'+punc;
        }
        //if the word began with a lower case letter, return the word as lower case
        else{
            return word+initialString+'ay'+punc;
        }
    }
}   

// Exercise 5
//function that takes in a message and returns it in morse code
function morseCode(message){
    //dictionary with morse code values for letter keys
    let morseDict = {
        'a':'.-','b':'-...','c':'-.-.', 'd':'-..', 'e':'.', 'f':'..-.', 'g':'--.', 'h':'....', 'i':'..', 'j':'.---', 
        'k':'-.-', 'l':'.-..', 'm':'--', 'n':'-.', 'o':'---', 'p':'.--.', 'q':'--.-', 'r':'.-.', 's':'...', 't':'-', 
        'u':'..-', 'v':'...-', 'w':'.--', 'x':'-..-', 'y':'-.--', 'z':'--..', '1':'.----', '2':'..---', '3':'...--', 
        '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.', '0':'-----'
    };
    //blank array to collect each letter when converted to morse code
    let morseWord = [];
    //for each letter, append the morse code equivalent to the morseWord array, ignoring capitalisation and punctuation
    Array.from(message).forEach(letter => {
        if (letter.toLowerCase() in morseDict){
            morseWord.push(morseDict[letter.toLowerCase()]);
        }
    });
    //join the letters in the morseWord array into a string with spaces between letters
    return morseWord.join(" ");  
}

//Exercise 6
//function to convert inputted integer into a string of the text equivalent of the number
function int2Text(num){
    //dictionaries with text values for integer keys
    let dictTo20 = {
        0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine', 10:'ten', 11:'eleven', 
        12:'twelve', 13:'thirteen', 14:'fourteen', 15:'fifteen', 16:'sixteen', 17:'seventeen', 18:'eighteen', 19:'nineteen'
    };
    let dictTens = {
        2:'twenty', 3:'thirty', 4:'forty', 5:'fifty', 6:'sixty', 7:'seventy', 8:'eighty', 9:'ninety'
    };
    //function to deal with numbers less than 100
    function tens(num){
        //check length to check if number is less than or greater than 10
        let length = num.toString().length;
        let tensArray = Array.from(num.toString()).map(Number);
        //if number is less than 10, return text value of number using dictTo20       
        if(length==1){
            return `${dictTo20[tensArray[0]]}`;
        }
        if(length==2){
            //if number is between 10 and 19, return text value of number using dictTo20
            if (10<=num && num<=19){
                return `${dictTo20[num]}`;
            }
            //if number is greater than 19, return text value by grabbing value of first digit from dictTens 
            //and second digit from dictTo20
            else{
                return `${dictTens[tensArray[0]]} ${dictTo20[tensArray[1]]}`;
            }
        }
    }
    //convert number to string and check length
    let stringNum = num.toString();
    let length = stringNum.length;
    //create array of individual digits from number
    let numArray = Array.from(num.toString()).map(Number); 
    //if number is less than 100, use tens function to return text equivalent
    if (length<3){
        return tens(num);
    }
    //if number is a round hundred, return text value from dictTo20 + 'hundred'
    else{
        if (numArray[1]==0 && numArray[2]==0){ 
                return `${dictTo20[numArray[0]]} hundred`;
            }
    //otherwise use dictTo20 and tens function to generate text equivalent   
        else{ 
            return `${dictTo20[numArray[0]]} hundred ${tens(parseInt(stringNum.slice(1)))}`;
        }
    }    
}

// Exercise 7
//function to take in a filename and return an array of the names of any functions within the file that are not preceded by a comment
function missingComment(filename){
    // open file and create array of each line
    // Code to open file adapted from https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array
    // accessed 8.12.2020, variable names changed and let used instead of var
    // end of referenced code.
    let fs = require("fs");
    let text = fs.readFileSync(filename).toString('utf-8');
    let lineArray = text.split("\n");
    //create array to collect names of functions with missing comments
    let missingCommentArray = []; 
    //function to grab the name of a function
    function grabFunctionName(line){
        return (line.slice(9,(line.indexOf('('))));
    }          
    lineArray.forEach((line,index) => {
       //check if each line begins with 'function ' to find functions
        if (line.slice(0,9) == 'function '){
            let previousLine = lineArray[index-1];
            //if this is the first line in the file, add the function name to missingCommentArray
            if (index==0){ 
                missingCommentArray.push(grabFunctionName(line));
            } 
            //if the preceding line is too short for a comment, add the function name to missingCommentArray
            else if (previousLine.length < 3){
                missingCommentArray.push(grabFunctionName(line));
            } 
            //if the preceding line contains text that does not begin with '//' (ie. is not a comment), add the function nameto missingCommentArray
            else if (!previousLine.startsWith('//')){
                missingCommentArray.push(grabFunctionName(line));
            }
        }
    });
        return(missingCommentArray);
}

// Exercise 8
//function that takes in a filename and a maximum line length and returns the file text as an array of lines filled as
//much as possible without exceeeding the maximum length
function consistentLineLength(filename, length){
    //open file, reading all lines and joining them into one string
    // Code to open file adapted from https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array
    // accessed 8.12.2020, variable names changed and let used instead of var
    // end of referenced code.
    let fs = require("fs");
    let allOriginalLines = (fs.readFileSync(filename).toString('utf-8')).split("\n");
    //remove any blank lines
    let originalLinesNoBlanks = allOriginalLines.filter((element) => {return element != ''});
    let originalLines = originalLinesNoBlanks.join(" ");
    //split the text into array of words
    let originalWords = originalLines.split(" "); 
    //create array to add lines of text into
    let newLines = []; 
    //create string to build each line
    let line = ""; 
    while (originalWords.length > 0){ 
        //while there are still words left in originalWords
        //for the first word in the line, check that it will fit within maximum length and if so, add it
        //(if not return error message)
        if (line == ''){
            if (originalWords[0].length<=length){
                line = line+originalWords.shift();
            }
            else{
                return 'line length is less than the length of some words';
            }
        }
        //if not first word on line, check whether a space + the word will fit and if so, add to line
        else{
            if ((line.length+(originalWords[0].length)+1)<=length){
                line = line+' '+originalWords.shift();
            }
        //if adding the next word would exceed maximum length, add the line to 'newLines' and start a blank line
            else{
                newLines.push(line);
                line = "";
            }
        }  
    }
    //once all filled lines have been added, add any remaining text on the last line to newLines
    newLines.push(line);
    return newLines;
}

// Exercise 9
//function that takes in a start position, end position and maximum number of moves and returns true if it's possible for 
// a knight to reach the end position from the start in the given number of moves, and false if not
function knight(start, end, moves){     
    // create string to find index positions of letters
    let letters = 'abcdefgh'; 
    //function that takes in a grid reference and converts it to a string of a position
    function convertCoordToString([x,y]){
        return `${letters[x-1]}${y}`;
    }
    //function to check whether a position in on the board
    function isOnBoard(position){
        return position[0]>0 && position[0]<=8 && position[1]>0 && position[1]<=8;
    }
    //function that takes in a starting position and returns a knight's possible end positions
    function possEnds(startPosition,count,moves){
        let startX = (letters.indexOf(startPosition[0]))+1;
        let startY = parseInt(startPosition[1]);
        //create array of all possible end positions
        let possibleEndCoords = [[startX+1,startY+2],[startX+1,startY-2], [startX+2,startY+1], [startX+2,startY-1], 
        [startX-1,startY-2],[startX-2,startY+1],[startX-2,startY-1],[startX-2,startY+1]]; 
        //filter this array to remove any coordinates that are not on the board
        endPositionsOnBoard = possibleEndCoords.filter(position => isOnBoard(position)).map(coordinate => convertCoordToString(coordinate));
        //create set of all possible ends to remove duplicates
        let possibleEndsFinal = new Set(endPositionsOnBoard);
        //check whether the given end position has been reached
        if (possibleEndsFinal.has(end)){
            return true;
        }
        //check whether the maximum number of moves has been reached
        else if (count==moves){
            return false;
        }
        //if not, find the possible end positions from each of the previous turn's end positions
        // and check if given end position can be reached
        else{
            count++;
            return Array.from(possibleEndsFinal).some(coordinate => {
                if (possEnds(coordinate,count,moves)){
                    return true;
                }  
                else{
                    return false;
                }
            });
        }
    }
    return possEnds(start,1,moves);
}

// Exercise 10
//function that takes in an array of strings representing an initial environment and returns
//the next state after the War of Species rules have been applied
function warOfSpecies(environment){
    //function that takes in a start position (x and y) and the grid length and width (xmax and ymax),
    //checks what the neighbouring positions within the grid are, and creates a string of the characters in these positions 
    function neighbours(x,y,xmax,ymax){
        let neighbours = [];
        if (y-1>=0){
            neighbours.push(environment[x][y-1]);
        }     
        if (y+1<ymax){
            neighbours.push(environment[x][y+1]);
        }
        if (x-1>=0){
            neighbours.push(environment[x-1][y]);
            if (y-1>=0){
                neighbours.push(environment[x-1][y-1]);
            }
            if (y+1<ymax){
                neighbours.push(environment[x-1][y+1]);
            }           
        }
        if (x+1<xmax){
            neighbours.push(environment[x+1][y]);
            if (y-1>=0){
                neighbours.push(environment[x+1][y-1]);
            }  
            if (y+1<ymax){
                neighbours.push(environment[x+1][y+1]);
            }        
        }
        return neighbours.join('');
    }
    //find length and width of grid
    let xmax = environment.length;
    let ymax = environment[0].length;
    //array to collect the strings that represent the end state of the environment
    let endState = [];
    //for each character in each string, use neighbours function to generate string of the neigbouring characters
    for (let xCoord=0; xCoord<xmax; xCoord++){
        let newStates = [];
        for (let yCoord=0; yCoord<ymax; yCoord++){
            let neighboursString = neighbours(xCoord,yCoord,xmax,ymax);
            //check the current character and the number of Xs and Os in the neighbouring characters
            let currentState = environment[xCoord][yCoord];
            // Code to count occurrences of character in string adapted from https://www.techiedelight.com/count-occurrences-character-string-javascript/
            // accessed 14.12.2020, regex adapted to search for 'X' and 'O', variable names changed, let used instead of var
            // end of referenced code.
            let Xs = ((neighboursString.match(/X/g) || []).length);
            let Os = ((neighboursString.match(/O/g) || []).length);
            //using the rules of War of Species, convert each current character to its new state
            //append each new state to the newStates array
            if (currentState == '.'){
                if (Xs>=2 && Xs>Os){
                    newStates.push('X');
                }
                else if(Os>=2 && Os>Xs){
                    newStates.push('O');
                }
                else{
                    newStates.push('.');
                }       
            }
            else if ((Xs+Os)>6){
                newStates.push('.');
            }
            else if (currentState =='X' && Xs<3){
                newStates.push('.');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            }    
            else if (currentState =='O' && Os<3){
                newStates.push('.');
            }
            else if (currentState =='X' && Os>Xs){
                newStates.push('.');                          
            }                                                                                                       
            else if (currentState =='O' && Xs>Os){                                 
                newStates.push('.');
            }  
            else{
                newStates.push(currentState);
            }   
        }       
        //once all the characters in a string have been converted, add this string of new states to the endState array
        endState.push(newStates.join(''));
    }    
    return endState;
}                                                                                                                                                                                                                                                                                                                     
  

module.exports = {
    reduceFraction: reduceFraction,
    isMagicDate: isMagicDate,
    sublist: sublist,
    pigLatin: pigLatin,
    morseCode: morseCode,
    int2Text: int2Text,
    missingComment: missingComment,
    consistentLineLength: consistentLineLength,
    knight: knight,
    warOfSpecies: warOfSpecies
}
