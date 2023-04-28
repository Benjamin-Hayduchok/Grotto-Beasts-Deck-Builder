migrate((db) => {
  const collection = new Collection({
    "id": "39l2yk2mg7cyj1j",
    "created": "2023-04-27 00:07:13.978Z",
    "updated": "2023-04-27 00:07:13.978Z",
    "name": "title",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2pisc7tw",
        "name": "test",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("39l2yk2mg7cyj1j");

  return dao.deleteCollection(collection);
})
