import ToolTip from "../ToolTip";
import {SlPicture} from "react-icons/sl";
import React, {useState} from "react";
import Modal from "../Modal";
import Button from "../Button";
import ImageDropZone from "../ImageDropZone";
import axios from "../../api/axios";

const ProfileAvatar: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageDrop = async (files) => {
        // Assuming only one file is dropped
        const imageFile = files[0];

        // Optional: Show a preview of the dropped image
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage(imageUrl);
        setShowModal(false);

        console.log(imageFile);

        // TODO: Add your logic to save the image file (e.g., using axios)
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            console.log(formData);
            // Replace 'YOUR_UPLOAD_ENDPOINT' with your actual upload endpoint
            // const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData);

            // console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='w-[100px] h-[100px] md:w-[230px] md:h-[230px] overflow-hidden rounded-full flex-shrink-0 relative shadow-md border border-indigo-200 dark:border-indigo-800 group'>
            <img src={selectedImage ? selectedImage : "https://avatar.iran.liara.run/public/boy"} alt="" className='w-full h-full object-cover group-hover:brightness-50 transition-all duration-300'/>
            <button className='absolute bottom-0 inset-x-0 h-1/4 bg-black/50 flex justify-center items-center group-hover:h-[80px] transition-all duration-300 group-hover:bg-black/70' onClick={() => setShowModal(!showModal)}>
                <ToolTip tooltip='Upload your photo'>
                    <SlPicture className='text-2xl text-indigo-200'/>
                </ToolTip>
            </button>
            {showModal
                && <Modal
                    onClose={() => setShowModal(false)}
                    size='w-2/6 h-3/6'
                    actionBar={<Button primary rounded onClick={() => setShowModal(false)}>Got It</Button>}
                >
                    <div className='h-full'>
                        <h5 className='text-orange-500 text-xl font-bold mb-2 drop-shadow-sm'>Upload your photo
                        </h5>
                        <div className='mx-auto h-5/6'>
                            <ImageDropZone onImageDrop={handleImageDrop} />
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ProfileAvatar;