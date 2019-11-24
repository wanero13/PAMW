function validateForm() {

    var login = document.forms['myForm']['loginl'];
    var password = document.forms['myForm']['passwordl'];
    var err = document.getElementsByClassName('error');
    var forms = document.getElementById('myForm');
    var isValid = true;

    if(typeof(err) != 'undefined' && err != null){
        while(err[0]) {
            err[0].remove()
        }
    }
    // getUserAsync(login.value).then(function (result) {
    //     if(result) {
    //         addErr(document.getElementById('login'), 'Invalid login data');
    //         document.getElementById('login').style.borderColor='red';
    //         document.getElementById('login').style.borderColor='solid';
    //         console.log('taken')
    //     }else{
    //         if(isValid){
    //             console.log('sent')
    //             forms.submit();
    //         }else {
    //             console.log('invalid form');
    //             addErr(document.getElementById('login'), 'Something went wrong with invalid variable');
    //             document.getElementById('login').style.borderColor='red';
    //             document.getElementById('login').style.borderColor='solid';
    //         }
    //     }
    // });
    return false
}

function addErr(ref, text) {
    var newNode = document.createElement("h5");
    var n = document.createTextNode(text);
    newNode.appendChild(n);
    newNode.classList.add('error');
    ref.parentNode.appendChild(newNode);
}
//todo
async function getUserAsync(name){
    var url = "http://127.0.0.1:8080/login";
    const response = await fetch(url);
    if (response.ok){
      console.log('AAA');
      return true
    }
    console.log('BBB');
    return false
}
