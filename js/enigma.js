let rotor1 = ["L", "G", "Q", "N", "M", "W", " ", "Y", "V", "T", "E", "B", "O", "D", "U", "H", "Z", "F", "K", "P", "C", "S", "A", "J", "R", "I", "X"];
let rotor2 = [" ", "O", "V", "Z", "N", "D", "T", "K", "A", "Q", "L", "C", "J", "R", "W", "Y", "M", "P", "X", "I", "B", "G", "H", "F", "U", "E", "S"];
let rotor3 = ["M", "C", "K", "E", "U", "V", "N", "I", "T", "H", "P", "Z", "X", "Y", "F", "O", "Q", " ", "S", "A", "G", "J", "L", "B", "D", "W", "R"];
let rotor4 = ["E", "I", "W", "B", "P", "S", "T", "J", "C", "V", "O", "G", "K", "Z", "H", "F", "N", "L", " ", "M", "D", "R", "Y", "X", "Q", "A", "U"];
let rotor5 = ["J", "V", "U", "E", "Y", "O", "G", "I", "D", " ", "Q", "Z", "K", "H", "T", "R", "P", "X", "A", "W", "S", "B", "N", "M", "C", "L", "F"];

let initial1, initial2, initial3, oldInitial1, oldInitial2, oldInitial3, firstRotor, secondRotor, thirdRotor, inputTextCrypt, outputTextCrypt, inputTextDecrypt, outputTextDecrypt;

document.getElementById("bttCrypt").addEventListener("click", function() {
    initial1 = document.getElementById("initial1").value;
    initial2 = document.getElementById("initial2").value;
    initial3 = document.getElementById("initial3").value;
    oldInitial1 = initial1;
    oldInitial2 = initial2;
    oldInitial3 = initial3;

    getRotors();
});

document.getElementById("bttDecrypt").addEventListener("click", function() {
    initial1 = document.getElementById("initial1").value;
    initial2 = document.getElementById("initial2").value;
    initial3 = document.getElementById("initial3").value;
    oldInitial1 = initial1;
    oldInitial2 = initial2;
    oldInitial3 = initial3;

    getRotors();
});

inputTextCrypt = document.getElementById("cryptIn");
outputTextCrypt = document.getElementById("cryptOut");

document.getElementById("crypt").addEventListener("click", function (event) {
    let key = event.target;

    if(key.value === "") {
        inputTextCrypt.value += key.innerText;
    } else if(key.id === "space") {
        inputTextCrypt.value += " ";
    } else if(key.id === "erase" && inputTextCrypt.value.length > 0) {
        inputTextCrypt.value = inputTextCrypt.value.substr(0, inputTextCrypt.value.length - 1);
    } else if(key.id === "enter") {
        inputTextCrypt.value += "\r\n";
    }
    inputTextCrypt.dispatchEvent(new Event("input"));
});

inputTextCrypt.addEventListener("input", function(event) {
    outputTextCrypt.value = "";
    initial1 = oldInitial1;
    initial2 = oldInitial2;
    initial3 = oldInitial3;
    for(let i in inputTextCrypt.value) {
    	let letter = removeAccentOfChar(inputTextCrypt.value[i]).toUpperCase();
        if(plugs[letter] !== undefined) {
            outputTextCrypt.value += encryptLetter(parseInt(initial1), parseInt(initial2), parseInt(initial3), firstRotor, secondRotor, thirdRotor, plugs[letter]);
            rotorUp();
        } else {
            outputTextCrypt.value += letter;
        }
    }
});

inputTextDecrypt = document.getElementById("decryptIn");
outputTextDecrypt = document.getElementById("decryptOut");

document.getElementById("decrypt").addEventListener("click", function (event) {
    let key = event.target;

    if(key.value === "") {
        inputTextDecrypt.value += key.innerText;
    } else if(key.id === "space2") {
        inputTextDecrypt.value += " ";
    } else if(key.id === "erase2" && inputTextDecrypt.value.length > 0) {
        inputTextDecrypt.value = inputTextDecrypt.value.substr(0, inputTextDecrypt.value.length - 1);
    } else if(key.id === "enter2") {
        inputTextCrypt.value += "\r\n";
    }
    inputTextDecrypt.dispatchEvent(new Event("input"));
});

inputTextDecrypt.addEventListener("input", function(event) {
    outputTextDecrypt.value = "";
    initial1 = oldInitial1;
    initial2 = oldInitial2;
    initial3 = oldInitial3;
    for(let i in inputTextDecrypt.value) {
        if(plugs[inputTextDecrypt.value[i].toUpperCase()] !== undefined) {
            outputTextDecrypt.value += plugs[encryptLetter(parseInt(initial3), parseInt(initial2), parseInt(initial1), thirdRotor, secondRotor, firstRotor, inputTextDecrypt.value[i].toUpperCase())];
            rotorUp();
        } else {
            outputTextDecrypt.value += inputTextDecrypt.value[i].toUpperCase();
        }
    }
});

function encryptLetter(initial1, initial2, initial3, rotor_1, rotor_2, rotor_3, letter) {
    if(!rotor1.includes(letter)) {
        return letter;
    }

    let letter_index = rotor_1.indexOf(letter);
    return rotor_3[nextLetter(nextLetter(letter_index, initial1, initial2), initial2, initial3)];

    function nextLetter(letter, first_rotor, second_rotor) {
        let action = second_rotor + letter - first_rotor;
        if (action > 26) {
            action -= 27
        } else if (action < 0) {
            action += 27;
        }
        return action;
    }
}

function rotorUp() {
    if (initial1 < 26) {
        initial1++;
    } else {
        initial1 = 0;
        if (initial2 < 26) {
            initial2++;
        } else {
            initial2 = 0;
            if (initial3 < 26) {
                initial3++;
            } else {
                initial3 = 0;
            }
        }
    }
}

function getRotors() {
    let rotors = [rotor1, rotor2, rotor3, rotor4, rotor5];

    let elements = document.getElementById("rotor1").children;
    for(let i = 0; i < elements.length - 1; i++) {
        if(elements[i].children[0].checked) firstRotor = rotors[i];
    }

    elements = document.getElementById("rotor2").children;
    for(let i = 0; i < elements.length - 1; i++) {
        if(elements[i].children[0].checked) secondRotor = rotors[i];
    }

    elements = document.getElementById("rotor3").children;
    for(let i = 0; i < elements.length - 1; i++) {
        if(elements[i].children[0].checked) thirdRotor = rotors[i];
    }
}

function removeAccentOfChar(char) {
	let charWithAccent = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
	let charWithoutAccent = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";

	let indexAccent = charWithAccent.indexOf(char);
	if (indexAccent != -1) return charWithoutAccent.substr(indexAccent, 1);
	return char;
}