$("form").on("submit", (e) => {
    e.preventDefault();

    const [email, pwd] = $("form").serializeArray();

    $.post("/api/user/authenticate",
        {
            email: email.value,
            password: pwd.value
        })
        .done((res) => {
            if(res.status === "success"){
                localStorage.setItem('token', res.data.token);
                alert(res.message);
                window.location.href = '/me';
            }
            if(res.status === "error"){
                alert(res.message);
            }
        })
});
