// let valid = 0;
//
// $( "login" ).change(function() {
//     var forms1 = document.getElementById('myForm');
//     var err1 = document.getElementById('error');
//     if(typeof(err1) != 'undefined' && err1 != null){
//         err1.remove()
//     }
//     let login1 = document.forms['myForm']['login'];
//
//     getUserAsync(login1.value).then(data => {
//         if (data==200){
//                 addErr(forms1,'Login is already taken');
//                 login1.focus();
//         }else{
//             valid = 1;
//         }
//
//     })
// });

function validate() {
    var firstname = document.forms['myForm']['firstname'];
    var lastname = document.forms['myForm']['lastname'];
    var password = document.forms['myForm']['password'];
    var birthdane = document.forms['myForm']['birthdane'];
    var login = document.forms['myForm']['login'];
    var pesel = document.forms['myForm']['pesel'];
    var sex = document.forms['myForm']['sex'];
    var photo = document.forms['myForm']['photo'];
    var err = document.getElementById('error');
    var forms = document.getElementById('myForm');
    var f = document.getElementById('firstname');

     if(typeof(err) != 'undefined' && err != null){
        err.remove()
    }
    var x = 0;
    if (firstname.value.length < 3 || !firstname.value.match(/^[A-Z][a-z][a-zA-Z]+/) ){
        addErr(forms,'Name must follow the patern: Capital, small, at least one more small letter');
        firstname.focus();
        return false
    }
    if (lastname.value.length < 3 || !firstname.value.match(/^[A-Z][a-z][a-zA-Z]+/) ){
        addErr(forms,'Surname must follow the patern: Capital, small, at least one more small letter');
        lastname.focus();
        return false
    }
    if (password.value.length < 8 || !firstname.value.match(/^[a-zA-Z]*/) ){
        addErr(forms,'Minimal length 8. Only letters.');
        password.focus();
        return false
    }
    if (login.value.length < 3 || login.value.length > 12 || !firstname.value.match(/^[a-zA-Z]*/) ){
        addErr(forms,'Length between 3 and 12. Only letters.');
        login.focus();
        return false
    }
    if (!validatePesel(pesel.value) || !pesel.value.match(/[0-9]{11}/)){
        addErr(forms,'This is not a valid pesel number');
        pesel.focus();
        return false
    }
    if (!photo.value.match(/[0-9a-zA-Z]+\.jpg$/)){
        addErr(forms,'This must be a jpg image');
        photo.focus();
        return false
    }

    url = "http://pi.iem.pw.edu.pl:5000/user/" + login.value;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    if (request.status === 200) {
        addErr(forms,'This login is taken');
        return false
    }else{
        return false
    }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function addErr(parent, text) {
    var p = document.createElement("h5");
    var n = document.createTextNode(text);
    p.appendChild(n);
    p.id = "error"
    parent.appendChild(p);
    return
}

function validatePesel(pesel) {
    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));
    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    return 10 - sum === controlNumber
}
async function getUserAsync(name)
{
  let response = await fetch(`http://pi.iem.pw.edu.pl:5000/user/${name}`);
  let data = response.status;
  return data;
}
