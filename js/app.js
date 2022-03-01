function showError(errorMessage) {
    Swal.fire({
        icon:'error',
        title: 'Warning',
        text: errorMessage
    })
}
const showSuccess = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Your Input Matched'
      })
}

// not found text id 
const foundError = document.getElementById('not-found')
// show the phone into the card div 
const phoneCard = document.getElementById('phone-card')
// more button div 
const moreBtn = document.getElementById('more-phone')

// load data which brand name you search 

const searchPhone = () => {
    const input = document.getElementById('search-phone')
    const inputText = (input.value).toLowerCase()
    if(inputText == ''){
        // clean the card div 
        phoneCard.textContent = ''
        // clean the button div 
        moreBtn.textContent = ''
        showError('Please input brand name')
    }
    else if(inputText == 'iphone' || inputText == 'samsung' || inputText == 'oppo' || inputText == 'huawei'){
        foundError.textContent = ''
        input.value = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showData(data.data))
            showSuccess()    
    }
    else{
        // clean the card div 
        phoneCard.textContent = ''
        // clean the button div 
        moreBtn.textContent = ''
        // clean the search box 
        input.value = ''
        const div = document.createElement('div')
        div.innerHTML = `
        <h2 class="text-danger border border-2 border-warning fw-bolder px-5 py-3">No phone found, which you searching</h2>
        `
        showError('Your input data is not matched')
        foundError.appendChild(div)
    }
}

const showData = data => {
    // clean the card div 
    phoneCard.textContent = ''
    // clean the button div
    moreBtn.textContent = ''

    // console.log(data)
    // get 20 data 
    const twentyData = data.slice(0,20)
    // remaining data 
    const remainingData =data.length - twentyData.length

    if(data.length <= 20) {
        console.log(twentyData.length)
        twentyData.forEach(element => {
            console.log(element.slug)
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col'
            cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top p-5 img-fluid" alt="...">
                <div class="card-body">
                <h5 class="card-title"><span class="fw-bold fs-5 text-primary">Model Name :</span> ${element.phone_name}</h5>
                <p class="card-text fw-bold"><span class="fw-bold fs-5 text-primary">Brand :</span> ${element.brand}</p>
                </div>
                <div class='text-center mb-3'>
                <button onclick="getTheUrl('${element.slug}')" type="button" class="btn btn-dark py-1 px-5 fs-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                See Details
                </button>
            </div>
            </div>
            `
            phoneCard.appendChild(cardDiv)
        });
    }
    else{
        twentyData.forEach(element => {
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col'
            cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top p-5" alt="...">
                <div class="card-body">
                <h5 class="card-title"><span class="fw-bold fs-5 text-primary">Model Name :</span> ${element.phone_name}</h5>
                <p class="card-text fw-bold"><span class="fw-bold fs-5 text-primary">Brand :</span> ${element.brand}</p>
                </div>
                <div class='text-center mb-3'>
                <button onclick="getTheUrl('${element.slug}')" type="button" class="btn btn-dark py-1 px-5 fs-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                See Details
                </button>
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
const getTheUrl = phoneId => {
    console.log(phoneId)
    const newUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    console.log(newUrl)
    fetch(newUrl)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = singlePhone => {
    console.log(singlePhone.image)
    const detailsDiv = document.getElementById('staticBackdrop')
    document.getElementById('staticBackdrop').textContent = ''
    const newDiv = document.createElement('div')
    newDiv.classList.add('modal-dialog')
    newDiv.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title" id="staticBackdropLabel">Model Name: "${singlePhone.name}"</h3><br>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
            <div class="col-md-4">
                <img src="${singlePhone.image}" alt="...">
            </div>
            <div class="col-md-4">
                <p class="text-center text-info fw-bold"><span>Main Feature</span></p>
                <ul>
                    <li><b class="text-primary">Type : </b>${singlePhone.name}</li>
                    <li><b class="text-primary">Origin : </b>${singlePhone.name}</li>
                    <li><b class="text-primary">Life Span : </b>${singlePhone.name}</li>
                </ul>
            </div>
            <div class="col-md-4">
                <h4>Main Feature</h4>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    `
    detailsDiv.appendChild(newDiv)
    console.log(detailsDiv)
}