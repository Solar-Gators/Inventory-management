import { render, screen, RenderResult, fireEvent } from '@testing-library/react'
import * as inventoryMock from "../../mocks/mocks.inventory"
import AdminEdit from "./Admin.edit"
import Sinon from 'sinon';
import { act } from 'react-dom/test-utils';

let inventorySearchStub: Sinon.SinonStub
let inventoryFindOneStub: Sinon.SinonStub
let component: RenderResult

beforeEach(() => {
    inventorySearchStub = inventoryMock.search()
    inventoryFindOneStub = inventoryMock.findOne()
    act(() => {
        component = render(<AdminEdit />)
    })
})

afterEach(() => {
    inventorySearchStub.restore()
    inventoryFindOneStub.restore()
})

test("Renders existing inventory items", async () => {
    expect(inventorySearchStub.called).toBe(true)
    
    const name = await screen.findByText(inventoryMock.searchResponse[0].name)
    expect(name).toBeInTheDocument()
})

test("Clicking the edit button takes you to an editing page", async () => {
    const searchResponse = inventoryMock.searchResponse[0]

    const editButton = await screen.findByText(searchResponse.name)
    act(() => {
        editButton.click()
    })
    const title = await screen.findByText("Editing An Item")
    expect(title).toBeInTheDocument()

    const formValueCheck = (labelText: string, value: string, tagName: string = "INPUT") => {
        const input = component.getByLabelText(labelText) as HTMLInputElement
        expect(input).toBeInTheDocument()
        expect(input.tagName).toBe(tagName)
        expect(input.value).toBe(value)
    }

    formValueCheck("Name", searchResponse.name)
    formValueCheck("Location", searchResponse.location)
    formValueCheck("System", searchResponse.system)
    formValueCheck("Quantity", String(searchResponse.quantity))
    formValueCheck("Description", searchResponse.description, "TEXTAREA")
})

test("Editing an item sends the correct request to modify it", async () => {
    const editButton = await screen.findByText(inventoryMock.searchResponse[0].name)
    act(() => {
        editButton.click()
    })
    await screen.findByText("Editing An Item")
    
    const input = await component.getByLabelText("Name") as HTMLInputElement
    fireEvent.change(input, { target: "New Name" })
    const submitButton = await screen.findByText("Submit")
    act(() => {
        submitButton.click()
    })

    //check that we're back on main page
    const name = await screen.findByText(inventoryMock.searchResponse[0].name)
    expect(name).toBeInTheDocument()

    const successMessage = await screen.findByText("Item edited")
    expect(successMessage).toBeInTheDocument()
})
