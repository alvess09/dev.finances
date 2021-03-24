//
const Modal = {
    open(){
        //open modal and add class active in modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        //close modal, remove active modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
} 

const transactions = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
},
{
    id: 2,
    description: 'Web site',
    amount: 500000,
    date: '23/01/2021',
},
{
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
}]

const Transaction = {
    all:transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;

            }
        })

        return income
    },

    expanses() {
        let expanses = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expanses += transaction.amount;
            }
        })

        return expanses
        
    },

    total() {
        // on total using income (+) expanses but we remenber of signal (-) in expanses result +-= - (subtraction) 
        return Transaction.incomes() + Transaction.expanses();
    }
}
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" :  "expanse"
        const amount = Utils.formatcurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover Transação"></td>
        `
        return html
    },
    updateBalance() {
        document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatcurrency(Transaction.incomes())
        document
        .getElementById('expanseDisplay')
        .innerHTML = Utils.formatcurrency(Transaction.expanses())
        document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatcurrency(Transaction.total())
    },
    clearTransactions() {
      DOM.transactionsContainer.innerHTML = ""  
    }
}

const Utils = {
    formatcurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g,"")
        value = Number(value) / 100

        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const App = {
    init() {

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
    },


    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200,
    date: '23/01/2021'
})