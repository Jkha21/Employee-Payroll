$(document).ready(function() {
    createUser();
    $('#search-input-container').hide();
    $('.close-btn').hide();

    $('#search-icon').on('click', function(e) {
        $('.empDash-employeeDetails-cnt').toggleClass('adjustedmargin');
        $('#search-input-container').toggle(); 
        $('#search-input').focus(); 
        $('.close-btn').toggle();

    });

    $('#close-btn').on('click', function() {
        $('#search-input-container').hide();
        $('#search-input').val(''); 
        $('.close-btn').hide(); 
        $('.empDash-employeeDetails-cnt').removeClass('adjustedmargin');
        $('.empDash-userDetails-cnt').empty();
        createUserDetails(empDataStore);
    });

    
    $('#search-input').on('keypress', function(event) {
            searchItem($(this).val());
        });
});

function createUser(){
    const url = 'http://localhost:3001/employees';
    
    $.get(url)
        .done(function(empData) {
            console.log('Document fetched!');
            createUserDetails(empData);
            empDataStore = empData
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Error fetching data:', textStatus, errorThrown);
        });
}

function createUserDetails(empData) {
    const $userTable = $('<table></table>', {
        id: 'empDash-userTable-cnt'
    });

    $.each(empData, function(index, value) {
        const $userRow = createUserRow(value);
        $userTable.append($userRow);    
    });

    $('.empDash-userDetails-cnt').append($userTable); 
}

function createUserRow(val) {
    const $userRow = `
        <tr id = "userDash-userDataRow-cnt">
            <td id="empReg-imgCnt-cnt"><img src= "${val.profile}" alt = "img" id="empDash-imgProfile-cnt"></td>
            <td id = "empDash-name-cnt">${val.name}</td>
            <td id = "empDash-gender-cnt">${val.gender}</td>
            <td id = "empDash-dept-cnt"> 
                        ${val.department.map(deptValue => `<span id="empDash-depttag-cnt">${deptValue}</span>`).join('  ')}
            </td>
            <td id="empDash-salary-cnt">${val.salary}</td>
            <td id="empDash-startDate-cnt">${[val.startDate.date,  val.startDate.month.slice(0, 3), val.startDate.year].join(" ")}</td>
            <td id="empDash-actions-cnt">
            <button id="empDash-delBtn-cnt" onclick= "delUser('${val.id}')" action: 'button'><img src="../assets/trash.jpg" alt="Delete" id="empDash-trash-cnt">
            </button>
            <button id="empDash-editBtn-cnt" alt="button" onclick= "editUser('${val.id}')"><img src="../assets/edit.jpg" alt="edit" id="empDash-edit-cnt">
            </button>
            </td>
        </tr>
`
    return $userRow;
}



function editUser(id){
        localStorage.setItem('id', id);
        window.open('../pages/empPayrollRegistration.html', '_blank');
}
    



function delUser(id){
    $.ajax({
        url: `http://localhost:3001/employees/${id}`,
        type: 'DELETE',
        success: function(){
            console.log('Delete Successfully');
        },
        error: function(xhr, status, error) {
            console.log(status, error);
        }
    })
}


function searchItem(name){
    const url = 'http://localhost:3001/employees';
    $.get(url)
        .done(function(empData) {
            filterItem(empData, name);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Error fetching data:', textStatus, errorThrown);
        });

}
let empDataStore = null;
function filterItem(data, name){       
    empDataStore = data;
    if(name){
        $('.empDash-userDetails-cnt').empty();
        empDatalist = data.filter(user => user.name === name);
        createUserDetails(empDatalist);
    }
}
