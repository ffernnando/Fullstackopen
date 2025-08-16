import { render, screen } from "@testing-library/react";
import { test, expect, describe, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";
import NoteForm from "./NoteForm";

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<NoteForm createNote={createNote}/>)
  
  const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  console.log(createNote.mock.calls)
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})