import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationsPage {
    goBack() {
      throw new Error('Method not implemented.');
    }
    //goBack() {
      //throw new Error('Method not implemented.');
    //}
    //gotoEditReservations(arg0: number) {
      //throw new Error('Method not implemented.');//
    //}
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly createReservationButton: Locator;
    readonly resevationOptionButton: Locator;
    readonly editReservationOption: Locator;
    readonly deleteReservationOption: Locator;
    readonly backButton: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByText('Reservations');
        this.createReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        this.resevationOptionButton = page.getByRole('img');
        this.editReservationOption = page.getByText('Edit');
        this.deleteReservationOption = page.getByText('Delete');
        this.backButton = page.getByRole('link', { name: 'Back' });
    }

    async gotoCreateReservation() {
        await this.createReservationButton.click();
    }

    async editReservation(index: number){
        await this.resevationOptionButton.nth(index).click();
        await this.editReservationOption.click();
    }

    async deleteReservation(index: number){
        await this.resevationOptionButton.nth(index).click();
        await this.deleteReservationOption.click();
    }

    async goBackFromReservationsPage() {
        await this.backButton.click();
    }
}