const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccountPath = process.env.FIREBASE_ADMIN_CRED_PATH;

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(serviceAccountPath))),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore(); // Firestore reference

module.exports = { admin, db };