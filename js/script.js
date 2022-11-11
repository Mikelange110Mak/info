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
      monthSelector = document.querySelector('.period__month-input');

   let selectedValue = monthSelector.options[month.selectedIndex].value;
   console.log(selectedValue);

   let dayValue = document.querySelector('.period__day-input').value
   console.log(dayValue);

   function req() {
      /*
      const request = new XMLHttpRequest();

      //Получение GET запроса, по адресу: (json-server)
      request.open("GET", "http://localhost:3000/timeForCode")

      //Заголовки (понимать серверу с какими данными он сейчас работает)
      request.setRequestHeader("Content-type", "application/json; charset=utf-8");

      //Запрос создан и сервер знает с какими данными он будет работать, теперь отправляем запрос
      request.send(); //Так как GET запрос, оставляем пустые скобки, если бы был POST, надо в скобки дописать какое-то body

      //Теперь можно взаимодействовать с сервером
      //Навешиваю обработчик readystatechange, который позволяет отслеживать стадии запроса, стадии запроса по ссылке
      //https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/readyState
      request.addEventListener('load', () => {
         //Если стадия запроса равна 4 и статус запроса 200
         if (request.status === 200) {
            //request.response - полученный ответ от сервера
            let data = JSON.parse(request.response)
            console.log(data);


            //Скопипастил свои функции:
            
            function totalTime(arr) {
               const totalCount = arr.reduce((acc, curr) => acc + curr.time, 0)
               console.log(Math.ceil(totalCount / 60));
               resultOutput.innerHTML = `
               <div class="period__result-hours">${Math.ceil(totalCount / 60)} часов</div>
               `
            }
            totalTime(data)

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
         .then(data => timeByMonth(data.data, 8))
         .catch(err => console.error(err))

   }

   req()


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



   //Количество затраченных часов по месяцам
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

      if (countTime !== 0) resultOutput.innerHTML = `
      <div class="period__result-hours">${Math.ceil(countTime / 60)} часов за ${monthText} месяц</div>
      `;

      else resultOutput.innerHTML = `
       <div class="period__result-hours">Нет данных за ${monthText} месяц</div>
       `;

      console.log(Math.ceil(countTime / 60));


   }



})




