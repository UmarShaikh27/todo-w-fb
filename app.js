const firebaseConfig = {
    apiKey: "AIzaSyCrKuNO-FjGhFJfR7w9UyFB_ny4qxqvjV0",
    authDomain: "to-do-umar.firebaseapp.com",
    projectId: "to-do-umar",
    storageBucket: "to-do-umar.appspot.com",
    messagingSenderId: "170420354249",
    appId: "1:170420354249:web:3d2d89f4841ad47fd4e118",
    measurementId: "G-5DGWWMX241"
  };

  const app = firebase.initializeApp(firebaseConfig);


// console.log(app.database);

var listBox = document.getElementById("listBox")


function addfunc(){

    var key = app.database().ref("/").push().key

    


    var todoinp = document.getElementById("todo-inp")
    

    var theObject = {
        list: todoinp.value,
        key: key,
    }
    app.database().ref("addition").child(key).set(theObject)
}
    





app.database().ref("addition").on("child_added" , function(data){

    
    var todoinp = document.getElementById("todo-inp")
    var jslist = document.createElement("li")
    jslist.className = "thelist"
    var jstxt = document.createTextNode(data.val().list)
    jslist.appendChild(jstxt)
    
    //append to UL
 
    listBox.appendChild(jslist)
    
    //logos
    var checkbtn = document.createElement("button")
    checkbtn.innerHTML = "<li class = 'fas fa-check' >"
    
    var editbtn = document.createElement("button")
    editbtn.innerHTML = "<li class = 'fas fa-edit' >"
    
    var delbtn = document.createElement("button")
    delbtn.innerHTML = "<li class = 'fas fa-trash' >"
    
     var mydiv =  document.createElement("div")
    jslist.appendChild(mydiv)

    mydiv.appendChild(checkbtn)
    mydiv.appendChild(editbtn)
    mydiv.appendChild(delbtn)

    mydiv.className = "divlist"

    checkbtn.className = "iconli"
    editbtn.className = "iconli"
    delbtn.className = "iconli"

    checkbtn.setAttribute("onclick" , "checkfunc(this)" )

    editbtn.setAttribute("onclick" , "editfunc(this)" )
    editbtn.setAttribute("id" , data.val().key )

    delbtn.setAttribute("onclick" , "delfunc(this)" )
    delbtn.setAttribute("id" , data.val().key )
        
})


function delallfunc(){
    listBox.innerHTML = ""
    app.database().ref("/addition").remove()
}

//LIST BUTTONS

function checkfunc(x){
    var text = x.parentNode.parentNode
    text.className += " textcut"
    console.log(text);
}
function editfunc(x){ 
    var btn = x.parentNode.parentNode.firstChild.nodeValue
    var theprompt = prompt("Edit you list" , btn)
    x.parentNode.parentNode.firstChild.nodeValue = theprompt

    app.database().ref("/addition").child(x.id).update({
        list : theprompt
    })
}
function delfunc(x){
    x.parentNode.parentNode.remove()

    app.database().ref("/addition").child(x.id).remove()
}


