import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-5805d-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Shopping List")

console.log(app)
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click",function() {
    
    let inputValue = inputFieldEl.value

    if(inputFieldEl.value = true){
        push(shoppingListInDB, inputValue)

        clearInputFieldEL()
    } else{
        shoppingListEl.innerHTML = "<p>you must enter item</p>"
    }

})

onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEL()

        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]

            let currentItemValue = currentItem[1]


            addItemEL(currentItem)
        }
    } else{
        shoppingListEl.innerHTML = '<p>No items here ... yet &#128540;</p>'
    }
    
    
});
function clearShoppingListEL(){
    shoppingListEl.innerHTML = ""
}
function clearInputFieldEL() {
    inputFieldEl.value = ""
}

function addItemEL(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]

    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactListItemLocation = ref(database, `Shopping List/${itemID}`)
        remove(exactListItemLocation)
        // console.log(itemID)
    })

    shoppingListEl.append(newEl)
}