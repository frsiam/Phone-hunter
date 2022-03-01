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
    const inputText = document.getElementById('search-phone').value
    if(inputText == ''){
        showError('Please input brand name')
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText.toLowerCase()}`

        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data))
    }
}
