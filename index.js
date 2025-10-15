import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://my-leads-4ed81-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function (snapshot) {
  const snapshotValues = snapshot.val();
  const leads = Object.values(snapshotValues);
  console.log(leads);

  render(leads);
});

deleteBtn.addEventListener("dblclick", function () {
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});
