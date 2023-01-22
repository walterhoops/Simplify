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
        chrome.contextMenus.create({ title: 'logHighlightedText', id: 'logHighlightedText', contexts: ['selection'] });
    });
}

function initializeContextMenuEventListeners() {
    chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
        switch (menuItemId) {
            case 'test':
                console.log("testing context menu")
                break;
            case 'logHighlightedText':
                console.log(selectionText)
        }
    });
}

export { initialize };