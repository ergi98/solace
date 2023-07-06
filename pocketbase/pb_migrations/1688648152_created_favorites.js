migrate((db) => {
  const collection = new Collection({
    "id": "0yf96frxfrda2ob",
    "created": "2023-07-06 12:55:52.380Z",
    "updated": "2023-07-06 12:55:52.380Z",
    "name": "favorites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1zug3gab",
        "name": "mal_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "oou6b2it",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kuxc9ueb",
        "name": "image",
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
  const collection = dao.findCollectionByNameOrId("0yf96frxfrda2ob");

  return dao.deleteCollection(collection);
})
