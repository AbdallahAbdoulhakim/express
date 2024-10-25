const searchBtn = document.querySelector("#searchBtn");

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
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                <div class="card" style="min-width: 15rem">
                    <img src="${pers.image}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${pers.clientName}</h5>
                        <p class="card-text">
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
                        <a href="#" class="btn btn-primary">Update</a>
                        <a href="#" class="btn btn-danger">Delete</a>
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
