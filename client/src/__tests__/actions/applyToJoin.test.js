import { GraphQL } from '../../actions';

test('mutation apply to join success', async () => {
    const data = await GraphQL.mutation.applyToJoin({
        name: "Lito Herren Dodo",
        email: "test@test",
        phone: "(123) 456-7890",
        address: "no Street",
        zipCode: "2222",
        attachments: []
    })

    expect(data).toMatchObject({
        data: {
            applyToJoin: {
                message: "success",
                __typename: "CreateRequest"
            }
        }
    }) 
})

test("mutation apply to join fail", async () => {
    try {
        const data = await GraphQL.mutation.applyToJoin({
            typo: "error"
        });
    } catch(err){   
    }
})
