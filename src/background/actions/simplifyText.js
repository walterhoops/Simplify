import { executeInCurrentTab } from "../utils";

async function simplifyText() {
    // insert translateText api
    executeInCurrentTab({ func: window.translateTextAPI.create });
}

export default simplifyText;