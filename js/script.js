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

   const form = document.querySelector('.period'),
      periodRow = document.querySelector('.period__row'),
      averageContent = document.querySelector('.period__average');


   form.addEventListener('submit', (e) => {
      e.preventDefault()
      const n = document.getElementById('month').value;
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


   //Функция создания колонок с данными
   function createColumns(arr, column, average) {
      column.innerHTML = ''
      if (arr.length > 0) {
         periodRow.classList.remove('hide');
         for (let el of arr) {
            let newColumn = document.createElement('li')
            newColumn.innerHTML =
               `${el}`;
            column.append(newColumn);

         }
         averageContent.innerHTML =
            `Среднее значение в минутах = ${Math.round(average / arr.length)}`;

      } else {
         averageContent.innerHTML = `Данные за этот месяц  отсутствуют`;
         periodRow.classList.add('hide');
      }


   }


   //Количество затраченных часов по месяцам
   function timeByMonth(arr, month) {

      const filterMonth = arr.filter(item => item.month === month) //отфильтрованные месяца по аргументу функции

      //Разбитие на массивы по дням/времени/оценки
      const dayfilter = filterMonth.map(item => item.day),
         timefilter = filterMonth.map(item => item.time),
         ratefilter = filterMonth.map(item => item.rate);

      //Получение элементов колонок дней/времени/оценки
      const dayColumn = document.getElementById('daylist'),
         timeColumn = document.getElementById('timelist'),
         rateColumn = document.getElementById('ratelist');

      //Получение среднего значения
      const averageCount = timefilter.reduce((a, b) => (a + b), 0)


      //Создание элементов в колонках (массив, колонка, среднее значение)
      createColumns(dayfilter, dayColumn, averageCount)
      createColumns(timefilter, timeColumn, averageCount)
      createColumns(ratefilter, rateColumn, averageCount)

   }



})


