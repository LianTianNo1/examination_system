// 导入模块
const xlsx = require('node-xlsx')
const fs = require('fs')
const os = require('os')
const { info } = require('console')
// 桌面路径
const $choose_file = $('.choose_file')
const homedir = os.homedir()
const $container = $('.container')
// 保存db的地址
let db_path = `${__dirname}//files//作业汇总-软件需求.xlsx`
// 读取的文件对象
let obj = null
// 当前文件
let now_file
// 习题集
let list1 = []
// 当前题目
let $index = 0
// 所有的题目
let $items
// 上面栏
let $item_list = $('.item_list')
$item_list.on('click', 'li', function () {
  $index = $(this).index() - 1
  $items
    .eq($index)
    .addClass('flag')
    .show()
    .siblings('.item')
    .removeClass('flag')
    .hide()
})
$('.toggle').on('click', function () {
  if ($item_list.hasClass('toggle_class')) {
    $item_list.removeClass('toggle_class')
  } else {
    $item_list.addClass('toggle_class')
  }
})
// 下一题
const $next = $('.next')
// 读取文件
const $readFile = $('.showupload')
$readFile.on('click', function () {
  $choose_file.click()
})
$choose_file.on('change', function (e) {
  now_file = e.target.files[0]
  db_path = now_file['path']
  if (
    now_file['type'] !==
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return mytip('读取的文件不是xsl')
  try {
    obj = xlsx.parse(db_path)
    const read_data = obj[0]['data']
    const head_item = read_data[0]
    const title_index = head_item.findIndex((item) => item === '题目')
    const result_index = head_item.findIndex((item) => item === '答案')
    const A_index = head_item.findIndex((item) => item === 'A')
    const B_index = head_item.findIndex((item) => item === 'B')
    const C_index = head_item.findIndex((item) => item === 'C')
    const D_index = head_item.findIndex((item) => item === 'D')
    if (
      title_index === -1 ||
      result_index === -1 ||
      A_index === -1 ||
      B_index === -1 ||
      C_index === -1 ||
      D_index === -1
    ) {
      return mytip('读取的文件没有按照格式来写')
    }
    console.log(title_index, result_index, A_index, B_index, C_index, D_index)
    read_data.forEach((info, index) => {
      if (index > 0) {
        list1.push(info)
      }
    })
    console.log(list1, read_data)
    for (let i = 0; i < list1.length; i++) {
      $(`<li>${i + 1}</li>`).appendTo($item_list)
    }
    list1.forEach((info, index) => {
      $(`<div class="item">
      <div class="title">${index + 1}:${info[title_index]}</div>
      <div class="chooseItem">
        <input type="radio" name="${info[title_index]}" value="A" />
        <p class="choose_text">${info[A_index]}</p>
      </div>
      <div class="chooseItem">
        <input type="radio" name="${info[title_index]}" value="B" />
        <p class="choose_text">${info[B_index]}</p>
      </div>
      <div class="chooseItem">
        <input type="radio" name="${info[title_index]}" value="C" />
        <p class="choose_text">${info[C_index]}</p>
      </div>
      <div class="chooseItem">
        <input type="radio" name="${info[title_index]}" value="D" />
        <p class="choose_text">${info[D_index]}</p>
      </div>
      <div class="actual_result">正确答案：${info[result_index]}</div>
      <input type="hidden" name="${info[title_index]}" value="${
        info[result_index]
      }">
    </div>`).appendTo($container)
    })
    $items = $('.item')

    $items
      .eq($index)
      .addClass('flag')
      .show()
      .siblings('.item')
      .removeClass('flag')
      .hide()
  } catch (error) {
    return mytip('读取的文件失败')
  } finally {
    $readFile.hide()
    $next.show()
  }
})

// console.log(list1)

const $error_list = $('.error_list')
$('.container').on('click', '.flag>.chooseItem', function () {
  $(this).children('input').prop('checked', true)
})

$next.on('click', next_test)

function next_test() {
  $item_list.children('li').eq($index).addClass('done')
  $index++

  const you_result = $('.flag input[type="radio"]:checked').val()
  const correct = $('.flag input[type="hidden"]').val()
  if (you_result !== correct) {
    $('.flag').addClass('error')
  }
  if ($index >= list1.length) {
    $container.hide()
    $('.actual_result').show()
    $('.error').show().appendTo($error_list)
    $error_list.show()
    return false
  }
  // console.log()
  $items
    .eq($index)
    .addClass('flag')
    .show()
    .siblings('.item')
    .removeClass('flag')
    .hide()
}

//封装消息提示模块
function mytip(
  msg,
  backgroundColor = 'rgba(15, 160, 255,0.5)',
  borderColor = 'rgba(15, 160, 255,1)'
) {
  const tip = document.createElement('p')
  tip.className = 'mytip'
  tip.innerText = msg
  tip.style.borderColor = borderColor
  tip.style.backgroundColor = backgroundColor
  tip.onanimationend = function () {
    this.remove()
  }
  document.body.appendChild(tip)
}
