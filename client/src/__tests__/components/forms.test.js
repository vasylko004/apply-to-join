import React from 'react';
import renderer from 'react-test-renderer';
import ApplyToJoinForm  from "../../components/forms/apply-to-join"

test("render apply to join", async ()=>{
    const tree = renderer
        .create(<ApplyToJoinForm />)
        .toJSON();
    expect(tree).toMatchSnapshot();
} )