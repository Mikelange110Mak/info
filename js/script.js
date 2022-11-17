'use strict'

window.addEventListener('DOMContentLoaded', () => {

   const form = document.querySelector('.period'),
      formAdd = document.querySelector('.add'),
      periodRow = document.querySelector('.period__row'),
      averageContent = document.querySelector('.period__average');



   //Кнопка получения данных
   form.addEventListener('submit', (e) => {
      e.preventDefault()
      const n = document.getElementById('month').value;
      getData(+n)
   })


   //Кнопка отправки данных
   formAdd.addEventListener('submit', (e) => {
      e.preventDefault()
      postData(formAdd)
   })


   //Функция отправки данных
   function postData(formSelector) {
      let formData = new FormData(formSelector);
      formData.append("id", Math.random())

      let obj = {};
      formData.forEach((value, key) => {
         console.log(key);
         obj[key] = +value;
      })
      console.log(obj);

      axios.post("http://localhost:3000/timeForCode", obj)
   }

   //Функция получения данных
   function getData(monthSelect) {
      getResource("http://localhost:3000/timeForCode")
         .then(data => timeByMonth(data.data, monthSelect))
         .catch(err => console.error(err))
   }



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


   //Функция подсчета затраченного времени по месяцам
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
