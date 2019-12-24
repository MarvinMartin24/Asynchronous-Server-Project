let token

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

const getProfile = async () => {
    $.getJSON("/api/profile")
        .done((res) => {
                console.log(res);
                user = res;
                return user;
            })
};

const onClickedLogOut = () => {
    localStorage.setItem('token', '');
    window.location.replace('/login');
};
