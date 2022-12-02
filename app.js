document.getElementById('answer').readOnly = true;
let screen = document.getElementById('answer'); //это инпут если что
buttons = document.querySelectorAll('button');
let screenValue = '';

for (item of buttons) {
  item.addEventListener('click', (event) => {
    buttonText = event.target.innerText;

    //screenValue -- это пустая строка для обнуления
    //и поэтому, если в строке что-то есть,
    //мы оставляем возможность очищения

    if (buttonText == 'X') {
      buttonText = '*';
      //сохраняем значение поля 
      screenValue += buttonText;
      screen.value = screenValue;
    } else if (buttonText == 'C') {
      //почисти инпут
      screenValue = '';
      screen.value = screenValue;
    }
    
    else if (buttonText == '=') {
      checkForBracketMulti(); // автоматически считает, если нет скобок
      return;
      //а тут собсна само очищение
    } else {
      screenValue += buttonText;
      screen.value = screenValue;
    } 
  });
}

document.addEventListener('keydown', function (event) {
  console.log(event);
  if (event.shiftKey == 57) {
    event.key = '(';
  } else if (event.shiftKey == 48) {
    event.key = ')';
  } else if (event.shiftKey == 53) {
    event.key = '%';
  }
  if (event.key == 88) {
    screenValue += '*';
    screen.value = screenValue;
  }
  if (
    event.key <= 9 ||
    event.key == '+' ||
    event.key == '-' ||
    event.key == '*' ||
    event.key == '.' ||
    event.key == '/' ||
    event.key == '%' ||
    event.key == '(' ||
    event.key == ')'
  ) {
    screenValue += event.key;
    screen.value = screenValue;
  }

  if (event.key == 13 || event.key == 187) {
    checkForBracketMulti();
// автоматически оценивает, если нет скобок
  } else if (event.key == 46) {
    screenValue = '';
    screen.value = screenValue;
    console.clear();
  } else if (event.key == 8) {
    screenValue = screenValue.slice(0, -1);
    screen.value = screenValue;
  } else if (event.key == 67) {
    screenValue = '';
    screen.value = screenValue;
    console.clear();
  } else if (event.key == 82) {
    location.reload();
  }
});

window.onerror = function () {
  alert('PLEASE INPUT VALID EXPRESSION');
  screenValue = '';
  screen.value = screenValue;
  console.clear();
};

//на скобочное умножение
window.onBracketMultiplication = function () {
  //indexof -- поиск значений в массиве
  screenValue = addStr(screen.value, screen.value.indexOf('('), '*');
  screen.value = evaluate(screenValue);
};


function checkForBracketMulti() {
  // Проверяем, есть ли число непосредственно перед скобкой
  //includes ищет по индексу и возвращает тру или фолс
  //Метод charAt() возвращает указанный символ из строки.

  if (screen.value.includes('(')
   && !isNaN(screen.value.charAt(screen.value.indexOf('(') - 1))) {
    window.onBracketMultiplication();
    return;
  } else {
    screen.value = evaluate(screenValue);
  }
}
