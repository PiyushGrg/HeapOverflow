import { currentUser } from "@clerk/nextjs";
import User from "@/models/userModel";

export const handleUserRegister = async()=>{
    try {
        const userData = await currentUser();
        const clerkUserId = userData?.id;

        // check if user already exists in db
        const user = await User.findOne({clerkUserId});
        if(user){
            return;
        }

        // create new user
        const newUser = new User({
            name: userData?.username || userData?.firstName + " " + userData?.lastName,
            email: userData?.emailAddresses[0].emailAddress,
            clerkUserId,
            profilePicUrl: userData?.imageUrl,
        });

        await newUser.save();

    } catch (error) {
        console.log(error);
    }
}


export const getMongoUseridFromClerkId = async(clerkUserId:string)=>{
    try {
        const user = await User.findOne({clerkUserId});
        if(!user){
            throw new Error("User not found");
        }

        return user._id;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}