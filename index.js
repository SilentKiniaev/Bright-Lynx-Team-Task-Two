'use strict'

const varintsList = document.getElementById('variants-list');
varintsList.innerText = "Ожидание результата...";
const inputValue = document.getElementById('input-value');//Переменная, хранящая DOM-объект, в который будут передовться координаты фигуры

//Функция для проверки правильности ввода координат фигуры
const isCorrectCoord = (value) => {
	if(value.length === 2 && value.match(/[A-H][1-8]/)) return true;
	return false;
};

//Функция для проверки нахождения фигуры в пределах границ доски после шага
const isInRange = (value) => {
	//Число клеток шахматной фигуры по X и по Y равно 8, то есть [0..7]
	if(value > -1 && value < 8) return true;
	return false;
};

const findMove = (e) => {
	if(!isCorrectCoord(inputValue.value)) {
		varintsList.innerText = "Некорректный ввод";
		return false;
	} 
	const coord = inputValue.value.split("");//Преобразование строки координат в массив для работы поэлементно
	coord[0] = coord[0].charCodeAt() - 65;//преобразуем буквенную координату в числовую (отсчёт с 0)
	coord[1] -= 1;//(отсчёт с 0)
	let result = [];//Массив результатов
	console.log(coord)

	//Разбиение шага на 2 стадии
	const first = 2;//Первый шаг фигуры на 2 клетки вперёд или назад
	const second = 1;//Второй шаг на 1 клетку влево или вправо
	for(let i = 0; i < 2; i++){//Смена координат. Фигура будет двигаться на 2 шага вперёд/назад по X и на 1 шаг вправо/влеао по Y, если i == 0 и на оборот если i == 1.
		for(let j = -1; j <= 1; j+=2){//Позволяет перемещать фигуру на 2 шага вперёд(1)/назад(-1)
			for(let k = -1; k <= 1; k+=2){//Позволяет перемещать фигуру на 1 шаг вправо(1)/влево(-1)
				//Умножение firstStep/secondStep на j/k позволяет менять направление хода фигуры
				if(isInRange(coord[i] + (first*j)) && isInRange(coord[+!i] + (second*k))) {
					let coord1 = String.fromCharCode(coord[0] + 65 + (!i ? (first*j):(second*k)));//Если первый шаг был по X, то увеливаем/уменьшаем(опираясь на j) X на 2, иначе увеличиваем/уменьшаем(опираясь на k) X на 1
					let coord2 = coord[1] + 1 + (i ? (first*j):(second*k));//
					result.push(coord1+coord2);
				}
			}
		}		
	}	
	document.getElementById('variants-list').innerText = result.join(" ");//Запись массива результатов, преобразованного в строку при помощи метода join()
};

document.getElementById('calc-button').addEventListener('click', findMove);

document.getElementById('clean-button').addEventListener('click', () => { varintsList.innerText = "Ожидание результата..." });