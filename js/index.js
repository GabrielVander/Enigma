var plugs = {" ": " ",
				"A": "A",
		        "B": "B",
		        "C": "C",
		        "D": "D",
		        "E": "E",
		        "F": "F",
		        "G": "G",
		        "H": "H",
		        "I": "I",
		        "J": "J",
		        "K": "K",
		        "L": "L",
		        "M": "M",
		        "N": "N",
		        "O": "O",
		        "P": "P",
		        "Q": "Q",
		        "R": "R",
		        "S": "S",
		        "T": "T",
		        "U": "U",
		        "V": "V",
		        "W": "W",
		        "X": "X",
		        "Y": "Y",
		        "Z": "Z",};

let options = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let divPlugs = document.getElementById("divPlugs");
let oldValue;

document.getElementById("bttStart").addEventListener("click", function() {
	document.getElementById("tab2").checked = true;
});

document.getElementById("bttBack").addEventListener("click", function() {
	document.getElementById("tab1").checked = true;
});

document.getElementById("bttCrypt").addEventListener("click", function() {
    initial1 = document.getElementById("initial1").value;
    initial2 = document.getElementById("initial2").value;
    initial3 = document.getElementById("initial3").value;
	getRotors();
	if(firstRotor === undefined || secondRotor === undefined || thirdRotor === undefined) {
		alert("Configure os rotores primeiro!");
		return;
	}
	if(divPlugs.children.length > 0) {
		if(divPlugs.children[divPlugs.children.length - 1].children[0].value === "" || divPlugs.children[divPlugs.children.length - 1].children[2].value === "") {
			alert("Configure o ultimo plug por favor!");
			return;
		}
		for(let i = 0; i < divPlugs.children.length; i++) {
			plugs[divPlugs.children[i].children[0].value] = divPlugs.children[i].children[2].value;
			plugs[divPlugs.children[i].children[2].value] = divPlugs.children[i].children[0].value;
		}
	}
	document.getElementById("tab3").checked = true;
});

document.getElementById("bttDecrypt").addEventListener("click", function() {
    initial1 = document.getElementById("initial1").value;
    initial2 = document.getElementById("initial2").value;
    initial3 = document.getElementById("initial3").value;
	getRotors();
	if(firstRotor === undefined || secondRotor === undefined || thirdRotor === undefined) {
		alert("Configure os rotores primeiro!");
		return;
	}
	if(divPlugs.children.length > 0) {
		if(divPlugs.children[divPlugs.children.length - 1].children[0].value === "" || divPlugs.children[divPlugs.children.length - 1].children[2].value === "") {
			alert("Configure o ultimo plug por favor!");
			return;
		}
		for(let i = 0; i < divPlugs.children.length; i++) {
			plugs[divPlugs.children[i].children[0].value] = divPlugs.children[i].children[2].value;
			plugs[divPlugs.children[i].children[2].value] = divPlugs.children[i].children[0].value;
		}
	}
	document.getElementById("tab4").checked = true;
});

document.getElementById("bttMoreRotor1").addEventListener("click", function() {
	let element = document.getElementById("initial1");
	if(element.value < 27) element.value++;
});

document.getElementById("bttLessRotor1").addEventListener("click", function() {
	let element = document.getElementById("initial1");
	if(element.value > 0) element.value--;
});

document.getElementById("bttMoreRotor2").addEventListener("click", function() {
	let element = document.getElementById("initial2");
	if(element.value < 27) element.value++;
});

document.getElementById("bttLessRotor2").addEventListener("click", function() {
	let element = document.getElementById("initial2");
	if(element.value > 0) element.value--;
});

document.getElementById("bttMoreRotor3").addEventListener("click", function() {
	let element = document.getElementById("initial3");
	if(element.value < 27) element.value++;
});

document.getElementById("bttLessRotor3").addEventListener("click", function() {
	let element = document.getElementById("initial3");
	if(element.value > 0) element.value--;
});

var conf_rotor_3=document.getElementsByClassName('rTres');
var conf_rotor_2=document.getElementsByClassName('rDois');
var conf_rotor_1=document.getElementsByClassName('rUm');

