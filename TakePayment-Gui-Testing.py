import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

class PaymentFormTest(unittest.TestCase):
    def setUp(self):
        # Change the path to the web driver executable accordingly
        self.driver = webdriver.Chrome(executable_path='path/to/chromedriver')
        self.driver.get('URL_OF_THE_REACT_APP')  # Replace with the URL of your React app

    def tearDown(self):
        self.driver.quit()

    def test_payment_form_submission(self):
        driver = self.driver

        # Fill out the form fields
        customer_name_input = driver.find_element_by_name('customerName')
        customer_name_input.send_keys('John Doe')

        amount_input = driver.find_element_by_name('amount')
        amount_input.send_keys('100')

        # Submit the form
        submit_button = driver.find_element_by_xpath("//button[@type='submit']")
        submit_button.click()

        # Wait for the response (you can add more specific checks here)
        WebDriverWait(driver, 10).until(EC.url_contains('success'))

        # Verify if the form was successfully submitted and cleared
        form_fields = [
            customer_name_input,
            amount_input
        ]

        for field in form_fields:
            self.assertEqual(field.get_attribute('value'), '')

if __name__ == '__main__':
    unittest.main()
