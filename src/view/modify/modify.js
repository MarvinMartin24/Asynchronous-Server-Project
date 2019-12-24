let token;

const getToken = () => {
    token = localStorage.getItem('token')
    if (!token){
        window.location.replace('/login');
    }
    else{
        $.ajaxSetup({
            headers: {
              'token': token
            }
          });
    }
};

$("form").on("submit", (e) => {
    e.preventDefault();

    const [firstName, lastName, email, pwd, pwd2] = $("form").serializeArray();
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    var regex = /^[A-Za-z0-9 ]+$/
    var isValid = regex.test(pwd.value);

    if(pwd.value !== pwd2.value){
        alert("Passwords are different");
    }
    else if(firstName.value === "" || lastName.value === ""){
        alert("Please fill every cell");
    }
    else if(isValid){
        alert("Does not contain Special Characters.");
    }
    else if(pwd.value.length < 6){
        alert("Minimun password lenght is 6");
    }
    else{
        $.ajax({
            url: "/api/user/update",
            type: 'PUT',
            data: {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: pwd.value
            },
            success: function(result) {
                if(result.status === "success"){
                    alert(result.message);
                    window.location.href = '/me';
                }
                if(result.status === "error"){
                    alert(result.message);
                }
            }
        });
    }
});
