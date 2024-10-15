import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboard-page';
import { LoginPage } from './pages/login-page';
import { CreateRoomPage } from './pages/createRoom-page';
import { RoomsPage } from './pages/rooms-page';
import { ClientsPage } from './pages/clients-page';
import { CreateClientPage } from './pages/createClient-page';
import { BillsPage } from './pages/bills-page';
import { CreateBillPage } from './pages/createNewBill-page';
import { ReservationsPage } from './pages/reservations-page';



test.describe('Test suite 01', () => {

  
  test('Test Case 1, Title overview ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
  
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.pageTitle).toBeVisible();
 
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(10000);   
  });



  test('Tase case 2, create client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const createClient = new CreateClientPage(page);

    await dashboardPage.gotoClientsView();
    await page.locator("#app > div > h2 > a").click();
    //*await page.getByRole('link', { name: 'Create Client' }).click(); *//
    await createClient.createClient();

  });

  test('Tase Case 3 : Edit client and asserting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
  
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await dashboardPage.gotoClientsView();
    await clientsPage.gotoEditClient(0);
    await clientsPage.goBack();
    await expect(clientsPage.page).toHaveURL(/.*clients/);
  });

  test('Tase case 4: delete an existing client and assert', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await dashboardPage.gotoClientsView();
    await clientsPage.deleteClient(0); 

    const clientNameLocator = page.locator('text=Jonas Hellman'); 
    await expect(clientNameLocator).toHaveCount(0);
    
  });


  test('Tase case 5, creating a new room and asserting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    const createRoomPage = new CreateRoomPage(page);
    
    await dashboardPage.gotoRoomsView();
    await roomsPage.gotoCreateRoom();
    await createRoomPage.createRoom();
    await expect(roomsPage.page).toHaveURL(/.*rooms/);

  });
  test('Tase Case 6 : Edit room and asserting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
  
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);

    await dashboardPage.gotoRoomsView();
    await roomsPage.gotoEditRoom(0);
    await roomsPage.goBack();
    await expect(roomsPage.page).toHaveURL(/.*rooms/);
  });

  test('Tase case 7: delete room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new RoomsPage(page);

    await dashboardPage.gotoRoomsView();
    await clientsPage.deleteRoom(0); 

    const roomNameLocator = page.locator('text=Floor 1, Room 1011'); 
    await expect(roomNameLocator).toHaveCount(2);
    
  });


  test('Tase case 8, create bill page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const createBillPage = new CreateBillPage(page);
  
    await dashboardPage.gotoBillsView();
    await billsPage.gotoCreateBill();

    const randomCreateBill = await createBillPage.createBill();
    const billRow = page.locator(`text=${randomCreateBill}`);
    await expect(billRow).toBeVisible();


  });
   
  test('Tase case 09, edit en old bill and assert the update', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);

    await dashboardPage.gotoBillsView();
    await billsPage.gotoEditBill(0);
    await expect(billsPage.page).toHaveURL(/.*bill/); 

  });

  test('Tase case 10, creating a new reservation and assert', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await dashboardPage.gotoReservationsView();
    await reservationsPage.gotoCreateReservation();
    await reservationsPage.goBackFromReservationsPage();
    await expect(reservationsPage.page).toHaveURL(/.*reservations/);
  });



  test('Tase case 11: delete reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const reservationPage = new ReservationsPage(page);

    await dashboardPage.gotoReservationsView();
    await reservationPage.deleteReservation(0); 

    const reservationNameLocator = page.locator('text=Client 12'); 
    await expect(reservationNameLocator).toHaveCount(2);
    
  });

});   
