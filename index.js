var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var bookmark;





if (localStorage.book != null) {
  bookmark = JSON.parse(localStorage.book);
} else {
  bookmark = [];
}

Submit.onclick = function () {
  var name = siteName.value.trim();
  var url = siteUrl.value.trim();

  siteName.classList.remove("is-invalid", "is-valid");
  siteUrl.classList.remove("is-invalid", "is-valid");
  if (name.length < 3) {
    siteName.classList.add("is-invalid");
    showModal();
    return;
  } else {
    siteName.classList.add("is-valid");
  }

  var urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-z]{2,})(\/\S*)?$/;
  if (!urlPattern.test(url)) {
    siteUrl.classList.add("is-invalid");
    showModal();
    return;
  } else {
    siteUrl.classList.add("is-valid");
  }

  var list = {
    siteName: siteName.value,
    siteUrl: siteUrl.value,
  };

  var isDuplicate = bookmark.some(function (item) {
    return (
      item.siteName.toLowerCase() === list.siteName.toLowerCase() ||
      item.siteUrl === list.siteUrl
    );
  });

  if (isDuplicate) {
    siteName.classList.add("is-invalid");
    siteUrl.classList.add("is-invalid");
    showModal();
    return;
  } else {
    siteName.classList.add("is-valid");
    siteUrl.classList.add("is-valid");
    bookmark.push(list);
    localStorage.setItem("book", JSON.stringify(bookmark));
    cleardata();
    showData();
  }
};


function cleardata() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteUrl.classList.remove("is-valid", "is-invalid");
}

function showData() {
  var table = "";
  for (i = 0; i < bookmark.length; i++) {
    table += `
        
         <tr>
              <td>${i + 1}</td>
              <td>${bookmark[i].siteName}</td>
              <td>
                <a
                  href="${bookmark[i].siteUrl}"
                  target="_blank"
                  ><button type="button" class="btn text-white btn-visit">
                    <i class="fa-solid fa-eye text-white"></i> Visit
                  </button></a
                >
              </td>
              <td>
                <button onclick= "deletepro( ${i})"  type="button" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;

  var btndelete = document.getElementById("deleteall");
  if (bookmark.length > 0) {
    btndelete.classList.add("d-inline");
  } else {
    btndelete.classList.add("d-none");
  }
}
showData();

function deletepro(i) {
  bookmark.splice(i, 1);
  localStorage.setItem("book", JSON.stringify(bookmark));
  showData();
}

