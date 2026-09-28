import { test, expect } from '@playwright/test';

test('Practice Playwright Assignment 1', async ({ page }) => {
  const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill('samantha.diaz1019@gmail.com');
  await page.getByLabel('Password').fill('Marie1019#');
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events', exact: true })).toBeVisible();
  const eventTitle = `Test Event ${Date.now()}`;
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea').fill('Best concert ever');
  await page.getByLabel('City').fill('New York');
  await page.getByLabel('Venue').fill('Best Place Ever');
  function futureDateValue() {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    return date.toISOString().slice(0, 16); }
  await page.getByLabel('Event Date & Time').fill(futureDateValue());
  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats*').fill('50');
  await page.getByTestId('add-event-btn').click();
  await expect(page.getByText('Event created!')).toBeVisible();
  await page.getByTestId('nav-events').click();
  const eventCards = page.getByTestId('event-card');
  await expect(eventCards.first()).toBeVisible();
  const matchedCard = eventCards.filter({ hasText: eventTitle });
  await expect(matchedCard).toBeVisible();
  const seatsBeforeBooking = parseInt(await matchedCard.getByText('seats available').innerText());
  await matchedCard.getByTestId('book-now-btn').click();
  await expect(page.locator('#ticket-count')).toHaveText('1');
  await page.getByLabel('Full Name').fill('Samantha');
  await page.locator('#customer-email').fill('samantha.diaz1019@gmail.com');
  await page.getByPlaceholder('+91 98765 43210').fill('7183085497');
  await page.locator('.confirm-booking-btn').click();
  const bookingRefElement = page.locator('.booking-ref').first();
  await expect(bookingRefElement).toBeVisible();
  const bookingRef = (await bookingRefElement.innerText()).trim();
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const bookingCards = page.locator('#booking-card');
  await expect(bookingCards.first()).toBeVisible();
  await expect(bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) })).toBeVisible();
  await expect(bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) })).toContainText(eventTitle);
  await page.getByTestId('nav-events').click();
  await expect(eventCards.first()).toBeVisible();
  await expect(matchedCard).toBeVisible();
  const seatsAfterBooking = parseInt(await matchedCard.getByText('seats available').innerText());
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
  //test

});