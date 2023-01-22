import { simplifyText } from "./actions/index.js";

function initialize() {
    // initialize
    initializeContextMenus();
    initializeContextMenuEventListeners();
}

function initializeContextMenus() {
    // Add option when right-clicking
    chrome.runtime.onInstalled.addListener(async () => {
        // remove existing menu items
        chrome.contextMenus.removeAll();

        chrome.contextMenus.create({ title: 'Test', id: 'test', contexts: ['selection'] });
    });
}

function initializeContextMenuEventListeners() {
    chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
        switch (menuItemId) {
            case 'test':
                // simplifyText();
                break;
        }
    });
}

export { initialize };