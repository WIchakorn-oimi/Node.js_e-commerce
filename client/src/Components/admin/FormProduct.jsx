import { useEffect, useState } from 'react'
import useEcomstore from '../../store/ecom-store'
import Swal from 'sweetalert2'
import Uploadfile from './Uploadfile'
import { createProduct } from '../../api/product'



const initialState = {

    title: "core ",
    description: "des",
    price: 500,
    quantity: 20,
    categoryId: '',
    images: []

}

const FormProduct = () => {

    const token = useEcomstore((state) => state.token)
    const getCategory = useEcomstore((state) => state.getCategory)
    const categories = useEcomstore((state) => state.categories)
    const getProducts = useEcomstore((state) => state.getProducts)
    const products = useEcomstore((state) => state.products)

    // console.log(products)
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCategory(token)
        getProducts(token, 20)
    }, [])

    const handleOnChang = (e) => {
        // console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            Swal.fire({
                title: 'Success!',
                text: res,
                icon: 'success',
                timer: 1500,
            });
        } catch (err) {
            Swal.fire({
                title: 'error',
                text: err,
                icon: 'error',
                showConfirmButton: 'OK',
            })
        }
    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md rounded-md'>
            <form onSubmit={handleSubmit}>
                <h1>Add Product</h1>
                <input className='border' value={form.title} onChange={handleOnChang} placeholder='Title' name='title' />
                <input className='border' value={form.description} onChange={handleOnChang} placeholder='Description' name='description' />
                <input className='border' value={form.price} onChange={handleOnChang} placeholder='Price' name='price' type='number' />
                <input className='border' value={form.quantity} onChange={handleOnChang} placeholder='Quantity' name='quantity' type='number' />
                <select className='border' name='categoryId' onChange={handleOnChang} required value={form.categoryId}>
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id} >{item.name}</option>
                        )
                    }

                </select>
                <hr />
                <Uploadfile  form={form} setForm={setForm}/>
                <button className='bg-blue-200'>Add Product</button>

                <hr />
                <br />
                <div className="mt-8 overflow-x-auto">
                    <table className="min-w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-left">Name</th>
                                <th className="border px-4 py-2 text-left">Description</th>
                                <th className="border px-4 py-2 text-left">Price</th>
                                <th className="border px-4 py-2 text-left">quantity</th>
                                <th className="border px-4 py-2 text-left">sold</th>
                                <th className="border px-4 py-2 text-left">updatedAt</th>
                                <th className="border px-4 py-2 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, index) => {
                                    // console.log(item)
                                    return (
                                        <tr key={index} className="hover:bg-gray-50">

                                            <td className="border px-4 py-2">{item.title}</td>
                                            <td className="border px-4 py-2">{item.description}</td>
                                            <td className="border px-4 py-2">{item.price}</td>
                                            <td className="border px-4 py-2">{item.quantity}</td>
                                            <td className="border px-4 py-2">{item.sold}</td>
                                            <td className="border px-4 py-2">{item.updateAt}</td>
                                            <td className="border px-4 py-2">
                                                <p className="text-blue-500 hover:text-blue-700 mr-2">Edit</p>
                                                <p className="text-red-500 hover:text-red-700">Delete</p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </form>
        </div>
    )
}

export default FormProduct
