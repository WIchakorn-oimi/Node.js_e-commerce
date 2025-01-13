import { createCategory, listCategory, RemoveCategory } from '../../api/Category'
import { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import Swal from 'sweetalert2'

const FormCategory = () => {

    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategory(token)
    }, [])

    const getCategory = async (token) => {
        try {
            const res = await listCategory(token)
            setCategories(res.data)
            // Swal.fire({
            //     title: 'Success',
            //     text: res,
            //     icon: 'success',
            //     timer: 1500,
            // })
        } catch (err) {
            Swal.fire({
                title: 'error',
                text: err,
                icon: 'error',
                showConfirmButton: 'OK',
            })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim()) {
            Swal.fire({
                title: 'warning',
                text: 'Category name cannot be empty.',
                icon: 'warning',
                showConfirmButton: 'OK',
            });
            return;
        }
        try {
            const res = await createCategory(token, { name })
            console.log('Add Category', res.data.name)
            Swal.fire({
                title: 'Success',
                text: res.data.name,
                icon: 'success',
                timer: 1500,
            })
            getCategory(token)
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err,
                icon: 'error',
            });
        }
    }

    const handleRemove = async (id) => {
        console.log(id)
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });
        if (result.isConfirmed) {
            try {
                const res = await RemoveCategory(token, id);
                await getCategory(token);
                Swal.fire({
                    title: 'Deleted!',
                    text: res,
                    icon: 'success',
                    timer: 1500,
                });
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the category.',
                    icon: 'error',
                });
            }
        }
    }



    return (
        <div className='container mx-auto p-4 bg-white shadow-md rounded-md'>
            <h1>Category Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input className='border' type="text" onChange={(e) => setName(e.target.value)} />
                <button className=' bg-blue-500'>Add Category</button>
            </form>

            <ul className='list-none'>
                {
                    categories.map((item, index) =>
                        <li className='flex justify-between my-2' key={index}>
                            <span>
                                {item.name}
                            </span>

                            <button className='bg-red-500' onClick={() => handleRemove(item.id)}>
                                Delete
                            </button>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}

export default FormCategory
