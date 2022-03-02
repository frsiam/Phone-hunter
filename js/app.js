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
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Finding phone brand...'
      })
}

// not found text id 
const foundError = document.getElementById('not-found')
// show the phone into the card div 
const phoneCard = document.getElementById('phone-card')
// more button div 
const moreBtn = document.getElementById('more-phone')
//Input field
const input = document.getElementById('search-phone')

// load data which brand name you search 

const searchPhone = () => {
    const inputText = (input.value).toLowerCase()
    if(inputText == ''){
        // clean the card div 
        phoneCard.textContent = ''
        // clean the button div 
        moreBtn.textContent = ''
        showError('Please enter valid name')
    }
    else{
        foundError.textContent = ''
        input.value = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showData(data.data))
    }
}

const showData = data => {
    // clean the card div 
    phoneCard.textContent = ''
    // clean the button div
    moreBtn.textContent = ''

    console.log(data.length)
    // data not matched
    if(data.length == 0){
        // clean the card div 
        phoneCard.textContent = ''
        // clean the button div 
        moreBtn.textContent = ''
        //Clean the error div
        foundError.textContent = ''
        // clean the search box 
        input.value = ''
        const div = document.createElement('div')
        div.innerHTML = `
        <h2 class="text-danger border border-2 border-warning fw-bolder px-5 py-3">Your enter brand name is not matched</h2>
        `
        showError('Your enter brand name is not matched')
        foundError.appendChild(div)
    }
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
                <button onclick="getTheUrl('${element.slug}')" type="button" class="btn btn-dark py-1 px-5 fs-5">
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
                <button onclick="getTheUrl('${element.slug}')" type="button" class="btn btn-dark py-1 px-5 fs-5">
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
    console.log(singlePhone)
    console.log(singlePhone.mainFeatures.memory)
    const detailsDiv = document.getElementById('details-section')
    document.getElementById('details-section').textContent = ''
    const newDiv = document.createElement('div')
    newDiv.classList.add('row')
    newDiv.innerHTML = `
    <div class="col-sm-12 col-md-4">
        <img class="img-fluid w-50" src="" alt="">
        <p><span class="text-primary fw-bold fs-6">Release date :</span><span></span></p>
    </div>
    <div class="col-sm-12 col-md-4">
        <span class="fs-5 fw-bold">Model Name</span><br>
        <span class="fs-5 fw-bold text-info inline-block">Main Features</span>
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary"></li>
            <li class="list-group-item list-group-item-primary"></li>
            <li class="list-group-item list-group-item-primary"></li>
            <li class="list-group-item list-group-item-primary"></li>
        </ul>
    </div>
    <div class="col-sm-12 col-md-4">
        <span class="fs-5 fw-bold text-info inline-block">Sensor Information</span>
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary"></li>
        </ul>
        <span class="fs-5 fw-bold text-info inline-block">Others Information</span>
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary"></li>
            <li class="list-group-item list-group-item-primary"></li>
            <li class="list-group-item list-group-item-primary"></li>
            <li class="list-group-item list-group-item-primary"></li>
        </ul>
    </div>
    `
    detailsDiv.appendChild(newDiv)
    console.log(detailsDiv)
}