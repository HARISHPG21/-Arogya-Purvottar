/**
 * IndexedDB Offline Storage Manager
 * Stores ASHA field surveys in browser when offline,
 * then syncs automatically when connectivity is restored.
 */

const DB_NAME = 'arogya_ne_offline';
const DB_VERSION = 1;
const STORE_NAME = 'offline_surveys';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = (e: any) => resolve(e.target.result);
    req.onerror = (e: any) => reject(e.target.error);
  });
}

export async function saveOfflineSurvey(survey: any): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).add({ ...survey, savedAt: new Date().toISOString(), synced: false });
    tx.oncomplete = () => resolve();
    tx.onerror = (e: any) => reject(e.target.error);
  });
}

export async function getOfflineSurveys(): Promise<any[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = (e: any) => resolve(e.target.result);
    req.onerror = (e: any) => reject(e.target.error);
  });
}

export async function clearSyncedSurveys(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = (e: any) => reject(e.target.error);
  });
}

export async function syncOfflineSurveys(apiBase: string): Promise<number> {
  const surveys = await getOfflineSurveys();
  if (surveys.length === 0) return 0;

  let synced = 0;
  for (const s of surveys) {
    try {
      const res = await fetch(`${apiBase}/asha/survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      });
      if (res.ok) synced++;
    } catch {
      // Still offline, will retry next time
    }
  }
  if (synced > 0) {
    await clearSyncedSurveys();
  }
  return synced;
}
