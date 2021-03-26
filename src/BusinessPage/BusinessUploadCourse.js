import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table,Form, Button, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import BusinessService from "../services/business.service"
import CourseService from "../services/course.service";
import AuthService from "../services/auth.service";



export default class BusinessUploadCourse extends Component {
    constructor(props) {
        super(props);
        const errors = [];
        this.state = {
            id: AuthService.getCurrentUser().business._id,
            historyCourses:[],
            title: "",
            genres: ["Programming","Hunting","Motivation"], // This list of genres should be taken from the genres within the database

            genre:"Programming",
            description: "",

            // Date & Time
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            intervalDescription: "",

            // Address
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",

            // Members and cost
            maxMembers: 0,
            minMembers:0,
            cost: 0,

            // Business Details
            businessName: "",

            days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            selecteddays:[],

            frequency:["Every week","Every two weeks","Every months"],
            selectedfrequency:"",
            // businessEmail: "",
            // businessPhone: "",

            // Facilitator Details
            // facilitatorFirstName: "",
            // facilitatorLastName: "",
            // facilitatorEmail: "",
            // facilitatorPhone: "",
            facilitatorList: ["John Doe", "Teri Dactyl", "Rod Knee"],
            selectedFacilitator: "",

            // Pre-reqs
            plwf: false, // Public Liability Waiver Form
            mif: false, // Medical Indemnity Form
            consf: false, // Consent Form
            priorSkillset: "",

            // Terms and Conditions
            tcs: false,
            show:false,
            errors: [],
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeendDate = this.onChangeendDate.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.onChangeIntervalDescription = this.onChangeIntervalDescription.bind(this);
        this.onChangeAddress1 = this.onChangeAddress1.bind(this);
        this.onChangeAddress2 = this.onChangeAddress2.bind(this);
        this.onChangeAddressCity = this.onChangeAddressCity.bind(this);
        this.onChangeAddressState = this.onChangeAddressState.bind(this);
        this.onChangeAddressZip = this.onChangeAddressZip.bind(this);
        this.onChangeMaxMembers = this.onChangeMaxMembers.bind(this);
        this.onChangeminMembers = this.onChangeminMembers.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickPlwf = this.onClickPlwf.bind(this);
        this.onClickMif = this.onClickMif.bind(this);
        this.onClickConsf = this.onClickConsf.bind(this);
        this.onChangeSkillset = this.onChangeSkillset.bind(this);
        this.onClickTcs = this.onClickTcs.bind(this);
        this.onChangeFacilitator = this.onChangeFacilitator.bind(this);
        this.onChangefrequency = this.onChangefrequency.bind(this);
        this.onChangedays = this.onChangedays.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        CourseService.getHistoryCourses(AuthService.getCurrentUser().id).then(
            response => {
                this.setState({
                    historyCourses: response.data
                });
                console.log(this.state.historyCourses);
                console.log(this.state.historyCourses.length);
            }
        );
        this.setState({
            businessName: AuthService.getCurrentUser().business.businessName
        });
    }
    handleClose(){
        this.setState({ show: false });
    };
    handleImport(course){
        this.setState({
            title: course.title,
            description: course.description,
            startDate: new Date(course.startDate),
            selectedfrequency:course.frequency,
            address1: course.location.address1,
            address2: course.location.address2,
            city: course.location.city,
            state: course.location.state,
            zip: course.location.postCode,
            cost: course.cost,
            maxMembers: course.maxMembers,
            minMembers: course.minMembers,
            selectedFacilitator: course.facilitator,
            selecteddays:course.repeatDay,
            show: false
        });


    };
    handleShow(){
        console.log("clicked");
        this.setState({ show: true });
    };
    onChangeTitle(e) {
        this.setState({
            // e.target.value is the input on the webpage from the user. The state changes to reflect what has been entered
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeStartDate(date) {
        this.setState({
            startDate: date,
        });

    }

    onChangeendDate(date) {
        this.setState({
            endDate: date,
        });
    }



    onChangeStartTime(date) {
        this.setState({
            startTime: date,
        });
    }

    onChangeEndTime(date) {
        this.setState({
            endTime: date,
        });
    }

    onChangeIntervalDescription(e) {
        this.setState({
            intervalDescription: e.target.value,
        });
    }

    onChangeAddress1(e) {
        this.setState({
            address1: e.target.value,
        });
    }

    onChangeAddress2(e) {
        this.setState({
            address2: e.target.value,
        });
    }

    onChangeAddressCity(e) {
        this.setState({
            city: e.target.value,
        });
    }

    onChangeAddressState(e) {
        this.setState({
            state: e.target.value,
        });
    }

    onChangeAddressZip(e) {
        this.setState({
            zip: e.target.value,
        });
    }

    onChangeMaxMembers(e) {
        this.setState({
            maxMembers: e.target.value,
        });
    }

    onChangeCost(e) {
        this.setState({
            cost: e.target.value,
        });
    }

    onChangeBusinessName(e) {
        this.setState({
            businessName: e.target.value,
        });
    }

    onClickPlwf(e) {
        this.setState({
            plwf: !this.state.plwf,
        });
    }

    onClickMif(e) {
        this.setState({
            mif: !this.state.mif,
        });
    }

    onClickConsf(e) {
        this.setState({
            consf: !this.state.consf,
        });
    }

    onChangeSkillset(e) {
        this.setState({
            priorSkillset: e.target.value,
        });
    }

    onClickTcs(e) {
        this.setState({
            tcs: !this.state.tcs,
        });
    }

    onChangeFacilitator(e) {
        this.setState({
            selectedFacilitator: e.target.value,
        });
    }

    onChangedays(e) {
        var value = this.state.selecteddays.includes(e.target.value)
        if(value === false){
            this.setState({selecteddays: this.state.selecteddays.concat(e.target.value), },()=>{
                    //console.log(this.state.businessSelected)
                }
            );
        }

    }
    onChangeminMembers(e) {
        this.setState({
            minMembers: e.target.value,
        });
    }

    onChangefrequency(e) {
        this.setState({
            selectedfrequency: e.target.value,
        });
    }

    handleValidation(){

        let formIsValid = true
        this.errors = [];
        this.state.errors = []
       
        //Genre
        if(this.state.genres.length == 0){
          formIsValid = false
          this.errors.push("Genre is empty")
        }

        //Description
        if(this.state.description.split(' ').length > 300){
          formIsValid = false
          this.errors.push("Description word length exceeded 300")
        }


        //Cost
        if(!(/^\d+$/.test(this.state.cost)) || this.state.cost.length > 10){
          formIsValid = false
          this.errors.push("Cost Can only be number or number too long")
        }

        //Maximum Members
        if(!(/^\d+$/.test(this.state.maxMembers)) || this.state.maxMembers.length > 10){
          formIsValid = false
          this.errors.push("Maximum Members can only be number or number too long")
        }

        //Prior Skillsets required
        if(this.state.priorSkillset.length > 300){
          formIsValid = false
          this.errors.push("Prior Skillsets word limit exceeded 300")
        }


        //Address1
        if(this.state.address1.length > 50 || this.state.address1.length == 0){
          formIsValid = false
          this.errors.push("Address 1 cannot be empty or exceeed word limit 50")
        }


        //Address2
        if(this.state.address2.length > 50 ){
          formIsValid = false
          this.errors.push("Address 2 Exceeeded word limit 50")
        }

        //City
        if(!(/^[a-zA-Z]+$/.test(this.state.city)) || this.state.city.length > 50){
          formIsValid = false
          this.errors.push("City can only be letters or characters exceeded word limit 50")
        }

        //State
        if(this.state.state.length == 0){
          formIsValid = false
          this.errors.push("State cannot be empty")
        }

        //Zip
        if(!(/^\d+$/.test(this.state.zip)) || this.state.zip.length > 30){
          formIsValid = false
          this.errors.push("Zip can only be number or number too long")
        }

        if(this.state.tcs==false){
            formIsValid = false
            this.errors.push("Please agree to the Terms and Conditions before you can continue")
        }
          

        return formIsValid

      }


    // This is where you send the data to the backend
    handleSubmit(e) {
        this.setState({ errors:[] });
        e.preventDefault();
        if(this.handleValidation()){
        console.log("Title: " + this.state.title);
        console.log("Genre: " + this.state.genre);
        console.log("Description: " + this.state.description);
        console.log("Selected Facilitator: " + this.state.selectedFacilitator);
        console.log("Start Date: " + this.state.startDate);
        console.log("end Date: " + this.state.endDate);
        console.log("Start Time: " + this.state.startTime);
        console.log("End Time: " + this.state.endTime);
    
        console.log("Cost: " + this.state.cost);
        console.log("Maximum Members: " + this.state.maxMembers);
        console.log("Minmum Members: " + this.state.minMembers);


        console.log("Address1: " + this.state.address1);
        console.log("Address2: " + this.state.address2);
        console.log("City: " + this.state.city);
        console.log("State: " + this.state.state);
        console.log("Zip: " + this.state.zip);
        
       
        console.log("day: " + this.state.selectedfrequency);
        console.log(this.state.id)
        console.log(this.state.selecteddays)

        BusinessService.uploadCourse(
            this.state.genre,
            this.state.title,
            this.state.description,
            this.state.selectedFacilitator,
            this.state.startDate,
            this.state.endDate,
            this.state.startTime,
            this.state.endTime,
            this.state.selecteddays,
            this.state.selectedfrequency,
            this.state.address1,
            this.state.address2,
            this.state.city,
            this.state.state,
            this.state.zip,
            this.state.maxMembers,
            this.state.minMembers,
            this.state.id,
            this.state.cost,
        ).catch((error) =>{
            if(error.response){
                console.log(error.response.data);
                this.errors.push(error.response.data);
            }else{
                this.errors.push("Course Application Succesful");
            }


        });
        e.preventDefault();

        }
        else {
            console.log("Error submitting course")

            let errors = this.errors
            if (this.errors.length > 0) {
                this.setState({errors});

            }

        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
            <header className="jumbotron">
            <h3>Apply to Create a Course</h3>

        <>

        <Button variant="primary" onClick={this.handleShow} type="button">
            Import from history courses
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
        <Modal.Title>History Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table>
        <thead>
        <th>Course Name</th>
        <th>Start Date</th>
        <th>Facilitator</th>
        <th></th>
        </thead>
        <tbody>
        {/* Map each value */}
        {this.state.historyCourses.map((course) => {
            return (
                <tr>
                {/* Need to have the course as a link, to display a full page with the course's details */}
                <td>{course.title}</td>
                <td>{course.startDate}</td>
                <td>{course.facilitator}</td>
                <Button variant="primary" onClick={() => this.handleImport(course)}>
            Import
            </Button>
            </tr>
        );
        })}
    </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
            Close
            </Button>
            </Modal.Footer>
            </Modal>
            </>
            <Form onSubmit={this.handleSubmit}>

            {/* Title  */}
            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
        type="text"
        placeholder="Enter title here"
        value={this.state.title}
        onChange={this.onChangeTitle}
        />
        </Form.Group>
        {/* Genre   */} {/* Genre doesn't get set in state */}
    <Form.Group>
        <Form.Label>Genre(s)</Form.Label>
        <Form.Control
        as="select"
        multiple
        //value={this.state.genre}
        //onChange={this.onChangeGenre}
        >
        {this.state.genres.map(function (genre) {
                return (
                    <option key={genre} value={genre}>
                    {genre}
                    </option>
            );
            })}
        </Form.Control>
        </Form.Group>
        {/* Description  */}
    <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
        as="textarea"
        type="text"
        placeholder="Enter description here"
        value={this.state.description}
        onChange={this.onChangeDescription}
        />
        </Form.Group>
        {/* Course Image */}
    <Form.Label>Course Image</Form.Label>
        <Form.File />
        <br />
        {/* Date  */}
        <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>Start Date</Form.Label>
        <DatePicker
        selected={this.state.startDate}
        onChange={this.onChangeStartDate}
        />
        </Form.Group>

        <Form.Group as={Col}>
            <Form.Label>End Date</Form.Label>
        <DatePicker
        selected={this.state.endDate}
        onChange={this.onChangeendDate}
        />
        </Form.Group>

        <Form.Group as={Col}>
            <Form.Label>Start Time</Form.Label>
        <DatePicker
        selected={this.state.startTime}
        onChange={this.onChangeStartTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        />
        </Form.Group>

        <Form.Group as={Col}>
            <Form.Label>End Time</Form.Label>
        <DatePicker
        selected={this.state.endTime}
        onChange={this.onChangeEndTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
            />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            {/*frequency */}

            <Form.Label>Set days</Form.Label>

        <Form.Group as={Col}>
        <Form.Control
        as="select"
        multiple={true}
        value={this.state.selecteddays}
        onChange={this.onChangedays}

            >
            {this.state.days.map((e) => {
                    return (
                        <option key={e} value={e}>
                        {e}
                        </option>
                );
                })}
            </Form.Control>
            </Form.Group>

            <Form.Label>Set Frequency</Form.Label>
        <Form.Group as={Col}>
        <Form.Control
        as="select"
        value={this.state.selectedfrequency}
        onChange={this.onChangefrequency}
            >
            <option value="" disabled>
        Choose...
    </option>
        {this.state.frequency.map((x) => {
            return (
                <option key={x} value={x}>
                {x}
                </option>
        );
        })}
    </Form.Control>
        </Form.Group>


        </Form.Row>

        {/* Interval Description  */}

    <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>Cost</Form.Label>
            <Form.Control
        type="int"
        value={this.state.cost}
        onChange={this.onChangeCost}
        />
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label>Maximum Members</Form.Label>
        <Form.Control
        type="int"
        value={this.state.maxMembers}
        onChange={this.onChangeMaxMembers}
        />
        </Form.Group>

        <Form.Group as={Col}>
            <Form.Label>Minimum Members</Form.Label>
        <Form.Control
        type="int"
        value={this.state.minMembers}
        onChange={this.onChangeminMembers}
        />
        </Form.Group>

        </Form.Row>
        <br />
        {/* Pre-requisites */}
        <Form.Label>Pre-Requisites</Form.Label>
        <hr />
        {/* Number of Pre-requisites  */}
        <Form.Group>
        <Form.Check
        type="checkbox"
        selected={this.state.plwf}
        label="Public Liability Waiver Form"
        onClick={this.onClickPlwf}
        />

        <Form.Check
        type="checkbox"
        selected={this.state.mif}
        label="Medical Indemnity Form"
        onClick={this.onClickMif}
        />

        <Form.Check
        type="checkbox"
        selected={this.state.consf}
        label="(Minor) Consent Form"
        onClick={this.onClickConsf}
        />

        <br />

        <Form.Control
        as="textarea"
        type="text"
        placeholder="Other prior skillsets necessary"
        value={this.state.priorSkillset}
        onChange={this.onChangeSkillset}
        />
        </Form.Group>
        <br />
        {/* Location  */} {/* Need to flesh out location */}
    <Form.Label>Location</Form.Label>
        <hr />
        <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
        type="text"
        placeholder="1234 Main St"
        value={this.state.address1}
        onChange={this.onChangeAddress1}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Address 2</Form.Label>
        <Form.Control
        type="text"
        placeholder="Apartment, studio, or floor"
        value={this.state.address2}
        onChange={this.onChangeAddress2}
        />
        </Form.Group>
        <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
        type="text"
        value={this.state.city}
        onChange={this.onChangeAddressCity}
        />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>State</Form.Label>
        <Form.Control
        as="select"
        value={this.state.state}
        onChange={this.onChangeAddressState}
            >
            <option value="" disabled>
        Choose...
    </option>
        <option>ACT</option>
        <option>NSW</option>
        <option>NT</option>
        <option>QLD</option>
        <option>SA</option>
        <option>TAS</option>
        <option>VIC</option>
        <option>WA</option>
        </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label>Zip</Form.Label>
            <Form.Control
        type="text"
        value={this.state.zip}
        onChange={this.onChangeAddressZip}
        />
        </Form.Group>
        </Form.Row>
        <br />
        {/* Business Contact */}
        <Form.Label>Business</Form.Label>
        <hr />
        <Form.Group>
        {/* API to call business name to display here */}
        <Form.Control
        type="text"
        value={this.state.businessName}
        readOnly
        />
        </Form.Group>
        <br />
        {/* Facilitator Contact */}
        {/* <hr /> */}
    <Form.Label>Facilitator Contact</Form.Label>
        <hr />
        <Form.Group as={Col}>
        <Form.Control
        as="select"
        value={this.state.selectedFacilitator}
        onChange={this.onChangeFacilitator}
            >
            <option value="" disabled>
        Choose...
    </option>
        {this.state.facilitatorList.map((facilitator) => {
            return (
                <option key={facilitator} value={facilitator}>
                {facilitator}
                </option>
        );
        })}
    </Form.Control>
        </Form.Group>
        <br />
        {/* Facilitator Image */}
        {/* <Form.Label>Profile Picture</Form.Label>
              <Form.File />
              <br /> */}
        {/* Retrieve T&Cs Agreement  */}
    <Form.Row>
        <Form.Group as={Col}>
            <Link to="/termsandconditions">Terms and Conditions</Link>
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Check
        type="checkbox"
        selected={this.state.tcs}
        label="I agree to the Terms and Conditions"
        onClick={this.onClickTcs}
        />
        </Form.Group>
        </Form.Row>
        <br />
        {/* Button  */}
        <Form.Group>
        {errors.map(error => (
            <p key={error}>{error}</p>
            ))}

        <Button type="submit">Submit for Approval</Button>
                                         </Form.Group>
                                         </Form>
                                         </header>
                                         </div>
        );
    }

}
