import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export interface ContactLead {
  id?: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "archived";
  createdAt: any;
}

const LEADS_COLLECTION = "leads";

/**
 * Save a new contact lead submission from the website contact form.
 * Status defaults to "new" automatically.
 */
export async function createContactLead(
  lead: Omit<ContactLead, "id" | "status" | "createdAt">
) {
  const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
    ...lead,
    status: "new",
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Update the status of an existing lead (e.g. new → contacted → archived).
 */
export async function updateContactLeadStatus(
  id: string,
  status: ContactLead["status"]
) {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await updateDoc(docRef, { status });
}

/**
 * Permanently delete a contact lead.
 */
export async function deleteContactLead(id: string) {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Real-time listener subscription for contact leads.
 * Returns an unsubscribe function — call it on component unmount.
 */
export function subscribeToContactLeads(
  callback: (leads: ContactLead[]) => void
) {
  const q = query(
    collection(db, LEADS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const leads: ContactLead[] = [];
      snapshot.forEach((docSnap) => {
        leads.push({ id: docSnap.id, ...docSnap.data() } as ContactLead);
      });
      callback(leads);
    },
    (error) => {
      console.error("Error subscribing to contact leads:", error);
    }
  );
}
