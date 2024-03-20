const content = document.getElementById("content");
const url = "http://localhost:3000/api/employees";

const fetchData = async () => {
  content.innerHTML = "<p>loading...</p>";

  const res = await fetch(url);
  const data = await res.json();

  try {
    if (data) {
      content.innerHTML = data
        .map(({ name, job }) => {
          return `
                <div>
                  <h4>${name}</h4>
                  <p>${job}</p>
                </div>
                `;
        })
        .join(" ");
    }
  } catch (error) {
    content.innerHTML = `<p>there was an error...</p>`;
  }
};

window.addEventListener("DOMContentLoaded", fetchData);
