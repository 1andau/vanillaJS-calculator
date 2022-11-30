


document.getElementsByClassName('answer').readOnly= true; 
let screen = document.getElementById('answer');
buttons = document.querySelectorAll("button");
let screenValue = '';

for(item of buttons){
    item.addEventListener('click', (event) =>{
        buttonText = event.targer.innerText; 
        
    })
}
