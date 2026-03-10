import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD0ddTYGlaileRPZLDXfJbZWMORjoc-G24",
    authDomain: "ads-asiadronestore.firebaseapp.com",
    projectId: "ads-asiadronestore",
    storageBucket: "ads-asiadronestore.firebasestorage.app",
    messagingSenderId: "523568140423",
    appId: "1:523568140423:web:4461f8dee8cc4bf1b26822",
    measurementId: "G-NH76ZQC588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { app, analytics };
