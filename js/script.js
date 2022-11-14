'use strict'

window.addEventListener('DOMContentLoaded', () => {

   let mainInfo = {
      name: 'Madiar',
      surname: 'Shakhman',

      dateofBirth: {
         day: 11,
         month: 1,
         year: 1995
      }
   }

   const resultOutput = document.querySelector('.period__result'),
      monthSelector = document.querySelector('.period__month-input'),
      monthPeriod = document.getElementById('month').selectedIndex,
      periodBtn = document.querySelector('.period__button'),
      form = document.querySelector('.period');


   //let selectedValue = monthSelector.options[month.selectedIndex].value;
   //console.log(+selectedValue);



   form.addEventListener('submit', (e) => {
      e.preventDefault()
      const n = document.getElementById('month').value;
      console.log(+n);
      req(+n)
   })















   function req(monthSelect) {

      /*
      //Делаю POST запрос
      let body = {
         hours: 'Some',
         month: '',
         id: Math.random() //Обязательно должен быть id
      };

      let json = JSON.stringify(body);

      const request = new XMLHttpRequest();

      request.open("POST", "http://localhost:3000/timeForCode")

      request.setRequestHeader("Content-type", "application/json; charset=utf-8");

      request.send(json);


      request.addEventListener('load', () => {
         //Если стадия запроса равна 4 и статус запроса 200
         if (request.status === 200) {
            //request.response - полученный ответ от сервера
            let data = JSON.parse(request.response)
            console.log(data);


         } else console.error('Что-то пошло не так :(')

      })
*/

      /*
      //Создаем запрос
      fetch("http://localhost:3000/timeForCode")
         //Получаем данные, и у фетча есть метод парса json
         .then(data => data.json())
         //После этого по цепочке, его надо обработать, я вызываю функцию
         .then(data => timeByMonth(data, 11))
         //обработать ошибки:
         .catch(err => console.error(err))
         */

      //Вместо fetch запроса выше, использую обновленный со вспомогательной функцией:

      getResource("http://localhost:3000/timeForCode")
         //.then(data => timeByMonth(data.data, monthPeriod + 1, +dayValue))
         .then(data => timeByMonth(data.data, monthSelect))
         .catch(err => console.error(err))


   }


   //req()

   //Вспомогательная функция которая будет оптимизировать и проверять fetch запросы
   async function getResource(url) {
      const res = await axios(`${url}`);

      //внутри фетча, появляется свойство ок, которое понятно из названия говорит о том что запрос выполнен
      if (res.status !== 200) throw new Error(`Couldn't fetch ${url}, status ${res.status}`);

      return await res;
   }


   /*
      //Общее количество затраченных часов
      function totalTime(arr) {
         const totalCount = arr.reduce((acc, curr) => acc + curr.time, 0)
         console.log(Math.ceil(totalCount / 60));
      }
      totalTime(data)
   */


   function createColumns(arr, selector) {
      for (let el of arr) {

         let newColumn = document.createElement('li')
         newColumn.innerHTML = `
      ${el}
      `
         selector.append(newColumn)
      }
   }


   //Количество затраченных часов по месяцам
   function timeByMonth(arr, month) {
      if (arr) {
         const filterMonth = arr.filter(item => item.month === month) //отфильтрованные месяца по аргументу функции

         //Разбитие на массивы по дням/времени/оценки
         const dayfilter = filterMonth.map(item => item.day)
         const timefilter = filterMonth.map(item => item.time)
         const ratefilter = filterMonth.map(item => item.rate)

         //Получение элементов колонок дней/времени/оценки
         const dayColumn = document.getElementById('daylist')
         const timeColumn = document.getElementById('timelist')
         const rateColumn = document.getElementById('ratelist')

         //Создание элементов в колонках
         createColumns(dayfilter, dayColumn)
         createColumns(timefilter, timeColumn)
         createColumns(ratefilter, rateColumn)

         //Получение среднего значения
         const averageCount = timefilter.reduce((a, b) => (a + b), 0)
         console.log(Math.round(averageCount / dayfilter.length));
         const averageContent = document.querySelector('.period__average');
         averageContent.innerHTML = `
   Среднее значение в минутах = ${Math.round(averageCount / dayfilter.length)}
   `
      } else console.log('none');



   }



})






/*
function timeByMonth(arr, month) {
   const filterMonth = arr.filter(item => item.month === month) //отфильтрованные месяца по аргументу функции
   const countTime = filterMonth.reduce((total, curr) => {   //сумма времени
      return total + curr.time
   }, 0)

   let monthText = '';
   switch (true) {
      case (month === 1): monthText = 'Январь'; break;
      case (month === 2): monthText = 'Февраль'; break;
      case (month === 3): monthText = 'Март'; break;
      case (month === 4): monthText = 'Апрель'; break;
      case (month === 5): monthText = 'Май'; break;
      case (month === 6): monthText = 'Июнь'; break;
      case (month === 7): monthText = 'Июль'; break;
      case (month === 8): monthText = 'Август'; break;
      case (month === 9): monthText = 'Сентябрь'; break;
      case (month === 10): monthText = 'Октябрь'; break;
      case (month === 11): monthText = 'Ноябрь'; break;
      case (month === 12): monthText = 'Декабрь'; break;
   }

   if (countTime !== 0) {
      resultOutput.innerHTML = `
<div class="period__result-hours">${Math.ceil(countTime / 60)} часов за ${monthText} месяц</div>
`;
   } else {
      resultOutput.innerHTML = `
<div class="period__result-hours">Нет данных за ${monthText} месяц</div>
`;
   }

   console.log(Math.ceil(countTime / 60));
}
timeByMonth(data, 11)
*/

