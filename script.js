
const getAndUpdate = () => {
  console.log("Get and Update is called")
  let usertitle = document.getElementById("title").value;
  let userdesc = document.getElementById("desc").value;
  if (!usertitle || !userdesc) {
    alert("Title and description cannot be empty");
    return; 
  }
  if (localStorage.getItem('itemsJson') == null) {
    itemsJsonArray = [];
    itemsJsonArray.push([usertitle, userdesc])
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
  } else {
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    itemsJsonArray.push([usertitle, userdesc]);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
  }
  update();
}

const update = () => {
  console.log('update is called')
  if (localStorage.getItem('itemsJson') == null) {
    itemsJsonArray = [];
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
  } else {
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
  }

  // populate the table
  let tablebody = document.getElementById("tablebody")
  let str = ""
  itemsJsonArray.forEach((element, index) => {
    str += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
        </tr>`
  });
  tablebody.innerHTML = str;

}

const deleted = (itemindex) =>{
      itemsJsonArrayStr = localStorage.getItem('itemsJson');
      itemsJsonArray = JSON.parse(itemsJsonArrayStr);
      itemsJsonArray.splice(itemindex,1)
      localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
      update();
}

const clearAll = () =>{
  if(confirm("Do you really want to delete all the TODOs")){
    console.log("List stated deleting")
    localStorage.clear()
    console.log("All items deleted...")
    update();
  }
  
}

addtask.addEventListener("click", getAndUpdate);
update();
