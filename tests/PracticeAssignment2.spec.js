import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const GMAIL_USER = { email: 'samantha.diaz1019@gmail.com' , password: 'Marie1019#'};
async function loginAndGoToBooking(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(GMAIL_USER.email);
  await page.getByLabel('Password').fill(GMAIL_USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events', exact: true })).toBeVisible();
}

test('refund eligible for single ticket booking', async ({ page }) => {
  await loginAndGoToBooking(page);  

  //Book first Event
  await page.getByTestId('nav-events').click();
  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  await page.getByLabel('Full Name').fill('Samantha');
  await page.locator('#customer-email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('7183085497');
  await page.locator('.confirm-booking-btn').click();

  //Navigate to Booking Detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  //Validate booking ref
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator('h1').innerText();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  //Check Refund Eligibility 
  await page.locator('#check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  //Validate Result
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Eligible for refund');
  await expect(result).toContainText('Single-ticket bookings qualify for a full refund');

});

test('refund not eligible for group ticket booking', async ({ page }) => {
  await loginAndGoToBooking(page);  

  //Book first Event
  await page.getByTestId('nav-events').click();
  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  await page.getByRole('button', { name: '+' }).click();
  // alt version await page.locator('button:has-text("+")').click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByLabel('Full Name').fill('Samantha');
  await page.locator('#customer-email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('7183085497');
  await page.locator('.confirm-booking-btn').click();

  //Navigate to Booking Detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  //Validate booking ref
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator('h1').innerText();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  //Check Refund Eligibility 
  await page.locator('#check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  //Validate Result
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Not eligible for refund');
  await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');

});