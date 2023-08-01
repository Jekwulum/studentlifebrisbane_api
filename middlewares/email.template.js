const template = {
  htmlBody: (email, name, message) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
</head>

<body>
  <strong>Name: ${name} </strong> <br>
  <strong>Email: ${email} </strong>
  <br>
  <p>${message}<p>
</body>

</html>`;
  }
};

module.exports = template;