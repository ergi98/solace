migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("q7ndeyxifn3cv5h");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "q7ndeyxifn3cv5h",
    "created": "2023-07-06 00:36:37.799Z",
    "updated": "2023-07-06 00:36:37.799Z",
    "name": "favorites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "spxddwqm",
        "name": "mal_id",
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
})
