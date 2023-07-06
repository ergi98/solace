migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0yf96frxfrda2ob")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_w61b42f` ON `favorites` (`mal_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0yf96frxfrda2ob")

  collection.indexes = []

  return dao.saveCollection(collection)
})
