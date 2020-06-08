import React, { useState, useEffect, Fragment } from 'react'
import { Button, Table, Modal, Spinner } from 'react-bootstrap'
import '../../App.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const BookList = (props) => {

    const [lgShow, setLgShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [loading, setloading] = useState(false)
    const [error,setError] = useState([])
    const [mainid, setId] = useState('')
    const [book_id, setBookId] = useState('')
    const [book_name, setBookName] = useState('')
    const [book_category, setBookCategory] = useState('')
    const [language, setLanguage] = useState('')
    const [edition_year, setEditionYear] = useState('')
    const [add_date, setAddDate] = useState('')
    const [status ,setStatus] = useState('')
    const [category ,setCategory] = useState([])
    const [getAll ,setGetAll] = useState([])

    const CategoryGet = () => {
        axios.get('/book')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const GetData = () => {
        axios.get('/book/create')
            .then(response => {
                setGetAll(response.data)
                setloading(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        CategoryGet()
        GetData()
    }, [])



    const submitHandler = async e => {
        e.preventDefault();
        let data = { book_id, book_name, book_category, language, edition_year, add_date, status }
        axios.post('/book', data)
        .then(response => {
            setLgShow(false)
            GetData()
            toast.success("Book Added Successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
        })
        .catch(error => {
            if (error.response.status) {
                setError( error.response.data.errors)
            }
        })
    }

    const DeleteHandler = (book_id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete('/book/' + book_id)
                .then(response => {
                    console.log(response.status)
                    if (response.status == 202) {
                        swal("Your Book List data has been deleted!", {
                            icon: "success",
                        });
                        GetData()
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

    const EditHandler = (book_id) => {
        setEdit(true)
        axios.get('/book/edit/' + book_id)
        .then(response => {
            setBookId(response.data.book_id)
            setBookName(response.data.book_name)
            setBookCategory(response.data.book_category)
            setLanguage(response.data.language)
            setEditionYear(response.data.edition_year)
            setAddDate(response.data.add_date)
            setStatus(response.data.status)
            setId(response.data.book_list_id)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const updateHandler = e => {
        e.preventDefault();
        let data = { book_id, book_name, book_category, language, edition_year, add_date, status }
        let id = mainid
        axios.put('/book/' + id, data)
        .then(response => {
            setEdit(false)
            GetData()
            toast.success("Book Added Successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
        })
        .catch(error => {
            if (error.response.status) {
                setError( error.response.data.errors)
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
                                        <h2>Book List</h2>
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
                                            Add Book
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={submitHandler}>
                                                <div className="form-group">
                                                    <label htmlFor="book_id">Book ID</label>
                                                    <input
                                                    id="book_id"
                                                    className={`form-control ${error.book_id ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setBookId(e.target.value)}
                                                    value={book_id}
                                                    placeholder="Enter Book ID..."
                                                    />
                                                    <sapn className="text-danger">{error.book_id}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="book_name">Book Name</label>
                                                    <input
                                                    id="book_name"
                                                    className={`form-control ${error.book_name ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setBookName(e.target.value)}
                                                    value={book_name}
                                                    placeholder="Enter Book Name..."
                                                    />
                                                    <sapn className="text-danger">{error.book_name}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="book_category">Book Category</label>
                                                    <select id="book_category" className={`form-control ${error.book_category ? 'is-invalid': ''}`} onChange={e => setBookCategory(e.target.value)}>
                                                        <option selected hidden>Select One</option>
                                                        {category.map(category => (
                                                            <option value={ category.book_categorie_id }>{ category.category_name }</option>
                                                        ))}
                                                    </select>
                                                    <sapn className="text-danger">{error.book_category}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="language">Language</label>
                                                    <input
                                                    id="language"
                                                    className={`form-control ${error.language ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setLanguage(e.target.value)}
                                                    value={language}
                                                    placeholder="Enter Language..."
                                                    />
                                                    <sapn className="text-danger">{error.language}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="edition_year">Edition year</label>
                                                    <input
                                                    id="edition_year"
                                                    className={`form-control ${error.edition_year ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setEditionYear(e.target.value)}
                                                    value={edition_year}
                                                    placeholder="Enter Edition year..."
                                                    />
                                                    <sapn className="text-danger">{error.edition_year}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="add_date">Add Date</label>
                                                    <input
                                                    id="add_date"
                                                    className={`form-control ${error.add_date ? 'is-invalid': ''}`}
                                                    type="date"
                                                    onChange={e => setAddDate(e.target.value)}
                                                    value={add_date}
                                                    placeholder="Enter Add Date..."
                                                    />
                                                    <sapn className="text-danger">{error.add_date}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">Status</label>
                                                    <select id="status" className={`form-control ${error.status ? 'is-invalid': ''}`} onChange={e => setStatus(e.target.value)}>
                                                        <option selected hidden>Select One</option>
                                                        <option value="1">Active</option>
                                                        <option value="0">Inactive</option>
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
                                                    <label htmlFor="book_id">Book ID</label>
                                                    <input
                                                    id="book_id"
                                                    className={`form-control ${error.book_id ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setBookId(e.target.value)}
                                                    value={book_id}
                                                    placeholder="Enter Book ID..."
                                                    />
                                                    <sapn className="text-danger">{error.book_id}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="book_name">Book Name</label>
                                                    <input
                                                    id="book_name"
                                                    className={`form-control ${error.book_name ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setBookName(e.target.value)}
                                                    value={book_name}
                                                    placeholder="Enter Book Name..."
                                                    />
                                                    <sapn className="text-danger">{error.book_name}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="book_category">Book Category</label>
                                                    <select id="book_category" className={`form-control ${error.book_category ? 'is-invalid': ''}`} onChange={e => setBookCategory(e.target.value)}>
                                                        <option selected hidden>Select One</option>
                                                        {category.map(category => (
                                                            <option value={ category.book_categorie_id } selected={book_category == category.book_categorie_id ? true : false}>{ category.category_name }</option>
                                                        ))}
                                                    </select>
                                                    <sapn className="text-danger">{error.book_category}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="language">Language</label>
                                                    <input
                                                    id="language"
                                                    className={`form-control ${error.language ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setLanguage(e.target.value)}
                                                    value={language}
                                                    placeholder="Enter Language..."
                                                    />
                                                    <sapn className="text-danger">{error.language}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="edition_year">Edition year</label>
                                                    <input
                                                    id="edition_year"
                                                    className={`form-control ${error.edition_year ? 'is-invalid': ''}`}
                                                    type="text"
                                                    onChange={e => setEditionYear(e.target.value)}
                                                    value={edition_year}
                                                    placeholder="Enter Edition year..."
                                                    />
                                                    <sapn className="text-danger">{error.edition_year}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="add_date">Add Date</label>
                                                    <input
                                                    id="add_date"
                                                    className={`form-control ${error.add_date ? 'is-invalid': ''}`}
                                                    type="date"
                                                    onChange={e => setAddDate(e.target.value)}
                                                    value={add_date}
                                                    placeholder="Enter Add Date..."
                                                    />
                                                    <sapn className="text-danger">{error.add_date}</sapn>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">Status</label>
                                                    <select id="status" className={`form-control ${error.status ? 'is-invalid': ''}`} onChange={e => setStatus(e.target.value)}>
                                                        <option selected hidden>Select One</option>
                                                        <option value="1" selected={status == 1 ? true : false}>Active</option>
                                                        <option value="0" selected={status == 0 ? true : false}>Inactive</option>
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
                                            <th>Book ID</th>
                                            <th>Book Name</th>
                                            <th>Book Category</th>
                                            <th>Language</th>
                                            <th>Edition Year</th>
                                            <th>Add Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? GetData : <Spinner animation="border" className="loading" />}
                                            {getAll.map((data, i) => (
                                                <tr>
                                                    <td>{ i+1 }</td>
                                                    <td>{ data.book_id }</td>
                                                    <td>{ data.book_name }</td>
                                                    <td>{ data.book_category }</td>
                                                    <td>{ data.language }</td>
                                                    <td>{ data.edition_year }</td>
                                                    <td>{ data.add_date }</td>
                                                    <td>{ data.status }</td>
                                                    <td>
                                                    <Button className="btn btn-danger bts" size="sm" onClick={() => DeleteHandler(data.book_list_id)}><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                    <Button className="btn btn-info bts" size="sm" onClick={() => EditHandler(data.book_list_id)}><FontAwesomeIcon icon={faEdit} /></Button>
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

export default BookList
