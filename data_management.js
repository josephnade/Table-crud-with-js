var responseTable = document.getElementById("responseTable"),
    welcomeMessage = document.getElementById("welcomeMessage"),
    selectedIndex, counter = 1 , productNameController, 
    productTypeController, productColorController, productSizeController, productBrandController;



    function AddButtonTrigger() {
        clear();
        document.getElementById("updateBtn").style.display = "none";
        document.getElementById("addBtn").style.display = "inline-table";
    }
    function UpdateButtonTrigger() {
        document.getElementById("updateBtn").style.display = "inline-table";
        document.getElementById("addBtn").style.display = "none";

        for (let i = 0; i < responseTable.rows.length; i++) {
            responseTable.rows[i].onclick = function () {
                selectedIndex = this.rowIndex;
                document.getElementById("productName").value = responseTable.rows[selectedIndex].cells[1].innerHTML;
                document.getElementById("productType").value = responseTable.rows[selectedIndex].cells[2].innerHTML;
                document.getElementById("productColor").value = responseTable.rows[selectedIndex].cells[3].innerHTML;
                document.getElementById("productSize").value = responseTable.rows[selectedIndex].cells[4].innerHTML;
                document.getElementById("productBrand").value = responseTable.rows[selectedIndex].cells[5].innerHTML;
            };
        }


    }

    function AddProduct() {

        if (Validation("isNotEmpty")) {
            responseTable.style.display = "inline-table";
            welcomeMessage.style.display = "none";

            // global variables assign the inputs value
            productNameController = document.getElementById("productName").value;
            productTypeController = document.getElementById("productType").value;
            productColorController = document.getElementById("productColor").value;
            productSizeController = document.getElementById("productSize").value;
            productBrandController = document.getElementById("productBrand").value;

            let tableRef = document.getElementById("tbody");
            let row = tableRef.insertRow().innerHTML = "<td>" + counter +"</td>" +
            "<td id='name'>" + productNameController + "</td>" + 
            "<td id='type'>" + productTypeController + "</td>"+
            "<td id='color'>" + productColorController + "</td>" + 
            "<td id='size'>" + productSizeController + "</td>" + 
            "<td id='brand'>" + productBrandController + "</td>" +
            "<td><button type='button' class='btn btn-outline-warning updateButton' onclick='UpdateButtonTrigger()' data-bs-toggle='modal' data-bs-target='#productModal' >Update</button></td>" + 
            "<td><button type='button' class='btn btn-outline-danger deleteButton' onclick='DeleteProduct(this)'>Delete</button></td>";
            counter++;
            
            // sweet alert for added product to table successfully
            Swal.fire("Successful", "Product added successfully", "success");
        }else{
            // sweet alert for validation error
            Swal.fire("Could not add user", "Inputs can not be empty!", "error");
        }
        clear();
    }
    function UpdateProduct() {
        document.getElementById("updateBtn").style.display = "inline-table";
        document.getElementById("addBtn").style.display = "none";



        updatedName = document.getElementById("productName").value;
        updatedType = document.getElementById("productType").value
        updatedColor = document.getElementById("productColor").value;
        updatedSize = document.getElementById("productSize").value;
        updatedBrand = document.getElementById("productBrand").value;


        if (Validation("isChange") == false) {
            Swal.fire("Update Error", "At least one Input must be changed", "info");
        }
        else {
        if (Validation("isNotEmpty") == false) {
            Swal.fire("Could not add user", "Inputs can not be empty!", "error");
        }
        else{
            responseTable.rows[selectedIndex].cells[1].innerHTML = updatedName;
            responseTable.rows[selectedIndex].cells[2].innerHTML = updatedType;
            responseTable.rows[selectedIndex].cells[3].innerHTML = updatedColor;
            responseTable.rows[selectedIndex].cells[4].innerHTML = updatedSize;
            responseTable.rows[selectedIndex].cells[5].innerHTML = updatedBrand;
            }
        }
        }
        clear();
    
    function DeleteProduct(uniqueCounter) {

        // sweet alert
        Swal.fire({
            title: "Are you sure?",
            text: "You are going to delete this product",
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // Click the delete button then row that you choose is deleted
                    let rowInSweetAlert = uniqueCounter.parentNode.parentNode;
                    rowInSweetAlert.parentNode.removeChild(rowInSweetAlert);


                    if (responseTable.rows.length == 1) {
                        responseTable.style.display = "none";
                        welcomeMessage.style.display = "block";
                    }

                    // Success sweet alert show
                    Swal.fire("Succcessfull", "Your Product has been deleted!", "success");

                }
                else if (result.isDenied) {
                    Swal.fire('The Product was not deleted', '', 'info')
                  }
            });
            clear();

    }
    function Validation(tag) {
        if (tag == "isChange") {
            if (productNameController != updatedName || 
                productTypeController != updatedType || 
                productColorController != updatedColor ||
                productSizeController != updatedSize || 
                productBrandController != updatedBrand) {
                return true;
            }
            return false;
        }
        else if (tag == "isNotEmpty") {
            if (document.getElementById('productName').value !== "" && 
            document.getElementById('productType').value !== "" && 
            document.getElementById('productColor').value !== "" && 
            document.getElementById('productSize').value !== "" && 
            document.getElementById('productBrand').value !== "") {
                return true;
            }
            return false;
        }            
        else {
            swal("Error", "Validation Error!", "error");
        }
    }
    function clear() {
        document.getElementById("productName").value = "";
        document.getElementById("productType").value = "";
        document.getElementById("productColor").value = "";
        document.getElementById("productSize").value = "";
        document.getElementById("productBrand").value = "";
    }