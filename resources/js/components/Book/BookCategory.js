import React, { useState, useEffect, Fragment } from 'react'
import { Button, Table, Modal, Spinner } from 'react-bootstrap'
import '../../App.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const BookCategory = (props) => {

    const [lgShow, setLgShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [category_name ,setCategory_name] = useState('')
    const [status ,setStatus] = useState('')
    const [error,setError] = useState({})
    const [category,setCategory] = useState([])
    const [e_id,setEId] = useState('')

    const fetchMyAPI = () => {
        axios.get('/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchMyAPI()
    }, [])

    const resetForm = () => {
        setCategory_name('')
        setStatus('')
    }

    const submitHandler = async e => {
        e.preventDefault();
        const data = {category_name, status}
        axios.post('/category', data)
        .then(response => {
            setLgShow(false)
            resetForm()
            fetchMyAPI()
            toast.success("Data Inserted Successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
            // window.location.reload()
        })
        .catch(error => {
            if (error.response.status === 400) {
                error = error.response.data.errors;
                setError(error)
            }
        })
    }

    const DeleteHandler = (category_id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete('/category/' + category_id)
                .then(response => {
                    console.log(response.data.status)
                    if (response.data.status == 202) {
                        swal("Your Book Category data has been deleted!", {
                            icon: "success",
                        });
                        fetchMyAPI()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                swal("Your data is safe!");
            }
        });
    }

    const EditHandler = (category_id) => {
        setEdit(true)
        axios.get('/category/edit/' + category_id)
        .then(response => {
            setCategory_name(response.data.category_name)
            setStatus(response.data.status)
            setEId(response.data.book_categorie_id)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const updateHandler = e => {
        e.preventDefault()
        const data = {category_name, status}
        const id = e_id
        axios.put('/category/' + id, data)
        .then(response => {
            console.log(response)
            setEdit(false)
            resetForm()
            fetchMyAPI()
            toast.success("Data Updated Successfully!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            // window.location.reload()
        })
        .catch(error => {
            console.log(error)
            if (error.response.status == 400) {
                error = error.response.data.errors;
                setError(error)
            }
        })
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <div className="card">
                            <div className="col-md-12"></div>
                            <div className="container">
                                <div className="mt-2">
                                    <h2>Book Category List</h2>
                                    <Button className="button" onClick={() => setLgShow(true)}>Add New</Button>
                                </div>
                                <Modal
                                    size="lg"
                                    show={lgShow}
                                    onHide={() => setLgShow(false)}
                                    aria-labelledby="example-modal-sizes-title-lg"
                                >
                                    <Modal.Header className="title" closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Add Category
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={submitHandler} id="InsertForm">
                                            <div className="form-group">
                                                <label htmlFor="category_name">Category Name</label>
                                                <input
                                                id="category_name"
                                                className={`form-control ${error.category_name ? 'is-invalid': ''}`}
                                                type="text"
                                                onChange={e => setCategory_name(e.target.value)}
                                                value={category_name}
                                                placeholder="Category Name"
                                                />
                                                <sapn className="text-danger">{error.category_name}</sapn>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="status">Status</label>
                                                <select id="status" className={`form-control ${error.status ? 'is-invalid': ''}`} onChange={e => setStatus(e.target.value)}>
                                                    <option selected hidden>Select One</option>
                                                    <option value="Active">Active</option>
                                                    <option vlaue="Inactive">Inactive</option>
                                                </select>
                                                <sapn className="text-danger">{error.status}</sapn>
                                            </div>
                                            <div>
                                                <button type="button" className="btn btn-dark" onClick={() => setLgShow(false)}>Cancel</button>{' '}
                                                <button type="submit" className="btn btn-success px-3">Submit</button>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                                <Modal
                                    size="lg"
                                    show={edit}
                                    onHide={() => setEdit(false)}
                                    aria-labelledby="example-modal-sizes-title-lg"
                                >
                                    <Modal.Header className="title" closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Edit Category
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={updateHandler}>
                                            <div className="form-group">
                                                <label htmlFor="category_name">Category Name</label>
                                                <input
                                                id="category_name"
                                                className={`form-control ${error.category_name ? 'is-invalid': ''}`}
                                                type="text"
                                                onChange={e => setCategory_name(e.target.value)}
                                                value={category_name}
                                                placeholder="Category Name"
                                                />
                                                <sapn className="text-danger">{error.category_name}</sapn>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="status">Status</label>
                                                <select id="status" className={`form-control ${error.status ? 'is-invalid': ''}`} onChange={e => setStatus(e.target.value)}>
                                                    <option selected hidden>Select One</option>
                                                    <option value="Active" selected={status == 'Active' ? true : false}>Active</option>
                                                    <option vlaue="Inactive" selected={status == 'Inactive' ? true : false}>Inactive</option>
                                                </select>
                                                <sapn className="text-danger">{error.status}</sapn>
                                            </div>
                                            <div>
                                                <button type="button" className="btn btn-dark" onClick={() => setEdit(false)}>Cancel</button>{' '}
                                                <button type="submit" className="btn btn-success px-3">Submit</button>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Category Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.map((category, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{category.category_name}</td>
                                                <td>{category.status}</td>
                                                <td>
                                                    <Button className="btn btn-danger bts" size="sm" onClick={() => DeleteHandler(category.book_categorie_id)}><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                    <Button className="btn btn-info bts" size="sm" onClick={() => EditHandler(category.book_categorie_id)}><FontAwesomeIcon icon={faEdit} /></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BookCategory
