migrate((db) => {
  const collection = new Collection({
    "id": "i12fzasfrnvtctu",
    "created": "2023-06-11 00:20:09.643Z",
    "updated": "2023-06-11 00:20:09.643Z",
    "name": "deckLists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bwcxadsx",
        "name": "deckListArray",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "jpfubtmf",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i12fzasfrnvtctu");

  return dao.deleteCollection(collection);
})
