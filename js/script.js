const formApp = document.querySelector('#form-app')
const inputs = document.querySelectorAll('#form-app input')
const buttons = document.querySelector('#select-tip__buttons')

// Operation
const formatPrice = (price = 0)=>{
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: 'currency',
        currency: 'USD'
    }).format(price)
    return newPrice
}
const operation = (billAmount, selectTip, numberofPeople) =>{
    let amountPerson = billAmount / numberofPeople
    let tip = amountPerson * selectTip
    let totalPerson = amountPerson + tip
    return {tip, totalPerson}
}

// bill

const bill = document.querySelector('#bill')
bill.addEventListener('input',(e)=>{
    inputsValidation()
})
bill.addEventListener('blur', (e)=>{
    inputsValidation()
    bill.classList.remove('input-active')
    if (!bill.value == '') {
        bill.classList.add('input-active')
    }
})
bill.addEventListener('focus',()=>{
    console.log('focus')
    bill.classList.add('input-active')
    document.querySelector('#bill-validation').classList.remove('bill-validation-error')
})
// tip
let selectTipValue = 0

buttons.addEventListener('click',(e)=>{
    if(e.target.name == "tip-5"){
        console.log('tip 5 siu')
        selectTipValue = 0.05
        inputsValidation(selectTipValue)
    }
    if(e.target.name == "tip-10"){
        console.log('tip10')
        selectTipValue = 0.1
        inputsValidation(selectTipValue)
    }
    if(e.target.name == "tip-15"){
        console.log('tip15')
        selectTipValue = 0.15
        inputsValidation(selectTipValue)
    }
    if(e.target.name == "tip-25"){
        console.log('tip25')
        selectTipValue = 0.25
        inputsValidation(selectTipValue)
    }
    if(e.target.name == "tip-50"){
        console.log('tip10')
        selectTipValue = 0.5
        inputsValidation(selectTipValue)
    }
})

const customTip = document.querySelector('#custom-tip')
customTip.addEventListener('input',(e)=>{
    selectTipValue = parseInt(e.target.value)/100
    inputsValidation(selectTipValue)
})

// people
const people = document.querySelector('#people')
people.addEventListener('input',(e)=>{
    // debugger
    if (customTip.value == ''){
        inputsValidation(0)
    } else {
        inputsValidation(parseInt(customTip.value)/100)
    }
})
people.addEventListener('blur', ()=>{
    inputsValidation()
    people.classList.remove('input-active')
    if (people.value == '') {
        console.log('vacio')
    } else {
        console.log('leno')
        people.classList.add('input-active')
    }
})
people.addEventListener('focus', ()=>{
    console.log('focus')
    people.classList.add('input-active')
    document.querySelector('#people-validation').classList.remove('people-validation-error')
})


// validation
const inputsValidation = (tipvalue)=>{
    let billvalue = bill.value
    let peopleValue = people.value
    if (billvalue == '' && peopleValue == ''){
        bill.classList.add('input-error')
        document.querySelector('#bill-validation').classList.add('bill-validation-error')
        people.classList.add('input-error')
        document.querySelector('#people-validation').classList.add('people-validation-error')
        buttonReset(false)
    } else {
        buttonReset(true)
        if (billvalue == ''){
            console.log('a')
        } else if(peopleValue == ''){
            console.log('rellena la pipol')
            bill.classList.remove('input-error')
            document.querySelector('#bill-validation').classList.remove('bill-validation-error')
        } else {
            
            bill.classList.remove('input-error')
            document.querySelector('#bill-validation').classList.remove('bill-validation-error')
            people.classList.remove('input-error')
            document.querySelector('#people-validation').classList.remove('people-validation-error')
            // bill.classList.add('input-active')
            let result = operation(billvalue,tipvalue,peopleValue)
            console.log(result)
            renderResult(result)
        }
    }
}
// render result
const renderResult = (result)=>{
    if ((result.tip != NaN) && (result.totalPerson != NaN) && (result.tip != 0)){
        document.querySelector('#result-card-total-tip').innerText = formatPrice(result.tip)
        document.querySelector('#result-cardt-total').innerText = formatPrice(result.totalPerson)
    }
}
// --()
formApp.addEventListener('submit', (event)=>{
    event.preventDefault()
})

// reset
const reset = document.querySelector('#button-reset')
reset.classList.add('button-reset-desactive')
const buttonReset = (observer = false)=>{
    reset.addEventListener('click', ()=>{
        formApp.reset()
        document.querySelector('#result-card-total-tip').innerText = formatPrice(0)
        document.querySelector('#result-cardt-total').innerText = formatPrice(0)
        reset.classList.add('button-reset-desactive')
        reset.classList.remove('button-reset-active')
    })
    if(observer == true) {
        reset.classList.remove('button-reset-desactive')
        reset.classList.add('button-reset-active')
    } else {
        reset.classList.add('button-reset-desactive')
        reset.classList.remove('button-reset-active')
    }
}
