'use strict'

let mainInfo = {
   name: 'Madiar',
   surname: 'Shakhman',

   dateofBirth: {
      day: 11,
      month: 1,
      year: 1995
   }
}




//Общее количество затраченных часов
function totalTime(arr) {
   const totalCount = arr.reduce((acc, curr) => acc + curr.time, 0)
   console.log(Math.ceil(totalCount / 60));
}
totalTime(timeForCode)


//Количество затраченных часов по месяцам
function timeByMonth(arr, month) {
   const filterMonth = arr.filter(item => item.month === month) //отфильтрованные месяца по аргументу функции
   const countTime = filterMonth.reduce((total, curr) => {   //сумма времени
      return total + curr.time
   }, 0)
   console.log(Math.ceil(countTime / 60));
}
timeByMonth(timeForCode, 10)

