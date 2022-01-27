  function copy () {
    const URL = document.getElementById("generatedURL").innerText
  navigator.clipboard.writeText(URL)
      .then(() => alert('copied'))
      .catch(error => console.log(error))
  }