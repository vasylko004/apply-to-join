import gql from 'graphql-tag';

const CREATE_APPLY_TO_JOIN = gql`mutation ApplyToJoin($dataInput: ApplyToJoinInput!){
    applyToJoin(data: $dataInput) {
        message
    }
}`;

export function createApplyToJoin(client){

    return function (data) {
        return client.mutate({
            mutation: CREATE_APPLY_TO_JOIN,
            variables: {
                dataInput: data
            }
        })
    }
}