import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    // Database/Version
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readwrite");
    // Open specific object store
    const store = tx.objectStore("jate");
    // Put content in store
    const request = store.put({ id: 1, value: content });
    // Confirm test
    const result = await request;
    console.log("data saved to the database", result);
  };
  

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    // Database/Version
    const jateDB = await openDB("jate", 1);
    // New transaction
    const tx = jateDB.transaction("jate", "readonly");
   // Open specific object store
    const store = tx.objectStore("jate");
    // Get all requests
    const request = store.getAll();
    // Confirm test
    const result = await request;
    console.log("🚀 - data read from database", result);
    return result.value;
  };

initdb();