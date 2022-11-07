const form = document.querySelector('form')
const submitButton = document.querySelector('#submit-button')

submitButton.addEventListener('click', event => {
  form.classList.add('was-validated')
})

// 前端表單未通過驗證，不送到後端
form.addEventListener('submit', event => {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    alert('有些欄位沒有填寫喔')
  }
})
