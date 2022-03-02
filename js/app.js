// On load welcome message alert function
const welcome = () => {
    let timerInterval
    Swal.fire({
        icon:'success',
        title: 'Welcome to my device store',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}
welcome()
// Successfully show result alert function
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
        title: 'Finding device...'
      })
}
// error shoing sweet alert function
function showError(errorMessage) {
    Swal.fire({
        icon:'error',
        title: 'Warning',
        text: errorMessage
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
// Detaoils div
const detailsDiv = document.getElementById('details-section')
//footer
const foot = document.getElementById('footer-id')

// load data which brand name you search 
const searchPhone = () => {
    const inputText = (input.value).toLowerCase()
    if(inputText == ''){
        foot.style.position = 'fixed'
        // clean the card div 
        phoneCard.textContent = ''
        //found error div clear
        foundError.textContent = ''
        // clean the button div 
        moreBtn.textContent = ''
        //clean the details div
        detailsDiv.textContent = ''
        showError('Please enter valid name')
    }
    else{
        foot.style.position = 'fixed'
        foundError.textContent = ''
        input.value = ''
        //clean the details div
        detailsDiv.textContent = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showData(data.data))
        showSuccess()
        foot.style.position = 'static'
    }
}

const showData = data => {
    // clean the card div 
    phoneCard.textContent = ''
    // clean the button div
    moreBtn.textContent = ''
    // data not matched
    if(data.length == 0){
        foot.style.position = 'fixed'
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
        <h2 class="text-danger border border-2 border-warning fw-bolder px-5 py-3">Your enter device name is not matched</h2>
        `
        showError('Your enter device name is not matched')
        foundError.appendChild(div)
    }
    // get 20 data 
    const twentyData = data.slice(0,20)
    // remaining data 
    const remainingData =data.length - twentyData.length

    if(data.length <= 20) {
        twentyData.forEach(element => {
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
                <a href="#ptag" onclick="getTheUrl('${element.slug}')" type="button" class="btn btn-dark py-1 px-5 fs-5">
                See Details
                </a>
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
                <a href="#ptag" onclick="getTheUrl('${element.slug}')" type="button" class="btn btn-dark py-1 px-5 fs-5">
                See Details
                </a>
            </div>
            </div>
            `
            phoneCard.appendChild(cardDiv)
        });
        const moreDiv = document.createElement('div')
        moreDiv.innerHTML = `
        <button onclick="moreDataShow()" class="btn btn-outline-dark">More Phone</button>
        `
        moreBtn.appendChild(moreDiv)
    } 
}
// Create URL for search keyword
const getTheUrl = phoneId => {
    const newUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(newUrl)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}
//Details show by this function
const showDetails = singlePhone => {
    document.getElementById('details-section').textContent = ''
    const newDiv = document.createElement('div')
    newDiv.classList.add('row','border', 'border-2', 'border-info','p-3')
    newDiv.innerHTML = `
    <div class="col-sm-12 col-md-6 col-lg-3 h-100">
        <img class="img-fluid h-100" src="${singlePhone.image}" alt="">
        <p class="my-3"><span class="text-primary fw-bold fs-5">Release date : </span>${singlePhone.releaseDate ? singlePhone.releaseDate : '<span class="text-danger">Not found</span>'}</p>
    </div>

    <div class="col-sm-12 col-md-6 col-lg-3">
        <span class="fs-4 fw-bold text-primary">${singlePhone.name}</span><br>
        <p class="fs-5 fw-bold">Main Features</p>
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">Chipset : </span>${singlePhone.mainFeatures.chipSet}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">Display : </span>${singlePhone.mainFeatures.displaySize}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">Memory : </span>${singlePhone.mainFeatures.memory}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">Storage : </span>${singlePhone.mainFeatures.storage}</li>
        </ul>
    </div>

    <div class="col-sm-12 col-md-6 col-lg-3">
        <span class="fs-5 fw-bold inline-block">Others Information</span>
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">WLAN : </span>${singlePhone.others ? singlePhone.others.WLAN : 'Not found'}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">Bluetooth : </span>${singlePhone.others ? singlePhone.others.Bluetooth : 'Not found'}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">GPS : </span>${singlePhone.others ? singlePhone.others.GPS :"Not found"}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">USB : </span>${singlePhone.others ? singlePhone.others.USB : 'Not found'}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">NFC : </span>${singlePhone.others ? singlePhone.others.NFC : 'Not found'}</li>
            <li class="list-group-item list-group-item-primary"><span class="fw-bold">Radio : </span>${singlePhone.others ? singlePhone.others.Radio : 'Not found'}</li>
        </ul>
    </div>
    <div class="cl-sm-12 col-md-6 col-lg-3">
        <p class="fs-5 fw-bold">Sensors Information</p>
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary text-break">${singlePhone.mainFeatures.sensors}</li>
        </ul>
    </div>
    `
    detailsDiv.appendChild(newDiv)
}