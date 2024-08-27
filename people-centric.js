var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var peopleCentric = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      peopleCentric: {
        async createPeopleCentricFolder() {
          let accounts = await browser.accounts.list();
          for (let account of accounts) {
            let rootFolder = await browser.folders.getRootFolder(account);
            let existingFolders = await browser.folders.getSubFolders(rootFolder);
            let peopleCentricFolder = existingFolders.find(folder => folder.name === "People-Centric View");

            if (!peopleCentricFolder) {
              await browser.folders.create(account.id, rootFolder.path, "People-Centric View");
            }
          }
        },

        async getMessagesGroupedByContact() {
          let accounts = await browser.accounts.list();
          let contactsMap = {};

          for (let account of accounts) {
            let folders = await browser.folders.list(account.id);
            for (let folder of folders) {
              if (folder.type === "inbox" || folder.type === "sent") {
                let messages = await browser.messages.list(folder);
                for (let message of messages.messages) {
                  let contactEmail = message.author.includes("<")
                      ? message.author.split("<")[1].replace(">", "")
                      : message.author;

                  if (!contactsMap[contactEmail]) {
                    contactsMap[contactEmail] = [];
                  }
                  contactsMap[contactEmail].push(message);
                }
              }
            }
          }
          return contactsMap;
        }
      }
    };
  }
};
