let token

const getToken = () => {
    token = localStorage.getItem('token')
    $.ajaxSetup({
        headers: {
          'token': token
        }
      });
};

const getProfile = async () => {
    $.getJSON("/api/profile")
        .done((res) => {
                console.log(res);
                user = res;
                return user;
            })
};
