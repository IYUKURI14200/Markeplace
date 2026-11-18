import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const listingsRef = collection(db, "listings");

const withId = (d) => ({ id: d.id, ...d.data() });

export async function createListing(data, user) {
  return addDoc(listingsRef, {
    title: data.title,
    description: data.description,
    price: Number(data.price),
    contactPhone: data.contactPhone || "",
    ownerId: user.uid,
    ownerName: user.displayName || user.email,
    ownerEmail: user.email,
    createdAt: serverTimestamp(),
  });
}

export async function getAllListings() {
  const snap = await getDocs(query(listingsRef, orderBy("createdAt", "desc")));
  return snap.docs.map(withId);
}

// where() query: only the current user's listings
export async function getMyListings(uid) {
  const snap = await getDocs(query(listingsRef, where("ownerId", "==", uid)));
  return snap.docs.map(withId); // sorted in the page, avoids needing an index
}

export async function getListing(id) {
  const snap = await getDoc(doc(db, "listings", id));
  return snap.exists() ? withId(snap) : null;
}

export async function updateListing(id, data) {
  return updateDoc(doc(db, "listings", id), {
    title: data.title,
    description: data.description,
    price: Number(data.price),
    contactPhone: data.contactPhone || "",
  });
}

export const deleteListing = (id) => deleteDoc(doc(db, "listings", id));