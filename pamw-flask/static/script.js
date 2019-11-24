function validateForm() {

    var firstname = document.forms['myForm']['firstname'];
    var lastname = document.forms['myForm']['lastname'];
    var login = document.forms['myForm']['login'];
    var password = document.forms['myForm']['password'];
    var err = document.getElementsByClassName('error');
    var forms = document.getElementById('myForm');
    var isValid = true;

    if(typeof(err) != 'undefined' && err != null){
        while(err[0]) {
            err[0].remove()
        }
    }
    if (firstname.value.length < 3 || !firstname.value.match(/^[A-Z][a-z][a-zA-Z]+/) ){
        addErr(document.getElementById('firstname'),'Name must follow the patern: Capital, small, at least one more small letter. Length must be 3 or more.');
        isValid=false;
        document.getElementById('firstname').style.borderColor='red';
        document.getElementById('firstname').style.borderStyle='solid';
    }else {
        document.getElementById('firstname').style.borderColor = 'green';
        document.getElementById('firstname').style.borderColor = 'solid';
    }
    if (lastname.value.length < 3 || !lastname.value.match(/^[A-Z][a-z][a-zA-Z]+/) ){
        addErr(document.getElementById('lastname'),'Surname must follow the patern: Capital, small, at least one more small letter.  Length must be 3 or more.');
        isValid=false;
        document.getElementById('lastname').style.borderColor='red';
        document.getElementById('lastname').style.borderColor='solid';
    }else {
        document.getElementById('lastname').style.borderColor='green';
        document.getElementById('lastname').style.borderColor='solid';
    }
    if (login.value.length < 3 || login.value.length > 12 || !login.value.match(/^[a-zA-Z]*/) ){
        addErr(document.getElementById('login'),'Length between 3 and 12. Only letters. Only letters!');
        isValid=false;
        document.getElementById('login').style.borderColor='red';
        document.getElementById('login').style.borderColor='solid';
    }else {
        document.getElementById('login').style.borderColor = 'green';
        document.getElementById('login').style.borderColor = 'solid';
    }
    if (password.value.length < 8 || !password.value.match(/^[a-zA-Z1-9]*/) ){
        addErr(document.getElementById('password'),'Password must be longer than 8 characters and only contain letters and numbers!');
        isValid=false;
        document.getElementById('password').style.borderColor='red';
        document.getElementById('password').style.borderColor='solid';
    }else {
        document.getElementById('password').style.borderColor = 'green';
        document.getElementById('password').style.borderColor = 'solid';
    }
    // getUserAsync(login.value).then(function (result) {
    //     if(result) {
    //         addErr(document.getElementById('login'), 'This login is taken');
    //         document.getElementById('login').style.borderColor='red';
    //         document.getElementById('login').style.borderColor='solid';
    //         console.log('taken')
    //     }else{
    //         if(isValid){
    //             console.log('sent')
    //             forms.submit();
    //         }else {
    //             console.log('invalid form')
    //         }
    //     }
    // });
    //return false
    return isValid
}

function addErr(ref, text) {
    var newNode = document.createElement("h5");
    var n = document.createTextNode(text);
    newNode.appendChild(n);
    newNode.classList.add('error');
    ref.parentNode.appendChild(newNode);
}
async function getUserAsync(name){
    var url = "http://127.0.0.1:8080/user/" + name;
    const response = await fetch(url);
    if (response.ok){
      console.log('AAA');
      return true
    }
    console.log('BBB');
    return false
}