//rotor3
conf_rotor_3[0].addEventListener('click',function(){desabilitarRotores(0,conf_rotor_2,conf_rotor_1);});
conf_rotor_3[1].addEventListener('click',function(){desabilitarRotores(1,conf_rotor_2,conf_rotor_1);});
conf_rotor_3[2].addEventListener('click',function(){desabilitarRotores(2,conf_rotor_2,conf_rotor_1);});
conf_rotor_3[3].addEventListener('click',function(){desabilitarRotores(3,conf_rotor_2,conf_rotor_1);});
conf_rotor_3[4].addEventListener('click',function(){desabilitarRotores(4,conf_rotor_2,conf_rotor_1);});
//rotor2
conf_rotor_2[0].addEventListener('click',function(){desabilitarRotores(0,conf_rotor_3,conf_rotor_1);});
conf_rotor_2[1].addEventListener('click',function(){desabilitarRotores(1,conf_rotor_3,conf_rotor_1);});
conf_rotor_2[2].addEventListener('click',function(){desabilitarRotores(2,conf_rotor_3,conf_rotor_1);});
conf_rotor_2[3].addEventListener('click',function(){desabilitarRotores(3,conf_rotor_3,conf_rotor_1);});
conf_rotor_2[4].addEventListener('click',function(){desabilitarRotores(4,conf_rotor_3,conf_rotor_1);});
//rotor1
conf_rotor_1[0].addEventListener('click',function(){desabilitarRotores(0,conf_rotor_2,conf_rotor_3);});
conf_rotor_1[1].addEventListener('click',function(){desabilitarRotores(1,conf_rotor_2,conf_rotor_3);});
conf_rotor_1[2].addEventListener('click',function(){desabilitarRotores(2,conf_rotor_2,conf_rotor_3);});
conf_rotor_1[3].addEventListener('click',function(){desabilitarRotores(3,conf_rotor_2,conf_rotor_3);});
conf_rotor_1[4].addEventListener('click',function(){desabilitarRotores(4,conf_rotor_2,conf_rotor_3);});


//funcao para desabilar configuracoes dos outros rotores caso sejam iguais
function desabilitarRotores(x,outroRotor1, outroRotor2){
	for(var i=0;i<5;i++){
		if (i==x){
			outroRotor1[i].disabled=true;
			outroRotor2[i].disabled=true;
		}
		else{
			if (outroRotor2[i].checked==false) {
				outroRotor1[i].disabled=false;
			}
			if (outroRotor1[i].checked==false){
				outroRotor2[i].disabled=false;
			}
		}
	}
	
};

document.getElementById("bttMorePlug").addEventListener("click", function() {
	if(divPlugs.children.length > 12) {
		alert("Máximo de 13 plugs!");
		return;
	}
	if(divPlugs.children.length > 0) {
		if(divPlugs.children[divPlugs.children.length - 1].children[0].value === "" || divPlugs.children[divPlugs.children.length - 1].children[2].value === "") {
			alert("Configure o ultimo plug por favor!");
			return;
		}
	}

	let div = document.createElement("div");
	div.setAttribute("style", "float: left;");
	div.setAttribute("class", "div-default div-plugs");

	let select = document.createElement("select");
	select.setAttribute("class", "select-default select-plugs");

	let option;
	for(let i = 0; i < options.length; i++) {
		option = document.createElement("option");
		option.innerText = options[i];
		select.appendChild(option);
	}
	div.appendChild(select);

	let span = document.createElement("span");
	span.setAttribute("class", "text-default");
	span.setAttribute("style", "margin: auto 5px auto 5px;");
	span.innerText = ">>";
	div.appendChild(span);

	select = select.cloneNode(true);

	div.appendChild(select);

	div.addEventListener("click", function(event) {
		oldValue = event.target.value;
	});
	div.addEventListener("change", function(event) {
		let value = event.target.value;
		for(let i = 0; i < divPlugs.children.length; i++) {
			for(let j = 0; j < divPlugs.children[i].children.length; j++) {
				if(divPlugs.children[i].children[j] !== event.target) {
					if(value === divPlugs.children[i].children[j].value && value !== "") {
						alert("Não é permitido plugs duplicados!");
						event.target.value = oldValue;
					}
				}
			}
		}
	});

	divPlugs.appendChild(div);
});

document.getElementById("bttLessPlug").addEventListener("click", function() {
	if(divPlugs.children.length < 1) {
		alert("Nenhum plug definido!");
		return;
	}
	divPlugs.removeChild(divPlugs.children[divPlugs.children.length - 1]);
});

