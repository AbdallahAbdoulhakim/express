const searchBtn = document.querySelector("#searchBtn");
const selectclientCountry = document.querySelector("#clientCountry");

const getPersonById = async (id) => {
  try {
    const axios_data = await axios.get(`/api/people/${id}`);
    const person = axios_data.data.data;
    return person;
  } catch (error) {
    return error.message;
  }
};

const getPeople = async (search = "") => {
  const resultContainer = document.querySelector("#peopleContainer");
  try {
    resultContainer.innerHTML = "";

    const axios_data = await axios.get(
      search ? `/api/people?search=${search.toLowerCase()}` : "/api/people"
    );

    const people = axios_data.data.data;

    if (people.length === 0) {
      resultContainer.innerHTML = `<div class="alert alert-warning" role="alert">
        No person matches your query!
        </div>`;
    }

    const peopleHtmlArr = people.map((pers) => {
      return `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                <div class="card" style="min-width: 15rem">
                    <img src="${pers.image}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${pers.clientName}</h5>
                        <p class="card-text">
                            <div class="alert alert-secondary" role="alert">
                                Email : ${pers.email}
                            </div>
                            <div class="alert alert-secondary" role="alert">
                                Project : ${pers.project}
                            </div>
                            <div class="alert alert-secondary" role="alert">
                                Birthdate : ${pers.birthdate}
                            </div>
                            <div class="alert alert-secondary" role="alert">
                                Country : ${pers.country}
                            </div>
                        </p>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#personFormModal" data-bs-id="${pers.id}" data-bs-action="Update" >Update</button>
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        
        `;
    });

    resultContainer.innerHTML = peopleHtmlArr.join("");
  } catch (error) {
    resultContainer.innerHTML = `<div class="alert alert-danger" role="alert">
        ${error.message}
        </div>`;
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputSearch = _.escape(document.querySelector("#inputSearch").value);

  getPeople(inputSearch);
});

getPeople();

// Modal

const personModal = document.querySelector("#personFormModal");
personModal.addEventListener("show.bs.modal", (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;

  const action = button.getAttribute("data-bs-action");

  document.querySelector("#personForm").reset();

  const label = personModal.querySelector("#personFormModalLabel");
  const btnSubmit = personModal.querySelector("#modalBtnSubmit");

  if (action === "Update") {
    (async function () {
      label.innerHTML = "Update";
      btnSubmit.innerHTML = "Update";
      // Extract info from data-bs-* attributes
      const clientID = Number(button.getAttribute("data-bs-id"));

      const person = await getPersonById(clientID);

      const inputClientID = personModal.querySelector("#clientID");
      inputClientID.value = person.id;

      const inputClientName = personModal.querySelector("#clientName");
      inputClientName.value = person.clientName;

      const inputClientEmail = personModal.querySelector("#clientEmail");
      inputClientEmail.value = person.email;

      const inputClientProject = personModal.querySelector("#clientProject");
      inputClientProject.value = person.project;

      const inputClientBirthdate =
        personModal.querySelector("#clientBirthdate");
      inputClientBirthdate.value = person.birthdate;

      const inputClientCountry = personModal.querySelector("#clientCountry");
      inputClientCountry.value = person.country;
    })();
  }

  if (action === "Create") {
    label.innerHTML = "Add a new Person";
    btnSubmit.innerHTML = "Add";
  }
});
