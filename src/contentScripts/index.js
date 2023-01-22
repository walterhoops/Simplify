function initialize() {
  console.log("initalized listener")
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message.action)
    switch (request.message.action) {
      case "open modal":
        createModal();
        
        console.log(request.message.text)
      }
      
    })
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
}`

function createModal() {

  let modal = document.createElement('dialog')

  let form_container = document.createElement('div');
  form_container.className = "form-container"
  let h1_simplify = document.createElement('h1');
  h1_simplify.innerHTML = "Simplify"

  let slider = document.createElement('form');
  let h2_explain = document.createElement('h2');
  h2_explain.innerHTML = "Explain like I'm..."

  let slider_input = document.createElement('input');
  slider_input.type = "range"
  slider_input.id = "size"
  slider_input.name = "size"
  slider_input.min = "5"
  slider_input.max = "25"
  slider_input.step = "5"
  slider_input.value = "5"

  let slider_labels = document.createElement('div')
  slider_labels.className = "slider-labels"
  let label_5 = document.createElement('label')
  label_5.innerHTML = "5"
  let label_10 = document.createElement('label')
  label_10.innerHTML = "10"
  let label_15 = document.createElement('label')
  label_15.innerHTML = "15"
  let label_20 = document.createElement('label')
  label_20.innerHTML = "20"
  let label_25 = document.createElement('label')
  label_25.innerHTML = "25"
  slider_labels.appendChild(label_5)
  slider_labels.appendChild(label_10)
  slider_labels.appendChild(label_15)
  slider_labels.appendChild(label_20)
  slider_labels.appendChild(label_25)

  let h2_years = document.createElement('h2');
  h2_years.innerHTML = "years old"
  
  slider.appendChild(document.createElement('br'))
  slider.appendChild(h2_explain)
  slider.appendChild(slider_input)
  slider.appendChild(slider_labels)
  slider.appendChild(h2_years)

  form_container.appendChild(h1_simplify)
  form_container.append(slider)

  modal.appendChild(form_container)

  let form = document.createElement('form')
  form.method = 'dialog'
  let close = document.createElement('button');
  close.innerHTML += "Close"
  form.appendChild(close);

  modal.appendChild(form)

  let link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.innerHTML = slider_css

  document.getElementsByTagName('HEAD')[0].appendChild(link);
  document.body.appendChild(modal);

  modal.showModal();


  
}
export { initialize };