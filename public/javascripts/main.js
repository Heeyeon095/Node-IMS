// search btn click
const search = document.querySelector('.search');
search.addEventListener('click', (e) => {
  const searchCode = document.querySelector('#search-code');
  const searchName = document.querySelector('#search-name');
  if (searchCode.value == '' && searchName.value == '') {
    alert('검색 값을 한가지 이상 입력해주세요!')
  } else {
    // 검색 실행하기
  }
});