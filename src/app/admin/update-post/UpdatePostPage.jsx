"use client"; // Ensure this is at the top of the file

import React, { useState, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DashBoard from '@/app/dashboard/Dashboard'; // Adjust the import according to your project structure
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getPost, updatePost } from '@/redux/slices/postSlice';
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

// Dynamically import JoditEditor and disable SSR
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function UpdatePostPage() {
    const dispatch = useDispatch();
    const editor1 = useRef(null);
    const editor2 = useRef(null);
    const editor3 = useRef(null);
    const editor4 = useRef(null);
    const editor5 = useRef(null);
    const editor6 = useRef(null);

    const config1 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 300
    }), []);

    const config2 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 600
    }), []);

    const config3 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 300 // Set the height here (in pixels)
    }), []);
    const config4 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 300 // Set the height here (in pixels)
    }), []);
    const config5 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 300 // Set the height here (in pixels)
    }), []);
    const config6 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 300 // Set the height here (in pixels)
    }), []);

    const { post } = useSelector((state) => state.post);

    const [postData, setPostData] = useState({
        projectName: "",
        location: "",
        price: "",
        status: "",
        projectType: "",
        noOfUnits: "",
        noOfFloors: "",
        projectStatus: "",
        builder: "",
        totalLandArea: "",
        sizeRange: "",
        unitVariants: "",
        possessionTime: "",
        towersAndBlocks: "",
        reraNo: "",
        about: "",
        overView: "",
        configurationContent: "",
        amenitiesContent: "",
        priceContent: "",
        content: "",
        featureImage: null
    });

    // ================== Price Details code======
    const [priceDetails, setPriceDetails] = useState({
        type: "",
        price: "",
        saleableArea: ""
    });
    const [priceDetailsList, setPriceDetailsList] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [currPriceDetailsId, setCurrPriceDetailsId] = useState(null);
    const handlePriceDetailsChange = (e) => {
        const { name, value } = e.target;
        setPriceDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function handlePriceDetails(data) {
        if (!priceDetails.type || !priceDetails.price || !priceDetails.saleableArea) {
            return alert("All fields are required")
        }
        // Add priceDetails to the list
        let nextId = priceDetailsList.length + 1;
        const items = {
            _id: nextId,
            type: data.type,
            price: data.price,
            saleableArea: data.saleableArea
        }
        setPriceDetailsList(prevList => [
            ...prevList,
            items
        ]);

        // Reset the form fields
        setPriceDetails({
            type: '',
            price: '',
            saleableArea: ''
        });
    }

    function handleRemovePriceDetailsListItem(id) {
        const newItems = priceDetailsList.filter((item) => item._id !== id);
        setPriceDetailsList(newItems);
    };

    function handleUpdatePriceDetailsListItem(data) {

        const updatedList = priceDetailsList.map((item) => {
            if (item._id === currPriceDetailsId) {
                // Create a new object with the updated properties
                return {
                    ...item,  // Spread the existing item
                    type: data.type,  // Update the type
                    price: data.price,  // Update the price
                    saleableArea: data.saleableArea  // Update the saleable area
                };
            }
            return item;
        });

        setPriceDetails({
            type: '',
            price: '',
            saleableArea: ''
        });

        setIsEditing(!isEditing)
        setPriceDetailsList(updatedList);
    }



    // ===================Price Details code======


    const [galleryImage, setGalleryImage] = useState("");
    const [galleryPrevImage, setGalleryPrevImage] = useState(null);
    const [galleryImageList, setGalleryImageList] = useState([]);
    const [galleryPrevImageList, setGalleryPrevImageList] = useState([]);

    const handleGalleryFileInput = (e) => {
        const { files } = e.target;
        const file = files[0];
        if (file) {
            setGalleryImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryPrevImage(reader.result);
            };
            reader.readAsDataURL(file); // This line is necessary to trigger the onloadend event
        }
    };

    const handleGalleryImage = () => {
        if (!galleryImage) {
            return alert("Please upload image")
        }
        setGalleryImageList((prev) => [
            ...prev,
            galleryImage
        ]);

        setGalleryPrevImageList((prev) => [
            ...prev,
            galleryPrevImage
        ]);
        setGalleryImage("");
        setGalleryPrevImage(null);
    };

    function handleRemoveGalleryImage(idx) {
        const newImages = galleryImageList.filter((image, i) => i !== idx);
        setGalleryImageList(newImages)
        const newPrevImages = galleryPrevImageList.filter((image, i) => i !== idx);
        setGalleryPrevImageList(newPrevImages);
    }


    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await dispatch(getPost());
            } catch (error) {
                throw new Error(error.message)
            }
        }
        fetchPost();
    }, []);

    useEffect(() => {
        if (post) {
            setPostData({
                projectName: post.projectName,
                location: post.location,
                price: post.price,
                status: post.status,
                projectType: post.projectType,
                noOfUnits: post.noOfUnits,
                noOfFloors: post.noOfFloors,
                projectStatus: post.projectStatus,
                builder: post.builder,
                totalLandArea: post.totalLandArea,
                sizeRange: post.sizeRange,
                unitVariants: post.unitVariants,
                possessionTime: post.possessionTime,
                towersAndBlocks: post.towersAndBlocks,
                reraNo: post.reraNo,
                about: post.about,
                overView: post.overView,
                configurationContent: post.configurationContent,
                amenitiesContent: post.amenitiesContent,
                priceContent: post.priceContent,
                content: post.content,
                featureImage: post.featureImage,
            });
            setPriceDetailsList(post.priceDetails);
            setGalleryImageList(post.gallery);
            setGalleryPrevImageList(post.gallery.map(image => image) || []);
        }
    }, [post]);

    const [prevImag, setPrevImage] = useState(null)
    const handleInput = (e) => {
        const { name, value } = e.target;
        setPostData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileInput = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setPostData(prev => ({
                ...prev,
                [name]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevImage(reader.result);  // Make sure you have setPrevImage defined
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append all fields to formData
        for (const key in postData) {
            if (postData[key] !== post[key]) {
                formData.append(key, postData[key]);
            }
        }
        const sanitizedPriceDetailsList = priceDetailsList.map(({ _id, ...rest }) => rest);
        formData.append("priceDetails", JSON.stringify(sanitizedPriceDetailsList));

        galleryPrevImageList
            .filter(url => url.startsWith("http://res.cloudinary.com") || url.startsWith("https://res.cloudinary.com"))
            .forEach(url => {
                formData.append('existingGallery', url);
            });



        galleryImageList.forEach(file => {
            formData.append('gallery', file);
        });

        // formData.append("content", cont)

        try {
            const res = await dispatch(updatePost(formData));
            if (res?.payload?.success) {
                alert("Updated");
            }
        } catch (error) {
            alert("Failed to update");
            throw new Error(error.message)
            // console.error("Error submitting form:", error);
        }
    };

    const handleEditorChange = (field, newContent) => {
        setPostData(prev => ({ ...prev, [field]: newContent }));
    };

    return (
        <DashBoard>
            <div className='flex gap-3'>
                <div className="w-[80%] mx-auto">
                    <div>
                        <input
                            type="text"
                            className="w-full p-2 border-2 border-gray-200"
                            placeholder="Project name..."
                            style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" }}
                            name='projectName'
                            value={postData.projectName}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Overview</p>
                        <JoditEditor
                            ref={editor3}
                            config={config3}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                handleEditorChange('overView', newContent);
                            }}
                            value={postData.overView}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>About</p>
                        <JoditEditor
                            ref={editor1}
                            config={config1}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                handleEditorChange('about', newContent);
                            }}
                            value={postData.about}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Configuration</p>
                        <JoditEditor
                            ref={editor4}
                            config={config4}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                handleEditorChange('configurationContent', newContent);
                            }}
                            value={postData.configurationContent}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Amenities</p>
                        <JoditEditor
                            ref={editor5}
                            config={config5}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                handleEditorChange('amenitiesContent', newContent);
                            }}
                            value={postData.amenitiesContent}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Price</p>
                        <JoditEditor
                            ref={editor6}
                            config={config6}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                handleEditorChange('priceContent', newContent);
                            }}
                            value={postData.priceContent}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Content</p>
                        <JoditEditor
                            ref={editor2}
                            config={config2}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                handleEditorChange('content', newContent);
                            }}
                            value={postData.content}
                        />
                    </div>
                </div>
                <div className='w-[20%] flex flex-col gap-4'>
                    {[
                        { label: "Project Type", name: "projectType" },
                        { label: "Location", name: "location" },
                        { label: "Starting Price", name: "price" },
                        { label: "Status", name: "status" },
                        { label: "No Of Units", name: "noOfUnits" },
                        { label: "No Of Floors", name: "noOfFloors" },
                        { label: "Project Status", name: "projectStatus" },
                        { label: "Builder", name: "builder" },
                        { label: "Total Land Area", name: "totalLandArea" },
                        { label: "Size Range", name: "sizeRange" },
                        { label: "Unit Variants", name: "unitVariants" },
                        { label: "Possession Time", name: "possessionTime" },
                        { label: "Towers And Blocks", name: "towersAndBlocks" },
                        { label: "Rera No", name: "reraNo" }]
                        .map(field => (
                            <div className='bg-white' key={field.name}>
                                <TextField
                                    id={`${field.name}-outlined`}
                                    className='w-full'
                                    label={field.label}
                                    variant="outlined"
                                    name={field.name}
                                    value={postData[field.name]}
                                    onChange={handleInput}
                                />
                            </div>
                        ))}
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Categories</p>
                        <div className='p-2'>
                            <ul>
                                <li className='flex gap-1 items-center'>
                                    <input type="checkbox" id="category-news" name="category-news" value="News" />
                                    News
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* =============== Price Details code === */}
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Type, Price, Saleable Area</p>
                        <div className='p-2 flex flex-col gap-2'>
                            <div className='bg-white'>
                                <TextField
                                    className='w-full'
                                    label={"Type"}
                                    variant="outlined"
                                    name={"type"}
                                    value={priceDetails.type}
                                    onChange={handlePriceDetailsChange}
                                />
                            </div>
                            <div className='bg-white'>
                                <TextField
                                    className='w-full'
                                    label={"Price"}
                                    variant="outlined"
                                    name={"price"}
                                    value={priceDetails.price}
                                    onChange={handlePriceDetailsChange}
                                />
                            </div>
                            <div className='bg-white'>
                                <TextField
                                    className='w-full'
                                    label={"Saleable Area"}
                                    variant="outlined"
                                    name={"saleableArea"}
                                    value={priceDetails.saleableArea}
                                    onChange={handlePriceDetailsChange}
                                />
                            </div>
                            <div className='bg-white'>
                                <button
                                    onClick={() => isEditing ? handleUpdatePriceDetailsListItem(priceDetails) : handlePriceDetails(priceDetails)}
                                    className='w-full text-center bg-green-500 text-white p-2'
                                >{isEditing ? "Update" : "Add More"}</button>
                            </div>
                        </div>
                    </div>

                    {
                        priceDetailsList?.length > 0 ? (
                            <div
                                className='bg-white'
                                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                            >
                                <p className='border-b p-2'>Price Details List</p>
                                <div className='p-2 flex flex-col gap-2'>
                                    {
                                        priceDetailsList?.map((data, i) => (
                                            <div
                                                key={i}
                                                className='flex justify-between p-2'
                                                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}
                                            >
                                                <span className='text-sm'>{data.type}</span>
                                                <span className='text-sm'>{data.saleableArea}</span>
                                                <span className='text-sm'>{data.price}</span>
                                                <button
                                                    onClick={() => {
                                                        setPriceDetails({
                                                            type: data.type,
                                                            price: data.price,
                                                            saleableArea: data.saleableArea
                                                        });
                                                        setCurrPriceDetailsId(data._id);
                                                        setIsEditing(!isEditing)
                                                    }}
                                                    className='text-md text-green-500'
                                                ><MdEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleRemovePriceDetailsListItem(data._id)}
                                                    className='text-md text-primary'
                                                ><RxCross2 />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : null
                    }

                    {/* ============== Price Details code === */}

                    {/* ===============Gallery========== */}
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Gallery image</p>
                        <div className='p-2'>
                            <input
                                type="file"
                                className='w-full'
                                name='galleryImage'
                                onChange={handleGalleryFileInput}
                            />
                            <div className='bg-white mt-3'>
                                <button
                                    onClick={() => handleGalleryImage(galleryImage, galleryPrevImage)}
                                    className='w-full text-center bg-green-500 text-white p-2'
                                >Add Image</button>
                            </div>
                        </div>
                    </div>

                    {
                        galleryPrevImageList.length > 0 ? (
                            <div
                                className='bg-white'
                                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                            >
                                <p className='border-b p-2'>Gallery image</p>
                                <div className='p-2'>
                                    <div className='grid grid-cols-2 gap-3 justify-between'>
                                        {galleryPrevImageList.map((image, index) => (
                                            <div className='relative' key={index}>
                                                <img src={image} alt={`Preview ${index}`}
                                                    className='w-[100%] h-[70px]'
                                                />
                                                <button
                                                    onClick={() => handleRemoveGalleryImage(index)}
                                                    className='text-md text-primary absolute top-0 right-0 bg-white p-1 rounded-full'
                                                ><RxCross2 />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }

                    {/* ===============Gallery========== */}
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Featured image</p>
                        <div className='p-2'>
                            <input
                                type="file"
                                className='w-full'
                                name='featureImage'
                                onChange={handleFileInput}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between p-2'>
                        <button className='border border-blue-700 py-2 px-3'>Save Draft</button>
                        <button
                            className='bg-blue-700 py-2 px-3 text-white'
                            onClick={handleSubmit}
                        >Publish</button>
                    </div>
                </div>
            </div>
        </DashBoard>
    );
}

export default UpdatePostPage;
