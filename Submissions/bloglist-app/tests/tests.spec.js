const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNew } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Bruno Bauer',
        username: 'BBR',
        password: 'password123'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click() 
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click() 
      await expect(page.getByText('Log in to application')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('BBR')
      await page.getByTestId('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect( page.getByText('Bruno Bauer logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('BBR')
      await page.getByTestId('password').fill('wrongPassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('error logging in')).toBeVisible()
    })
  })

  describe('Blogs', async () => {
    beforeEach(async ({ page }) => {
      await loginWith(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await createNew(page)
      await expect(page.getByText('Critique of the critical critique Kmax')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createNew(page)
      const note = page.locator('.blogClass:has-text("Critique of the critical critique Kmax")')
      await note.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
    })
    
    test('a blog can be deleted', async ({ page }) => {
      await createNew(page)
      const note = page.locator('.blogClass:has-text("Critique of the critical critique Kmax")')
      await note.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await note.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.getByText('Critique of the critical critique Kmax')).not.toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createNew(page)
      const note = page.locator('.blogClass:has-text("Critique of the critical critique Kmax")')
      await note.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await note.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.getByText('Critique of the critical critique Kmax')).not.toBeVisible()
    })
    
    test(`only the user who added the blog sees the blog's delete button`, async ({ page }) => {
      
    })

  })

})