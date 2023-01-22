async function create(selection = window.getSelection()) {
    const selectionString = selection.toString();

    // open modal
    let body = document.getElementsByTagName("BODY")[0];
    if (body) console.log(body);
}

export default create;