const express = require("express");
const path = require("path");
const morgan = require("morgan");
const moment = require("moment");
const { access } = require("fs").promises;

const app = express();

const { people } = require("./data");
const { createWriteStream } = require("fs");

const logStream = createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const capitalize = (name) => {
  return name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

const customTrim = (name) => {
  return name.replace(/\s{2,}/g, " ");
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateName = (name) => {
  const regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
  return regexp.test(name);
};

const checkUnicity = (val, key, arr) => {
  return !arr.find((elt) => elt[key] === val);
};

const validateProject = (project) => {
  const validProjects = new Set([
    "Dashboard",
    "Website",
    "App Design",
    "Development",
  ]);

  return validProjects.has(project);
};

const validateBirthDate = (birthdate) => {
  let valid = false;
  let format = "";

  // year, month , day

  if (moment(birthdate, "YYYY-MM-DD", true).isValid()) {
    valid = true;
    format = "YYYY-MM-DD";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YY-M-D", true).isValid()) {
    valid = true;
    format = "YY-M-D";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YYYY/MM/DD", true).isValid()) {
    valid = true;
    format = "YYYY/MM/DD";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YY/M/D", true).isValid()) {
    valid = true;
    format = "YY/M/D";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YYYY.MM.DD", true).isValid()) {
    valid = true;
    format = "YYYY.MM.DD";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YY.M.D", true).isValid()) {
    valid = true;
    format = "YY.M.D";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YYYY MM DD", true).isValid()) {
    valid = true;
    format = "YYYY MM DD";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "YY M D", true).isValid()) {
    valid = true;
    format = "YY M D";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  // month, day , year

  if (moment(birthdate, "MM-DD-YYYY", true).isValid()) {
    valid = true;
    format = "MM-DD-YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "M-D-YY", true).isValid()) {
    valid = true;
    format = "M-D-YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "MM/DD/YYYY", true).isValid()) {
    valid = true;
    format = "MM/DD/YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "M/D/YY", true).isValid()) {
    valid = true;
    format = "M/D/YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "MM.DD.YYYY", true).isValid()) {
    valid = true;
    format = "MM.DD.YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "M.D.YY", true).isValid()) {
    valid = true;
    format = "M.D.YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "MM DD YYYY", true).isValid()) {
    valid = true;
    format = "MM DD YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "M D YY", true).isValid()) {
    valid = true;
    format = "M D YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  // day, month , year

  if (moment(birthdate, "DD-MM-YYYY", true).isValid()) {
    valid = true;
    format = "DD-MM-YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "D-M-YY", true).isValid()) {
    valid = true;
    format = "D-M-YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "DD/MM/YYYY", true).isValid()) {
    valid = true;
    format = "DD/MM/YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "D/M/YY", true).isValid()) {
    valid = true;
    format = "D/M/YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "DD.MM.YYYY", true).isValid()) {
    valid = true;
    format = "DD.MM.YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "D.M.YY", true).isValid()) {
    valid = true;
    format = "D.M.YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "DD MM YYYY", true).isValid()) {
    valid = true;
    format = "DD MM YYYY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  if (moment(birthdate, "D M YY", true).isValid()) {
    valid = true;
    format = "D M YY";
    return {
      valid: valid,
      date: moment(birthdate, format).format("YYYY-MM-DD"),
    };
  }

  return { valid: false, date: "Invalid Date" };
};

const validateAge = (birthdate) => {
  return moment().diff(moment(birthdate, "YYYY-MM-DD"), "years", false) >= 18;
};

const validateCountry = (country) => {
  const validCountries = new Set([
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of The",
    "Cook Islands",
    "Costa Rica",
    "Cote D'ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-bissau",
    "Guyana",
    "Haiti",
    "Heard Island and Mcdonald Islands",
    "Holy See (Vatican City State)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran, Islamic Republic of",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Democratic People's Republic of",
    "Korea, Republic of",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia, The Former Yugoslav Republic of",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Pierre and Miquelon",
    "Saint Vincent and The Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and The South Sandwich Islands",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Virgin Islands, British",
    "Virgin Islands, U.S.",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ]);

  return validCountries.has(country);
};

const validateImage = async (image) => {
  const imagePath = path.join(__dirname, "/src/", image);

  try {
    await access(imagePath);
    return true;
  } catch (error) {
    return false;
  }
};

const validateRequest = async (method = "put", person) => {
  let err = [];
  let incon = [];

  const { clientName, email, project, birthdate, country, image } = person;

  if (
    method === "post" &&
    (!clientName || !project || !birthdate || !country || !image || !email)
  ) {
    err.push({
      error: "Please provide all information for the person to be created!",
      loc: 0,
    });
  }

  if (
    method === "put" &&
    !clientName &&
    !project &&
    !birthdate &&
    !country &&
    !image &&
    !email
  ) {
    err.push({
      error:
        "Please provide one of the information of the person to be updated!",
      loc: 0,
    });
  }

  if (email && !validateEmail(email)) {
    err.push({ error: "Incorrect email format!", loc: 2 });
  }

  if (clientName && !validateName(customTrim(clientName))) {
    err.push({ error: "Incorrect client name!", loc: 1 });
  }

  if (method === "post" && email && !checkUnicity(email, "email", people)) {
    incon.push({
      inconsitency: "A person with the provided email already exist!",
      loc: 2,
    });
  }

  if (project && !validateProject(capitalize(customTrim(project)))) {
    err.push({ error: "Incorrect project Name!", loc: 3 });
  }

  if (birthdate && !validateBirthDate(birthdate).valid) {
    err.push({ error: "Incorrect date format!", loc: 4 });
  }

  if (
    birthdate &&
    validateBirthDate(birthdate).valid &&
    !validateAge(validateBirthDate(birthdate).date)
  ) {
    err.push({
      error:
        "The provided birthdate corresponds to a person under 18 years old!",
      loc: 4,
    });
  }

  if (country && !validateCountry(country)) {
    err.push({ error: "Incorrect country!", loc: 5 });
  }

  if (image) {
    const validImage = await validateImage(image);

    if (!validImage) {
      err.push({ error: "Image does not exist!", loc: 6 });
    }
  }

  return {
    err: err,
    incon: incon,
  };
};

app.use(express.json());
app.use(morgan("combined", { stream: logStream }));
app.use(express.static("./src"));

app.get("/api/people", (req, res) => {
  const { search, limit } = req.query;
  let orderedPeople = [...people];

  if (search) {
    orderedPeople = orderedPeople.filter(
      (person) =>
        person.clientName.toLowerCase().includes(search) ||
        person.project.toLowerCase().includes(search) ||
        person.country.toLowerCase().includes(search) ||
        person.birthdate.toLowerCase().includes(search)
    );
  }

  if (limit) {
    orderedPeople = orderedPeople.slice(0, Number(limit));
  }

  res.status(200).json({ success: true, data: orderedPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

app.get("/api/people/:personId", (req, res) => {
  const { personId } = req.params;

  const person = people.find((pers) => pers.id === Number(personId));

  if (!person) {
    return res.status(404).json({
      success: false,
      message: "Resource Does Not Exist!",
      errors: { error: "Person Does Not Exist!", loc: 0 },
    });
  }

  res.status(200).json({
    success: true,
    message: "Person successfully retrieved!",
    data: person,
  });
});

app.post("/api/people", (req, res) => {
  (async () => {
    const body = req.body;

    const validRequest = await validateRequest("post", body);

    const { clientName, email, project, birthdate, country, image } = body;

    if (validRequest.err.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Bad request!",
        errors: validRequest.err,
      });
    }

    if (validRequest.incon.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Conflict!",
        inconistencies: validRequest.incon,
      });
    }

    const person = {
      id: Math.max(...people.map((pers) => pers.id)) + 1,
      clientName: capitalize(customTrim(clientName)),
      email: email,
      project: capitalize(customTrim(project)),
      birthdate: validateBirthDate(birthdate).date,
      country: country,
      image: image,
    };

    people.push(person);

    res.status(201).json({
      success: true,
      message: `${person.clientName} successfully created!`,
      data: person,
    });
  })();
});

app.put("/api/people/:personId", (req, res) => {
  const { personId } = req.params;

  const person = people.find((pers) => pers.id === Number(personId));

  if (!person) {
    return res.status(404).json({
      success: false,
      message: "Resource Does Not Exist!",
      errors: { error: "Person Does Not Exist!", loc: 0 },
    });
  }

  (async () => {
    const body = req.body;

    const validRequest = await validateRequest("put", body);

    if (validRequest.err.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Bad request!",
        errors: validRequest.err,
      });
    }

    if (validRequest.incon.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Conflict!",
        inconistencies: validRequest.incon,
      });
    }

    const { clientName, email, project, birthdate, country, image } = body;

    let modifiedPerson = person;

    if (clientName) {
      modifiedPerson = { ...modifiedPerson, clientName: clientName };
    }

    if (email) {
      modifiedPerson = { ...modifiedPerson, email: email };
    }

    if (project) {
      modifiedPerson = { ...modifiedPerson, project: project };
    }

    if (birthdate) {
      modifiedPerson = { ...modifiedPerson, birthdate: birthdate };
    }

    if (country) {
      modifiedPerson = { ...modifiedPerson, country: country };
    }

    if (image) {
      modifiedPerson = { ...modifiedPerson, image: image };
    }

    const indexPerson = people.findIndex(
      (pers) => pers.id === Number(personId)
    );

    people.splice(indexPerson, 1, modifiedPerson);

    res.status(200).json({
      success: true,
      message: `${modifiedPerson.clientName} successfully updated!`,
      data: modifiedPerson,
    });
  })();
});

app.delete("/api/people/:personId", (req, res) => {
  const { personId } = req.params;

  const person = people.find((pers) => pers.id === Number(personId));

  if (!person) {
    return res.status(404).json({
      success: false,
      message: "Resource Does Not Exist!",
      errors: { error: "Person Does Not Exist!", loc: 0 },
    });
  }

  const indexPerson = people.findIndex((pers) => pers.id === Number(personId));

  people.splice(indexPerson, 1);

  res.status(200).json({
    success: true,
    message: `${person.clientName} successfully deleted!`,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, message: "Resource does not exist!" });
});
