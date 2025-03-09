import { useState } from "react"
import Swal from "sweetalert2"
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from "../../api/product"
import useEcomstore from "../../store/ecom-store"

const Uploadfile = ({ form, setForm }) => {

    const token = useEcomstore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    Swal.fire({
                        title: 'error',
                        text: file.name,
                        icon: 'error',
                        showConfirmButton: 'OK',
                    })
                    continue
                }

                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                Swal.fire({
                                    title: 'Upload image Success!',
                                    text: res.data.url,
                                    icon: 'success',
                                    timer: 1500,
                                });
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }
    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token,public_id)
        .then((res)=> {
            const filterImages = images.filter((item)=>{
                return item.public_id !== public_id
            })
            setForm({
                ...form,
                images: filterImages
            })
            Swal.fire({
                title: 'Remove image Success!',
                text: res,
                icon: 'success',
                timer: 1500,
            });
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="my-4">
            <div className="flex mx-4 gap-4 my-4">

                {
                    form.images.map((item, index) =>
                        <div className="relative" key={index}>
                            <img
                                className="w-24 h-24 hover:scale-105"
                                src={item.url} />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className="absolute top-0 right-0 bg-red-500 p-1 rounded-md">
                                x
                            </span>
                        </div>
                    )
                }
            </div>
            <div>
                <input type="file"
                    onChange={handleOnChange}
                    name="images"
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile
