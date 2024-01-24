import React from "react";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import PersonalDetails from "../components/profile/PersonalDetails";

const ProfilePage: React.FC = () => {
    return (
        <section className="p-7 container mx-auto mt-6">
            <h1 className="font-extrabold text-4xl text-center text-orange-500 mb-4">
                Your Profile
            </h1>
            <div className='flex gap-8 mb-6'>
                <ProfileAvatar/>
                <PersonalDetails/>
            </div>
        </section>
    );
}

export default ProfilePage;