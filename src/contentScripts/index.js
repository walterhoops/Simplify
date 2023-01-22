function initialize() {
  console.log("initalized listener");
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message.action);
    switch (request.message.action) {
      case "open modal":
        createModal();

        console.log(request.message.highlightedText);
        onSimplify(request.message.highlightedText)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  });
}

async function onSimplify(text, age = "5") {
  try {
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, age: age }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }

    return data.result.replace("\n", "");
  } catch (error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    console.log(error.message);
  }
}

const slider_css = `body {
  background-color: #F5F5F5;
}

.form-container {
background-color: #ffffff;
border: 2px solid #1A237E;
border-radius: 10px;
box-shadow: 2px 2px 5px #333;
padding: 20px;
width: 250px;
height: 350px;
}

h1 {
color: #1A237E;
font-size: 24px;
text-align: center;
margin-bottom: 20px;
}

input[type="text"] {
width: 100%;
padding: 12px 20px;
margin: 8px 0;
box-sizing: border-box;
border: 2px solid #1A237E;
border-radius: 4px;
font-size: 16px;
background-color: #F5F5F5;
}

input[type="submit"] {
width: 100%;
background-color: #1A237E;
color: white;
padding: 14px 20px;
margin: 8px 0;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
box-shadow: 2px 2px 5px #333;
}

input[type="range"] {
width: 100%;
margin: 20px 0;
}

input[type="submit"]:hover {
background: linear-gradient(to bottom, #0D47A1, #1A237E);
}

.form-container:before {
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: #F5F5F5;
border: 2px solid #1A237E;
border-radius: 10px;
z-index: -1;
}

.slider-labels {
display: flex;
justify-content: space-between;
width: 100%;
margin-top: 10px;
font-size: 12px;
}


.slider-labels label:nth-child(1) {
left: 5%;
}
.slider-labels label:nth-child(2) {
left: 20%;
}
.slider-labels label:nth-child(3) {
left: 35%;
}
.slider-labels label:nth-child(4) {
left: 50%;
}
.slider-labels label:nth-child(5) {
left: 65%;
}`;

const slider_html = `
<div>
  <div class="form-container">
    <h1>Simplify</h1>
    <form>
      <!-- <input type="text" placeholder="Enter text to simplify">
      <input type="submit" value="Submit"> -->
      <br>
      <h2>Explain like I'm...</h2>
      <input type="range" id="size" name="size" min="5" max="25" step="5" value="5">
  
      <div class="slider-labels">
        <label>5</label>
        <label>10</label>
        <label>15</label>
        <label>20</label>
        <label>25</label>
      </div>
      <h2>years old
      </h2>
    </form>
</div>`;

function createModal() {
  /** Create modal and add CSS */
  const modal_css = `
    width: 50%;
    height: 50%;
  `;
  let modal = document.createElement("dialog");
  modal.style.cssText = modal_css;

  /** Create closing button -> modal doesn't open without this */
  let close_form = document.createElement("form");
  close_form.method = "dialog";
  let close = document.createElement("button");
  close.innerHTML += "Close";
  close_form.appendChild(close);

  // inject slider html
  modal.innerHTML += slider_html;
  // append close button
  modal.appendChild(close_form);

  // inject CSS string into link element
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.innerHTML = slider_css;

  // add css to head
  document.getElementsByTagName("HEAD")[0].appendChild(link);

  // add modal to body
  document.body.appendChild(modal);

  // show modal required for modal to show
  modal.showModal();
}
export { initialize };
