// const express = require('express');
// const app = express();
// const port = 8080
// app.get('/', (req, res) => {
//     res.send("Hello World!")
// });
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// });

// const express = require('express');
// const app = express();
// const port = 8080;
//
// app.set('view engine', 'ejs');
// app.set('views', './src/views');
//
// const array = [
//     {
//         title: "Kịch bản sốc Man City - Liverpool",
//         content: "Man City và Liverpool có thể phải phân định ngôi vương bằng trận play-off."
//     },
//     {
//         title: "Mbappe bất ngờ xuất hiện ở Madrid",
//         content: "Kylian Mbappe vừa có động thái khiến truyền thông phải bất ngờ khi xuất hiện ở thủ đô Madrid của Tây Ban Nha."
//     },
//     {
//         title: "Haaland sắp chính thức về Man City",
//         content: "Tiền đạo Erling Haaland vừa chính thức hoàn tất kiểm tra y tế bắt buộc tại Bỉ để chuẩn bị ký hợp đồng gia nhập Manchester City."
//     }
// ]
// app.get('/', (req, res) => {
//     res.render("home", {data: array});
// });
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// });






// const express = require('express');
// const app = express();
// const port = 3000;
//
// app.set('view engine', 'ejs');
// app.set('views', './src/views');
// app.use(express.static('public'));
// app.get('/', ((req, res) => {
//     res.render('home', {data: products})
// }))
// const products = [
//     {
//         title: 'iphone 14',
//         src: 'images/iphone.jpg'
//     },
//     {
//         title: 'oppo',
//         src: 'images/oppo.jpg'
//     },
//     {
//         title: 'samsung',
//         src: 'images/samsung.jpg'
//     },
//     {
//         title: 'xiaomi',
//         src: 'images/xiaomi.jpg'
//     }]
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// });






const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer();
// cấu hình views
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.get('/', (req, res) => {
    res.render("register");
});

const arrayUser = [];
app.post('/user/register', upload.none(), (req, res) => {
    if (req.body.username && req.body.password) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        arrayUser.push(user);
        console.log(arrayUser);
        res.render("success", { user: user });
    } else {
        res.render("error");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
