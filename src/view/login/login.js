$("form").on("submit", (e) => {
    e.preventDefault();

    const [email, pwd] = $("form").serializeArray();

    $.post("/user/authenticate",
        {
            email: email.value,
            password: pwd.value
        })
        .done((res) => {
            console.log(res);
            if(res.status === "success"){
                localStorage.setItem('token', res.data.token);
            }
            window.location.href = '/me';
        })
});
