import React from 'react';
import { AppBar, Toolbar, Typography, Button   } from '@material-ui/core';
import { Link } from "react-router-dom";

export default function AppHeader(){
    return <AppBar className="app-bar"  position="static">
        <Toolbar>
            <Typography > RentZend </Typography>
            <div className="app-bar-items" edge="end">
                <Link className="appbar-item-link" to="/"><Button className="white--text">Home</Button></Link>
                <Link className="appbar-item-link" to="/apply-from"><Button  className="white--text">Form</Button></Link>
            </div>
        </Toolbar>
    </AppBar>
}