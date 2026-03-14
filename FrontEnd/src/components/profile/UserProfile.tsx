"use client";

import { useState, useEffect, useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { User, Mail, Phone, MapPin, Camera, Save, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        image: "",
        name: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");
            const userId = storedUser.id || storedUser.uid;
            
            if (!userId) {
                router.push("/auth/login");
                return;
            }

            try {
                const docSnap = await getDoc(doc(db, "users", userId));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUser({ ...data, id: docSnap.id });
                    setFormData({
                        image: data.image || "",
                        name: data.name || "",
                        phone: data.phone || "",
                        address: data.address || ""
                    });
                }
            } catch (error) {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "users", user.id), { ...formData });
            const updatedUser = { ...user, ...formData };
            localStorage.setItem("userData", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('storage'));
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Update failed");
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        const storageRef = ref(storage, `profiles/${user.id}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', null, 
            () => {
                toast.error("Upload failed");
                setIsUploading(false);
            }, 
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                await updateDoc(doc(db, "users", user.id), { profileImage: url });
                const updatedUser = { ...user, profileImage: url };
                setUser(updatedUser);
                localStorage.setItem("userData", JSON.stringify(updatedUser));
                window.dispatchEvent(new Event('storage'));
                toast.success("Image updated!");
                setIsUploading(false);
            }
        );
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "users", user.id));
            localStorage.clear();
            window.dispatchEvent(new Event('storage'));
            router.push("/");
            toast.success("Account deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-blue" size={40} /></div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h1 className="text-2xl font-bold mb-8">My Profile</h1>
            
            <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                    {user.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User size={64} className="text-slate-300" />
                    )}
                    {isUploading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}
                </div>
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 text-sm font-medium text-brand-blue flex items-center gap-2 hover:underline cursor-pointer"
                >
                    <Camera size={16} /> Change Photo
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email (Cannot be changed)</label>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed">
                        <Mail size={18} />
                        <span>{user.email}</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-dark/5 focus:border-brand-blue-dark outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="tel" 
                            className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-dark/5 focus:border-brand-blue-dark outline-none"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                        <textarea 
                            className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-dark/5 focus:border-brand-blue-dark outline-none min-h-[100px]"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-4">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-brand-blue-dark transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Changes</>}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleDelete}
                        className="w-full border border-red-100 text-red-500 py-3 rounded-lg text-sm font-medium hover:bg-red-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Trash2 size={16} /> Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
}
