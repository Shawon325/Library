import React, { useState, useEffect, Fragment } from 'react'
import { Button, Table, Modal } from 'react-bootstrap'
import '../../App.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const MemberType = () => {

    const [lgShow, setLgShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [error,setError] = useState([])
    const [type_name,setTypeName] = useState('')
    const [status,setStatus] = useState('')
    const [type_id,setTypeId] = useState('')
    const [memberType_data,setMemberTypeData] = useState([])

    const resetForm = () => {
        setTypeName('')
    }

    function memberType() {
        axios.get("/type_movie")
        .then(response => {
            setMemberTypeData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        document.title = "Member Type"
        memberType()
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        let data = {type_name, status}
        axios.post("/type_movie", data)
        .then(response => {
            memberType()
            setLgShow(false)
            resetForm()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const DeleteHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete("/type_movie/" + id)
                .then(response => {
                    if (response.status == 202) {
                        swal("Your Member Type data has been deleted!", {
                            icon: "success",
                        });
                        memberType()
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

    const EditHandler = (id) => {
        setEdit(true)
        axios.get("/type_movie/edit/" + id)
        .then(res => {
            setTypeName(res.data.type_name)
            setStatus(res.data.status)
            setTypeId(res.data.member_type_id)
        })
        .catch(error => {
            console.log(error)
        })


    }

    const updateHandler = (e) => {
        e.preventDefault();
        let data = {type_name, status}
        let id = type_id
        axios.put("/type_movie/" + id, data)
        .then(response => {
            memberType()
            setEdit(false)
            resetForm()
        })
        .catch(error => {
            console.log(error)
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
                                    <h2>Member Type</h2>
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
                                        Add Member Type
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="type_name">Type Name</label>
                                                <input
                                                id="type_name"
                                                className={`form-control ${error.type_name ? 'is-invalid': ''}`}
                                                type="text"
                                                onChange={e => setTypeName(e.target.value)}
                                                value={type_name}
                                                placeholder="Enter Type Name..."
                                                />
                                                <sapn className="text-danger">{error.type_name}</sapn>
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
                                        Edit Member Type
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={updateHandler}>
                                            <div className="form-group">
                                                <label htmlFor="type_name">Type Name</label>
                                                <input
                                                id="type_name"
                                                className={`form-control ${error.type_name ? 'is-invalid': ''}`}
                                                type="text"
                                                onChange={e => setTypeName(e.target.value)}
                                                value={type_name}
                                                placeholder="Enter Type Name..."
                                                />
                                                <sapn className="text-danger">{error.type_name}</sapn>
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
                                                <button type="submit" className="btn btn-success px-3">Update</button>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Type Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memberType_data.map((data, i) => (
                                            <tr>
                                                <td>{ i+1 }</td>
                                                <td>{ data.type_name }</td>
                                                <td>{ data.status }</td>
                                                <td>
                                                    <Button className="btn btn-danger bts" size="sm" onClick={() => DeleteHandler(data.member_type_id)}><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                    <Button className="btn btn-info bts" size="sm" onClick={() => EditHandler(data.member_type_id)}><FontAwesomeIcon icon={faEdit} /></Button>
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

export default MemberType
