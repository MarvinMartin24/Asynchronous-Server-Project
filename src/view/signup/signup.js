$("form").on("submit", (e) => {
    e.preventDefault();

    const [firstName, lastName, email, pwd, pwd2] = $("form").serializeArray();
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    var regex = /^[A-Za-z0-9 ]+$/
    var isValid = regex.test(pwd.value);

    if(pwd.value !== pwd2.value){
        alert("Passwords are different");
    }
    else if(isValid){
        alert("Does not contain Special Characters.");
    }
    else if(pwd.value.length < 6){
        alert("Minimun password lenght is 6");
    }
    else{
        $.post("/api/user/register",
            {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: pwd.value
            })
            .done((res) => {
                if(res.status === "success"){
                    alert(res.message);
                    window.location.href = '/login';
                }
                if(res.status === "error"){
                    alert(res.message);
                }
            })
    }
});
