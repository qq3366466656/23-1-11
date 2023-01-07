if (!localStorage.getItem('user-token')) {
  location.href = './login.html'
}

window.addEventListener('DOMContentLoaded', async function () {
  const token = this.localStorage.getItem('user-token')
  console.log(token)
  try {
      const { data: res } = await axios.get('/dashboard')
    console.log(res)
  } catch (err) {
    console.dir(err)
  }
})
