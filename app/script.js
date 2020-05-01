"use strict";


let addBtn = document.getElementById("add");
let list = document.getElementById("todo")
let removeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M425.298 51.358h-91.455V16.696A16.7 16.7 0 0 0 317.147 0H194.854a16.7 16.7 0 0 0-16.696 16.696v34.662H86.703a16.7 16.7 0 0 0-16.696 16.696v51.357a16.7 16.7 0 0 0 16.696 16.696h338.593a16.7 16.7 0 0 0 16.696-16.696V68.054c.001-9.222-7.474-16.696-16.694-16.696zm-124.848 0h-88.9V33.4h88.9v17.967zM93.192 169.497l13.844 326.516c.378 8.937 7.735 15.988 16.68 15.988h264.568a16.7 16.7 0 0 0 16.68-15.989l13.843-326.515H93.192zM205.53 444.105a16.7 16.7 0 0 1-16.696 16.696 16.7 16.7 0 0 1-16.696-16.696V237.4a16.7 16.7 0 0 1 16.696-16.696 16.7 16.7 0 0 1 16.696 16.696v206.714zm67.163 0a16.7 16.7 0 0 1-16.696 16.696 16.7 16.7 0 0 1-16.696-16.696V237.4a16.7 16.7 0 0 1 16.696-16.696 16.7 16.7 0 0 1 16.696 16.696v206.714zm67.163 0a16.7 16.7 0 0 1-16.696 16.696 16.7 16.7 0 0 1-16.696-16.696V237.4a16.7 16.7 0 0 1 16.696-16.696 16.7 16.7 0 0 1 16.696 16.696v206.714z"/></svg>';
let whatTodo = document.querySelector('input');
let memory = [];

addBtn.addEventListener('click', function(){
    let text = whatTodo.value;
    if (text) {
        entryActions(text);
        storageAdd(text);
    }
});

document.addEventListener('keypress', function(e){
    let text = whatTodo.value;
    if (e.keyCode = 13 && text) {
        entryActions(text);
        storageAdd(text);
    }
});


function entryActions(text){
    let listElement = document.createElement("div");
    listElement.classList.add('div-element');
    listElement.innerHTML = text + '<button class="remove">' + removeIcon + '</button>';
    list.appendChild(listElement);
    whatTodo.value = "";

    let removeBtn = listElement.querySelector(".remove");
    removeBtn.addEventListener('click', removeEntry);
    
    
function removeEntry(){
        var child = this.parentNode;
		var index = 0;


		while (child.previousSibling)  {
			index++;
			child = child.previousSibling;
		};	

		storageRemove(index);
        this.parentNode.remove();
        
        function storageRemove(index) {
            for(let i = 0; i < memory.length; i++){
                if(i === index){
                    memory.splice(i, 1);
                }
            }
            localStorage.setItem("elements", memory);
        }
}
}

function storageAdd(text) {
    memory.push(text);
    localStorage.setItem("elements", memory);
}

if (localStorage.getItem('elements')) {
	memory = localStorage.getItem('elements').split(',');
}

if (memory.length) {
	for (let i = 0; i < memory.length; i++) {
        let text = memory[i];
		entryActions(text);
	}
}

