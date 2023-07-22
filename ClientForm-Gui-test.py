import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class AppTest(unittest.TestCase):
    def setUp(self):
        # Change the path to the web driver executable accordingly
        self.driver = webdriver.Chrome(executable_path='path/to/chromedriver')
        self.driver.get('URL_OF_THE_REACT_APP')  # Replace with the URL of your React app

    def tearDown(self):
        self.driver.quit()

    def test_create_customer_form_submission(self):
        driver = self.driver

        # Click on the 'Customers' menu item
        customers_menu = driver.find_element_by_xpath("//span[contains(text(), 'Customers')]")
        customers_menu.click()

        # Click on the 'Create a Customer' submenu item
        create_customer_submenu = driver.find_element_by_xpath("//span[contains(text(), 'Create a Customer')]")
        create_customer_submenu.click()

        # Wait for the 'Customer Name' input to be visible
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.NAME, 'customerName')))

        # Fill out the form
        customer_name_input = driver.find_element_by_name('customerName')
        customer_name_input.send_keys('John Doe')

        email_input = driver.find_element_by_name('email')
        email_input.send_keys('john.doe@example.com')

        phone_number_input = driver.find_element_by_name('number')
        phone_number_input.send_keys('1234567890')

        address_input = driver.find_element_by_name('address')
        address_input.send_keys('123 Main Street')

        gst_input = driver.find_element_by_name('gst')
        gst_input.send_keys('GST12345')

        # Submit the form
        submit_button = driver.find_element_by_xpath("//button[@type='submit']")
        submit_button.click()

        # Wait for the response (you can add more specific checks here)
        WebDriverWait(driver, 10).until(EC.url_contains('success'))

        # Verify if the form was successfully submitted and cleared
        form_fields = [
            customer_name_input,
            email_input,
            phone_number_input,
            address_input,
            gst_input
        ]

        for field in form_fields:
            self.assertEqual(field.get_attribute('value'), '')

if __name__ == '__main__':
    unittest.main()
