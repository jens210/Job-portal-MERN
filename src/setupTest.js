// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';
// this adds jest-dom's custom matchers
import 'jest-dom/extend-expect';
// some global test data for all your tests
global.categoriesTest = ["bah"];