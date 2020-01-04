import React, { Component } from 'react';
import { Grid, Button} from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import Dropzone from 'react-dropzone'
import { Formik, Field, Form } from 'formik';
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

    handleSubmit(values, actions) {
        console.log("ApplyToJoinForm > handleSubmit", values, actions);
        this.props.onSubmit(values);
    }

    render(){

        return <div >
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
                                                <section className="dropzone-section">
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                </div>
                                                </section>
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