function showError(errorMessage) {
    Swal.fire({
        icon:'error',
        title: 'Warning',
        text: errorMessage
    })
}

// not found text id 
const foundMessage = document.getElementById('not-found')
// show the phone into the card div 
const phoneCard = document.getElementById('phone-card')
// more button div 
const moreBtn = document.getElementById('more-phone')

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

const showData = data => {

    phoneCard.textContent = ''
    moreBtn.textContent = ''

    console.log(data)
    // get 20 data 
    const twentyData = data.slice(0,20)
    // remaining data 
    const remainingData =data.length - twentyData.length

    if(data.length <= 20) {
        console.log(twentyData.length)
        twentyData.forEach(element => {
            console.log(element.phone_name)
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col'
            cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title"><span class="fw-bold fs-5 text-primary">Model Name :</span> ${element.phone_name}</h5>
                <p class="card-text fw-bold"><span class="fw-bold fs-5 text-primary">Brand :</span> ${element.brand}</p>
                </div>
            </div>
            `
            phoneCard.appendChild(cardDiv)
        });
    }
    else{
        console.log(twentyData.length)
        twentyData.forEach(element => {
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col'
            cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top w-75" alt="...">
                <div class="card-body">
                <h5 class="card-title"><span class="fw-bold fs-5 text-primary">Model Name :</span> ${element.phone_name}</h5>
                <p class="card-text fw-bold"><span class="fw-bold fs-5 text-primary">Brand :</span> ${element.brand}</p>
                </div>
            </div>
            `
            phoneCard.appendChild(cardDiv)
        });
        /* const moreDataShow = () => {
            remainingData.forEach(element =>{
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
            })
        } */ 
        const moreDiv = document.createElement('div')
        moreDiv.innerHTML = `
        <button onclick='moreDataShow()' class="btn btn-outline-dark">More Phone</button>
        `
        moreBtn.appendChild(moreDiv)
    } 
}