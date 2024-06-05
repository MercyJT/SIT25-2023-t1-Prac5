const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
  let formData = {
    title: $("#title").val(),
    image: $("#image").val(),
    link: $("#link").val(),
    description: $("#description").val()
  };

  $.ajax({
    url: "/api/projects",
    data: JSON.stringify(formData),
    type: "POST",
    contentType: "application/json",
    success: (result) => {
      console.log("Form Data Submitted: ", result);
      $("#modal1").modal("close");
      alert("Data posted successfully");
      // Optionally, you could refresh the project list here
      getProjects();
    },
    error: (error) => {
      console.error("Error submitting form: ", error);
    }
  });
};

const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend = `
    <div class="col s4 center-align">
      <div class="card medium">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${item.image}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            ${item.title}<i class="material-icons right">more_vert</i>
          </span>
          <p><a href="#">${item.link}</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            ${item.title}<i class="material-icons right">close</i>
          </span>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    </div>`;
    $("#card-section").append(itemToAppend);
  });
};

const getProjects = () => {
  $.get("/api/projects", (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
};

$(document).ready(() => {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(() => {
    submitForm();
  });
  getProjects();
  $(".modal").modal();
});
