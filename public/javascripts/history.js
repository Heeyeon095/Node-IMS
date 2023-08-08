// list click
let sel;

$('.list-wrap table tr').click(function () {
  sel = $('.list-wrap table tr').hasClass('select');
  const i = document.querySelectorAll('tr.new-tr');
  if (i.length > 0) {
    return;
  } else {
    $('.list-wrap table tr').removeClass('select');
    $(this).addClass('select');
  }
});

// plus button
let plus = document.querySelector('button.plus');

/* function deleteEventHandler(event) {
  event.currentTarget.closest('tr.new-tr').remove();
} */

function clickPlus() {
  const _plus = [];
  const count = document.querySelectorAll('tr.new-tr');

  $('.list-wrap table tr').removeClass('select');

  if (count.length > 4) return;

  _plus.push(`<tr class="new-tr">`);
  _plus.push(`  <td>&nbsp;</td>`);
  _plus.push(`  <td><select name="code" id="code">`);
  Global_Goods.forEach((item) => {
    _plus.push(`    <option value="${item.goods_code}">${item.goods_name}</option>`);
  });
  _plus.push(`  </select></td>`);
  _plus.push(`  <td><input type="text" name="ex_date"></td>`);
  _plus.push(`  <td><select name="oi" id="oi">`);
  _plus.push(`    <option value="1">입고</option>`);
  _plus.push(`    <option value="0">출고</option>`);
  _plus.push(`  </select></td>`);
  _plus.push(`  <td><input type="number" name="count"></td>`);
  _plus.push(`  <td>&nbsp;</td>`);
  _plus.push(`  <td>&nbsp;</td>`);
  // _plus.push(`<button type="button" class="delete"> - </button></td>`);
  _plus.push(`</tr>`);

  // $('.list-table').prepend(_plus.join(''));
  document.querySelector('table.list-table tbody').insertAdjacentHTML('afterbegin', _plus.join(''));

  /* document.querySelectorAll('button.delete').forEach((el) => {
    // el.removeEventListener('click', deleteEventHandler);
    el.addEventListener('click', deleteEventHandler);

  }); */
  // $('button.delete').off('click')
  // $('button.delete').on('click', deleteEventHandler)
}

plus.addEventListener('click', clickPlus);

// document.querySelector('button.save').addEventListener('click', (e) => {
//   const elements = document.querySelectorAll('tr.new-tr');
//   const length = elements.length;

//   document.querySelectorAll('tr.new-tr').forEach((el) => el.remove());
//   for (let i = 0; i < length - 1; i++) {
//     clickPlus();
//   }
// });
document.querySelector('button.delete').addEventListener('click', (e) => {
  const element = document.querySelectorAll('table.list-table tbody > tr.new-tr')[
    document.querySelectorAll('table.list-table tbody > tr.new-tr').length - 1
  ];
  if (document.querySelectorAll('table.list-table tbody > tr.new-tr').length > 0) {
    element.remove();
  }
});

document.querySelector('button.delete').addEventListener('click', (e) => {
  const element = document.querySelectorAll('table.list-table tbody > tr.new-tr')[
    document.querySelectorAll('table.list-table tbody > tr.new-tr').length - 1
  ];
  if (document.querySelectorAll('.select').length > 0) {
    // let sidx = $('.list-wrap table tr').hasClass('select').att('data-history-id');
    let sidx = Array.from(document.querySelectorAll('.list-wrap table tr')).find((e) => e.classList.contains('select'));
    alert(sidx.dataset.historyId);
  }
});
