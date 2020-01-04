import React, { Component } from 'react';
import {  Grid   } from '@material-ui/core';
import AppHeader from "../components/header";
import ApplyToJoinForm from "../components/forms/apply-to-join";
import { APPLY_TO_JOIN, UPDATE_FORM_STATUS } from "../constants";
import { connect } from "react-redux";

class ApplyToJoinComponent extends Component {
    handleSubmit(data){;
        if(this.props.applyToJoin){
            this.props.applyToJoin(data);
        }
    }

    handleReset(){
        this.props.resetForm()
    }

    render() {
        let handleSubmit = this.handleSubmit.bind(this);
        let handleReset = this.handleReset.bind(this);
        const { formStatus } = this.props;

        return <div>
            <AppHeader />
            <Grid className="page-container" container spacing={3}>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    <ApplyToJoinForm status={formStatus} onSubmit={handleSubmit} onReset={handleReset} />
                </Grid>
                <Grid item xs={12} md={2}></Grid>
            </Grid>
        </div>
    }
}

export default connect(
    state=>({
        formStatus: state.forms.appyToJoin
    }),
    dispatch=>({
      applyToJoin(data)  {
          dispatch({type: APPLY_TO_JOIN.REQUEST, data: data });
      },
      resetForm(){
        dispatch({ type: UPDATE_FORM_STATUS, data:{ formName: "appyToJoin", status: 4 }})
      }
    })
)(ApplyToJoinComponent);