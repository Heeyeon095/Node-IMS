// tab button click

$('.tab > div').click(function () {
  let i = $(this).index();
  $('.tab > div').removeClass('on');
  $(this).addClass('on');
  $('.form-box').removeClass('on');
  $('.form-box').eq(i).addClass('on');
});

// login, join button click

$('#login-btn').click(function () {

  if ($('#login-id').val() == '') {
    alert('저런, 아이디를 빼먹으셨군요!');
  } else if ($('#login-ps').val() == '') {
    alert('이런, 비밀번호를 잊으셨어요!');
    event.preventDefault();
  }
});

$('#join-btn').click(function () {

  if ($('#join-id').val() == '') {
    alert('저런, 아이디를 빼먹으셨군요!');
    event.preventDefault();
  } else if ($('#join-ps').val() == '') {
    alert('이런, 비밀번호를 잊으셨어요!');
    event.preventDefault();
  }  else if ($('#join-birth').val() == '') {
    alert('날짜를 까먹진 않으셨나요? ;)');
    event.preventDefault();
  }

})