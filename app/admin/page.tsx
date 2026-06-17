"use client";

import { useState, useEffect } from "react";
import { 
  BlogPost, 
  subscribeToBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  getGoogleDriveDirectLink 
} from "@/lib/blogService";
import {
  ContactLead,
  subscribeToContactLeads,
  updateContactLeadStatus,
  deleteContactLead,
} from "@/lib/contactService";

export default function AdminPage() {
  // Authorization State
  const [pin, setPin] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"blogs" | "leads">("blogs");

  // Blog states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost> | null>(null);

  // Leads states
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [leadNameToDelete, setLeadNameToDelete] = useState("");
  const [isDeletingLead, setIsDeletingLead] = useState(false);
  const [leadConfirmOpen, setLeadConfirmOpen] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  // Custom Confirmation Modal State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [blogTitleToDelete, setBlogTitleToDelete] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom Alert Popup State
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({
    show: false,
    title: "",
    message: "",
    type: "info"
  });

  const showAlert = (message: string, type: "success" | "error" | "info" = "info", title: string = "") => {
    setNotification({
      show: true,
      title: title || (type === "success" ? "Success" : type === "error" ? "Error" : "Notification"),
      message,
      type
    });
  };

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Tamirabot Admin");
  const [category, setCategory] = useState("EV charging");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [appsScriptUrl, setAppsScriptUrl] = useState("https://script.google.com/macros/s/AKfycbxk2AV_w1AHcDCxFoiySnYa86r0Yo91EQxRjUGPnzHmY_55bAowquvBVxrf5z8j4GKI7g/exec");

  // Check authorization and load settings on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authorized");
    if (authStatus === "true") {
      setIsAuthorized(true);
    }
    const savedAppsScriptUrl = localStorage.getItem("apps_script_url");
    if (savedAppsScriptUrl) {
      setAppsScriptUrl(savedAppsScriptUrl);
    }
  }, []);

  // Real-time listener for blog posts
  useEffect(() => {
    if (!isAuthorized) return;
    
    const unsubscribe = subscribeToBlogPosts((data) => {
      setBlogs(data);
      setLoading(false);
    }, false);

    return () => unsubscribe();
  }, [isAuthorized]);

  // Real-time listener for contact leads
  useEffect(() => {
    if (!isAuthorized) return;

    const unsubscribe = subscribeToContactLeads((data) => {
      setLeads(data);
      setLeadsLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "tamira2026" || pin === "tamira@2026" || pin === "admin123") {
      setIsAuthorized(true);
      sessionStorage.setItem("admin_authorized", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Admin PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("admin_authorized");
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  const openNewEditor = () => {
    setCurrentBlog(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setAuthor("Tamirabot Admin");
    setCategory("EV charging");
    setCoverImage("");
    setPublished(true);
    setEditorOpen(true);
  };

  const openEditEditor = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setAuthor(blog.author);
    setCategory(blog.category);
    setCoverImage(blog.coverImage);
    setPublished(blog.published);
    setEditorOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      showAlert("Please fill in Title, Slug, and Content", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const blogData = {
        title,
        slug,
        excerpt,
        content,
        author,
        category,
        coverImage,
        published
      };

      if (currentBlog?.id) {
        await updateBlogPost(currentBlog.id, blogData);
      } else {
        await createBlogPost(blogData);
      }

      setEditorOpen(false);
      // No manual fetch required: subscribeToBlogPosts handles real-time sync automatically!
    } catch (err) {
      console.error("Error saving blog:", err);
      showAlert("Error saving blog post. See console.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      if (appsScriptUrl && appsScriptUrl.trim() !== "") {
        // Upload via Google Apps Script directly to the Google Drive folder
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const rawBase64 = reader.result as string;
            const base64Payload = rawBase64.split(",")[1] || rawBase64;
            const response = await fetch(appsScriptUrl, {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "text/plain;charset=utf-8"
              },
              body: JSON.stringify({
                name: file.name,
                type: file.type,
                base64: base64Payload
              })
            });
            const result = await response.json();
            if (result.status === "success" && result.directUrl) {
              setCoverImage(result.directUrl);
              // showAlert("Image uploaded directly to Google Drive successfully!", "success");
            } else {
              throw new Error(result.message || "Failed to upload to Google Drive");
            }
          } catch (err: any) {
            console.error("Google Drive upload error:", err);
            showAlert(`Google Drive Upload Error: ${err.message || err}`, "error");
          } finally {
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // Upload via Firebase Storage
        const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
        const { app } = await import("@/lib/firebase");
        const storage = getStorage(app);
        const storageRef = ref(storage, `blog-covers/${Date.now()}_${file.name}`);
        
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setCoverImage(downloadURL);
        showAlert("Image uploaded to Firebase Storage successfully!", "success");
        setUploading(false);
      }
    } catch (err: any) {
      console.error("Upload handler outer error:", err);
      showAlert(`Upload Failed: ${err.message || err}`, "error");
      setUploading(false);
    }
  };

  const copyAppsScriptCode = () => {
    const code = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var folderId = "1kRQqMg6jhz1TW42nKw7eIqYOcpMV4tgT"; // Your Google Drive Folder ID
    var folder = DriveApp.getFolderById(folderId);
    
    var contentType = data.type;
    var base64Data = data.base64;
    if (base64Data.indexOf(",") > -1) {
      base64Data = base64Data.split(",")[1];
    }
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, contentType, data.name);
    
    var file = folder.createFile(blob);
    
    // Try to set public sharing, but catch corporate Workspace admin restrictions
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (sharingErr) {
      // Shared drive or corporate workspace policy may restrict setting sharing from code
    }
    
    var resultObj = {
      status: "success",
      url: file.getUrl(),
      id: file.getId(),
      directUrl: "https://lh3.googleusercontent.com/d/" + file.getId()
    };
    
    return ContentService.createTextOutput(JSON.stringify(resultObj))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// RUN THIS FUNCTION ONCE IN THE EDITOR TO AUTHORIZE GOOGLE DRIVE ACCESS
function authorize() {
  DriveApp.getRootFolder();
}`;
    navigator.clipboard.writeText(code);
    showAlert("Google Apps Script code copied to clipboard! Paste it into your Apps Script editor, run the 'authorize' function once, then deploy.", "success", "Copied!");
  };

  const triggerDeleteConfirmation = (id: string, title: string) => {
    setBlogToDelete(id);
    setBlogTitleToDelete(title);
    setConfirmOpen(true);
  };

  const executeDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await deleteBlogPost(blogToDelete);
      setConfirmOpen(false);
      setBlogToDelete(null);
      setBlogTitleToDelete("");
    } catch (err) {
      console.error("Error deleting blog:", err);
      showAlert("Error deleting blog post.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const triggerLeadDeleteConfirmation = (id: string, name: string) => {
    setLeadToDelete(id);
    setLeadNameToDelete(name);
    setLeadConfirmOpen(true);
  };

  const executeLeadDelete = async () => {
    if (!leadToDelete) return;
    setIsDeletingLead(true);
    try {
      await deleteContactLead(leadToDelete);
      setLeadConfirmOpen(false);
      setLeadToDelete(null);
      setLeadNameToDelete("");
    } catch (err) {
      console.error("Error deleting lead:", err);
      showAlert("Error deleting contact lead.", "error");
    } finally {
      setIsDeletingLead(false);
    }
  };

  const handleLeadStatusChange = async (id: string, status: ContactLead["status"]) => {
    try {
      await updateContactLeadStatus(id, status);
    } catch (err) {
      console.error("Error updating lead status:", err);
      showAlert("Error updating lead status.", "error");
    }
  };

  // PIN Gate Interface
  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[#0F0826] flex items-center justify-center font-sans p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#24125F_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,#F04F54_0%,transparent_80%)] opacity-20 pointer-events-none" />
        
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#F04F54] to-[#ff7e82] flex items-center justify-center shadow-lg shadow-[#F04F54]/25 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Tamirabot Admin</h1>
            <p className="text-white/50 text-sm mt-1 text-center">Authentication required to access the blog system</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                Enter Admin PIN
              </label>
              <input
                id="pin"
                type="password"
                placeholder="••••••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F04F54] focus:ring-1 focus:ring-[#F04F54] transition-all duration-200 text-center font-bold tracking-widest"
                required
              />
              {authError && (
                <p className="text-[#F04F54] text-xs font-semibold mt-2.5 text-center flex items-center justify-center gap-1.5 animate-bounce">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#F04F54] hover:bg-[#D43D42] text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-[#F04F54]/20 hover:shadow-[#F04F54]/45 active:scale-98"
            >
              Verify & Enter
            </button>
          </form>
          <div className="mt-8 text-center text-[10px] text-white/30 tracking-widest uppercase">
            Tamirabot Portal v1.0
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard Content
  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] pb-24">
      {/* Admin Nav / Header */}
      <header className="bg-[#24125F] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Tamirabot Blog Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/blog" 
              target="_blank" 
              className="text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
            >
              View Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold tracking-wide transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-10">

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 w-fit">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === "blogs"
                ? "bg-[#24125F] text-white shadow-md"
                : "text-[#64748B] hover:text-[#24125F]"
            }`}
          >
            Blog Posts
            <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === "blogs" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {blogs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 relative ${
              activeTab === "leads"
                ? "bg-[#F04F54] text-white shadow-md"
                : "text-[#64748B] hover:text-[#24125F]"
            }`}
          >
            Contact Leads
            {leads.filter(l => l.status === "new").length > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === "leads" ? "bg-white/20 text-white" : "bg-[#F04F54] text-white"}`}>
                {leads.filter(l => l.status === "new").length} new
              </span>
            )}
          </button>
        </div>

        {/* ── BLOGS TAB ── */}
        {activeTab === "blogs" && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-[#24125F]">Blog Posts</h1>
                <p className="text-[#64748B] text-sm mt-1">Manage articles, news and press releases of Tamirabot</p>
              </div>
              <button
                onClick={openNewEditor}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F04F54] hover:bg-[#D43D42] text-white font-bold text-sm tracking-wide shadow-md shadow-[#F04F54]/15 hover:shadow-lg hover:shadow-[#F04F54]/30 active:scale-95 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Create New Post
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#F04F54] border-r-transparent border-b-transparent border-l-transparent" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-gray-200 py-20 text-center flex flex-col items-center max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2m2 2a2 2 0 01-2 2m2 5l-3-3m0 0l-3 3m3-3V8" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#24125F]">No blog posts found</h3>
                <p className="text-[#64748B] text-sm mt-1 px-6">Click the &ldquo;Create New Post&rdquo; button to publish your first article.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-50">
                      {blog.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getGoogleDriveDirectLink(blog.coverImage)} alt={blog.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-gray-400 text-sm">No cover image</div>
                      )}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#F04F54] shadow-sm">{blog.category}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-white ${blog.published ? "bg-emerald-500" : "bg-amber-500"}`}>{blog.published ? "Published" : "Draft"}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-[#0F172A] leading-snug mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed mb-6 line-clamp-3">{blog.excerpt || "No description provided."}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-[#94A3B8] font-semibold">By {blog.author}</span>
                        <div className="flex gap-2">
                          <button onClick={() => openEditEditor(blog)} className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-[#F04F54]/10 hover:text-[#F04F54] flex items-center justify-center text-gray-500 transition-colors" title="Edit post">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => triggerDeleteConfirmation(blog.id!, blog.title)} className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center text-gray-500 transition-colors" title="Delete post">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── LEADS TAB ── */}
        {activeTab === "leads" && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-[#24125F]">Contact Leads</h1>
                <p className="text-[#64748B] text-sm mt-1">
                  {leads.filter(l => l.status === "new").length} new enquir{leads.filter(l => l.status === "new").length === 1 ? "y" : "ies"} — {leads.length} total submissions
                </p>
              </div>
              <div className="flex gap-2">
                {(["new", "contacted", "archived"] as const).map((s) => (
                  <span key={s} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    s === "new" ? "bg-[#F04F54]/10 text-[#F04F54]" :
                    s === "contacted" ? "bg-emerald-50 text-emerald-600" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {leads.filter(l => l.status === s).length} {s}
                  </span>
                ))}
              </div>
            </div>

            {leadsLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#F04F54] border-r-transparent border-b-transparent border-l-transparent" />
              </div>
            ) : leads.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-gray-200 py-20 text-center flex flex-col items-center max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#24125F]">No leads yet</h3>
                <p className="text-[#64748B] text-sm mt-1 px-6">Contact form submissions will appear here in real-time.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {leads.map((lead) => {
                  const date = lead.createdAt?.toDate?.()?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) ?? "–";
                  const isExpanded = expandedLead === lead.id;
                  return (
                    <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
                      {/* Lead card top */}
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-xl bg-[#24125F]/5 flex items-center justify-center shrink-0 text-[#24125F] font-extrabold text-lg">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-[#0F172A]">{lead.name}</h3>
                            {lead.company && <span className="text-xs text-gray-400 font-medium">· {lead.company}</span>}
                          </div>
                          <div className="flex items-center gap-4 mt-1 flex-wrap">
                            <span className="text-sm text-[#64748B]">{lead.email}</span>
                            {lead.phone && <span className="text-sm text-[#94A3B8]">{lead.phone}</span>}
                            <span className="text-xs text-[#94A3B8]">{date}</span>
                          </div>
                        </div>

                        {/* Status + actions */}
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          <select
                            value={lead.status}
                            onChange={(e) => handleLeadStatusChange(lead.id!, e.target.value as ContactLead["status"])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-none focus:outline-none focus:ring-2 cursor-pointer transition-colors ${
                              lead.status === "new" ? "bg-[#F04F54]/10 text-[#F04F54] focus:ring-[#F04F54]/30" :
                              lead.status === "contacted" ? "bg-emerald-50 text-emerald-600 focus:ring-emerald-300" :
                              "bg-gray-100 text-gray-500 focus:ring-gray-300"
                            }`}
                          >
                            <option value="new">🔴 New</option>
                            <option value="contacted">🟢 Contacted</option>
                            <option value="archived">⚫ Archived</option>
                          </select>

                          <button
                            onClick={() => setExpandedLead(isExpanded ? null : lead.id!)}
                            className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-[#24125F]/10 hover:text-[#24125F] flex items-center justify-center text-gray-400 transition-colors"
                            title="View message"
                          >
                            <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          <button
                            onClick={() => triggerLeadDeleteConfirmation(lead.id!, lead.name)}
                            className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center text-gray-400 transition-colors"
                            title="Delete lead"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Expandable message */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Message</p>
                          <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>

      {/* Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditorOpen(false)} />

          {/* Modal Container */}
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col">
            {/* Modal Header */}
            <div className="px-8 py-6 bg-[#24125F] text-white flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold">{currentBlog ? "Edit Blog Post" : "Create New Blog Post"}</h2>
              <button onClick={() => setEditorOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form Scrollable Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Next-Gen CCS2 Connectors Released"
                    className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#F04F54] transition-colors"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Slug (URL string)</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="next-gen-ccs2-connectors-released"
                    className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 font-mono focus:outline-none focus:border-[#F04F54] transition-colors"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Author</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#F04F54] transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#F04F54] transition-colors bg-white"
                  >
                    <option value="EV Charging">EV Charging</option>
                    <option value="Technology">Technology</option>
                    <option value="Company News">Company News</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Google Drive Helper / File Uploader */}
              <div className="border border-red-50 bg-[#F04F54]/[0.02] p-6 rounded-[2rem] space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#F04F54] mb-1.5">Cover Image</label>
                  <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                    You can upload an image file directly (highly recommended), or paste a Google Drive file share link below.
                  </p>
                </div>

                {/* Upload Action Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-semibold text-gray-500">Upload Image File</label>
                    <div className="relative border border-dashed border-gray-300 hover:border-[#F04F54] bg-white rounded-xl h-24 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        disabled={uploading}
                      />
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-[#F04F54] border-r-transparent border-b-transparent border-l-transparent" />
                          <span className="text-xs text-gray-500 font-medium">Uploading file...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-center px-4">
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-[#F04F54] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-600 font-bold">Choose File or Drop Here</span>
                          <span className="text-[10px] text-gray-400">Supports PNG, JPG, WEBP</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Manual Link Input */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-semibold text-gray-500">Or Paste Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://drive.google.com/file/d/.../view"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="w-full h-12 border border-gray-200 bg-white rounded-xl px-4 text-sm focus:outline-none focus:border-[#F04F54] transition-colors"
                    />
                    <p className="text-[10px] text-gray-400">Paste any Google Drive sharing link or public image web URL.</p>
                  </div>
                </div>

                {/* Optional Settings/Apps Script for uploading directly to Google Drive */}
                <div className="pt-2">
                  <details className="group border border-gray-100 bg-white/50 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-3 text-xs font-bold text-gray-600 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                      <span>☁️ Want to upload directly to your Google Drive folder?</span>
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 border-t border-gray-100 text-xs text-gray-500 space-y-3 leading-relaxed">
                      <p>
                        By default, images are uploaded securely to <strong>Firebase Storage</strong>. If you prefer to upload them directly to your shared Google Drive folder:
                      </p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Go to <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-[#F04F54] underline font-semibold">Google Apps Script</a>.</li>
                        <li>Create a new project and paste the Apps Script Code (click the button below to copy).</li>
                        <li>Click <strong>Deploy</strong> &rarr; <strong>New Deployment</strong>. Select <strong>Web App</strong>.</li>
                        <li>Set <strong>Execute as:</strong> &ldquo;Me&rdquo;, and <strong>Who has access:</strong> &ldquo;Anyone&rdquo;.</li>
                        <li>Copy the deployed Web App URL and paste it in the field below:</li>
                      </ol>
                      
                      <div className="space-y-2 mt-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Google Apps Script Web App URL</label>
                        <input
                          type="text"
                          placeholder="https://script.google.com/macros/s/.../exec"
                          value={appsScriptUrl}
                          onChange={(e) => {
                            setAppsScriptUrl(e.target.value);
                            localStorage.setItem("apps_script_url", e.target.value);
                          }}
                          className="w-full h-10 border border-gray-200 bg-white rounded-lg px-3 text-xs font-mono focus:outline-none focus:border-[#F04F54]"
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={copyAppsScriptCode}
                        className="mt-2 text-xs font-bold text-[#F04F54] hover:text-[#D43D42] border border-[#F04F54]/25 hover:border-[#F04F54] px-3.5 py-1.5 rounded-lg transition-all"
                      >
                        📋 Copy Apps Script Code
                      </button>
                    </div>
                  </details>
                </div>

                {/* Upload Preview strip */}
                {coverImage && (
                  <div className="pt-2 border-t border-gray-100/50 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Image Preview</span>
                    <div className="w-32 h-16 rounded-xl bg-gray-100 border overflow-hidden flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={getGoogleDriveDirectLink(coverImage)} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "";
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Excerpt (Brief summary for cards)</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Summarize this blog post in 1-2 sentences..."
                  className="w-full h-20 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#F04F54] transition-colors resize-none"
                />
              </div>

              {/* Content body */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Content (Article Body)</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write full article here..."
                  className="w-full h-64 border border-gray-200 rounded-xl p-4 text-sm font-sans focus:outline-none focus:border-[#F04F54] transition-colors resize-y"
                />
              </div>

              {/* Status toggles */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100 shrink-0">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#F04F54] focus:ring-[#F04F54]"
                  />
                  <span className="text-sm font-bold text-gray-700">Publish immediately (Live on site)</span>
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-3 pt-6 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="px-6 h-12 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 h-12 rounded-xl bg-[#F04F54] hover:bg-[#D43D42] text-white font-bold text-sm tracking-wide shadow-md shadow-[#F04F54]/10 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? "Saving..." : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Confirmation Dialog */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />
          
          {/* Confirmation Box */}
          <div className="bg-white w-full max-w-md rounded-[2rem] p-8 border border-gray-100 shadow-2xl relative z-10 flex flex-col items-center text-center">
            {/* Warning Icon Container */}
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#F04F54] mb-5 shrink-0">
              <svg className="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h3 className="text-xl font-extrabold text-[#24125F] mb-2">Delete Article?</h3>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-[#0F172A]">&ldquo;{blogTitleToDelete}&rdquo;</span>? This action is permanent and cannot be undone.
            </p>
            
            <div className="flex gap-3 w-full">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setConfirmOpen(false)}
                className="flex-1 h-12 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={executeDelete}
                className="flex-1 h-12 rounded-xl bg-[#F04F54] hover:bg-[#D43D42] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F04F54]/10 hover:shadow-[#F04F54]/30 active:scale-98 transition-all flex items-center justify-center"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Delete Confirmation Dialog */}
      {leadConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLeadConfirmOpen(false)} />
          <div className="bg-white w-full max-w-md rounded-[2rem] p-8 border border-gray-100 shadow-2xl relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#F04F54] mb-5 shrink-0">
              <svg className="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-[#24125F] mb-2">Delete Lead?</h3>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6">
              Are you sure you want to permanently delete the lead from <span className="font-bold text-[#0F172A]">&ldquo;{leadNameToDelete}&rdquo;</span>? This cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                type="button"
                disabled={isDeletingLead}
                onClick={() => setLeadConfirmOpen(false)}
                className="flex-1 h-12 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingLead}
                onClick={executeLeadDelete}
                className="flex-1 h-12 rounded-xl bg-[#F04F54] hover:bg-[#D43D42] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F04F54]/10 transition-all flex items-center justify-center"
              >
                {isDeletingLead ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notification Alert Modal */}
      {notification.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setNotification({ ...notification, show: false })} />
          
          {/* Alert Content Box */}
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 border border-gray-100 shadow-2xl relative z-10 flex flex-col items-center text-center animate-scaleIn">
            {/* Icon depending on type */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shrink-0 ${
              notification.type === "success" ? "bg-green-50 text-green-500" :
              notification.type === "error" ? "bg-red-50 text-[#F04F54]" :
              "bg-blue-50 text-blue-500"
            }`}>
              {notification.type === "success" && (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {notification.type === "error" && (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              {notification.type === "info" && (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            {/* Title & Message */}
            <h3 className="text-lg font-bold text-gray-800 mb-1">{notification.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 px-2">{notification.message}</p>

            {/* Action Button */}
            <button
              onClick={() => setNotification({ ...notification, show: false })}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm transition-colors shadow-md ${
                notification.type === "success" ? "bg-green-500 hover:bg-green-600 shadow-green-500/10" :
                notification.type === "error" ? "bg-[#F04F54] hover:bg-[#D43D42] shadow-[#F04F54]/10" :
                "bg-blue-500 hover:bg-blue-600 shadow-blue-500/10"
              }`}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
