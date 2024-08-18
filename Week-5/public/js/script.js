$(document).ready(function () {
  $("#registrationForm").on("submit", function (event) {
    event.preventDefault();
    var formData = {
      name: $("#name").val(),
      country: $("#country").val(),
      enrolledcourse: $("enrolledcourse").val(),
      studentId: $("#studentId").val(),
      about: $("#about").val(),
    };

    $.ajax({
      url: "/api/register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: response.message,
        });
        $("#registrationForm")[0].reset();
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while submitting your registration.",
        });
      },
    });
  });
});
