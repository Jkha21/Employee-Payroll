const nameRef = document.getElementById('name-cnt');
const profileRef = document.getElementsByName('inputProfile')
const genderRef = document.getElementsByName('input');
const salaryRef = document.getElementById("salary-cnt");
const departmentRef = document.getElementsByName('inputCheckbox');
const submitBtnRef = document.getElementById('submitButton');
const dateRef = document.getElementById('date-cnt');
const monthRef = document.getElementById('month-cnt');
const yearRef = document.getElementById('year-cnt');
const notesRef = document.getElementById('notes-cnt');
const resetBtnRef = document.getElementById("resetButton");
const cancelBtnRef = document.getElementById("cancelButton");
let nameErrorlabel = document.getElementById('empDash-nullValuecheck-cnt');
let checkProfile = document.getElementById('empDash-checkProfile-cnt');
let checkDepartment = document.getElementById('empDash-checkDepartment-cnt');
let checkGender = document.getElementById('empDash-checkGender-cnt');
let checkSalary = document.getElementById('empDash-checkSalary-cnt');
let checkDate = document.getElementById('empDash-checkStartDate-cnt');
let checkNotes = document.getElementById('empDash-checkNotes-cnt');

function resetform(){
    nameRef.value = "";
    profileRef.forEach(radio => radio.checked = false);
    genderRef.forEach(radio => radio.checked = false);
    departmentRef.forEach(checkbox => checkbox.checked = false);
    salaryRef.selectedIndex = 0;
    dateRef.selectedIndex = 0;
    monthRef.selectedIndex = 0;
    yearRef.selectedIndex = 0;
    notesRef.value = "";    
}

submitBtnRef.addEventListener('click', (e) =>{
    e.preventDefault();
    const nameValue = nameRef.value;
    if(!nameValidator(nameValue)){
        nameErrorlabel.textContent = "Wrong Input! Enter the name again.";
        nameErrorlabel.style.color = 'red';
        nameErrorlabel.style.fontSize = '14px';
        nameErrorlabel.style.fontWeight = 'bold';
        return;        
    }else{
        nameErrorlabel.textContent = "";
    }
    
    let selectedProfile = null;
    for(let element of profileRef){
        if(element.checked){
            selectedProfile = element.nextElementSibling.getAttribute('src');
        }
        if(!selectedProfile){
            checkProfile.textContent = "Error! Select Profile";
            checkProfile.style.color = 'red';
            checkProfile.style.fontSize = '14px';
            checkProfile.style.fontWeight = 'bold';
            return;
        }else{
            checkProfile.textContent = "";
        }
    }
    
    let selectedGender = null;
    for(let element of genderRef){
        if(element.checked){
            selectedGender = element.nextElementSibling.textContent;
        }
        if(!selectedGender){
            checkGender.textContent = "Error! Select Gender"; 
            checkGender.style.color = 'red';
            checkGender.style.fontSize = '14px';
            checkGender.style.fontWeight = 'bold';
            return;
        }else{
            checkGender.textContent = ""; 
        }
    };
    
    
    
    let selectedDepartmentObj = [];
    for(let element of departmentRef){
        if(element.checked){
            selectedDepartmentObj.push(element.nextElementSibling.textContent);
        }
        if(!selectedDepartmentObj.length){
            checkDepartment.textContent = 'Error! Select the department';
            checkDepartment.style.color = 'red';
            checkDepartment.style.fontSize = '14px';
            checkDepartment.style.fontWeight = 'bold';
            return;
        }else{
            checkDepartment.textContent = "";
        }
    }


    let selectedSalary = salaryRef.value;
    if(salaryRef.selectedIndex === 0){
        checkSalary.textContent = "Error! Select Salary Range"
        checkSalary.style.color = 'red';
        checkSalary.style.fontSize = '14px';
        checkSalary.style.fontWeight = 'bold';
        return;
    }else{
        checkSalary.textContent = "";
    }


    let dateObj = {
        date: dateRef.value,
        month: monthRef.value,
        year: yearRef.value
    }
    
    if(dateRef.selectedIndex === 0 || monthRef.selectedIndex === 0 || yearRef.selectedIndex === 0){
        checkDate.textContent = "Error! Fill the Start Date";
        checkDate.style.color = 'red';
        checkDate.style.fontSize = '14px';
        checkDate.style.fontWeight = 'bold';
        return;
    }else{
        checkDate.textContent = "";
    }
    
    let notesContent = notesRef.value;
    if(!notesContent){
        checkNotes.textContent = "Error! Notes are empty";
        checkNotes.style.color = 'red';
        checkNotes.style.fontSize = '14px';
        checkNotes.style.fontWeight = 'bold';
        return;
    }else{
        checkNotes.textContent = ""
    }
    
    const empObj = {
        name: nameValue,
        profile: selectedProfile,
        gender: selectedGender,
        department: selectedDepartmentObj,
        salary: selectedSalary,
        startDate: dateObj,
        notes: notesContent
    }
    
    
    $.ajax({
        url: 'http://localhost:3001/employees',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(empObj),
        success: function() {
            console.log('Data saved successfully');
            resetform();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });
        
});





resetBtnRef.addEventListener('click', () =>{
  resetform();
})


cancelBtnRef.addEventListener('click', (e)=>{
    e.preventDefault();
    resetform();
})



function nameValidator(name){
    return /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(name);
}



// Error message validation
// UI changes
// Json server
// Jquery
// Practice Folder
