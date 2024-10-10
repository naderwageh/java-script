
let title =document.getElementById('title')
let prics =document.getElementById('prics')
let texes =document.getElementById('texes')
let ads =document.getElementById('ads')
let discont =document.getElementById('discont')
let total =document.getElementById('total')
let cont =document.getElementById('cont')
let catogre =document.getElementById('catogre')
let sumint =document.getElementById('sumint')
// get total
let moodap="create"
let tmp=[]
function gettotal() {
    if (prics.value != "") {
        let result=( +prics.value +  +texes.value + +ads.value )-  +discont.value
        total.innerHTML=result
        total.style.background='#040'
    }else(
        total.innerHTML="",
        total.style.background='#040'
    )
}
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);  
} else {
    datapro = [];
}

sumint.onclick = function () {
    let newro = {
        title:title.value,
        prics:prics.value, 
        texes:texes.value,
        ads:ads.value,
        discont:discont.value,
        total:total.innerHTML,
        cont:cont.value,
        catogre:catogre.value, 
    };

    if (title.value != '' && cont.value <= 100) {
        if (moodap === "create") {
            if (newro.cont > 1) {
                for (let i = 0; i < newro.cont; i++) {
                    datapro.push(newro);
                }
            } else {
                datapro.push(newro); 
            }
        } else {
            datapro[tmp] = newro; 
        }
        cont.style.display = "block";
        moodap = "create";
        sumint.innerHTML = "Create";
    }

    localStorage.setItem('product', JSON.stringify(datapro)); 
    readdata();
    clendata();
};


function clendata() {
    title.value=""
    prics.value=""
    texes.value=""
    ads.value=""
    discont.value=''
    total.innerHTML=''
    cont.value=""
    catogre.value=''
}

function readdata() {
    let tbody=''
for (let i = 0; i < datapro.length; i++) {
    tbody +=` <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].prics}</td>
                  <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discont}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].catogre}</td>
                <td><button onclick="updatedata(${i})"id="update">update</button></td>
                <td><button onclick="dleatdata(${i}) " id="delet">delet</button></td>
            </tr> `
    
}
    document.getElementById("tbody").innerHTML=tbody
let deletall=document.getElementById("deletall")
if (datapro.length>0) {
    deletall.innerHTML=`
        <button onclick="deletall()">deletall(${datapro.length})</button>
        `
    
}else{
     deletall.innerHTML=""
}
}
readdata()












function deletall() {
    datapro.splice(0)
    localStorage.clear()
    readdata()
}
function dleatdata(i) {
    datapro.splice(i,1)
    localStorage.prudct=JSON.stringify(datapro)
    readdata()
}
function updatedata(i) {
title.value=datapro[i].title
prics.value=datapro[i].prics
texes.value=datapro[i].texes
ads.value=datapro[i].ads
discont.value=datapro[i].discont
gettotal()
sumint.innerHTML="updat"
cont.style.display="none"
tmp=i
moodap="updat"

scroll({
    top:0,
    behavior:"sumint"
})

}
let moodserh ="titel"
function searchall(id){
    
    let search = document.getElementById("search")
    if (id==="searchtitel") {
        moodserh ='titel'
        search.placeholder="search by titel " 
        search.focus()
        }else{
        search.placeholder="search by catogre" 
        moodserh ='catogre'
        search.focus()
    }
    readdata() 
}
function searchdata(value) {
    let table ='';
    for (let i = 0; i < datapro.length; i++) {
    if ( moodserh ==='titel') {
     
       if (datapro[i].title.includes(value.toLowerCase())) {
        table +=`   <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].prics}</td>
          <td>${datapro[i].texes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discont}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].catogre}</td>
        <td><button onclick="updatedata(${i})"id="update">update</button></td>
        <td><button onclick="dleatdata(${i}) " id="delet">delet</button></td>
    </tr> 
`
       }  
     }        
    else{
       
            if (datapro[i].catogre.includes(value.toLowerCase())) {
             table +=`   <tr>
             <td>${i}</td>
             <td>${datapro[i].title}</td>
             <td>${datapro[i].prics}</td>
               <td>${datapro[i].texes}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discont}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].catogre}</td>
             <td><button onclick="updatedata(${i})"id="update">update</button></td>
             <td><button onclick="dleatdata(${i}) " id="delet">delet</button></td>
         </tr> `
     }}}
    document.getElementById("tbody").innerHTML =table
    }