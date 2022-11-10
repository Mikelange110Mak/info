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



   function req() {
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
            }
            totalTime(data)

            function timeByMonth(arr, month) {
               const filterMonth = arr.filter(item => item.month === month) //отфильтрованные месяца по аргументу функции
               const countTime = filterMonth.reduce((total, curr) => {   //сумма времени
                  return total + curr.time
               }, 0)
               console.log(Math.ceil(countTime / 60));
            }
            timeByMonth(data, 8)
            ////



         } else console.error('Что-то пошло не так :(')



      })
   }

   req()



   /*
      //Общее количество затраченных часов
      function totalTime(arr) {
         const totalCount = arr.reduce((acc, curr) => acc + curr.time, 0)
         console.log(Math.ceil(totalCount / 60));
      }
      totalTime(data)
   
   
     
      //Количество затраченных часов по месяцам
      function timeByMonth(arr, month) {
         const filterMonth = arr.filter(item => item.month === month) //отфильтрованные месяца по аргументу функции
         const countTime = filterMonth.reduce((total, curr) => {   //сумма времени
            return total + curr.time
         }, 0)
         console.log(Math.ceil(countTime / 60));
      }
      timeByMonth(timeForCode, 10)
      */

})




