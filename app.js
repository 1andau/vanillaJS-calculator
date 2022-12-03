document.getElementById('answer').readOnly = true;
let screen = document.getElementById('answer'); //это инпут если что
buttons = document.querySelectorAll('button');
let screenValue = '';

for (items of buttons) {
  items.addEventListener('click', (event) => {
    buttonText = event.target.innerText;

    if (buttonText == 'X') {
      buttonText = '*';
      screenValue += buttonText;
      screen.value = screenValue;

      //чистим инпут
    } else if (buttonText == 'C') {
      screenValue = '';
      screen.value = screenValue;
      //если нажата равно, вызывай
    } else if (buttonText == '=') {
      checkForBracketMulti();
      //иначе прост складывай
    } else {
      screenValue += buttonText;
      screen.value = screenValue;
    }
  });
}

document.addEventListener('keydown', function (event) {
  if (event.shiftKey == 'Digit9') {
    event.key = '(';
  } else if (event.shiftKey == 'Digit0') {
    event.key = ')';
  } else if (event.shiftKey == 'Digit5') {
    event.key = '%';
  }
  if (event.key == 'KeyX') {
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
  if (event.key == 'Enter' || event.key == 'Add') {
    checkForBracketMulti(); // automatically evaluates if no brackets
  } else if (event.key == 'Delete') {
    screenValue = '';
    screen.value = screenValue;
    console.clear();
  } else if (event.key == 'Backspace') {
    screenValue = screenValue.slice(0, -1);
    screen.value = screenValue;
  } else if (event.key == 'KeyC') {
    screenValue = '';
    screen.value = screenValue;
    console.clear();
  } else if (event.key == 'KeyR') {
    location.reload();
  }
});

window.onerror = function () {
  alert('PLEASE INPUT VALID EXPRESSION');
  screenValue = '';
  screen.value = screenValue;
  console.clear();
};


window.onBracketMultiplication = function () {
  screenValue = addStr(screen.value, screen.value.indexOf('('), '*');
  return new Function(screen.value + screenValue);
};


function checkForBracketMulti() {
  // Проверяем, есть ли число непосредственно перед скобкой
  //includes ищет по индексу и возвращает тру или фолс
  //Метод charAt() возвращает указанный символ из строки.

  //если содержимое инпута (screen) имеет скобку
  if (screen.value.includes('(') && !isNaN(screen.value.charAt(screen.value.indexOf('(') - 1))) {
    window.onBracketMultiplication();
    return;
  } else {
    screen.value = eval(screenValue);
  }
}

