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
    console.log(singlePhone.releaseDate)
    console.log(singlePhone.mainFeatures.memory)
    const detailsDiv = document.getElementById('staticBackdrop')
    document.getElementById('staticBackdrop').textContent = ''
    const newDiv = document.createElement('div')
    newDiv.classList.add('modal-dialog','modal-xl','px-5')
    newDiv.innerHTML = `
    <div class="modal-content">
        <div class="modal-header row bg-primary">
            <div class="col-md-11 col-sm-8 text-light">
                <h4 class="modal-title" id="staticBackdropLabel"><span class="text-dark">Model Name :</span> "${singlePhone.name}"</h4>
            </div>
            <div class="col-md-1 col-sm-4">
                <button type="button" class="btn-close btn-dark bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        </div>
        <div class="modal-body row">
            <div class="col-md-3 h-100">
                <img src="${singlePhone.image}" class="img-fluid h-100" alt="...">
                <p class="mt-3">
                    <span class="text-success fs-5 fw-bold">Release date : </span><span>${singlePhone.releaseDate ? singlePhone.releaseDate :'<span class="text-danger">Not found</span>'}</span>
                </p>
            </div>
            <div class="col-md-3">
                <p class="text-center text-info fs-5">Main Features</p>
                <ul>
                    <li><b>Memory : </b>${singlePhone.mainFeatures.memory}</li>
                    <li><b>Display-Size: </b>${singlePhone.mainFeatures.displaySize}</li>
                    <li><b>Chipset : </b>${singlePhone.mainFeatures.chipSet}</li>
                    <li><b>Storage : </b>${singlePhone.mainFeatures.storage}</li>
                </ul>
            </div>
            <div class="col-md-3">
                <p class="text-center text-info fs-5">Sensor Information</p>
                <ul>
                    <li><b>Memory : </b>${singlePhone.mainFeatures.memory}</li>
                    <li><b>Display-Size: </b>${singlePhone.mainFeatures.displaySize}</li>
                    <li><b>Chipset : </b>${singlePhone.mainFeatures.chipSet}</li>
                    <li><b>Storage : </b>${singlePhone.mainFeatures.storage}</li>
                </ul>
            </div>
            <div class="col-md-3">
                <p class="text-center text-info fs-5">Others Information</p>
                <ul>
                    <li><b>Memory : </b>${singlePhone.mainFeatures.memory}</li>
                    <li><b>Display-Size: </b>${singlePhone.mainFeatures.displaySize}</li>
                    <li><b>Chipset : </b>${singlePhone.mainFeatures.chipSet}</li>
                    <li><b>Storage : </b>${singlePhone.mainFeatures.storage}</li>
                </ul>
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