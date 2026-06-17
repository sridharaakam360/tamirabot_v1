import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  onSnapshot
} from "firebase/firestore";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage: string;
  published: boolean;
  createdAt: any; // Timestamp or Date
  updatedAt: any; // Timestamp or Date
}

/**
 * Utility function to convert Google Drive sharing links to direct viewable image links.
 * Uses the highly reliable lh3.googleusercontent.com stream endpoint to bypass cookie blocks.
 */
export function getGoogleDriveDirectLink(url: string): string {
  if (!url) return "";
  
  // Format 1: https://drive.google.com/file/d/IMAGE_ID/view?usp=sharing
  const driveRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  
  // Format 2: https://drive.google.com/open?id=IMAGE_ID
  const idParamRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
  const idMatch = url.match(idParamRegex);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }
  
  return url;
}

const BLOGS_COLLECTION = "blogs";

export async function createBlogPost(post: Omit<BlogPost, "createdAt" | "updatedAt">) {
  // Store raw coverImage URL so it can be edited easily, parsed on rendering
  const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
    ...post,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
}

export async function updateBlogPost(id: string, post: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>) {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  const updateData: any = {
    ...post,
    updatedAt: Timestamp.now()
  };
  await updateDoc(docRef, updateData);
}

export async function deleteBlogPost(id: string) {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data
    } as BlogPost;
  }
  return null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, BLOGS_COLLECTION), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data
    } as BlogPost;
  }
  return null;
}

export async function getAllBlogPosts(onlyPublished = false): Promise<BlogPost[]> {
  const q = query(collection(db, BLOGS_COLLECTION));
  const querySnapshot = await getDocs(q);
  const posts: BlogPost[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({
      id: doc.id,
      ...doc.data()
    } as BlogPost);
  });

  // Sort by createdAt descending in memory
  posts.sort((a, b) => {
    const secondsA = a.createdAt?.seconds || 0;
    const secondsB = b.createdAt?.seconds || 0;
    return secondsB - secondsA;
  });

  // Filter in memory if onlyPublished is requested
  if (onlyPublished) {
    return posts.filter(p => p.published);
  }

  return posts;
}

/**
 * Real-time listener subscription for blog posts (Add, Update, Delete updates automatically)
 */
export function subscribeToBlogPosts(callback: (blogs: BlogPost[]) => void, onlyPublished = false) {
  const q = query(collection(db, BLOGS_COLLECTION));
  
  return onSnapshot(q, (querySnapshot) => {
    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data()
      } as BlogPost);
    });

    // Sort by createdAt descending in memory
    posts.sort((a, b) => {
      const secondsA = a.createdAt?.seconds || 0;
      const secondsB = b.createdAt?.seconds || 0;
      return secondsB - secondsA;
    });

    if (onlyPublished) {
      callback(posts.filter(p => p.published));
    } else {
      callback(posts);
    }
  }, (error) => {
    console.error("Error subscribing to blogs:", error);
  });
}
