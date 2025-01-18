import { useEffect, useState } from 'react'
import useEcomstore from '../../store/ecom-store'
import Swal from 'sweetalert2'



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
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCategory(token)
        getProducts(token, 20)
    }, [])

    const handleOnChang = (e) => {
        console.log(e.target.name, e.target.value)
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
                <button className='bg-blue-200'>Add Product</button>

                <hr />
                <br />
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>quantity</th>
                            <th>sold</th>
                            <th>updatedAt</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr>
                                        
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updateAt}</td>
                                        <td>
                                            <p>Edit</p>
                                            <p>Delete</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </form>
        </div>
    )
}

export default FormProduct
