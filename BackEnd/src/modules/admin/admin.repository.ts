import db from "../../Config/config.firebase.ts";
import type { Iuser } from "../../Interface/user/user.models.interface.ts";

const usersCollection = db.collection("users");

export class AdminRepository {
    async findUserByEmail(email: string): Promise<Iuser | null> {
        const snapshot = await usersCollection.where("email", "==", email).get();

        if (snapshot.empty) {
            return null;
        }

        let userData: Iuser | null = null;
        snapshot.forEach((doc) => {
            userData = { _id: doc.id, ...doc.data() } as Iuser;
        });

        return userData;
    }
}
