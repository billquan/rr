import React, { Component } from "react";

import { Form, Button, Col } from "react-bootstrap";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class BusinessRegistration extends Component {
  constructor() {
    super();
    const errors = [];
    this.state = {

      id: AuthService.getCurrentUser().id,
      // General
      businessName: "",
      businessStructure: "",
      description: "",
      genre: "", // Genre of courses (CHECKBOXES with options) (populated from database)
      genreList: ["Programming", "Hunting", "Motivation"],

      // Contact
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",

      phone: "",
      website: "",
      email: "",

      image: "",

      // Legal requirements
      ABN: "", // Australian Business Number
      ABNStatus: false,
      TFN: "", // Tax File Number
      TFNStatus: false,
      RGST: "", // Registered GST
      RGSTStatus: false,
      PII: "", // Professional Indemnity Insurance
      PIIStatus: false,
      PLI: "", // Public Liability Insurance
      PLIStatus: false,
      errors:[],

      // Facilitators belonging to the business
    };

    // Binding of methods
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeBusinessStructure = this.onChangeBusinessStructure.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeAddress1 = this.onChangeAddress1.bind(this);
    this.onChangeAddress2 = this.onChangeAddress2.bind(this);
    this.onChangeAddressCity = this.onChangeAddressCity.bind(this);
    this.onChangeAddressState = this.onChangeAddressState.bind(this);
    this.onChangeAddressZip = this.onChangeAddressZip.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeABN = this.onChangeABN.bind(this);
    this.onClickABN = this.onClickABN.bind(this);
    this.onChangeTFN = this.onChangeTFN.bind(this);
    this.onClickTFN = this.onClickTFN.bind(this);
    this.onChangeRGST = this.onChangeRGST.bind(this);
    this.onClickRGST = this.onClickRGST.bind(this);
    this.onChangePII = this.onChangePII.bind(this);
    this.onClickPII = this.onClickPII.bind(this);
    this.onChangePLI = this.onChangePLI.bind(this);
    this.onClickPLI = this.onClickPLI.bind(this);
  }

  // Methods for changing form values
  onChangeBusinessName(e) {
    this.setState({
      businessName: e.target.value,
    });
  }

  onChangeBusinessStructure(e) {
    this.setState({
      businessStructure: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value,
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

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value,
    });
  }

  onChangeABN(e) {
    this.setState({
      ABN: e.target.value,
    });
  }

  onClickABN() {
    this.setState({
      ABNStatus: !this.state.ABNStatus,
    });
  }

  onChangeTFN(e) {
    this.setState({
      TFN: e.target.value,
    });
  }

  onClickTFN() {
    this.setState({
      TFNStatus: !this.state.TFNStatus,
    });
  }

  onChangeRGST(e) {
    this.setState({
      RGST: e.target.value,
    });
  }

  onClickRGST() {
    this.setState({
      RGSTStatus: !this.state.RGSTStatus,
    });
  }

  onChangePII(e) {
    this.setState({
      PII: e.target.value,
    });
  }

  onClickPII() {
    this.setState({
      PIIStatus: !this.state.PIIStatus,
    });
  }

  onChangePLI(e) {
    this.setState({
      PLI: e.target.value,
    });
  }

  onClickPLI() {
    this.setState({
      PLIStatus: !this.state.PLIStatus,
    });
  }

  handleValidation(){
    //let fields = this.state.fields;
    let formIsValid = true;
    this.errors = [];
    this.state.errors = []
   

    //Business Structure
    if(this.state.businessStructure.length == 0){
      console.log(this.state.businessStructure.length)
      formIsValid = false
      this.errors.push("Business Structure Cannot be empty")
    }

    //Business Description
    if(this.state.description.length > 300){
      formIsValid = false
      this.errors.push("Business Description Exceeeded word limit 300")
    }


    //Address1
    if(this.state.address1.length > 50 || this.state.address1.length == 0){
      formIsValid = false
      this.errors.push("Address 1 cannot be empty or exceeed word limit 50")
    }


    //Address2
    if(this.state.address2.length > 50){
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

    //Phone number
    if(!(/^\d+$/.test(this.state.phone)) || this.state.phone.length > 30){
      formIsValid = false
      this.errors.push("Phone Number can only be number or number too long")
    }

    //Email
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))){
      formIsValid = false
      this.errors.push("Invalid email")
    }

    //Website
    if(!(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(this.state.website))){
      formIsValid = false
      this.errors.push("Invalid website")
    }

    //ABN
    if(this.state.ABN.length > 11){
      formIsValid = false
      this.errors.push("ABN cannot exceed 11 digits")
    }

    //TFN
    if(this.state.ABN.length > 9){
      formIsValid = false
      this.errors.push("TFN cannot exceed 9 digits")
    }
    if(this.state.TFN.length == 0 && this.state.ABN.length == 0){
      formIsValid = false
      this.errors.push("You have to provide at least one of your ABN or TFN")
    }

    //RGST
    if(this.state.RGST.length > 600 || this.state.RGST.split(' ').length > 200){
      formIsValid = false
      this.errors.push("If you want to provide any information about your registered GST, please notice the length should not exceed 200 words")
    }

    //PII
    if(this.state.PII.length > 600 || this.state.PII.split(' ').length > 200){
      formIsValid = false
      this.errors.push("If you want to provide any information about your Professional Indemnity Insurance, please notice the length should not exceed 200 words")
    }

    //PLI 
    if(this.state.PLI.length > 600 || this.state.PLI.split(' ').length > 200){
      formIsValid = false
      this.errors.push("If you want to provide any information about your Public Liability Insurance, please notice the length should not exceed 200 words")
    }

    return formIsValid
  }

  // This is where you send the data to the backend
  handleSubmit(e) {
    this.setState({ errors:[] });
    e.preventDefault();
    if(this.handleValidation()){
    console.log("ID " + this.state.id);
    console.log("Business name: " + this.state.businessName);
    console.log("Business structure: " + this.state.businessStructure);
    console.log("Description: " + this.state.description);
    console.log("Genre: " + this.state.genre);
    console.log("Image: " + this.state.image);
    console.log("Address1: " + this.state.address1);
    console.log("Address2: " + this.state.address2);
    console.log("City: " + this.state.city);
    console.log("State: " + this.state.state);
    console.log("Zip: " + this.state.zip);
    console.log("Phone: " + this.state.phone);
    console.log("Email: " + this.state.email);
    console.log("Website: " + this.state.website);
    console.log("ABN Status: " + this.state.ABNStatus);
    console.log("ABN: " + this.state.ABN);
    console.log("TFN Status: " + this.state.TFNStatus);
    console.log("TFN: " + this.state.TFN);
    console.log("RGST Status: " + this.state.RGSTStatus);
    console.log("RGST: " + this.state.RGST);
    console.log("PII Status: " + this.state.PIIStatus);
    console.log("PII: " + this.state.PII);
    console.log("PLI Status: " + this.state.PLIStatus);
    console.log("PLI: " + this.state.PLI);

    UserService.registerBusiness(
      this.state.id,
      this.state.businessStructure,
      this.state.businessName,
      this.state.ABN,
      this.state.TFN,
      this.state.RGSTStatus, 
      this.state.PII,
      this.state.PLI,
        {"address1":this.state.address1,"address2":this.state.address2,"city":this.state.city,"postCode":this.state.zip},
      this.state.phone,
      this.state.website,
      this.state.email,
      this.state.description
    ).catch((error) =>{
      if(error.response){
        console.log(error.response.data);
        this.errors.push(error.response.data);
      }else{
        this.errors.push("Business registration Successful");
      }


    });
      e.preventDefault();
    }
    else{
      console.log("Error submitting the form")
      console.log(this.errors)
      let errors = this.errors
      if (this.errors.length > 0) {
        this.setState({ errors });
      }
    }

  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <header className="jumbotron">
          <h3>Apply to Register a Business</h3>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            {/* Business Name */}
            <Form.Group>
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter business name here"
                value={this.state.businessName}
                onChange={this.onChangeBusinessName}
              />
            </Form.Group>

            {/* Business Structure */}
            <Form.Group>
              <Form.Label>Business Structure</Form.Label>
              <Form.Control
                as="select"
                value={this.state.businessStructure}
                onChange={this.onChangeBusinessStructure}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option>Sole Trader</option>
                <option>Partnership</option>
                <option>Company</option>
              </Form.Control>
            </Form.Group>

            {/* Business Description */}
            <Form.Group>
              <Form.Label>Business Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter description of business here"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </Form.Group>

            {/* Business Genre */}
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={this.state.genre}
                onChange={this.onChangeGenre}
              >
                <option value="" disabled>
                  Choose...
                </option>
                {this.state.genreList.map(function (genre) {
                  return (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            {/* Business Image */}
            <Form.Label>Business Image</Form.Label>
            <Form.File onChange={this.onChangeImage} />
            <br />

            {/* Business Address */}
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

            {/* Contact */}
            <Form.Label>Contact</Form.Label>
            <hr />
            <Form.Row>
              {/* Phone */}
              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="04-1234-5678"
                  value={this.state.phone}
                  onChange={this.onChangePhone}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="email@example.com"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </Form.Group>

              {/* Website */}
              <Form.Group as={Col}>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="www.example.com"
                  value={this.state.website}
                  onChange={this.onChangeWebsite}
                />
              </Form.Group>
            </Form.Row>
            <br />
            <Form.Label>Legal Requirements</Form.Label>
            <hr />
            {/* ABN */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  selected={this.state.ABNStatus}
                  label="Australian Business Number (ABN)"
                  onClick={this.onClickABN}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Leave blank if none"
                  value={this.state.ABN}
                  onChange={this.onChangeABN}
                />
              </Form.Group>
            </Form.Row>

            {/* TFN */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  selected={this.state.TFNStatus}
                  label="Tax File Number (TFN)"
                  onClick={this.onClickTFN}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Leave blank if none"
                  value={this.state.TFN}
                  onChange={this.onChangeTFN}
                />
              </Form.Group>
            </Form.Row>
            {/* RGST */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  selected={this.state.RGSTStatus}
                  label="Registered GST"
                  onClick={this.onClickRGST}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Leave blank if none"
                  value={this.state.RGST}
                  onChange={this.onChangeRGST}
                />
              </Form.Group>
            </Form.Row>
            {/* PII */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  selected={this.state.PIIStatus}
                  label="Professional Indemnity Insurance"
                  onClick={this.onClickPII}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Leave blank if none"
                  value={this.state.PII}
                  onChange={this.onChangePII}
                />
              </Form.Group>
            </Form.Row>
            {/* PLI */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  selected={this.state.PLIStatus}
                  label="Public Liability Insurance"
                  onClick={this.onClickPLI}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Leave blank if none"
                  value={this.state.PLI}
                  onChange={this.onChangePLI}
                />
              </Form.Group>
            </Form.Row>
            {/* Submit Button */}
            {errors.map(error => (
            <p key={error}>{error}</p>
            ))}
            <Form.Row>
              <Button type="submit">Submit for Approval</Button>
            </Form.Row>
          </Form>
        </header>
      </div>
    );
  }
}
