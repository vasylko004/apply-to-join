import React, { Component } from 'react';
import { Grid, Button, CircularProgress} from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import Dropzone from 'react-dropzone'
import { Formik, Field, Form } from 'formik';
import { SnackbarContentWrapper } from "../snackbar";
import * as Yup from 'yup';
import "./forms.css";


const FormSchema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    phone: Yup.string().matches(/^\(+[0-9]{3}\)+\s*[0-9]{3}-*[0-9]{4}$/g, "Incorrect format, ex: (123) 456-7899"),
    address: Yup.string().min(3).required(),
    zipCode: Yup.string().min(3).required()
});

class ApplyToJoinForm extends Component{
    constructor(props){
        super(props);
        this.formActions = null;
    }

    handleSubmit(values, actions) {
        console.log("ApplyToJoinForm > handleSubmit", values, actions);
        this.formActions = actions;
        this.props.onSubmit(values);
    }

    resetFormStatus(){
        if(this.formActions){
            this.formActions.resetForm();
        }

        if(this.props.onReset) {
            this.props.onReset();
        }
    }

    renderStatus(data){
        switch(data.status){
            case 4:
                return <div></div>;
                
            case 1:
                return <div style={{textAlign: "center"}}><CircularProgress color="secondary" /></div>;
            case 2: 
                return <SnackbarContentWrapper
                variant="success"
                className="margin-auto"
                message="Submit form is success!"
                onClose={this.resetFormStatus.bind(this)}
              />;
            case 3: 
                return <SnackbarContentWrapper
                variant="error"
                className="margin-auto"
                message="Somethin went wrong!"
                onClose={this.resetFormStatus.bind(this)}
              />;
            default:
                return <div></div>;
        }
    }

    render(){
        const { status } = this.props;
        
        return <div >
            {this.renderStatus(status)}
            <Formik 
                initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    zipCode: "",
                    attachments: []
                }}
                validationSchema={FormSchema}
                onSubmit={this.handleSubmit.bind(this)}>
                {({errors, touched, validateField, validateForm} ) => (
                    <Form >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field type="text" 
                                    name="name" 
                                    label="Name"
                                    placeholder="Name" 
                                    component={TextField}
                                    fullWidth
                                    required/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field type="email" 
                                    name="email" 
                                    label="Email"
                                    placeholder="Email" 
                                    component={TextField}
                                    fullWidth
                                    required/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field type="text" 
                                    name="phone" 
                                    label="Phone Number"
                                    placeholder="Phone Number" 
                                    component={TextField}
                                    fullWidth
                                    required/>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Field type="text" 
                                    name="address" 
                                    label="Address"
                                    placeholder="Address" 
                                    component={TextField}
                                    fullWidth
                                    required/>
                            </Grid>            
                            <Grid item xs={12} md={5}>
                                <Field type="text" 
                                        name="zipCode" 
                                        label="Zip Code"
                                        placeholder="Zip Code" 
                                        component={TextField}
                                        fullWidth
                                        required/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="attachments" >
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                        }) => (<Dropzone onDrop={acceptedFiles => { 
                                            console.log(acceptedFiles, field, form);
                                            form.setFieldValue('attachments',[...field.value,...acceptedFiles]);
                                        }}>
                                            {({getRootProps, getInputProps}) => (
                                                <div className="dropzone-container">
                                                    {field.value.map((item)=><span className="file-items" key={item.name}>{item.name} </span>)}
                                                    <section className="dropzone-section">
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    </div>
                                                    </section>
                                                </div>
                                            )}
                                        </Dropzone>)}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="primary" variant="contained" type="submit"> Submit </Button>
                            </Grid>
                        </Grid>
                    </Form >
                )}
            </Formik>
           
        </div>
    }
}

export default ApplyToJoinForm;

/* 

*/