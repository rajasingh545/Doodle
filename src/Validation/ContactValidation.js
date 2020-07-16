const validator = require('validator');

exports.ContactValidation = async (form) => {
    var error = {};
    const { email, name, company, image } = form;
    if(validator.isEmail(email) == false){
      error["email"] = "Please enter the valid email."
    }
    if (!email) {
      error["email"] = "Please enter contact person email.";
    }
    if (!name) {
      error["name"] = "Please enter contact person name.";
    }
    if (!company) {
      error["company"] = "Please enter contact person company.";
    }
    if (!image) {
      error["image"] = "Please upload the contact person image.";
    }
    return error;
  };
  