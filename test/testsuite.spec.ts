import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboard-page';
import { LoginPage } from './pages/login-page';
import { CreateRoomPage } from './pages/createRoom-page';
import { RoomsPage } from './pages/rooms-page';
import { ClientsPage } from './pages/clients-page';
import { CreateClientPage } from './pages/createClient-page';



test.describe('Test suite 01', () => {

  
  test('Test Case 01, Title overview ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
  
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.pageTitle).toBeVisible();
 
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(10000);   
  });



  test('Tase case 02, create client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
    const dashboardPage = new DashboardPage(page);
    const createClient = new CreateClientPage(page);

    await dashboardPage.gotoClientsView();
    await page.locator("#app > div > h2 > a").click();
    // await page.getByRole('link', { name: 'Create Client' }).click();
    await createClient.createClient();

  });

  test('Tase Case 03 : Edit client and asserting', async ({ page }) => {
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

  test('Tase case 04, creating a new room and asserting', async ({ page }) => {
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





});   