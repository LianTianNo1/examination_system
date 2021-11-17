// 导入模块
const xlsx = require('node-xlsx')
const fs = require('fs')
const os = require('os')
const { info } = require('console')
// 桌面路径
const homedir = os.homedir()
// 保存db的地址
let db_path = `${__dirname}//files//作业汇总-软件需求.xlsx`
let obj = null

try {
  obj = xlsx.parse(db_path)
} catch (error) {
  throw new Error('读取失败' + error)
}
let list1 = [],
  list2 = [],
  list3 = []
const read_data = obj[0]['data']
read_data.forEach((info) => {
  // if (info[0] >= 0 && info[0] <= 73) {
  //   list1.push(info)
  // } else if (info[0] <= 86 && info[0] >= 81) {
  //   list2.push(info)
  // } else if (info[0] >= 101 && info[0] <= 120) {
  //   list3.push(info)
  // }
})

console.log(list1)
console.log(list2)
console.log(list3)

const $container = $('.container')
// function createItem(){
//   dis
// }

list1.forEach((info, index) => {
  $(`<div class="item">
  <div class="title">${index + 1}:${info[1]}</div>
  <div class="chooseItem">
    <input type="radio" name="${info[1]}" value="A" />
    <p class="choose_text">${info[3]}</p>
  </div>
  <div class="chooseItem">
    <input type="radio" name="${info[1]}" value="B" />
    <p class="choose_text">${info[4]}</p>
  </div>
  <div class="chooseItem">
    <input type="radio" name="${info[1]}" value="C" />
    <p class="choose_text">${info[5]}</p>
  </div>
  <div class="chooseItem">
    <input type="radio" name="${info[1]}" value="D" />
    <p class="choose_text">${info[6]}</p>
  </div>
  <input type="hidden" name="${info[1]}" value="${info[2]}">
</div>`).appendTo($container)
})

// list2.forEach((info, index) => {
//   $(`<div class="item">
//   <div class="title">${index + 1}:${info[1]}</div>
//   <div class="chooseItem">
//     <input type="checkbox" name="${info[1]}" value="A" />
//     <p class="choose_text">${info[3]}</p>
//   </div>
//   <div class="chooseItem">
//     <input type="checkbox" name="${info[1]}" value="B" />
//     <p class="choose_text">${info[4]}</p>
//   </div>
//   <div class="chooseItem">
//     <input type="checkbox" name="${info[1]}" value="C" />
//     <p class="choose_text">${info[5]}</p>
//   </div>
//   <div class="chooseItem">
//     <input type="checkbox" name="${info[1]}" value="D" />
//     <p class="choose_text">${info[6]}</p>
//   </div>
//   <input type="hidden" name="${info[1]}" value="${info[2]}">
// </div>`).appendTo($container)
// })
const $items = $('.item')
let $index = 0
$items
  .eq($index)
  .addClass('flag')
  .show()
  .siblings('.item')
  .removeClass('flag')
  .hide()

const $next = $('.next')
$next.eq(0).show().siblings('button').hide()
$next.eq(0).on('click', function () {
  $index++
  if ($index > list1.length) {
    $(this).hide()
    $next.eq(1).show()
    // $index = 80
    $items
      .eq($index)
      .addClass('flag')
      .show()
      .siblings('.item')
      .removeClass('flag')
      .hide()
    return
  }
  const you_result = $('.flag input[type="radio"]:checked').val()
  const correct = $('.flag input[type="hidden"]').val()
  if (you_result !== correct) {
    $('.flag').addClass('error')
  }
  // console.log()
  $items
    .eq($index)
    .addClass('flag')
    .show()
    .siblings('.item')
    .removeClass('flag')
    .hide()
})
const $error_list = $('.error_list')
$next.eq(1).on('click', function () {
  console.log($items.eq($index))
  if ($index >= 78) {
    $container.hide()
    $('.error').children('input[type="hidden"]').attr('type', 'text')
    $('.error').show().appendTo($error_list)
    $error_list.show()
  }
  const you_result = $('.flag input[type="checkbox"]:checked')
  console.log(you_result)
  let total_str = ''
  you_result.each((index, info) => {
    info = $(info)
    total_str += info.val()
  })
  const correct = $('.flag input[type="hidden"]').val()
  console.log(correct, total_str)
  if (total_str !== correct) {
    $('.flag').addClass('error')
  }
  $index++
  console.log($index)
  $items
    .eq($index)
    .addClass('flag')
    .show()
    .siblings('.item')
    .removeClass('flag')
    .hide()
})
