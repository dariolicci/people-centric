browser.runtime.onStartup.addListener(() => {
    browser.peopleCentric.createPeopleCentricFolder().then(() => {
        console.log("People-Centric Folder Created!");
    });
});

browser.folders.onCreated.addListener((folder) => {
    if (folder.name === "People-Centric View") {
        browser.peopleCentric.getMessagesGroupedByContact().then(groupedData => {
            // Qui puoi aggiungere la logica per popolare la cartella con i messaggi raggruppati
            console.log("Populating People-Centric View with grouped messages");
            // Esempio: Aggiungi logica per spostare i messaggi nella cartella
        });
    }
});
