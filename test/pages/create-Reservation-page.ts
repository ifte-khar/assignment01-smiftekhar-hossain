import { expect, type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class CreateReservationPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly checkInDateTextField: Locator;
    readonly checkOutDateTextField: Locator;
    readonly clientDropdown: Locator;
    readonly roomIdDropdown: Locator;
    readonly billIdDropdown: Locator;
    readonly saveButton: Locator;
    readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('New Reservation');
    this.checkInDateTextField = page.locator('div').filter({ hasText: /^Start Date$/ }).getByRole('textbox');
    this.checkOutDateTextField = page.locator('div').filter({ hasText: /^End Date$/ }).getByRole('textbox');
    this.clientDropdown = page.locator('div').filter({ hasText: /^Client$/ }).getByRole('listbox');
    this.roomIdDropdown = page.locator('div').filter({ hasText: /^Room$/ }).getByRole('listbox');
    this.billIdDropdown = page.locator('div').filter({ hasText: /^Bill$/ }).getByRole('listbox');
    this.saveButton = page.getByText('Save');
    this.backButton = page.getByRole('link', { name: 'Back' });
  }

  async createReservation() {
    const checkInDate = faker.date.future();;
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    const formattedCheckInDate = checkInDate.toISOString().split('T')[0];
    const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0];

    await this.checkInDateTextField.fill(formattedCheckInDate);
    await this.checkOutDateTextField.fill(formattedCheckOutDate);

   
    await this.clientDropdown.selectOption({ index: 0 }); 
    await this.roomIdDropdown.selectOption({ index: 0 }); 
    await this.billIdDropdown.selectOption({ index: 0 }); 

    await this.saveButton.click();
    }
}