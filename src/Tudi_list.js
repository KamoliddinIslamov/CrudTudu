import React from "react";
import { Student } from "./Student"
class TudiList extends React.Component {
    state = {
        dataBaza: Student,
        selected: {},
        name: "",
        age: "",
        job: ""
    }
    render() {
        const onDelete = (id) => {
            let res = this.state.dataBaza.filter(val => val.id !== id)
            this.setState({ dataBaza: res })
        }

        const onChangeInput = ({ target: { value } }) => {
            let input = Student.filter((val) => val.name.toLowerCase().includes(value.toLowerCase()))
            this.setState({ dataBaza: input })
        }

        const onEdit = (value) => {
            console.log(value);
            this.setState({ selected: value })
        }

        const onCansel = (value) => {
            console.log(value);
            this.setState({ selected: null })
        }

        const onSave = () => {
            let res = this.state.dataBaza.map((val) => this.state.selected?.id === val.id ? this.state.selected : val)
            this.setState({ dataBaza: res, selected: null })
        }

        const onChangeName = ({ target: { value, name } }) => {
            this.setState((state) => { return { selected: { ...state.selected, [name]: value } }; })
        }
        const onAdd = () => {
            let user = {
                id: this.state.dataBaza.length + 1,
                name: this.state.name,
                age: this.state.age,
                job: this.state.job
            }
            this.setState({
                dataBaza: [...this.state.dataBaza, user],
                name: "",
                age: "",
                job: ""
            })
            console.log(user);
        }
        ////////////
        const onChangeUser = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        ///////////
        return (
            <div className="container" >
                <input type="text" name="text" onChange={onChangeInput} className="form-control mt-5 px-3" placeholder="User search ..." />
                <table className="table">
                    <thead>
                        <tr>
                            <th><input value={this.state.name} onChange={onChangeUser} name="name" className="form-control" type="text" placeholder="add name ..." /></th>
                            <th><input value={this.state.age} onChange={onChangeUser} name="age" className="form-control" type="text" placeholder="add age ..." /></th>
                            <th><input value={this.state.job} onChange={onChangeUser} name="job" className="form-control" type="text" placeholder="add job ..." /></th>
                            <th><button onClick={onAdd} className="form-control btn btn-outline-success">Add Users</button></th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-hover my-3">
                    <thead>
                        <tr className="text-center bg-success">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Job</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.dataBaza.map((value) => {
                                let cheked = this.state.selected?.id === value.id
                                return (
                                    <tr key={value.id} className="text-center" >
                                        <td>{value.id}</td>
                                        <td>{cheked ? <input onChange={onChangeName} value={this.state.selected.name} name="name" placeholder="edit name ..." className=" form-control " /> : value.name}</td>
                                        <td>{cheked ? <input onChange={onChangeName} value={this.state.selected.age} name="age" placeholder="edit age ..." className=" form-control " /> : value.age}</td>
                                        <td>{cheked ? <input onChange={onChangeName} value={this.state.selected.job} name="job" placeholder="edit job ..." className=" form-control " /> : value.job}</td>
                                        <td>{
                                            cheked ? (<React.Fragment>
                                                <button onClick={() => onCansel(value.id)} className="btn btn-outline-danger">calsel</button>
                                                <button onClick={onSave} className="btn btn-outline-primary ms-2">save</button>
                                            </React.Fragment>) :
                                                (<React.Fragment>
                                                    <button onClick={() => onDelete(value.id)} className="btn btn-outline-danger">delete</button>
                                                    <button onClick={() => onEdit(value)} className="btn btn-outline-primary ms-2">edit</button>
                                                </React.Fragment>)
                                        }

                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div >
        )
    }
}
export default TudiList;