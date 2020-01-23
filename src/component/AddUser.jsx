import React, { Component } from 'react'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  
  
  class AddUser extends Component {
  
    constructor(props){
      super(props);
  
  
      this.state = {
        title: 'Simple CRUD Application',
        act: 0,
        index: '',
        datas: [],
        firstName: null,
        lastName: null,
        email: null,
        contact:null,
        appointment_date: null,
        appointment_time: null,
        formErrors: {
          firstName: "",
          lastName: "",
          email: "",
          contact:"",
          appointment_date: "",
          appointment_time: ""
        }
      };
    } 
  
    handleSubmit = e => {
      e.preventDefault();
  
      if (formValid(this.state)) {
        console.log(`
          --SUBMITTING--
          First Name: ${this.state.firstName}
          Last Name: ${this.state.lastName}
          Email: ${this.state.email}
          Contact: ${this.state.contact}
          Appointment Date: ${this.state.appointment_date}
          Appointment Time: ${this.state.appointment_time}
        `);
      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
    };
  
    handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };
  
      switch (name) {
        case "firstName":
          formErrors.firstName =
            value.length < 3 ? "minimum 3 characaters required" : "";
          break;
        case "lastName":
          formErrors.lastName =
            value.length < 3 ? "minimum 3 characaters required" : "";
          break;
        case "email":
          formErrors.email = emailRegex.test(value)
            ? ""
            : "invalid email address";
          break;
        case "contact":
          formErrors.contact =
            value.length < 6 ? "minimum 6 characaters required" : "";
          break;
        default:
          break;
      }
  
      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
  
  
    componentDidMount(){
      this.refs.fname.focus();
      this.refs.lname.focus();
      this.refs.address.focus();
      this.refs.contact.focus();
      this.refs.appointment_date.focus();
      this.refs.appointment_time.focus();
    }
  
    fSubmit = (e) =>{
      e.preventDefault();
      console.log('try');
  
      let datas = this.state.datas;
      let fname = this.refs.fname.value;
      let lname = this.refs.lname.value;
      let address = this.refs.address.value;
      let contact = this.refs.contact.value;
      let appointment_date = this.refs.appointment_date.value;
      let appointment_time = this.refs.appointment_time.value;
  
      console.log("aa",datas);
  
      if(this.state.act === 0){   //new
        let data = {
          fname,lname ,address,contact,appointment_date,appointment_time
        }
        datas.push(data);
      }else{                      //update
        let index = this.state.index;
        datas[index].fname = fname;
        datas[index].lname = lname;
        datas[index].address = address;
        datas[index].contact = contact;
        datas[index].appointment_date = appointment_date;
        datas[index].appointment_time = appointment_time;
      }    
  
      this.setState({
        datas: datas,
        act: 0
      });
  
      this.refs.myForm.reset();
      this.refs.fname.focus();
      this.refs.lname.focus();
      this.refs.address.focus();
      this.refs.contact.focus();
      this.refs.appointment_date.focus();
      this.refs.appointment_time.focus();
    }
  
    fRemove = (i) => {
      let datas = this.state.datas;
      datas.splice(i,1);
      this.setState({
        datas: datas
      });
  
      this.refs.myForm.reset();
      this.refs.fname.focus();
      this.refs.lname.focus();
      this.refs.address.focus();
      this.refs.contact.focus();
      this.refs.appointment_date.focus();
      this.refs.appointment_time.focus();
    }
  
    fEdit = (i) => {
      let data = this.state.datas[i];
      this.refs.fname.value = data.fname;
      this.refs.lname.value = data.lname;
      this.refs.address.value = data.address;
      this.refs.contact.value = data.contact;
      this.refs.appointment_date.value = data.appointment_date;
      this.refs.appointment_time.value = data.appointment_time;
  
      console.log("bb",i);
      this.setState({
        act: 1,
        index: i
      });
  
      this.refs.fname.focus();
      this.refs.lname.focus();
      this.refs.address.focus();
      this.refs.contact.focus();
      this.refs.appointment_date.focus();
      this.refs.appointment_time.focus();
    }  
  
    render() {
      let datas = this.state.datas;
      const { formErrors } = this.state;
      return (
        <div className="App">
          <h2>{this.state.title}</h2>
          <form ref="myForm" className="myForm" onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">  
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input 
            type="text"
            name="firstName" 
            ref="fname" 
            placeholder="your first name" 
            className={formErrors.firstName.length > 0 ? "error" : null} 
            noValidate
            onChange={this.handleChange}/>
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
          </div>
          </div>
          <div className="form-group">
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input 
            type="text"
            name="lastName" 
            ref="lname" 
            placeholder="your last name" 
            className={formErrors.lastName.length > 0 ? "error" : null} 
            noValidate
            onChange={this.handleChange}/>
            {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
          </div>    
          </div>
          <div className="form-group">
          <div className="email">
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            name="email"
            ref="address" 
            placeholder="your address" 
            className={formErrors.email.length > 0 ? "error" : null} 
            noValidate
            onChange={this.handleChange}/>
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>  
          </div>
          <div className="form-group">
          <div className="contact">
            <label htmlFor="contact">Contact</label>
            <input 
            type="text" 
            name="contact"
            ref="contact" 
            placeholder="your contact number" 
            className="formField"
            noValidate 
            onChange={this.handleChange}/>
          </div>
          </div>
          <div className="form-group">
          <div className="appointment_date">
            <label htmlFor="appointment_date">Appointment Date</label>
            <input 
            type="date" 
            name="appointment_date"
            ref="appointment_date" 
            placeholder="your appointment date" 
            className="formField" 
            noValidate 
            onChange={this.handleChange}/>
          </div>
          </div>
          <div className="form-group">
          <div className="appointment_time">
            <label htmlFor="appointment_time">Appointment Time</label>
            <input 
            type="time" 
            name="appointment_time"
            ref="appointment_time" 
            placeholder="your appointment time" 
            className="formField" 
            noValidate 
            onChange={this.handleChange}/>
          </div>
          </div>
            <button onClick={(e)=>this.fSubmit(e)} className="myButton" type="submit">submit </button>
          </form>
          <pre>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                </tr>
              </thead>
            <tbody>
            {datas.map((data, i) =>
              <tr key={i} className="myList">
                <td>{i+1}</td>
                <td>{data.fname}</td>
                <td>{data.lname}</td>
                <td>{data.address}</td>
                <td>{data.contact}</td>
                <td>{data.appointment_date}</td>
                <td>{data.appointment_time}</td>
                <td>
                <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
                <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
                </td>
              </tr>
            )
            }
            </tbody>
            </table>
          </pre>
        </div>
      );
    }
  }
  

export default AddUser
