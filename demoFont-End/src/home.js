showListHome();
showHome()

function showListHome() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products',
        headers: {
            'Content-Type': 'application/json',

        },

        success: (products) => {
            let html = '';

            products.map(item => {
                html += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td><img src="${item.image}" width="200px"></td>
                        <td>${item.nameCategory}</td>
                        <td>
                        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteModal${item.id}">
    Delete
</button>

<!-- Modal -->
<div class="modal fade" id="deleteModal${item.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${item.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Are you sure?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="remove('${item.id}')">Save changes</button>
            </div>
        </div>
    </div>
</div>
                           
                        </td>
                        <td><button onclick="showFromEdit('${item.id}')">Edit</button>
                       
                     </tr>
`
            })
            $('#tbody').html(html)
        }
    })

}

function showFromAdd() {
    $('#body').html(`
    <input type="text" id="name" placeholder="name">
    <input type="number" id="price" placeholder="price">
    <input type="file" id="fileButton" onchange="uploadImage(event)">
    <div id="imgDiv"></div>
    <select id="category">
             <option selected>Category</option>
             </select>
<button onclick="add()">Add</button>`)
    getCategoriesCreate();
}

function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="downloadURL">`
            localStorage.setItem('image', downloadURL);
        });
}

// function uploadImageEdit(e, id) {
//     let fbBucketName = 'images';
//     let uploader = document.getElementById('uploader');
//     let file = e.target.files[0];
//     let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
//     let uploadTask = storageRef.put(file);
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//         function (snapshot) {
//             uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED:
//                     break;
//                 case firebase.storage.TaskState.RUNNING:
//                     break;
//             }
//         }, function (error) {
//             switch (error.code) {
//                 case 'storage/unauthorized':
//                     break;
//                 case 'storage/canceled':
//                     break;
//                 case 'storage/unknown':
//                     break;
//             }
//         }, function () {
//             let downloadURL = uploadTask.snapshot.downloadURL;
//             document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="downloadURL">`
//             localStorage.setItem('image', downloadURL);
//         });
// }

function showFromEdit(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/products/findById/${id}`,
        headers: {
            'Content-Type': 'application/json',

        },
        success: (products) => {
            $('#body').html(`
    <input type="text" id="name" value="${products.name}" name="name">
    <input type="number" id="price" value="${products.price}" name="price">
    <input type="file" id="fileButton" onchange="uploadImage(event)" >
    <div id="imgDiv"><img src='${products.image}' width="200px"></div>
    <input type="number" id="category" value="${products.category}" name="category">
    <button onclick="edit('${id}')">Edit</button>
    `)

        }
    })

}

function showHome() {
    $('#body').html(`
    <table border="1">
        <thead>
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Image</td>
            <td>Category</td>
            <td colspan="2">Action</td>
        </tr>
        </thead>
        <tbody id="tbody">

        </tbody>


    </table>
    `)
    showListHome()
}



function add() {
    let name = $('#name').val();
    let price = $('#price').val();
    let image = localStorage.getItem('image')
    let category = $('#category').val();
    let product = {
        name: name,
        price: price,
        image: image,
        category: category
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products',
        headers: {
            'Content-Type': 'application/json',

        },
        data: JSON.stringify(product),
        success: () => {
            showHome()
        }
    })
}

function edit(id) {
    let name = $('#name').val();
    let price = $('#price').val();
    let image = localStorage.getItem('image')
    let category = $('#category').val();
    let product = {
        name: name,
        price: price,
        image: image,
        category: category
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Content-Type': 'application/json',

        },
        data: JSON.stringify(product),
        success: () => {
            alert('edit xong')
            showHome()
        }
    })
}

function remove(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        success: () => {
            alert('xoa xong!')
            showHome()
        }
    })
}

function getCategoriesCreate() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products/getCategories',
        headers: {
            'Content-Type': 'application/json',
        },
        success: (categories) => {
            console.log(categories)
            let Categories = ``;
            for (const category of categories) {
                Categories += `
                    <option value=${category.idCategory}>${category.nameCategory}</option>
                `
            }
            $('#category').html(Categories);
        }
    })
}