showLoginRegister();

function showLoginRegister() {
    let token = localStorage.getItem('token')
    if (!token || token === 'Wrong password') {
        $('#nav').html(`
    <button onclick="showFromLogin()">Dang nhap</button>
    <button onclick="showFromRegister()">Dang ky</button>
    `)
    } else {

        $('#nav').html(`
        <button onclick="showHome()">Trang chu</button>
        <button onclick="showFromAdd()">Them moi</button>
        <button onclick="logOut()">Dang xuat</button>
        <input type="text" onkeyup="searchProduct(this.value)" placeholder="Tim kiem...">
    
     `)
    }

}