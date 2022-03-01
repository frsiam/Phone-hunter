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
            .then(data => showData(data.data))
    }
    else{
        const div = document.createElement('div')
        div.innerHTML = `
        <h2 class="text-danger border border-2 border-warning fw-bolder px-5 py-3">No phone found, which you searching</h2>
        `
        foundMessage.appendChild(div)
    }
}
const phoneCard = document.getElementById('phone-card')
const showData = data => {
    phoneCard.textContent = ''
    console.log(data)
    const twentyData = data.slice(0,20)
    const remainingData =data.length - twentyData.length
    console.log(remainingData)
    if(data.length <= 20) {
        console.log(twentyData.length)
        twentyData.forEach(element => {
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col'
            cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a short card.</p>
                </div>
            </div>
            `
            phoneCard.appendChild(cardDiv)
            console.log(phoneCard)
        });
    }
    else{
        console.log(twentyData.length)
        twentyData.forEach(element => {
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col'
            cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a short card.</p>
                </div>
            </div>
            `
            phoneCard.appendChild(cardDiv)
            console.log(phoneCard)
        });
        const moreBtn = document.getElementById('more-phone')
        const moreDiv = document.createElement('div')
        moreDiv.innerHTML = `
        <button class="btn btn-outline-dark">More Phone</button>
        `
        moreBtn.appendChild(moreDiv)
    } 
}