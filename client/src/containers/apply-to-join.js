import React, { Component } from 'react';
import {  Grid   } from '@material-ui/core';
import AppHeader from "../components/header";
import ApplyToJoinForm from "../components/forms/apply-to-join";
import { APPLY_TO_JOIN } from "../constants";
import { connect } from "react-redux";

class ApplyToJoinComponent extends Component {
    handleSubmit(data){
        console.log("ApplyToJoinComponent > handleSubmit", data);
        console.log(this.props);
        if(this.props.applyToJoin){
            this.props.applyToJoin(data);
        }
    }

    render() {
        let handleSubmit = this.handleSubmit.bind(this);

        return <div>
            <AppHeader />
            <Grid className="page-container" container spacing={3}>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    <ApplyToJoinForm onSubmit={handleSubmit} />
                </Grid>
                <Grid item xs={12} md={2}></Grid>
            </Grid>
        </div>
    }
}

export default connect(
    state=>({}),
    dispatch=>({
      applyToJoin(data)  {
          console.log("dispatch: applyToJoin" );
          dispatch({type: APPLY_TO_JOIN.REQUEST, data: data });
      }
    })
)(ApplyToJoinComponent);