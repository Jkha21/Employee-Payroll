const addUserRef = document.getElementById('empDash-addUserBtn-cnt');
const userDetailsCnt = document.querySelector('.empDash-userDetails-cnt');
const deleteBtn = document.querySelector('.empDash-deleteBtn-cnt');
// import trash from '../assets/trash.jpg';
// import edit from '../assets/edit.jpg';


addUserRef.addEventListener('click', (e) =>{
    e.preventDefault();
    url= 'http://localhost:3001/employees',
    $.get(url)
        .done(function(data) {
            const empData = data[0]; 
            const createWrapper = document.createElement('div');
            createWrapper.style.display = 'flex';
            createWrapper.style.flexDirection = 'row';
            createWrapper.style.height = 'auto';  
            createWrapper.style.alignItems = 'center';
            createWrapper.style.padding = '9px 38px 9px 34px'
            createWrapper.style.background = '#FFFFFF 0% 0% no-repeat padding-box';
            createWrapper.style.border = '1px solid #E3E3E3';
            createWrapper.style.opacity = '1';
            const createImg = document.createElement('img');
            createImg.setAttribute('src', empData.profile);
            createImg.style.marginRight = '16px';
            createImg.style.width = '45px';
            createImg.style.height = '45px';
            const createName = document.createElement('span');
            createName.textContent = empData.name;
            createName.style.width = '16%';
            createName.style.height = '21px'
            createName.style.marginRight = '4.5%';
            // createName.style.textAlign = 'left';
            const createGender = document.createElement('span');
            createGender.textContent = empData.gender;
            createGender.style.marginRight = '8%';
            const createDepartmentCnt = document.createElement('div');
            createDepartmentCnt.style.marginLeft = '4%'
            // createDepartmentCnt.style.display = 'flex';
            // createDepartmentCnt.style.gap = '56px';
            // createDepartmentCnt.style.flexWrap = 'wrap';
            empData.department.forEach(department => {
                const depElement = document.createElement('span');
                depElement.className = 'empDash-userDepartment-cnt'; 
                depElement.textContent = department;
                depElement.style.width = '1%';
                depElement.style.height = '2%';
                depElement.style.background = '#E9FEA5 0% 0% no-repeat padding-box';
                depElement.style.borderRadius = '13px';
                depElement.style.opacity = '1';
                depElement.style.marginRight = '4px';
                createDepartmentCnt.appendChild(depElement);
            });
            createDepartmentCnt.style.marginRight = '8%';
            const createSalary = document.createElement('span');
            createSalary.textContent = empData.salary;
            createSalary.style.font = 'normal normal normal 16px/21px Roboto';
            createSalary.style.color = '#3D3D3D';
            createSalary.style.opacity = '1';
            createSalary.style.marginRight = '7%';
            const createStartDate = document.createElement('span');
            createStartDate.textContent = `${empData.startDate.date} ${empData.startDate.month.slice(0, 3)} ${empData.startDate.year}`;
            createStartDate.style.width = '5%';
            createSalary.style.marginRight = '7%';
            createStartDate.style.marginRight = "10%"
            const createDelbtn = document.createElement('button');
            const createDelImg = document.createElement('img');
            // createDelImg.setAttribute('src', ..//assets/trash.jpg);
            createDelbtn.appendChild(createDelImg);
            createDelbtn.setAttribute('id', empData.id);
            createDelbtn.style.marginRight = '3px';
            const createEditbtn = document.createElement('button');
            const EditBtnImg = document.createElement('img');
            // EditBtnImg.setAttribute('src', {editImg});
            createEditbtn.appendChild(EditBtnImg);
            createEditbtn.setAttribute('id', empData.id);
            createWrapper.append(createImg, createName, createGender, createDepartmentCnt, createSalary, createStartDate, createDelbtn, createEditbtn);
            userDetailsCnt.insertAdjacentElement("afterend", createWrapper);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Error fetching data:', textStatus, errorThrown);
        });
})

// userDeleteRef.addEventListener('click', (e) => {
//     e.preventDefault();
    
// })


// userEditBtnRef.addEventListener('click', (e) => {
//     e.preventDefault();

// })