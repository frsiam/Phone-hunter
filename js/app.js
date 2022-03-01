function showError(errorMessage) {
    Swal.fire({
        icon:'error',
        title: 'Warning',
        text: errorMessage
    })
}

// not found text id 
const foundMessage = document.getElementById('not-found')

// load data which brand name you search 

const searchPhone = () => {
    const inputText = (document.getElementById('search-phone').value).toLowerCase()
    if(inputText == ''){
        showError('Please input brand name')
    }
    else if(inputText == 'iphone' || inputText == 'samsung' || inputText == 'oppo' || inputText == 'huawei'){
        foundMessage.textContent = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showData(data))
    }
    else{
        const div = document.createElement('div')
        div.innerHTML = `
        <h2 class="text-danger border border-2 border-warning fw-bolder px-5 py-3">No phone found, which you searching</h2>
        `
        foundMessage.appendChild(div)
    }
}

const showData = data => {
    console.log(data.data)
}